# Migro

Migro este o aplicație web production-ready pentru lucrarea de licență „Platformă web pentru informarea și analiza oportunităților de emigrare”. Platforma este destinată românilor care analizează oportunități de emigrare în funcție de informații legale, costuri, salarii, taxe, comunități și dificultatea obținerii cetățeniei.

## Stack tehnologic

- Next.js App Router
- TypeScript strict
- Tailwind CSS
- PostgreSQL prin Supabase
- Prisma ORM
- Supabase Auth
- Leaflet + OpenStreetMap
- Recharts
- Deployment pe Vercel

## Rulare locală

```bash
npm install
npm run dev
```

Aplicația pornește implicit la `http://localhost:3000`.

## Verificări

```bash
npm run typecheck
npm run lint
npm run build
```

## Bază de date

```bash
npm run db:validate
npm run db:generate
npm run db:migrate
npm run db:seed
```

Schema Prisma este în `prisma/schema.prisma`, iar migrarea inițială este în `prisma/migrations/0001_init/migration.sql`.

## API intern

Endpoint-uri publice:

- `GET /api/countries`
- `GET /api/countries/[slug]`
- `GET /api/cities`
- `GET /api/cities/[slug]`
- `GET /api/map/locations`

Endpoint-uri private, protejate prin Supabase Auth:

- `GET /api/favorites`
- `POST /api/favorites`
- `DELETE /api/favorites`
- `GET /api/comparisons`
- `POST /api/comparisons`
- `GET /api/comparisons/[id]`
- `DELETE /api/comparisons/[id]`

Autentificare:

- `/login` pentru autentificare cu email și parolă;
- `/register` pentru creare cont;
- `/auth/callback` pentru confirmări email și schimbarea codului Supabase în sesiune;
- `/dashboard`, `/favorites` și `/comparisons` sunt protejate prin middleware.

## Frontend

Paginile publice principale sunt:

- `/` pentru prezentarea platformei și țări recomandate;
- `/countries` pentru listare, filtrare și sortare țări;
- `/countries/[slug]` pentru detalii despre o țară;
- `/cities` pentru listare, filtrare și sortare orașe;
- `/cities/[slug]` pentru detalii despre un oraș;
- `/compare` pentru comparație vizuală între indicatori economici;
- `/map` pentru harta Leaflet cu locații interactive.

## Configurare Supabase local

În `.env.local` trebuie să existe cel puțin:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://lihesfxqmjwtocefjqjh.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Pentru funcționalitățile care salvează date în PostgreSQL mai trebuie:

```bash
DATABASE_URL=postgresql://postgres:<PAROLA_DB>@db.lihesfxqmjwtocefjqjh.supabase.co:5432/postgres
SUPABASE_SERVICE_ROLE_KEY=<SERVICE_ROLE_KEY>
```

Pentru Windows sau alte medii fără IPv6, folosește conexiunea Supabase Pooler pentru Prisma:

```bash
DATABASE_URL=postgresql://postgres.<PROJECT_REF>:<PAROLA_DB>@aws-0-eu-west-1.pooler.supabase.com:5432/postgres
```