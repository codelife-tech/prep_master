-- Create a table for Public Profiles (if it doesn't already exist)
create table if not exists profiles (
  id uuid references auth.users not null primary key,
  updated_at timestamp with time zone,
  full_name text,
  avatar_url text,

  constraint name_length check (char_length(full_name) >= 3)
);

-- Set up Row Level Security (RLS)
alter table profiles
  enable row level security;

-- Drop existing policies if they exist to avoid conflict
do $$
begin
    drop policy if exists "Profiles are viewable by owners." on profiles;
    drop policy if exists "Users can insert their own profile." on profiles;
    drop policy if exists "Users can update own profile." on profiles;
exception
    when others then null;
end $$;

create policy "Profiles are viewable by owners." on profiles
  for select using (auth.uid() = id);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- Setup User Progress table (example of private data)
create table if not exists user_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  exam_type text not null,
  subject_id text not null,
  score int,
  completed_at timestamp with time zone default now()
);

alter table user_progress enable row level security;

-- Drop existing policies if they exist
do $$
begin
    drop policy if exists "Users can see only their own progress." on user_progress;
    drop policy if exists "Users can insert their own progress." on user_progress;
exception
    when others then null;
end $$;

create policy "Users can see only their own progress." on user_progress
  for select using (auth.uid() = user_id);

create policy "Users can insert their own progress." on user_progress
  for insert with check (auth.uid() = user_id);

-- Trigger to automatically create a profile entry when a new user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url')
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

-- Re-create the trigger
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
