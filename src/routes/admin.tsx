import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
  useNavigate,
  useRouterState,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { FileText, Layout, Sparkles, LogOut, ShieldCheck, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { signOut } from "@/lib/admin-client";
import { isCurrentUserAdmin, claimAdminIfNone } from "@/lib/cms.functions";

export const Route = createFileRoute("/admin")({
  beforeLoad: async ({ location }) => {
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      throw redirect({ to: "/login", search: { redirect: location.href } });
    }
  },
  head: () => ({
    meta: [
      { title: "Admin — Inter-Cleaning Services" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminLayout,
});

const NAV = [
  { to: "/admin", label: "Dashboard", Icon: Sparkles, exact: true },
  { to: "/admin/blogs", label: "Blog posts", Icon: FileText },
  { to: "/admin/pages", label: "Pages", Icon: Layout },
  { to: "/admin/services", label: "Services", Icon: ShieldCheck },
] as const;

function AdminLayout() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [claiming, setClaiming] = useState(false);

  const { data: roleInfo, isLoading, refetch } = useQuery({
    queryKey: ["isAdmin"],
    queryFn: () => isCurrentUserAdmin(),
    retry: false,
  });

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) navigate({ to: "/login", replace: true });
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const onClaim = async () => {
    setClaiming(true);
    try {
      const res = await claimAdminIfNone();
      if (res.claimed) {
        toast.success("You are now the admin.");
        await refetch();
      } else {
        toast.error(res.reason ?? "Could not claim admin");
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
    } finally {
      setClaiming(false);
    }
  };

  const onSignOut = async () => {
    await signOut();
    navigate({ to: "/login", replace: true });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen grid place-items-center text-charcoal/50">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  if (!roleInfo?.isAdmin) {
    return (
      <div className="min-h-screen grid place-items-center bg-zinc-50 px-6">
        <div className="bg-white rounded-3xl p-10 max-w-md text-center ring-1 ring-charcoal/10">
          <ShieldCheck className="w-10 h-10 text-magenta mx-auto mb-4" />
          <h1 className="font-heading text-2xl font-bold mb-3">Admin access required</h1>
          <p className="text-sm text-charcoal/60 mb-6">
            Your account is authenticated but doesn't have the admin role yet. If no admin
            exists, you can claim it now (first user wins).
          </p>
          <button
            onClick={onClaim}
            disabled={claiming}
            className="bg-gradient-brand text-white px-6 py-3 rounded-full font-bold text-sm disabled:opacity-60 inline-flex items-center gap-2"
          >
            {claiming && <Loader2 className="w-4 h-4 animate-spin" />}
            Claim admin role
          </button>
          <button onClick={onSignOut} className="block mx-auto mt-6 text-xs text-charcoal/50 hover:text-charcoal">
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-zinc-50">
      <aside className="w-64 bg-charcoal text-white p-6 flex flex-col">
        <Link to="/" className="font-heading font-bold text-lg mb-10">
          Inter-Cleaning <span className="text-magenta">/ Admin</span>
        </Link>
        <nav className="flex flex-col gap-1 flex-1">
          {NAV.map(({ to, label, Icon, exact }) => {
            const active = exact ? pathname === to : pathname.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  active ? "bg-magenta text-white" : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            );
          })}
        </nav>
        <button
          onClick={onSignOut}
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white"
        >
          <LogOut className="w-4 h-4" /> Sign out
        </button>
      </aside>
      <main className="flex-1 p-10 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
