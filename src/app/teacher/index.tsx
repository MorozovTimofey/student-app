import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { Pill } from "@/components/Pill";
import { Screen } from "@/components/Screen";
import { useAuth } from "@/lib/auth";
import { formatTime } from "@/lib/format";
import { supabase } from "@/lib/supabase";
import { Course, Lesson } from "@/types";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function TeacherHome() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);

  const { profile } = useAuth();
  const firstName = profile?.full_name.split(" ")[1] ?? "";

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
    <Screen>
      <Text className="text-ink text-2xl font-extrabold">
        Здравствуйте, {firstName}
      </Text>

      {lessons.length === 0 ? (
        <EmptyState
          title="Пар пока нет"
          text="Когда вы получите расписание, пары будут здесь"
        />
      ) : (
        lessons.map((lesson) => {
          const isOnline = lesson.format === "online";
          const courseTitle = courses.find(
            (c) => c.id === lesson.course_id,
          )?.title;

          return (
            <Card key={lesson.id} className="gap-1">
              <Text className="text-ink text-lg font-extrabold">
                {courseTitle}
              </Text>
              <Text className="text-ink font-bold">
                {formatTime(lesson.starts_at)}–{formatTime(lesson.ends_at)}
              </Text>
              <View className="flex-row items-center gap-2">
                <Pill
                  label={isOnline ? "Онлайн" : "Офлайн"}
                  tone={isOnline ? "accent" : "primary"}
                />
                <Text className="text-muted">
                  {lesson.lesson_type}
                  {lesson.room ? ` · ${lesson.room}` : ""}
                </Text>
              </View>
            </Card>
          );
        })
      )}
    </Screen>
  );
}
