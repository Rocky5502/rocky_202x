/* Anonymous article appreciation API. Durable counts via SQLite triggers in Cloudflare D1.
   No email, account, OAuth, browser fingerprinting or raw IP is persisted.
   Visitor IDs are random browser-local UUIDs; a keyed hash is stored server-side.
   Best-effort abuse protection, not proof of unique human readership. */
const SLUGS = new Set([
  "ten-rules-phd-research-ai",
  "are-we-asking-the-right-questions",
  "when-ai-says-i-know",
  "dear-younger-me-success-is-not-what-you-think",
  "why-i-choose-to-study-uncertainty",
  "what-does-it-mean-to-be-a-scientist-in-the-age-of-ai",
  "the-experiments-that-failed",
  "the-boy-from-nepal-who-refused-to-stop-dreaming",
]);
const VISITOR_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const textEncoder = new TextEncoder();

async function hashWithSecret(secret, value) {
  const key = await crypto.subtle.importKey(
    "raw", textEncoder.encode(secret), {name: "HMAC", hash: "SHA-256"}, false, ["sign"]
  );
  const digest = await crypto.subtle.sign("HMAC", key, textEncoder.encode(value));
  return Array.from(new Uint8Array(digest), b => b.toString(16).padStart(2, "0")).join("");
}

function reply(payload, status, origin) {
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "no-referrer",
    "Vary": "Origin",
  };
  if (origin === "https://rocky5502.github.io") {
    headers["Access-Control-Allow-Origin"] = origin;
  }
  return new Response(JSON.stringify(payload), { status, headers });
}

async function currentState(db, article, visitorHash) {
  const count = await db.prepare("SELECT count FROM totals WHERE article = ?").bind(article).first();
  let liked = false;
  if (visitorHash) {
    const item = await db.prepare("SELECT 1 AS present FROM votes WHERE article = ? AND visitor_hash = ?")
      .bind(article, visitorHash).first();
    liked = Boolean(item);
  }
  return {count: Number(count?.count ?? 0), liked};
}

async function handle(request, env) {
  const origin = request.headers.get("Origin");
  if (request.method === "OPTIONS") {
    if (origin !== "https://rocky5502.github.io") return reply({error:"origin_not_allowed"},403,origin);
    return new Response(null, { status:204, headers:{
      "Access-Control-Allow-Origin":origin,
      "Access-Control-Allow-Methods":"GET, POST, OPTIONS",
      "Access-Control-Allow-Headers":"Content-Type, X-Anonymous-Visitor",
      "Access-Control-Max-Age":"600",
      "Vary":"Origin",
    }});
  }
  // Browsers send Origin on cross-origin POST. Prevent drive-by submissions.
  if (origin && origin !== "https://rocky5502.github.io")
    return reply({error:"origin_not_allowed"},403,origin);
  const url = new URL(request.url);
  const match = /^\/v1\/likes\/([a-z0-9-]+)$/.exec(url.pathname);
  if (!match || !SLUGS.has(match[1])) return reply({error:"not_found"},404,origin);
  if (!["GET","POST"].includes(request.method)) return reply({error:"method_not_allowed"},405,origin);
  if (!env.DB || typeof env.LIKE_HMAC_SECRET !== "string" || env.LIKE_HMAC_SECRET.length < 32)
    return reply({error:"not_configured"},503,origin);
  const article = match[1];
  try {
    let visitorId = request.headers.get("X-Anonymous-Visitor") || "";
    let likedValue = null;
    if (request.method === "POST") {
      if (origin !== "https://rocky5502.github.io")
        return reply({error:"origin_required"},403,origin);
      if (!(request.headers.get("Content-Type") || "").startsWith("application/json"))
        return reply({error:"invalid_content_type"},415,origin);
      const contentLength = Number(request.headers.get("Content-Length") || 0);
      if (contentLength > 512) return reply({error:"payload_too_large"},413,origin);
      const raw = await request.text();
      if (raw.length > 512) return reply({error:"payload_too_large"},413,origin);
      let parsed;
      try { parsed = JSON.parse(raw); } catch { return reply({error:"invalid_json"},400,origin); }
      if (!parsed || typeof parsed !== "object" || typeof parsed.liked !== "boolean" ||
          typeof parsed.visitorId !== "string")
        return reply({error:"invalid_request"},400,origin);
      visitorId = parsed.visitorId;
      likedValue = parsed.liked;
    }
    if (visitorId && !VISITOR_ID.test(visitorId))
      return reply({error:"invalid_visitor"},400,origin);
    if (request.method === "POST" && !visitorId)
      return reply({error:"visitor_required"},400,origin);
    const visitorHash = visitorId
      ? await hashWithSecret(env.LIKE_HMAC_SECRET, "visitor:" + visitorId)
      : null;
    if (request.method === "POST") {
      const ip = request.headers.get("CF-Connecting-IP") || "unknown";
      const day = new Date().toISOString().slice(0,10);
      const ipHash = await hashWithSecret(env.LIKE_HMAC_SECRET, "daily:"+day+":"+ip);
      // Rate limiting is coarse and conservative. Shared networks are not
      // treated as one person; only unusually rapid write bursts are blocked.
      if (env.LIKE_RATE_LIMITER) {
        const decision = await env.LIKE_RATE_LIMITER.limit({key:ipHash});
        if (!decision.success) return reply({error:"too_many_requests"},429,origin);
      }
      const already = await env.DB.prepare(
        "SELECT 1 AS present FROM votes WHERE article = ? AND visitor_hash = ?"
      ).bind(article,visitorHash).first();
      if (likedValue && !already) {
        // A daily hashed-IP cap makes bulk token regeneration less useful.
        // IP hashes expire automatically; no raw IP or user-agent is stored.
        const budget = await env.DB.prepare(
          "INSERT INTO rate_budget (day, ip_hash, used) VALUES (?, ?, 1) " +
          "ON CONFLICT(day, ip_hash) DO UPDATE SET used = used + 1 WHERE used < 32 RETURNING used"
        ).bind(day,ipHash).first();
        if (!budget) return reply({error:"daily_limit"},429,origin);
        await env.DB.prepare(
          "INSERT OR IGNORE INTO votes (article, visitor_hash) VALUES (?, ?)"
        ).bind(article,visitorHash).run();
      } else if (!likedValue && already) {
        await env.DB.prepare(
          "DELETE FROM votes WHERE article = ? AND visitor_hash = ?"
        ).bind(article,visitorHash).run();
      }
    }
    const state = await currentState(env.DB,article,visitorHash);
    return reply({article,...state},200,origin);
  } catch {
    // Errors must not include database query details, tokens, or IP addresses.
    return reply({error:"service_unavailable"},503,origin);
  }
}
export default {
  fetch: handle,
  async scheduled(event, env) {
    if (env.DB) await env.DB.prepare("DELETE FROM rate_budget WHERE day < date('now', '-3 day')").run();
  },
};
export {SLUGS, hashWithSecret};
