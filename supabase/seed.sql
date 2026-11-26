insert into courses (title) values
  ('Базы данных'),
  ('Мобильная разработка'),
  ('Веб-технологии');

insert into lessons (course_id, starts_at, ends_at, lesson_type, format, room, meet_url) values
  (1, '2026-11-30 08:30+05', '2026-11-30 09:50+05', 'Лекция',   'offline', 'ауд. 210', null),
  (1, '2026-12-02 11:40+05', '2026-12-02 13:00+05', 'Практика', 'offline', 'ауд. 304', null),
  (2, '2026-11-30 10:00+05', '2026-11-30 11:20+05', 'Лекция',   'online',  null, 'https://meet.google.com/abc-defg-hij'),
  (2, '2026-12-03 14:00+05', '2026-12-03 15:20+05', 'Практика', 'offline', 'ауд. 115', null),
  (3, '2026-12-01 08:30+05', '2026-12-01 09:50+05', 'Лекция',   'online',  null, 'https://meet.google.com/xyz-abcd-efg'),
  (3, '2026-12-04 11:40+05', '2026-12-04 13:00+05', 'Практика', 'offline', 'ауд. 304', null);

-- Имена и роли
update profiles set full_name = 'Нуртаева Айгерим', role = 'teacher'
  where id = (select id from auth.users where email = 'teacher@test.kz');
update profiles set full_name = 'Морозов Тимофей', group_name = 'ИС242(3)'
  where id = (select id from auth.users where email = 'student1@test.kz');
update profiles set full_name = 'Касымова Алия', group_name = 'ИС242(3)'
  where id = (select id from auth.users where email = 'student2@test.kz');

-- Преподаватель ведёт все три дисциплины
update courses set teacher_id = (select id from auth.users where email = 'teacher@test.kz');

-- Студент 1 записан на все три дисциплины, студент 2 — только на первые две
insert into course_members (course_id, student_id)
  select c.id, u.id from courses c, auth.users u
  where u.email = 'student1@test.kz';
insert into course_members (course_id, student_id)
  select c.id, u.id from courses c, auth.users u
  where u.email = 'student2@test.kz' and c.id in (1, 2);