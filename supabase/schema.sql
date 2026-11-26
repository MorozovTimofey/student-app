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

-- Функция: создать профиль для нового пользователя
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (new.id, new.email, 'student');
  return new;
end;
$$;

-- Триггер: запускать функцию после добавления пользователя
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Убираем временные правила и доступ без входа
drop policy "temp read courses" on courses;
drop policy "temp read lessons" on lessons;
revoke select on courses, lessons from anon;

grant select on profiles, courses, course_members, lessons to authenticated;

-- Профиль: каждый видит только свой
create policy "read own profile" on profiles
  for select to authenticated
  using (id = auth.uid());

-- Запись на курс: студент видит только свои записи
create policy "read own memberships" on course_members
  for select to authenticated
  using (student_id = auth.uid());

-- Дисциплина: видит преподаватель, который её ведёт, или записанный студент
create policy "read my courses" on courses
  for select to authenticated
  using (
    teacher_id = auth.uid()
    or exists (
      select 1 from course_members m
      where m.course_id = courses.id and m.student_id = auth.uid()
    )
  );

-- Пара: видна, если видна её дисциплина
create policy "read lessons of my courses" on lessons
  for select to authenticated
  using (exists (select 1 from courses c where c.id = lessons.course_id));