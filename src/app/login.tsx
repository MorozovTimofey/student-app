import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleLogin() {
    setError("");
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    if (error) setError("Неверная почта или пароль");
    setBusy(false);
  }

  return (
    <View className="flex-1 bg-bg px-5 justify-center gap-3">
      <Text className="text-ink text-3xl font-extrabold">Вход</Text>
      <Text className="text-muted mb-4">Корпоративная почта университета</Text>

      <View className="gap-1">
        <Text className="text-muted text-sm">Почта</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="почта@turan-edu.kz"
          autoCapitalize="none"
          keyboardType="email-address"
          placeholderTextColor="#8C899E"
          className="bg-white rounded-2xl px-4 py-4 border border-line text-ink"
        />
      </View>

      <View className="gap-1">
        <Text className="text-muted text-sm">Пароль</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="пароль"
          autoCapitalize="none"
          secureTextEntry
          placeholderTextColor="#8C899E"
          className="bg-white rounded-2xl px-4 py-4 border border-line text-ink"
        />
      </View>

      {error ? <Text className="text-red-600 text-sm">{error}</Text> : null}

      <Pressable
        onPress={handleLogin}
        disabled={busy}
        className={`bg-primary rounded-2xl py-4 items-center mt-2 ${busy ? "opacity-60" : ""}`}
      >
        <Text className="text-white font-bold text-base">
          {busy ? "Входим…" : "Войти"}
        </Text>
      </Pressable>
    </View>
  );
}
