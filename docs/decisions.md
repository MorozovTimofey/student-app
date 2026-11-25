## Expo + NativeWind

- Что сделал: создал проект Expo с TypeScript и Expo Router, подключил NativeWind, сверстал главный экран студента.
- Где в коде: tailwind.config.js, babel.config.js, metro.config.js, global.css, src/app/index.tsx
- Почему так: один код для iOS и Android; Tailwind-классы быстрее, чем StyleSheet, и цвета хранятся в одном месте.
- Что было сложно: найти, куда создавать файлы настройки; в шаблоне экраны лежат в src/app.
- Чему научился: как классы превращаются в стили React Native; flex-1 растягивает блок.

## Supabase как база данных и сервер

- **Что сделал:** создал проект Supabase, таблицы profiles, courses, course_members, lessons, тестовые данные; подключил приложение к базе и вывел пары на экран.
- **Где в коде:** supabase/schema.sql, supabase/seed.sql, src/lib/supabase.ts, src/app/index.tsx, .env
- **Почему так:** Supabase даёт PostgreSQL, вход и хранилище файлов без своего сервера — для одного разработчика это реально сделать за 2 недели. Схема хранится в schema.sql, чтобы структура базы была в репозитории.
- **Связи:** lessons.course_id → courses.id (один ко многим); course_members связывает студентов и дисциплины (многие ко многим).
- **Безопасность:** RLS включена на всех таблицах. Временное правило — чтение пар и дисциплин для всех; после входа ограничу доступ по роли и записи на курс. Publishable key публичный, безопасность держится на RLS; secret key в приложении не используется.

### Проблемы и решения

1. **`Cannot find native module 'ExpoSQLite'` в Expo Go** → заменил expo-sqlite на AsyncStorage для хранения сессии: он работает в Expo Go без отдельной сборки.
2. **`window is not defined` в веб-версии** → веб собирался на сервере (Node.js), где нет window; переключил `web.output` в app.json на `"single"`, теперь веб собирается в браузере.
3. **`supabaseKey is required`** → имя переменной в .env не совпадало с кодом; переименовал в EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY.
4. **Ошибка тёмной темы NativeWind в вебе** → добавил `darkMode: "class"` в tailwind.config.js.

### Чему научился

- Время из базы приходит строкой в UTC; форматирую его своей функцией formatTime, вынесенной из компонента.
- Связь таблиц позволяет найти название дисциплины по course_id.
