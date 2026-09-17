-- Shared invoice checklist state (run in Supabase SQL Editor)

create table if not exists invoice_checklist (
  item_id text primary key,
  checked boolean not null default false,
  updated_at timestamptz not null default now()
);

create index if not exists idx_invoice_checklist_updated
  on invoice_checklist(updated_at desc);
