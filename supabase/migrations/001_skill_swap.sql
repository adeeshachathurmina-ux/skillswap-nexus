create extension if not exists pgcrypto;
create extension if not exists citext;

create type public.request_status as enum ('pending','accepted','declined','scheduled','in_progress','completed','cancelled');
create type public.session_type as enum ('Online','In-person','Hybrid');
create type public.challenge_status as enum ('draft','active','ended');

create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  name citext not null unique,
  category text not null,
  created_at timestamptz not null default now()
);
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username citext unique,
  full_name text not null,
  bio text not null default '',
  district text,
  city text,
  avatar_path text,
  languages text[] not null default '{}',
  availability jsonb not null default '{}',
  session_type public.session_type not null default 'Online',
  onboarding_complete boolean not null default false,
  is_admin boolean not null default false,
  suspended_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table if not exists public.profile_skills (
  profile_id uuid references public.profiles(id) on delete cascade,
  skill_id uuid references public.skills(id) on delete cascade,
  direction text not null check (direction in ('teach','learn')),
  level text not null default 'Intermediate' check (level in ('Beginner','Intermediate','Advanced')),
  primary key (profile_id, skill_id, direction)
);
create table if not exists public.swap_requests (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid not null references public.profiles(id) on delete cascade,
  receiver_id uuid not null references public.profiles(id) on delete cascade,
  goal text not null,
  session_type public.session_type not null default 'Online',
  proposed_at timestamptz,
  scheduled_at timestamptz,
  status public.request_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (sender_id <> receiver_id)
);
create table if not exists public.request_events (
  id bigint generated always as identity primary key,
  request_id uuid not null references public.swap_requests(id) on delete cascade,
  actor_id uuid references public.profiles(id) on delete set null,
  from_status public.request_status,
  to_status public.request_status not null,
  note text,
  created_at timestamptz not null default now()
);
create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  request_id uuid unique references public.swap_requests(id) on delete set null,
  created_at timestamptz not null default now()
);
create table if not exists public.conversation_members (
  conversation_id uuid references public.conversations(id) on delete cascade,
  profile_id uuid references public.profiles(id) on delete cascade,
  last_read_at timestamptz,
  primary key (conversation_id, profile_id)
);
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id uuid not null references public.profiles(id) on delete cascade,
  body text not null default '',
  attachment_path text,
  created_at timestamptz not null default now(),
  check (length(body) > 0 or attachment_path is not null)
);
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.swap_requests(id) on delete cascade,
  reviewer_id uuid not null references public.profiles(id) on delete cascade,
  reviewee_id uuid not null references public.profiles(id) on delete cascade,
  rating int not null check (rating between 1 and 5),
  body text not null default '',
  created_at timestamptz not null default now(),
  unique (request_id, reviewer_id),
  check (reviewer_id <> reviewee_id)
);
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  kind text not null,
  title text not null,
  body text not null default '',
  link text,
  read_at timestamptz,
  created_at timestamptz not null default now()
);
create table if not exists public.saved_profiles (profile_id uuid references public.profiles(id) on delete cascade, saved_profile_id uuid references public.profiles(id) on delete cascade, created_at timestamptz not null default now(), primary key(profile_id, saved_profile_id), check(profile_id <> saved_profile_id));
create table if not exists public.blocks (blocker_id uuid references public.profiles(id) on delete cascade, blocked_id uuid references public.profiles(id) on delete cascade, created_at timestamptz not null default now(), primary key(blocker_id, blocked_id), check(blocker_id <> blocked_id));
create table if not exists public.reports (id uuid primary key default gen_random_uuid(), reporter_id uuid references public.profiles(id) on delete cascade, reported_profile_id uuid references public.profiles(id) on delete cascade, reason text not null, details text not null default '', status text not null default 'open' check(status in ('open','reviewing','resolved','dismissed')), created_at timestamptz not null default now());
create table if not exists public.challenges (id uuid primary key default gen_random_uuid(), title text not null, description text not null, category text not null, difficulty text not null, starts_at timestamptz not null, ends_at timestamptz not null, status public.challenge_status not null default 'draft', badge text not null, created_at timestamptz not null default now());
create table if not exists public.challenge_members (challenge_id uuid references public.challenges(id) on delete cascade, profile_id uuid references public.profiles(id) on delete cascade, progress int not null default 0 check(progress between 0 and 100), joined_at timestamptz not null default now(), primary key(challenge_id, profile_id));
create table if not exists public.rooms (id uuid primary key default gen_random_uuid(), name text not null, description text not null default '', host_id uuid references public.profiles(id) on delete cascade, starts_at timestamptz, created_at timestamptz not null default now());
create table if not exists public.room_members (room_id uuid references public.rooms(id) on delete cascade, profile_id uuid references public.profiles(id) on delete cascade, joined_at timestamptz not null default now(), primary key(room_id, profile_id));

create index if not exists profile_skills_skill_direction_idx on public.profile_skills(skill_id, direction);
create index if not exists requests_sender_status_idx on public.swap_requests(sender_id, status);
create index if not exists requests_receiver_status_idx on public.swap_requests(receiver_id, status);
create index if not exists messages_conversation_created_idx on public.messages(conversation_id, created_at desc);
create index if not exists notifications_profile_unread_idx on public.notifications(profile_id, read_at, created_at desc);
create index if not exists reports_status_idx on public.reports(status, created_at desc);

create or replace function public.set_updated_at() returns trigger language plpgsql as $$ begin new.updated_at = now(); return new; end; $$;
create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path = public as $$ begin insert into public.profiles(id, full_name) values(new.id, coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1))) on conflict (id) do nothing; return new; end; $$;
create or replace function public.log_request_event() returns trigger language plpgsql security definer set search_path = public as $$ begin if tg_op = 'INSERT' or old.status is distinct from new.status then insert into public.request_events(request_id, actor_id, from_status, to_status) values(new.id, auth.uid(), case when tg_op = 'INSERT' then null else old.status end, new.status); end if; return new; end; $$;
create trigger profiles_updated_at before update on public.profiles for each row execute function public.set_updated_at();
create trigger requests_updated_at before update on public.swap_requests for each row execute function public.set_updated_at();
create trigger auth_user_profile after insert on auth.users for each row execute function public.handle_new_user();
create trigger request_history after insert or update on public.swap_requests for each row execute function public.log_request_event();

alter table public.skills enable row level security;
alter table public.profiles enable row level security;
alter table public.profile_skills enable row level security;
alter table public.swap_requests enable row level security;
alter table public.request_events enable row level security;
alter table public.conversations enable row level security;
alter table public.conversation_members enable row level security;
alter table public.messages enable row level security;
alter table public.reviews enable row level security;
alter table public.notifications enable row level security;
alter table public.saved_profiles enable row level security;
alter table public.blocks enable row level security;
alter table public.reports enable row level security;
alter table public.challenges enable row level security;
alter table public.challenge_members enable row level security;
alter table public.rooms enable row level security;
alter table public.room_members enable row level security;

create policy skills_read on public.skills for select using (true);
create policy profiles_read on public.profiles for select using (true);
create policy profiles_insert_own on public.profiles for insert with check (auth.uid() = id);
create policy profiles_update_own on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);
create policy profile_skills_read on public.profile_skills for select using (true);
create policy profile_skills_manage on public.profile_skills for all using (auth.uid() = profile_id) with check (auth.uid() = profile_id);
create policy request_read_participant on public.swap_requests for select using (auth.uid() in (sender_id, receiver_id));
create policy request_insert_sender on public.swap_requests for insert with check (auth.uid() = sender_id);
create policy request_update_participant on public.swap_requests for update using (auth.uid() in (sender_id, receiver_id));
create policy request_events_participant on public.request_events for select using (exists(select 1 from public.swap_requests r where r.id = request_id and auth.uid() in (r.sender_id, r.receiver_id)));
create policy conversations_member on public.conversations for select using (exists(select 1 from public.conversation_members m where m.conversation_id = id and m.profile_id = auth.uid()));
create policy conversation_members_self on public.conversation_members for select using (profile_id = auth.uid());
create policy messages_member_read on public.messages for select using (exists(select 1 from public.conversation_members m where m.conversation_id = messages.conversation_id and m.profile_id = auth.uid()));
create policy messages_member_insert on public.messages for insert with check (sender_id = auth.uid() and exists(select 1 from public.conversation_members m where m.conversation_id = messages.conversation_id and m.profile_id = auth.uid()));
create policy reviews_completed on public.reviews for select using (true);
create policy reviews_insert_completed on public.reviews for insert with check (reviewer_id = auth.uid() and exists(select 1 from public.swap_requests r where r.id = request_id and r.status = 'completed' and auth.uid() in (r.sender_id, r.receiver_id)));
create policy notifications_self on public.notifications for select using (profile_id = auth.uid());
create policy notifications_read_self on public.notifications for update using (profile_id = auth.uid()) with check (profile_id = auth.uid());
create policy saved_profiles_self on public.saved_profiles for all using (profile_id = auth.uid()) with check (profile_id = auth.uid());
create policy blocks_self on public.blocks for all using (blocker_id = auth.uid()) with check (blocker_id = auth.uid());
create policy reports_self on public.reports for insert with check (reporter_id = auth.uid());
create policy challenges_read on public.challenges for select using (status = 'active' or exists(select 1 from public.profiles where id = auth.uid() and is_admin));
create policy challenge_members_self on public.challenge_members for all using (profile_id = auth.uid()) with check (profile_id = auth.uid());
create policy rooms_read on public.rooms for select using (true);
create policy room_members_self on public.room_members for all using (profile_id = auth.uid()) with check (profile_id = auth.uid());

insert into public.skills(name, category) values ('React', 'Technology'), ('Figma', 'Creative'), ('Python', 'Technology'), ('English', 'Languages'), ('Photography', 'Creative'), ('Tamil', 'Languages'), ('Public speaking', 'Business'), ('Next.js', 'Technology') on conflict (name) do nothing;
insert into storage.buckets(id, name, public) values ('avatars', 'avatars', true), ('message-attachments', 'message-attachments', false) on conflict (id) do nothing;
create policy avatars_public_read on storage.objects for select using (bucket_id = 'avatars');
create policy avatars_owner_upload on storage.objects for insert with check (bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]);
create policy avatars_owner_update on storage.objects for update using (bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]);
create policy message_attachments_member_read on storage.objects for select using (bucket_id = 'message-attachments' and auth.uid()::text = (storage.foldername(name))[1]);
create policy message_attachments_owner_upload on storage.objects for insert with check (bucket_id = 'message-attachments' and auth.uid()::text = (storage.foldername(name))[1]);
