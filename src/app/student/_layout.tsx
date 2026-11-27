import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function StudentLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#4B3BF0",
        tabBarInactiveTintColor: "#5E5B72",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Главная",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color as string} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          title: "Расписание",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="calendar-outline"
              color={color as string}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="assignments"
        options={{
          title: "Задания",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="clipboard-outline"
              color={color as string}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="grades"
        options={{
          title: "Оценки",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="bar-chart-outline"
              color={color as string}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Профиль",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="person-outline"
              color={color as string}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}
