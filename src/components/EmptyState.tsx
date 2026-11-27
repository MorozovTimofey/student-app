import { Text, View } from "react-native";

type EmptyStateProps = {
  title: string;
  text?: string;
};

export function EmptyState({ title, text }: EmptyStateProps) {
  return (
    <View className="items-center py-16 gap-2">
      <Text className="text-ink text-lg font-bold">{title}</Text>
      {text ? <Text className="text-muted text-center">{text}</Text> : null}
    </View>
  );
}
