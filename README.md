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

## Variabile de mediu

Copiază `.env.example` în `.env.local` și completează valorile Supabase și PostgreSQL înainte de etapele care folosesc autentificare sau bază de date.
