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