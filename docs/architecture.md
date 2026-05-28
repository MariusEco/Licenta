# Etapa 1 - Arhitectura generala

## Obiectiv

Aplicatia va centraliza informatii relevante pentru romanii care vor sa emigreze si va permite analiza comparativa a tarilor si oraselor pe baza criteriilor legale, economice si sociale. Platforma trebuie sa fie usor de extins, securizata, optimizata pentru SEO si pregatita pentru deployment pe Vercel.

## Decizii tehnice principale

### Next.js App Router

Next.js va fi folosit atat pentru frontend, cat si pentru backend prin App Router si Route Handlers. Aceasta alegere simplifica deployment-ul pe Vercel, reduce numarul de servicii separate si permite randare hibrida:

- pagini publice optimizate SEO pentru tari, orase si continut informativ;
- rute private pentru favorite, comparatii si profil utilizator;
- API Route Handlers pentru operatii CRUD si agregari;
- server components pentru acces controlat la date acolo unde este potrivit.

### TypeScript strict

Proiectul va folosi TypeScript strict pentru reducerea erorilor la runtime si pentru contracte clare intre UI, API, validari si baza de date. Tipurile generate de Prisma vor fi completate cu tipuri de domeniu si scheme Zod.

### Supabase + PostgreSQL + Prisma

Supabase va furniza PostgreSQL, hosting pentru baza de date si autentificare. Prisma va fi stratul principal de acces la baza de date pentru interogarile aplicatiei. Separarea este urmatoarea:

- Supabase Auth gestioneaza identitatea si sesiunile;
- PostgreSQL stocheaza entitatile domeniului;
- Prisma modeleaza schema, relatiile si interogarile;
- Row Level Security poate fi folosit pentru tabele sensibile sau pentru acces direct controlat, dar API-ul aplicatiei va ramane sursa principala de business logic.

### Tailwind CSS

Tailwind CSS va sustine un design responsive, coerent si usor de mentinut. Componentele UI vor fi construite modular, cu clase utilitare si variante reutilizabile.

### Leaflet + OpenStreetMap

Harta interactiva va folosi Leaflet pentru afisarea pin-urilor de tari si orase. Pentru compatibilitate cu App Router si SSR, componentele de harta vor fi incarcate client-side prin dynamic imports.

### Recharts

Vizualizarile comparative pentru costuri, salarii, taxe si scoruri vor fi implementate cu Recharts. Datele vor fi normalizate in backend si livrate catre grafice in structuri simple, predictibile.

## Module functionale

### Modul public informativ

Include pagini pentru tari si orase, informatii despre vize, cerinte legale, documente necesare, descrieri generale, legi locale si comunitati romanesti.

### Modul socio-economic

Include costuri de trai, chirii, utilitati, costuri alimentare, salarii medii, taxe si nivel de impozitare. Datele vor fi filtrabile si sortabile.

### Modul harta

Afiseaza tari si orase pe o harta globala. Pin-urile vor deschide un popup sau un panou de detalii cu informatii esentiale si link catre pagina completa.

### Modul cont utilizator

Include autentificare prin Supabase Auth, protectia rutelor private, favorite si comparatii salvate.

### Modul comparare

Permite compararea intre doua sau mai multe tari/orase folosind date economice, dificultatea emigrarii si alti indicatori relevanti.

## Arhitectura logica

```text
Browser
  -> Next.js App Router
    -> Server Components pentru pagini publice si date SEO
    -> Client Components pentru interactiuni, filtre, harta si grafice
    -> Route Handlers pentru API intern
      -> Validari Zod
      -> Servicii de business logic
      -> Prisma ORM
        -> PostgreSQL Supabase
    -> Supabase Auth pentru sesiuni si identitate
```

## Structura de foldere propusa

```text
src/
  app/
    (public)/
      countries/
      cities/
      compare/
      map/
    (auth)/
      login/
      register/
    (dashboard)/
      dashboard/
      favorites/
      comparisons/
    api/
      countries/
      cities/
      favorites/
      comparisons/
      auth/
  components/
    ui/
    layout/
    features/
      countries/
      cities/
      map/
      charts/
      auth/
  config/
  hooks/
  lib/
    prisma/
    supabase/
    auth/
    errors/
    seo/
  services/
    countries/
    cities/
    favorites/
    comparisons/
  types/
  validations/
prisma/
  schema.prisma
  seed.ts
docs/
```

## Entitati principale

- User: profil aplicatie legat de identitatea Supabase Auth.
- Country: informatii generale, pozitie geografica, scoruri si metadate.
- City: oras asociat unei tari, cu date economice si coordonate.
- VisaInfo: tipuri de vize, pasi legali si documente necesare.
- CostOfLiving: costuri lunare structurate pentru tara sau oras.
- Favorite: locatii salvate de utilizator.
- Comparison: seturi de tari/orase comparate si salvate.

## Strategie API

Route Handlers vor expune endpoint-uri interne predictibile:

- `GET /api/countries` pentru listare, filtrare si sortare;
- `GET /api/countries/[slug]` pentru detalii tara;
- `GET /api/cities` pentru listare si filtrare orase;
- `GET /api/cities/[slug]` pentru detalii oras;
- `GET /api/map/locations` pentru pin-uri optimizate;
- `GET/POST/DELETE /api/favorites` pentru locatii favorite;
- `GET/POST/DELETE /api/comparisons` pentru comparatii salvate.

Toate endpoint-urile care primesc input vor valida datele cu Zod. Endpoint-urile private vor verifica sesiunea Supabase pe server.

## Strategie de securitate

- Cheile sensibile vor sta doar in variabile de mediu server-side.
- Prisma va preveni SQL Injection prin query builder parametrizat.
- Datele introduse de utilizator vor fi validate si sanitizate.
- Rutele private vor fi protejate prin middleware si verificari server-side.
- CSRF va fi redus prin folosirea metodelor HTTP corecte, cookies securizate si validarea sesiunii.
- CORS va ramane restrictiv; aplicatia nu va expune API-ul catre origini necunoscute.
- Continutul HTML generat din surse externe nu va fi randat direct.

## Strategie frontend

Interfata va fi responsive si orientata spre analiza. Pagina principala va oferi acces rapid la cautare, filtre, harta si tari populare. Paginile de detalii vor combina sectiuni informative cu grafice si indicatori numerici. Componentele interactive costisitoare, precum harta, vor fi incarcate lazy.

## Performanta, SEO si accesibilitate

- Metadata dinamica pentru paginile de tara si oras.
- Server rendering pentru continut public indexabil.
- Lazy loading pentru harta si grafice.
- Paginare sau infinite loading pentru liste mari.
- Elemente semantice, focus states vizibile si contrast adecvat.
- Imagini optimizate prin `next/image` acolo unde sunt necesare.

## Deployment

Aplicatia va fi pregatita pentru Vercel. Variabilele de mediu vor include URL-ul Supabase, cheile publice/anonime necesare clientului, cheia server-side unde este cazul si `DATABASE_URL` pentru Prisma. Migrarea bazei de date va fi gestionata prin Prisma Migrate.

## Commit etapa 1

Aceasta etapa stabileste directia tehnica si limitele arhitecturale. Urmatoarea etapa va genera proiectul Next.js, configurarea TypeScript/Tailwind si structura initiala de foldere.
