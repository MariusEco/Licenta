# Migro

Migro este o platformă web pentru informarea și analiza oportunităților de emigrare, construită pentru românii care vor să compare țări și orașe după criterii practice: costul vieții, salarii medii, cerințe generale de emigrare, dificultatea obținerii cetățeniei, comunități românești, piața muncii și date demografice.

Aplicația este construită ca proiect production-ready pentru lucrarea de licență „Platformă web pentru informarea și analiza oportunităților de emigrare”.

## Tehnologii folosite

- Next.js cu App Router pentru frontend, backend și API Route Handlers
- TypeScript pentru tipare stricte și cod predictibil
- React pentru interfața utilizator
- Tailwind CSS pentru stilizare responsive
- PostgreSQL ca bază de date relațională
- Supabase pentru baza de date găzduită, autentificare și sesiuni
- Supabase Auth pentru login, register, Google OAuth și resetare parolă
- Prisma ORM pentru modelarea și accesarea bazei de date
- Leaflet și OpenStreetMap pentru harta interactivă
- Recharts pentru graficele de costuri
- Zod pentru validarea datelor în frontend și backend


## Funcționalități principale

- listare țări și orașe
- pagini de detalii pentru fiecare țară și oraș
- costuri lunare, salariu net mediu și date socio-economice
- hartă interactivă cu locații
- filtrare și sortare după cost, salariu și dificultate
- comparare între țări și orașe
- cont utilizator prin Supabase Auth
- autentificare cu email/parolă și Google
- resetare parolă prin email
- salvare locații favorite
- salvare comparații în cont
- protecție pentru rutele private
- politici RLS în Supabase pentru datele asociate utilizatorilor

## Structură proiect

```text
prisma/
  schema.prisma
  migrations/
  seed.ts

src/
  app/
  components/
  config/
  lib/
  services/
  types/
  validations/
```

`src/app` conține paginile Next.js și endpoint-urile API.

`src/components` conține componentele reutilizabile, împărțite în componente UI, layout și componente specifice funcționalităților.

`src/lib` conține integrarea cu Prisma, Supabase, serializarea datelor, erori comune, formatări și metadate despre locații.

`src/services` conține query-uri și logică de acces la date mai complexă.

`src/validations` conține scheme Zod pentru validarea inputurilor.

`src/types` conține tipuri TypeScript comune pentru locații și datele afișate în interfață.

`prisma` conține schema bazei de date, migrațiile SQL și scriptul opțional de seed.

## Pagini importante

- `/` - pagina principală
- `/countries` - listă țări
- `/countries/[slug]` - detalii țară
- `/cities/[slug]` - detalii oraș
- `/map` - hartă interactivă
- `/compare` - comparare locații
- `/favorites` - favoritele utilizatorului
- `/comparisons` - comparații salvate
- `/dashboard` - panou cont
- `/settings` - setări profil și resetare parolă
- `/settings/recovery` - setare parolă nouă după resetare
- `/login` - autentificare
- `/register` - creare cont
- `/forgot-password` - cerere resetare parolă

## Endpoint-uri API

Endpoint-uri publice:

- `GET /api/countries`
- `GET /api/countries/[slug]`
- `GET /api/cities`
- `GET /api/cities/[slug]`
- `GET /api/map/locations`
- `POST /api/auth/register`
- `POST /api/auth/password-reset`

Endpoint-uri pentru utilizatori autentificați:

- `GET /api/favorites`
- `POST /api/favorites`
- `DELETE /api/favorites`
- `GET /api/comparisons`
- `POST /api/comparisons`
- `GET /api/comparisons/[id]`
- `DELETE /api/comparisons/[id]`
- `POST /api/settings/profile`
- `POST /api/settings/password`
- `POST /api/settings/password-reset`

## Variabile de mediu

Creează un fișier `.env.local` în rădăcina proiectului.

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
NEXT_PUBLIC_APP_URL=http://localhost:3000
DATABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

Pentru `DATABASE_URL`, în Windows este recomandată conexiunea prin Supabase Pooler.

## Instalare locală

```bash
npm install
npm run db:generate
npm run dev
```

Aplicația pornește implicit pe:

```bash
http://localhost:3000
```

## Bază de date

Validare schema Prisma:

```bash
npm run db:validate
```

Generare Prisma Client:

```bash
npm run db:generate
```

Aplicare migrații în baza configurată prin `DATABASE_URL`:

```bash
npx prisma migrate deploy
```

Pentru dezvoltare locală se poate folosi:

```bash
npm run db:migrate
```

## Surse de date

Datele folosite în aplicație provin din surse publice și agregatoare precum Numbeo, Livingcost, World Population Review, Wikipedia și pagini oficiale guvernamentale sau instituționale.
