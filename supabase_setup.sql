-- ============================================================
-- PrepMaster GH — Supabase Database Schema
-- Run this in the Supabase SQL Editor
-- ============================================================

-- 1. PROFILES TABLE
create table if not exists profiles (
  id uuid references auth.users not null primary key,
  updated_at timestamp with time zone,
  full_name text,
  avatar_url text,
  is_admin boolean default false
);

alter table profiles enable row level security;

drop policy if exists "Profiles are viewable by owners." on profiles;
drop policy if exists "Users can insert their own profile." on profiles;
drop policy if exists "Users can update own profile." on profiles;

create policy "Profiles are viewable by owners." on profiles
  for select using (auth.uid() = id);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- 2. EXAMS TABLE
create table if not exists exams (
  id uuid default gen_random_uuid() primary key,
  type text unique not null,
  description text not null,
  created_at timestamp with time zone default now()
);

alter table exams enable row level security;

drop policy if exists "Exams are viewable by everyone." on exams;
drop policy if exists "Admins can insert exams." on exams;
drop policy if exists "Admins can update exams." on exams;
drop policy if exists "Admins can delete exams." on exams;

create policy "Exams are viewable by everyone." on exams
  for select using (true);

create policy "Admins can insert exams." on exams
  for insert with check (
    exists (select 1 from profiles where id = auth.uid() and is_admin = true)
  );

create policy "Admins can update exams." on exams
  for update using (
    exists (select 1 from profiles where id = auth.uid() and is_admin = true)
  );

create policy "Admins can delete exams." on exams
  for delete using (
    exists (select 1 from profiles where id = auth.uid() and is_admin = true)
  );

-- 3. SUBJECTS TABLE
create table if not exists subjects (
  id uuid default gen_random_uuid() primary key,
  exam_id uuid references exams(id) on delete cascade not null,
  slug text not null,
  name text not null,
  icon text not null default '📚',
  created_at timestamp with time zone default now(),
  unique(exam_id, slug)
);

alter table subjects enable row level security;

drop policy if exists "Subjects are viewable by everyone." on subjects;
drop policy if exists "Admins can insert subjects." on subjects;
drop policy if exists "Admins can update subjects." on subjects;
drop policy if exists "Admins can delete subjects." on subjects;

create policy "Subjects are viewable by everyone." on subjects
  for select using (true);

create policy "Admins can insert subjects." on subjects
  for insert with check (
    exists (select 1 from profiles where id = auth.uid() and is_admin = true)
  );

create policy "Admins can update subjects." on subjects
  for update using (
    exists (select 1 from profiles where id = auth.uid() and is_admin = true)
  );

create policy "Admins can delete subjects." on subjects
  for delete using (
    exists (select 1 from profiles where id = auth.uid() and is_admin = true)
  );

-- 4. QUESTIONS TABLE
create table if not exists questions (
  id uuid default gen_random_uuid() primary key,
  subject_id uuid references subjects(id) on delete cascade not null,
  year integer not null,
  slug text not null,
  question text not null,
  options jsonb not null,
  correct_answer integer not null,
  explanation text not null default '',
  created_at timestamp with time zone default now(),
  unique(subject_id, slug)
);

alter table questions enable row level security;

drop policy if exists "Questions are viewable by everyone." on questions;
drop policy if exists "Admins can insert questions." on questions;
drop policy if exists "Admins can update questions." on questions;
drop policy if exists "Admins can delete questions." on questions;

create policy "Questions are viewable by everyone." on questions
  for select using (true);

create policy "Admins can insert questions." on questions
  for insert with check (
    exists (select 1 from profiles where id = auth.uid() and is_admin = true)
  );

create policy "Admins can update questions." on questions
  for update using (
    exists (select 1 from profiles where id = auth.uid() and is_admin = true)
  );

create policy "Admins can delete questions." on questions
  for delete using (
    exists (select 1 from profiles where id = auth.uid() and is_admin = true)
  );

-- 5. USER PROGRESS TABLE
drop table if exists user_progress;
create table user_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  exam_type text not null,
  subject_id text not null,
  year integer not null default 0,
  score integer not null default 0,
  total_questions integer not null default 0,
  correct_answers integer not null default 0,
  completed_at timestamp with time zone default now()
);

alter table user_progress enable row level security;

drop policy if exists "Users can see only their own progress." on user_progress;
drop policy if exists "Users can insert their own progress." on user_progress;

create policy "Users can see only their own progress." on user_progress
  for select using (auth.uid() = user_id);

create policy "Users can insert their own progress." on user_progress
  for insert with check (auth.uid() = user_id);

-- 6. BOOKMARKS TABLE
create table if not exists bookmarks (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  question_id uuid references questions(id) on delete cascade not null,
  created_at timestamp with time zone default now(),
  unique(user_id, question_id)
);

alter table bookmarks enable row level security;

drop policy if exists "Users can see own bookmarks." on bookmarks;
drop policy if exists "Users can insert own bookmarks." on bookmarks;
drop policy if exists "Users can delete own bookmarks." on bookmarks;

create policy "Users can see own bookmarks." on bookmarks
  for select using (auth.uid() = user_id);

create policy "Users can insert own bookmarks." on bookmarks
  for insert with check (auth.uid() = user_id);

create policy "Users can delete own bookmarks." on bookmarks
  for delete using (auth.uid() = user_id);

-- 7. TRIGGER: Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url, is_admin)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url', false)
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 8. INDEXES for performance
create index if not exists idx_subjects_exam_id on subjects(exam_id);
create index if not exists idx_questions_subject_id on questions(subject_id);
create index if not exists idx_questions_year on questions(year);
create index if not exists idx_user_progress_user_id on user_progress(user_id);
create index if not exists idx_bookmarks_user_id on bookmarks(user_id);
