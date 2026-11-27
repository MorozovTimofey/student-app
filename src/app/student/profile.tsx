import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Screen } from "@/components/Screen";
import { signOut, useAuth } from "@/lib/auth";
import { Text, View } from "react-native";

// "Морозов Тимофей" → "МТ"
function getInitials(fullName: string) {
  return fullName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function StudentProfile() {
  const { profile, session } = useAuth();

  const fullName = profile?.full_name ?? "";
  const roleName = profile?.role === "teacher" ? "Преподаватель" : "Студент";
  const groupName = profile?.group_name;

  return (
    <Screen>
      {/* Шапка: аватар, имя, роль и группа */}
      <View className="items-center gap-2 mb-2">
        <View className="w-20 h-20 rounded-full bg-accent items-center justify-center">
          <Text className="text-ink text-2xl font-extrabold">
            {getInitials(fullName)}
          </Text>
        </View>
        <Text className="text-ink text-2xl font-extrabold text-center">
          {fullName}
        </Text>
        <Text className="text-muted text-center">
          {roleName}
          {groupName ? ` · ${groupName}` : ""}
        </Text>
      </View>

      {/* Данные пользователя */}
      <Card className="py-1">
        <View className="flex-row justify-between py-3">
          <Text className="text-muted">Почта</Text>
          <Text
            className="text-ink font-semibold flex-1 text-right ml-4"
            numberOfLines={1}
          >
            {session?.user.email}
          </Text>
        </View>

        <View className="flex-row justify-between py-3 border-t border-line">
          <Text className="text-muted">Роль</Text>
          <Text className="text-ink font-semibold">{roleName}</Text>
        </View>

        {groupName ? (
          <View className="flex-row justify-between py-3 border-t border-line">
            <Text className="text-muted">Группа</Text>
            <Text className="text-ink font-semibold">{groupName}</Text>
          </View>
        ) : null}
      </Card>

      <Button
        title="Выйти"
        onPress={signOut}
        variant="danger"
        className="mt-4"
      />
    </Screen>
  );
}
