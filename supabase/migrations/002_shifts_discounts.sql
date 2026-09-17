-- Run in Supabase SQL Editor if you already have the base schema

alter table sessions
  add column if not exists subtotal_rsd int,
  add column if not exists discount_percent int not null default 0,
  add column if not exists discount_rsd int not null default 0;

-- Backfill subtotal from existing closed sessions
update sessions
set subtotal_rsd = total_rsd
where status = 'closed' and subtotal_rsd is null and total_rsd is not null;

alter table sessions
  drop constraint if exists sessions_discount_percent_check;

alter table sessions
  add constraint sessions_discount_percent_check
  check (discount_percent >= 0 and discount_percent <= 100);

create index if not exists idx_shifts_staff_started on shifts(staff_id, started_at desc);
create index if not exists idx_shifts_ended on shifts(ended_at);
