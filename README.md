# Eden – Dečija igraonica (sajt)

Marketing sajt za igraonicu **Eden** u Kragujevcu. Izgrađen sa Next.js 16, TypeScript i Tailwind CSS.

## Stranice

- **Početna** (`/`) – hero, ponuda, prednosti, Google recenzije, mapa
- **Igraonica** (`/igraonica`)
- **Čuvaonica** (`/cuvaonica`)
- **Rođendani** (`/rodjendani`) – paketi + **forma za bukiranje**
- **Kafić** (`/kafic`)
- **Kontakt** (`/kontakt`)

## Boje i font

| Uloga | Boja |
|--------|------|
| Pozadina | `#fff7ed` |
| Naslovi / elementi | `#385333` |
| Akcenti | `#8e3232` |
| Paragrafi | `#828282` |

Font: **Poppins** (Google Fonts)

## Pokretanje

```bash
npm install
npm run dev
```

Otvorite [http://localhost:3000](http://localhost:3000).

## Prilagođavanje

U `src/lib/constants.ts` ažurirajte:

- telefon, email
- tekst recenzija (ili povežite Google Places API)
- cene paketa na stranici Rođendani

Forma za rođendan trenutno prikazuje uspešnu poruku lokalno. Za produkciju povežite API rutu sa email servisom (Resend, SendGrid) ili Formspree.

## Deploy

```bash
npm run build
npm start
```

Preporučeno: [Vercel](https://vercel.com) ili bilo koji Node hosting.
