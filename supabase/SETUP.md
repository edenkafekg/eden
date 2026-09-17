# Eden Tracker — Supabase setup

## 1. Kreiraj Supabase projekat

1. Idi na [supabase.com](https://supabase.com) i napravi besplatan projekat
2. Sačekaj da se baza inicijalizuje

## 2. Pokreni SQL šemu

1. U Supabase dashboardu: **SQL Editor → New query**
2. Kopiraj sadržaj fajla [`schema.sql`](./schema.sql) i klikni **Run**
3. Ako već imaš bazu, pokreni i [`migrations/002_shifts_discounts.sql`](./migrations/002_shifts_discounts.sql) za smene i popuste

## 3. Env varijable

Kopiraj `.env.example` u `.env.local` u root-u projekta:

```bash
cp .env.example .env.local
```

Popuni vrednosti iz Supabase **Project Settings → API**:

| Env | Gde naći |
|-----|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | anon public key |
| `SUPABASE_SERVICE_ROLE_KEY` | service_role key (tajna!) |
| `AUTH_SECRET` | random string, min 16 karaktera |
| `STAFF_PIN` | PIN za radnice (npr. 1234) |
| `ADMIN_PASSWORD` | tvoja admin lozinka |

## 4. Pokreni aplikaciju

```bash
npm run dev
```

- **Radnice:** http://localhost:3002/app/login
- **Admin:** http://localhost:3002/app/admin/login

## 5. Deploy na Vercel

Dodaj iste env varijable u Vercel **Project Settings → Environment Variables**, pa redeploy.

## Napomene

- `/app` rute imaju `noindex` — nisu na javnom sajtu
- Besplatan Supabase tier: 500 MB baze, dovoljno za godine evidencije
- Promeni imena radnica u SQL seed-u ili preko admin panela
