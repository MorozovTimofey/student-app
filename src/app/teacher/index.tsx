import { signOut, useAuth } from "@/lib/auth";
import { formatTime } from "@/lib/format";
import { supabase } from "@/lib/supabase";
import { Course, Lesson } from "@/types";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function TeacherHome() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);

  const { profile } = useAuth();

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
      .order("starts_at")
      .then(({ data, error }) => {
        if (error) console.log("Ошибка:", error.message);
        else setLessons(data);
      });
  }, []);

  return (
    <ScrollView
      className="flex-1 bg-bg "
      contentContainerClassName="px-5 pt-16 gap-3"
    >
      <Text className="text-ink text-2xl font-extrabold">
        Привет, {profile?.full_name.split(" ")[1]}
      </Text>
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
      <Pressable
        onPress={signOut}
        className="bg-red-50 rounded-2xl py-4 items-center mt-2"
      >
        <Text className="text-red-600 font-bold text-base">Выйти</Text>
      </Pressable>
    </ScrollView>
  );
}
