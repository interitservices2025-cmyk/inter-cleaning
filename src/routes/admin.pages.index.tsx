import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Edit, Trash2, Loader2, Lock } from "lucide-react";
import { adminListPages, adminDeletePage } from "@/lib/pages.functions";

export const Route = createFileRoute("/admin/pages/")({
  component: PagesList,
});

function PagesList() {
  const qc = useQueryClient();
  const { data: pages = [], isLoading } = useQuery({
    queryKey: ["admin", "pages"],
    queryFn: () => adminListPages(),
  });

  const del = useMutation({
    mutationFn: (id: string) => adminDeletePage({ data: { id } }),
    onSuccess: () => {
      toast.success("Page deleted");
      qc.invalidateQueries({ queryKey: ["admin", "pages"] });
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Failed"),
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-4xl font-bold">Pages</h1>
          <p className="text-charcoal/60 mt-1">Edit system pages or create custom ones.</p>
        </div>
        <Link
          to="/admin/pages/new"
          className="bg-gradient-brand text-white px-5 py-3 rounded-full text-sm font-bold flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> New page
        </Link>
      </div>

      {isLoading ? (
        <Loader2 className="w-6 h-6 animate-spin text-charcoal/40" />
      ) : pages.length === 0 ? (
        <div className="bg-white p-10 rounded-3xl ring-1 ring-charcoal/10 text-center text-charcoal/50">
          No pages yet.
        </div>
      ) : (
        <div className="bg-white rounded-3xl ring-1 ring-charcoal/10 divide-y divide-charcoal/5 overflow-hidden">
          {pages.map((p) => (
            <div key={p.id} className="p-5 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="font-bold truncate flex items-center gap-2">
                  {p.title}
                  {p.is_system && <Lock className="w-3 h-3 text-charcoal/40" aria-label="System page" />}
                </div>
                <div className="text-xs text-charcoal/50 mt-1">/{p.slug}</div>
              </div>
              <Link
                to="/admin/pages/$id"
                params={{ id: p.id }}
                className="p-2 text-charcoal/50 hover:text-magenta"
              >
                <Edit className="w-4 h-4" />
              </Link>
              {!p.is_system && (
                <button
                  onClick={() => {
                    if (confirm(`Delete "${p.title}"?`)) del.mutate(p.id);
                  }}
                  className="p-2 text-charcoal/50 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
