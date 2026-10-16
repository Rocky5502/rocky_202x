-- Durable, concurrency-safe public totals: UNIQUE visitor hashes and SQL triggers.
-- No raw IPs, email addresses or user-agent fingerprints are persisted.
CREATE TABLE IF NOT EXISTS votes (
  article TEXT NOT NULL,
  visitor_hash TEXT NOT NULL,
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  PRIMARY KEY (article, visitor_hash)
) WITHOUT ROWID;

CREATE TABLE IF NOT EXISTS totals (
  article TEXT PRIMARY KEY,
  count INTEGER NOT NULL DEFAULT 0 CHECK (count >= 0)
) WITHOUT ROWID;

CREATE TABLE IF NOT EXISTS rate_budget (
  day TEXT NOT NULL,
  ip_hash TEXT NOT NULL,
  used INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (day, ip_hash)
) WITHOUT ROWID;

CREATE TRIGGER IF NOT EXISTS votes_count_after_insert
AFTER INSERT ON votes BEGIN
  INSERT INTO totals(article, count) VALUES (NEW.article, 1)
  ON CONFLICT(article) DO UPDATE SET count = count + 1;
END;

CREATE TRIGGER IF NOT EXISTS votes_count_after_delete
AFTER DELETE ON votes BEGIN
  UPDATE totals SET count = count - 1 WHERE article = OLD.article AND count > 0;
END;
