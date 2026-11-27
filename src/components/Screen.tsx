import { ReactNode } from "react";
import { ScrollView } from "react-native";

type ScreenProps = {
  children: ReactNode;
};

export function Screen({ children }: ScreenProps) {
  return (
    <ScrollView
      className="flex-1 bg-bg"
      contentContainerClassName="px-5 pt-16 pb-10 gap-4"
    >
      {children}
    </ScrollView>
  );
}
