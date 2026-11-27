export type Course = {
  id: number;
  title: string;
};

export type Lesson = {
  id: number;
  course_id: number;
  starts_at: string;
  ends_at: string;
  lesson_type: string;
  format: "offline" | "online";
  room: string | null;
  meet_url: string | null;
};

export type Profile = {
  id: string;
  full_name: string;
  role: "student" | "teacher";
  group_name: string | null;
};
