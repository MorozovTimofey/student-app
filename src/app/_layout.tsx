import { AuthProvider, useAuth } from "@/lib/auth";
import { Stack } from "expo-router";
import "../../global.css";

function RootNavigator() {
  const { session, profile } = useAuth();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!session}>
        <Stack.Screen name="login" />
      </Stack.Protected>

      <Stack.Protected guard={profile?.role === "student"}>
        <Stack.Screen name="student" />
      </Stack.Protected>

      <Stack.Protected guard={profile?.role === "teacher"}>
        <Stack.Screen name="teacher" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
