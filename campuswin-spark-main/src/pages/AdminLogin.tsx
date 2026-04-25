import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, Lock, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If already logged in & admin, send to dashboard
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) return;
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id);
      if (roles?.some((r) => r.role === "admin")) navigate("/admin", { replace: true });
    });
  }, [navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      const userId = data.user?.id;
      if (!userId) throw new Error("Login failed");

      const { data: roles, error: rolesErr } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId);
      if (rolesErr) throw rolesErr;
      if (!roles?.some((r) => r.role === "admin")) {
        await supabase.auth.signOut();
        throw new Error("This account does not have admin access.");
      }

      toast({ title: "Welcome back", description: "Loading your dashboard…" });
      navigate("/admin", { replace: true });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Login failed";
      toast({ title: "Sign in failed", description: msg, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-hero relative">
      <div className="absolute inset-0 bg-radial-gold opacity-60" aria-hidden />
      <div className="container relative flex min-h-screen items-center justify-center py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 flex flex-col items-center text-center text-primary-foreground">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gold shadow-gold">
              <GraduationCap className="h-6 w-6 text-accent-foreground" />
            </div>
            <h1 className="font-display text-3xl font-bold">CampusWin Admin</h1>
            <p className="mt-1 text-sm text-primary-foreground/70">Scholarship management dashboard</p>
          </div>

          <form
            onSubmit={onSubmit}
            className="space-y-5 rounded-2xl border border-accent/20 bg-card p-7 shadow-elegant"
          >
            <div className="flex items-center gap-2 border-b border-border pb-4">
              <Lock className="h-4 w-4 text-accent" />
              <span className="text-sm font-semibold text-primary">Sign in to your dashboard</span>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@campuswin.com.ng" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <Button type="submit" disabled={loading} className="w-full bg-gold font-semibold text-accent-foreground shadow-gold hover:opacity-95">
              {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in…</> : "Sign In"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
