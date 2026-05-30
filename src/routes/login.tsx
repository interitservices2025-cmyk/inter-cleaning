import { createFileRoute, Link, useNavigate, redirect } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { signInWithEmail, signUpWithEmail } from "@/lib/admin-client";

export const Route = createFileRoute("/login")({
  validateSearch: z.object({ redirect: z.string().optional() }),
  beforeLoad: async ({ search }) => {
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      throw redirect({ to: (search.redirect as "/admin") ?? "/admin" });
    }
  },
  head: () => ({
    meta: [{ title: "Admin login — Inter-Cleaning Services" }, { name: "robots", content: "noindex" }],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const search = Route.useSearch();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) navigate({ to: (search.redirect as "/admin") ?? "/admin", replace: true });
    });
    return () => subscription.unsubscribe();
  }, [navigate, search.redirect]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signin") {
        await signInWithEmail(email, password);
        toast.success("Signed in");
      } else {
        await signUpWithEmail(email, password);
        toast.success("Account created — check your email if confirmation is required.");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-br from-zinc-50 to-white px-6">
      <div className="w-full max-w-md bg-white rounded-3xl ring-1 ring-charcoal/10 p-10 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.2)]">
        <Link to="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-charcoal/50 hover:text-magenta">
          <Sparkles className="w-3 h-3" /> Back to site
        </Link>
        <h1 className="font-heading text-3xl font-bold mt-6 mb-2">
          {mode === "signin" ? "Admin sign in" : "Create admin account"}
        </h1>
        <p className="text-sm text-charcoal/60 mb-8">
          {mode === "signin" ? "Access the Inter-Cleaning back office." : "First account becomes the admin."}
        </p>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-charcoal/60">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-4 py-3 rounded-xl border border-charcoal/15 focus:border-magenta focus:outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-charcoal/60">Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-4 py-3 rounded-xl border border-charcoal/15 focus:border-magenta focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-brand text-white py-3 rounded-full font-bold text-sm tracking-wide disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>

        <button
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-6 text-sm text-charcoal/60 hover:text-magenta w-full text-center"
        >
          {mode === "signin" ? "No account yet? Create one" : "Already have an account? Sign in"}
        </button>
      </div>
    </div>
  );
}
