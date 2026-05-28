# Platformă web pentru informarea și analiza oportunităților de emigrare

Aplicație web production-ready pentru lucrarea de licență, destinată românilor care analizează oportunități de emigrare în funcție de informații legale, costuri, salarii, taxe, comunități și dificultatea obținerii cetățeniei.

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

## Etape de dezvoltare

1. Arhitectura generală a aplicației
2. Structura folderelor și configurarea proiectului Next.js
3. Schema Prisma și modelele bazei de date
4. API Route Handlers
5. Frontend și componente principale
6. Autentificare și protecția rutelor
7. Funcționalități principale
8. Deployment pe Vercel
9. Securitate, optimizare și scalare

Documentele de lucru din `docs/` sunt păstrate local și ignorate temporar din Git.

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
- `/map` pentru structura vizuală pregătită pentru integrarea Leaflet.

Până la configurarea Supabase, frontend-ul folosește date demonstrative controlate din `src/services/locations/demo-data.ts`, iar după setarea `DATABASE_URL` serviciile citesc datele prin Prisma.

## Variabile de mediu

Copiază `.env.example` în `.env.local` și completează valorile Supabase și PostgreSQL înainte de etapele care folosesc autentificare sau bază de date.
