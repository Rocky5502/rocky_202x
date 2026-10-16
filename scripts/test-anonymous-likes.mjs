import { test } from "node:test";
import assert from "node:assert/strict";
import { webcrypto } from "node:crypto";
import worker from "../cloudflare/anonymous-likes/src/index.mjs";

if (!globalThis.crypto?.subtle) globalThis.crypto = webcrypto;
const ORIGIN = "https://rocky5502.github.io";
const SECRET = "anonymous-reactions-2026-test-key-do-not-use-in-production";
const slug = "ten-rules-phd-research-ai";
const visitor = "f9c6e6ef-6348-448d-9644-cd9629312c46";

class TestDatabase {
  constructor() { this.votes = new Set(); this.budgets = new Map(); this.totals = new Map(); }
  prepare(sql) {
    return { bind: (...args) => ({
      first: async () => {
        if (sql.startsWith("SELECT count FROM totals")) return this.totals.has(args[0]) ? { count: this.totals.get(args[0]) } : null;
        if (sql.startsWith("SELECT 1 AS present")) return this.votes.has(args.join(":")) ? {present:1} : null;
        if (sql.startsWith("INSERT INTO rate_budget")) {
          const key = args.join(":");
          const used = this.budgets.get(key) || 0;
          if (used >= 32) return null;
          this.budgets.set(key,used+1);
          return {used: used+1};
        }
        throw Error("Unexpected .first SQL: " + sql);
      },
      run: async () => {
        if (sql.startsWith("INSERT OR IGNORE INTO votes")) {
          const key = args.join(":");
          if (!this.votes.has(key)) {
            this.votes.add(key);
            this.totals.set(args[0],(this.totals.get(args[0])||0)+1);
          }
          return {success:true};
        }
        if (sql.startsWith("DELETE FROM votes")) {
          const key = args.join(":");
          if (this.votes.delete(key)) this.totals.set(args[0],this.totals.get(args[0])-1);
          return {success:true};
        }
        if (sql.startsWith("DELETE FROM rate_budget")) { this.budgets.clear(); return {success:true}; }
        throw Error("Unexpected .run SQL: " + sql);
      },
    })};
  }
}
const makeEnv = () => ({DB:new TestDatabase(), LIKE_HMAC_SECRET:SECRET, LIKE_RATE_LIMITER:{limit:async()=>({success:true})}});
function request(method, id, liked, options={}) {
  const headers = {
    "Origin": options.origin === undefined ? ORIGIN : options.origin,
    "CF-Connecting-IP": options.ip || "192.0.2.1",
  };
  if(method==="GET" && id) headers["X-Anonymous-Visitor"]=id;
  if(method==="POST") headers["Content-Type"]="application/json";
  return new Request("https://worker.example/v1/likes/"+(options.slug||slug),{
    method,headers,body:method==="POST"?JSON.stringify({visitorId:id,liked}):undefined
  });
}

test("one anonymous visitor can like and unlike, with persistent shared total",async()=>{
  const env=makeEnv();
  let r=await worker.fetch(request("GET",visitor),env);
  assert.equal(r.status,200);
  assert.deepEqual(await r.json(),{article:slug,count:0,liked:false});
  r=await worker.fetch(request("POST",visitor,true),env);
  assert.deepEqual(await r.json(),{article:slug,count:1,liked:true});
  r=await worker.fetch(request("POST",visitor,true),env);
  assert.deepEqual(await r.json(),{article:slug,count:1,liked:true});
  r=await worker.fetch(request("GET",visitor),env);
  assert.equal((await r.json()).liked,true);
  r=await worker.fetch(request("GET",null),env);
  assert.deepEqual(await r.json(),{article:slug,count:1,liked:false});
  r=await worker.fetch(request("POST",visitor,false),env);
  assert.deepEqual(await r.json(),{article:slug,count:0,liked:false});
  assert.equal(env.DB.totals.get(slug),0);
  assert.ok([...env.DB.votes].every(key=>!key.includes(visitor)),"stored voter identifier must be keyed hash");
});

test("CORS, strict slug allowlist, invalid tokens and absent origin do not write",async()=>{
  const env=makeEnv();
  let r=await worker.fetch(request("POST",visitor,true,{origin:"https://evil.example"}),env);
  assert.equal(r.status,403);
  r=await worker.fetch(request("POST",visitor,true,{origin:""}),env);
  assert.equal(r.status,403);
  r=await worker.fetch(request("POST","token",true),env);
  assert.equal(r.status,400);
  r=await worker.fetch(request("POST",visitor,true,{slug:"not-a-real-essay"}),env);
  assert.equal(r.status,404);
  r=await worker.fetch(new Request("https://worker.example/v1/likes/"+slug,{
    method:"OPTIONS",headers:{Origin:ORIGIN,"Access-Control-Request-Method":"POST"}
  }),env);
  assert.equal(r.status,204);
  assert.equal(r.headers.get("Access-Control-Allow-Origin"),ORIGIN);
  assert.equal(env.DB.votes.size,0);
});

test("anonymity budget blocks bulk visitor-ID regeneration from one network",async()=>{
  const env=makeEnv();
  for(let i=0;i<32;i++){
    const id="12345678-1234-4234-9234-"+i.toString(16).padStart(12,"0");
    const r=await worker.fetch(request("POST",id,true),env);
    assert.equal(r.status,200);
  }
  const newId="12345678-1234-4234-9234-000000000099";
  const r=await worker.fetch(request("POST",newId,true),env);
  assert.equal(r.status,429);
  assert.equal(env.DB.totals.get(slug),32);
});

test("rate-limit binding and missing production secret fail closed",async()=>{
  const env=makeEnv();
  env.LIKE_RATE_LIMITER.limit=async()=>({success:false});
  let r=await worker.fetch(request("POST",visitor,true),env);
  assert.equal(r.status,429);
  env.LIKE_HMAC_SECRET="";
  r=await worker.fetch(request("GET",visitor),env);
  assert.equal(r.status,503);
  assert.equal(env.DB.votes.size,0);
});
