import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Edit, Trash2, Loader2 } from "lucide-react";
import { adminListServices, adminDeleteService } from "@/lib/cms.functions";

export const Route = createFileRoute("/admin/services/")({
  component: ServicesList,
});

function ServicesList() {
  const qc = useQueryClient();
  const { data: services = [], isLoading } = useQuery({
    queryKey: ["admin", "services"],
    queryFn: () => adminListServices(),
  });

  const del = useMutation({
    mutationFn: (id: string) => adminDeleteService({ data: { id } }),
    onSuccess: () => {
      toast.success("Service deleted");
      qc.invalidateQueries({ queryKey: ["admin", "services"] });
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Failed"),
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-4xl font-bold">Services</h1>
          <p className="text-charcoal/60 mt-1">Manage the services shown on the site.</p>
        </div>
        <Link
          to="/admin/services/new"
          className="bg-gradient-brand text-white px-5 py-3 rounded-full text-sm font-bold flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> New service
        </Link>
      </div>

      {isLoading ? (
        <Loader2 className="w-6 h-6 animate-spin text-charcoal/40" />
      ) : services.length === 0 ? (
        <div className="bg-white p-10 rounded-3xl ring-1 ring-charcoal/10 text-center text-charcoal/50">
          No services defined in the database yet. The public site still shows the built-in
          services from code. Add them here to manage them via the admin.
        </div>
      ) : (
        <div className="bg-white rounded-3xl ring-1 ring-charcoal/10 divide-y divide-charcoal/5 overflow-hidden">
          {services.map((s) => (
            <div key={s.id} className="p-5 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="font-bold truncate">{s.name}</div>
                <div className="text-xs text-charcoal/50 mt-1 flex items-center gap-2">
                  <span>/{s.slug}</span>
                  <span>· order {s.sort_order}</span>
                  {!s.published && (
                    <span className="px-2 py-0.5 rounded-full bg-zinc-200 text-zinc-700 font-bold uppercase tracking-wider text-[10px]">
                      Hidden
                    </span>
                  )}
                </div>
              </div>
              <Link
                to="/admin/services/$id"
                params={{ id: s.id }}
                className="p-2 text-charcoal/50 hover:text-magenta"
              >
                <Edit className="w-4 h-4" />
              </Link>
              <button
                onClick={() => {
                  if (confirm(`Delete "${s.name}"?`)) del.mutate(s.id);
                }}
                className="p-2 text-charcoal/50 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
