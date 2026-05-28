# Platforma web pentru informarea si analiza oportunitatilor de emigrare

Aplicatie web production-ready pentru lucrarea de licenta, destinata romanilor care analizeaza oportunitati de emigrare in functie de informatii legale, costuri, salarii, taxe, comunitati si dificultatea obtinerii cetateniei.

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

1. Arhitectura generala a aplicatiei
2. Structura folderelor si configurarea proiectului Next.js
3. Schema Prisma si modelele bazei de date
4. API Route Handlers
5. Frontend si componente principale
6. Autentificare si protectia rutelor
7. Functionalitati principale
8. Deployment pe Vercel
9. Securitate, optimizare si scalare

Documentele de lucru din `docs/` sunt pastrate local si ignorate temporar din Git.

## Rulare locala

```bash
npm install
npm run dev
```

Aplicatia porneste implicit la `http://localhost:3000`.

## Verificari

```bash
npm run typecheck
npm run lint
npm run build
```

## Variabile de mediu

Copiaza `.env.example` in `.env.local` si completeaza valorile Supabase si PostgreSQL inainte de etapele care folosesc autentificare sau baza de date.
