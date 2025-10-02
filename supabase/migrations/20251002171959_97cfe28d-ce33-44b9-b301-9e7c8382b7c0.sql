-- Ensure required extension for UUIDs
create extension if not exists "pgcrypto";

-- Timestamp trigger function (idempotent)
create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Categories table
create table if not exists public.categories (
  id text primary key,
  title text not null,
  description text not null,
  icon text not null,
  difficulty text not null,
  gradient text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.categories enable row level security;

-- Recreate policies safely
drop policy if exists "Everyone can view categories" on public.categories;
drop policy if exists "Allow inserts for seeding categories" on public.categories;
create policy "Everyone can view categories" on public.categories for select using (true);
create policy "Allow inserts for seeding categories" on public.categories for insert with check (true);

-- Updated_at trigger for categories
drop trigger if exists update_categories_updated_at on public.categories;
create trigger update_categories_updated_at
before update on public.categories
for each row execute function public.update_updated_at_column();

-- Learn modules table
create table if not exists public.learn_modules (
  id uuid primary key default gen_random_uuid(),
  category_id text not null,
  type text not null,
  title text not null,
  content jsonb not null,
  order_index integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint learn_modules_category_fk foreign key (category_id) references public.categories(id) on delete cascade
);

alter table public.learn_modules enable row level security;

-- Recreate policies safely
drop policy if exists "Everyone can view learn modules" on public.learn_modules;
drop policy if exists "Allow inserts for seeding learn modules" on public.learn_modules;
create policy "Everyone can view learn modules" on public.learn_modules for select using (true);
create policy "Allow inserts for seeding learn modules" on public.learn_modules for insert with check (true);

-- Indexes
create index if not exists idx_learn_modules_category_order on public.learn_modules(category_id, order_index);

-- Updated_at trigger for learn_modules
drop trigger if exists update_learn_modules_updated_at on public.learn_modules;
create trigger update_learn_modules_updated_at
before update on public.learn_modules
for each row execute function public.update_updated_at_column();