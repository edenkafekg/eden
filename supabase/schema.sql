-- Eden POS schema — run in Supabase SQL Editor

create extension if not exists "pgcrypto";

create table if not exists staff (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists shifts (
  id uuid primary key default gen_random_uuid(),
  staff_id uuid not null references staff(id),
  started_at timestamptz not null default now(),
  ended_at timestamptz
);

create type session_type as enum ('igra', 'cuvaonica');

create type session_status as enum ('active', 'closed');

create table if not exists sessions (
  id uuid primary key default gen_random_uuid(),
  shift_id uuid not null references shifts(id),
  type session_type not null,
  table_number int check (table_number is null or (table_number >= 0 and table_number <= 9)),
  status session_status not null default 'active',
  checked_in_at timestamptz not null,
  checked_out_at timestamptz,
  billing_breakdown jsonb,
  total_rsd int,
  daycare_billing_mode text check (daycare_billing_mode is null or daycare_billing_mode in ('hourly', 'full_day')),
  created_at timestamptz not null default now(),
  constraint table_required_for_igra check (
    (type = 'igra' and table_number is not null) or
    (type = 'cuvaonica' and table_number is null)
  )
);

create table if not exists session_children (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references sessions(id) on delete cascade,
  name text not null,
  sort_order int not null default 0
);

create index if not exists idx_sessions_status on sessions(status);
create index if not exists idx_sessions_checked_in on sessions(checked_in_at desc);
create index if not exists idx_shifts_started on shifts(started_at desc);

-- Seed staff (edit names as needed)
insert into staff (name) values
  ('Radnica 1'),
  ('Radnica 2'),
  ('Radnica 3');
