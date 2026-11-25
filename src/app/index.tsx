import { Pressable, Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 bg-bg px-5 pt-16">
      <Text className="text-muted text-sm">Среда, 25 ноября</Text>
      <Text className="text-ink text-2xl font-extrabold">Привет, Тимофей</Text>
      <View className="bg-primary rounded-3xl p-5 mt-6">
        <Text className="text-white text-xl font-extrabold">Базы данных</Text>
        <Text className="text-white/70">11:40–13:00 · ауд. 304</Text>
        <Pressable className="bg-accent rounded-2xl py-3 items-center mt-4">
          <Text className="font-bold text-ink">Отметиться</Text>
        </Pressable>
      </View>
    </View>
  );
}
