import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { FileText, Layout, ShieldCheck, ArrowRight } from "lucide-react";
import { adminListPosts } from "@/lib/blog.functions";
import { adminListPages } from "@/lib/pages.functions";
import { adminListServices } from "@/lib/cms.functions";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const posts = useQuery({ queryKey: ["admin", "posts"], queryFn: () => adminListPosts() });
  const pages = useQuery({ queryKey: ["admin", "pages"], queryFn: () => adminListPages() });
  const services = useQuery({ queryKey: ["admin", "services"], queryFn: () => adminListServices() });

  const cards = [
    { to: "/admin/blogs", label: "Blog posts", count: posts.data?.length ?? 0, Icon: FileText },
    { to: "/admin/pages", label: "Pages", count: pages.data?.length ?? 0, Icon: Layout },
    { to: "/admin/services", label: "Services", count: services.data?.length ?? 0, Icon: ShieldCheck },
  ] as const;

  return (
    <div>
      <h1 className="font-heading text-4xl font-bold mb-2">Welcome back</h1>
      <p className="text-charcoal/60 mb-10">Manage your content, pages and services.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {cards.map((c) => (
          <Link
            key={c.to}
            to={c.to}
            className="group bg-white p-7 rounded-3xl ring-1 ring-charcoal/10 hover:ring-magenta/40 hover:-translate-y-0.5 transition-all"
          >
            <div className="flex items-center justify-between mb-5">
              <span className="w-12 h-12 rounded-2xl bg-magenta/10 text-magenta grid place-items-center">
                <c.Icon className="w-5 h-5" />
              </span>
              <ArrowRight className="w-4 h-4 text-charcoal/40 group-hover:text-magenta group-hover:translate-x-1 transition-all" />
            </div>
            <div className="font-heading text-4xl font-bold">{c.count}</div>
            <div className="text-sm text-charcoal/60 mt-1">{c.label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
