# Running this project (and things that aren't obvious)

Full-stack app: one Node process (`server/index.ts`) serves the REST API and, in
development, mounts Vite in middleware mode so the same port serves the React
client with hot reload. Datastore is PostgreSQL via `drizzle-orm/postgres-js`
with the pg-core schema in `shared/schema.ts`.

## Start it

```bash
docker compose -f docker-compose.base44.yml up -d --build
```

- Web entry point: http://localhost:3000 (host 3000 → container 5000).
- `db` (postgres:16) → `setup` (one-shot: `npm ci` + `drizzle-kit push`) → `app`
  (`tsx watch server/index.ts`). Compose handles the ordering; no manual steps.
- No external credentials are required: the database is local and sessions use
  an in-memory store.

## Quirks worth knowing

- **PostgreSQL, not SQLite.** `server/db.ts` was briefly switched to
  `better-sqlite3` in a later commit while the schema, `drizzle.config.ts` and
  the docs all stayed Postgres; that combination broke every insert
  (`no such function: now`) and wrote to the empty `financial_lending.db` at the
  repo root. It is restored to `postgres-js`. `financial_lending.db` is a
  leftover file and is unused.
- **There is no migrations folder.** The schema is applied with
  `npx drizzle-kit push --force`, which is idempotent and runs in the `setup`
  service on every start. `drizzle.config.ts` requires `DATABASE_URL`.
- **`PORT` / `HOST`** are read in `server/index.ts` (defaults `5000` /
  `localhost`, i.e. the original Replit behaviour). The compose file sets
  `HOST=0.0.0.0` so the container port is reachable.
- **`SESSION_SECRET` is unset on purpose** — `server/auth.ts` falls back to a
  development default. Set a real value for any non-local environment.
- Sessions are in memory, so restarting the `app` container logs everyone out.
- `client/index.html` loads `replit-dev-banner.js` from replit.com; that request
  fails outside Replit and logs one harmless console error.
- The repo contains developer test artifacts (`*_cookies.txt`, `marie_test.txt`)
  that are unrelated to running the app.

## Verify it works

```bash
curl -s http://localhost:3000/ | grep -c '/src/main.tsx'   # dev HTML, not a bundle
curl -s -c /tmp/c.txt -X POST http://localhost:3000/api/register \
  -H 'Content-Type: application/json' \
  -d '{"email":"a@b.c","password":"secret123","firstName":"A","lastName":"B","clientType":"particulier","country":"France"}'
curl -s -b /tmp/c.txt http://localhost:3000/api/user       # 200 with the session user
docker compose -f docker-compose.base44.yml ps             # app + db healthy
```
