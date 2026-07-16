create extension if not exists "pgcrypto";

create table if not exists public.admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  full_name text,
  role text not null check (role in ('president', 'coordonnateur', 'it')),
  created_at timestamptz not null default now()
);

create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  category text not null,
  excerpt text not null,
  content text not null,
  image_url text,
  image_alt text,
  featured boolean not null default false,
  status text not null default 'draft' check (status in ('draft', 'published')),
  author_email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published_at timestamptz
);

create index if not exists articles_slug_idx on public.articles(slug);
create index if not exists articles_status_idx on public.articles(status);
create index if not exists articles_published_at_idx on public.articles(published_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_articles_updated_at on public.articles;
create trigger set_articles_updated_at before update on public.articles
for each row execute function public.set_updated_at();

create or replace function public.is_upr_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_profiles ap
    where ap.id = auth.uid()
      and lower(ap.email) in (
        'ciakudia@gmail.com',
        'semenceengita@gmail.com',
        'colettebansompili011@gmail.com'
      )
  );
$$;

grant execute on function public.is_upr_admin() to authenticated, anon;

alter table public.admin_profiles enable row level security;
alter table public.articles enable row level security;

drop policy if exists "Admins can read own profile" on public.admin_profiles;
create policy "Admins can read own profile" on public.admin_profiles
for select to authenticated using (id = auth.uid());

drop policy if exists "Public can read published articles" on public.articles;
create policy "Public can read published articles" on public.articles
for select to anon, authenticated using (status = 'published');

drop policy if exists "Admins can read all articles" on public.articles;
create policy "Admins can read all articles" on public.articles
for select to authenticated using (public.is_upr_admin());

drop policy if exists "Admins can create articles" on public.articles;
create policy "Admins can create articles" on public.articles
for insert to authenticated with check (public.is_upr_admin());

drop policy if exists "Admins can update articles" on public.articles;
create policy "Admins can update articles" on public.articles
for update to authenticated using (public.is_upr_admin()) with check (public.is_upr_admin());

drop policy if exists "Admins can delete articles" on public.articles;
create policy "Admins can delete articles" on public.articles
for delete to authenticated using (public.is_upr_admin());

insert into storage.buckets (id, name, public)
values ('article-images', 'article-images', true)
on conflict (id) do nothing;

drop policy if exists "Public can read article images" on storage.objects;
create policy "Public can read article images" on storage.objects
for select to anon, authenticated using (bucket_id = 'article-images');

drop policy if exists "Admins can upload article images" on storage.objects;
create policy "Admins can upload article images" on storage.objects
for insert to authenticated with check (bucket_id = 'article-images' and public.is_upr_admin());

drop policy if exists "Admins can update article images" on storage.objects;
create policy "Admins can update article images" on storage.objects
for update to authenticated using (bucket_id = 'article-images' and public.is_upr_admin())
with check (bucket_id = 'article-images' and public.is_upr_admin());

drop policy if exists "Admins can delete article images" on storage.objects;
create policy "Admins can delete article images" on storage.objects
for delete to authenticated using (bucket_id = 'article-images' and public.is_upr_admin());
