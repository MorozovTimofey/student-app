import { ReactNode } from "react";
import { View } from "react-native";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return (
    <View className={`bg-white rounded-2xl p-4 ${className}`}>{children}</View>
  );
}
