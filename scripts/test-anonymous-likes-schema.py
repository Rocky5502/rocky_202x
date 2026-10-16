#!/usr/bin/env python3
"""Exercise real SQLite migration semantics independently of fake API mocks."""
from pathlib import Path
import sqlite3

migration = Path("cloudflare/anonymous-likes/migrations/0001_reactions.sql").read_text()
db = sqlite3.connect(":memory:")
db.executescript(migration)

article = "ten-rules-phd-research-ai"
a, b = "hex1", "hex2"
db.execute("INSERT INTO votes(article,visitor_hash) VALUES (?,?)", (article,a))
db.execute("INSERT OR IGNORE INTO votes(article,visitor_hash) VALUES (?,?)", (article,a))
assert db.execute("SELECT count FROM totals WHERE article=?", (article,)).fetchone()[0] == 1
db.execute("INSERT INTO votes(article,visitor_hash) VALUES (?,?)", (article,b))
assert db.execute("SELECT count FROM totals WHERE article=?", (article,)).fetchone()[0] == 2
db.execute("DELETE FROM votes WHERE article=? AND visitor_hash=?", (article,a))
assert db.execute("SELECT count FROM totals WHERE article=?", (article,)).fetchone()[0] == 1
for _ in range(32):
    assert db.execute(
        "INSERT INTO rate_budget(day,ip_hash,used) VALUES (?,?,1) "
        "ON CONFLICT(day,ip_hash) DO UPDATE SET used=used+1 WHERE used<32 RETURNING used",
        ("2026-10-16","daily_hash")).fetchone() is not None
assert db.execute(
    "INSERT INTO rate_budget(day,ip_hash,used) VALUES (?,?,1) "
    "ON CONFLICT(day,ip_hash) DO UPDATE SET used=used+1 WHERE used<32 RETURNING used",
    ("2026-10-16","daily_hash")).fetchone() is None
assert db.execute("SELECT used FROM rate_budget").fetchone()[0] == 32
print("PASS: SQLite unique votes, atomic totals triggers, and daily capped budgets")
