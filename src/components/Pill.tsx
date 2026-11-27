import { Text, View } from "react-native";

type Tone = "primary" | "accent" | "success" | "warning" | "danger" | "neutral";

type PillProps = {
  label: string;
  tone?: Tone;
};

const boxStyles: Record<Tone, string> = {
  primary: "bg-primary-soft",
  accent: "bg-accent",
  success: "bg-green-100",
  warning: "bg-orange-100",
  danger: "bg-red-100",
  neutral: "bg-bg",
};

const textStyles: Record<Tone, string> = {
  primary: "text-primary-dark",
  accent: "text-ink",
  success: "text-green-800",
  warning: "text-orange-800",
  danger: "text-red-700",
  neutral: "text-muted",
};

export function Pill({ label, tone = "neutral" }: PillProps) {
  return (
    <View className={`self-start rounded-full px-3 py-1 ${boxStyles[tone]}`}>
      <Text className={`text-xs font-bold ${textStyles[tone]}`}>{label}</Text>
    </View>
  );
}
