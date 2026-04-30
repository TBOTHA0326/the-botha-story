create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  created_at timestamptz not null default now()
);

alter table public.rsvps enable row level security;

drop policy if exists "Anyone can create an RSVP" on public.rsvps;

create policy "Anyone can create an RSVP"
on public.rsvps
for insert
to anon
with check (
  length(trim(first_name)) > 0
  and length(trim(last_name)) > 0
);
