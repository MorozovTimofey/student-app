-- Пользователи: студенты и преподаватели
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role text not null check (role in ('student', 'teacher')),
  group_name text
);

-- Дисциплины
create table courses (
  id bigint generated always as identity primary key,
  title text not null,
  teacher_id uuid references profiles(id)
);

-- Какие студенты записаны на какую дисциплину
create table course_members (
  course_id bigint not null references courses(id) on delete cascade,
  student_id uuid not null references profiles(id) on delete cascade,
  primary key (course_id, student_id)
);

-- Пары
create table lessons (
  id bigint generated always as identity primary key,
  course_id bigint not null references courses(id) on delete cascade,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  lesson_type text not null,
  format text not null check (format in ('offline', 'online')),
  room text,
  meet_url text
);

-- Включаем защиту строк на всех таблицах
alter table profiles enable row level security;
alter table courses enable row level security;
alter table course_members enable row level security;
alter table lessons enable row level security;

-- ВРЕМЕННО: читать дисциплины и пары может любой. Ужесточим, когда сделаем вход.
grant select on courses, lessons to anon, authenticated;
create policy "temp read courses" on courses for select to anon, authenticated using (true);
create policy "temp read lessons" on lessons for select to anon, authenticated using (true);