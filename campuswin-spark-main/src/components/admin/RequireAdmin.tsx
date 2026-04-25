import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

export const RequireAdmin = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<"loading" | "ok" | "nope">("loading");

  useEffect(() => {
    let active = true;

    const check = async (userId: string | null) => {
      if (!userId) { if (active) setState("nope"); return; }
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId);
      if (!active) return;
      setState(data?.some((r) => r.role === "admin") ? "ok" : "nope");
    };

    const sub = supabase.auth.onAuthStateChange((_e, session) => {
      check(session?.user?.id ?? null);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      check(session?.user?.id ?? null);
    });

    return () => { active = false; sub.data.subscription.unsubscribe(); };
  }, []);

  if (state === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-7 w-7 animate-spin text-accent" />
      </div>
    );
  }
  if (state === "nope") return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
};
