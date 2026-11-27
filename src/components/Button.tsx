import { ActivityIndicator, Pressable, Text } from "react-native";

type Variant = "primary" | "accent" | "secondary" | "danger";

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: Variant;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
};

const boxStyles: Record<Variant, string> = {
  primary: "bg-primary",
  accent: "bg-accent",
  secondary: "bg-white border border-line",
  danger: "bg-red-50",
};

const textStyles: Record<Variant, string> = {
  primary: "text-white",
  accent: "text-ink",
  secondary: "text-ink",
  danger: "text-red-600",
};

export function Button({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false,
  className = "",
}: ButtonProps) {
  const inactive = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={inactive}
      className={`rounded-2xl py-4 items-center ${boxStyles[variant]} ${inactive ? "opacity-60" : ""} ${className}`}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "primary" ? "#FFFFFF" : "#15132B"}
        />
      ) : (
        <Text className={`font-bold text-base ${textStyles[variant]}`}>
          {title}
        </Text>
      )}
    </Pressable>
  );
}
