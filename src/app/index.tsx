import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

type Course = { id: number; title: string };
type Lesson = {
  id: number;
  course_id: number;
  starts_at: string;
  ends_at: string;
  lesson_type: string;
  format: "offline" | "online";
  room: string | null;
  meet_url: string | null;
};

function formatTime(isoString: string) {
  const date = new Date(isoString);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

export default function Index() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);

  useEffect(() => {
    supabase
      .from("courses")
      .select("id, title")
      .then(({ data, error }) => {
        if (error) console.log("Ошибка:", error.message);
        else setCourses(data);
      });
  }, []);

  useEffect(() => {
    supabase
      .from("lessons")
      .select(
        "id, course_id, starts_at, ends_at, lesson_type, format, room, meet_url",
      )
      .then(({ data, error }) => {
        if (error) console.log("Ошибка:", error.message);
        else setLessons(data);
      });
  }, []);

  return (
    <View className="flex-1 bg-bg px-5 pt-16 gap-3">
      {lessons.map((lesson) => (
        <View key={lesson.id} className="bg-white rounded-2xl p-4">
          <Text className="text-ink text-lg font-extrabold">
            {courses.find((c) => c.id === lesson.course_id)?.title}
          </Text>

          <Text className="text-ink font-bold">
            {formatTime(lesson.starts_at)}-{formatTime(lesson.ends_at)}
          </Text>
          <Text className="text-muted">
            {lesson.lesson_type} ·{" "}
            {lesson.format === "online" ? "Онлайн" : lesson.room}
          </Text>
        </View>
      ))}
    </View>
  );
}
