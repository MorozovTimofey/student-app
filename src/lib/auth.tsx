import { Session } from "@supabase/supabase-js";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "./supabase";

export type Profile = {
  id: string;
  full_name: string;
  role: "student" | "teacher";
  group_name: string | null;
};

type AuthState = {
  session: Session | null | undefined;
  profile: Profile | null;
  loading: boolean;
};

const AuthContext = createContext<AuthState>({
  session: undefined,
  profile: null,
  loading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  // undefined — ещё не знаем, null — не вошёл, Session — вошёл
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [profile, setProfile] = useState<Profile | null>(null);

  // 1. Следим за входом и выходом
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  // 2. Когда пользователь сменился — загружаем его профиль
  useEffect(() => {
    setProfile(null);
    if (!session) return;
    supabase
      .from("profiles")
      .select("id, full_name, role, group_name")
      .eq("id", session.user.id)
      .single()
      .then(({ data, error }) => {
        if (error) console.log("Профиль:", error.message);
        else setProfile(data);
      });
  }, [session?.user.id]);

  const loading =
    session === undefined || (session !== null && profile === null);

  return (
    <AuthContext.Provider value={{ session, profile, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
