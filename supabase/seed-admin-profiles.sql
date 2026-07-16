-- À exécuter APRÈS création des 3 utilisateurs dans Authentication → Users
-- Remplace automatiquement les UUID via auth.users

insert into public.admin_profiles (id, email, full_name, role)
select id, lower(email), 'Prof. Rev. Julien C. K. Ciakudia Sr.', 'president'
from auth.users
where lower(email) = 'ciakudia@gmail.com'
on conflict (id) do update set
  email = excluded.email,
  full_name = excluded.full_name,
  role = excluded.role;

insert into public.admin_profiles (id, email, full_name, role)
select id, lower(email), 'Coordonnateur national', 'coordonnateur'
from auth.users
where lower(email) = 'semenceengita@gmail.com'
on conflict (id) do update set
  email = excluded.email,
  full_name = excluded.full_name,
  role = excluded.role;

insert into public.admin_profiles (id, email, full_name, role)
select id, lower(email), 'Administration IT', 'it'
from auth.users
where lower(email) = 'colettebansompili011@gmail.com'
on conflict (id) do update set
  email = excluded.email,
  full_name = excluded.full_name,
  role = excluded.role;
