import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Edit, Trash2, ExternalLink, Loader2 } from "lucide-react";
import { adminListPosts, adminDeletePost } from "@/lib/blog.functions";

export const Route = createFileRoute("/admin/blogs/")({
  component: BlogsList,
});

function BlogsList() {
  const qc = useQueryClient();
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["admin", "posts"],
    queryFn: () => adminListPosts(),
  });

  const del = useMutation({
    mutationFn: (id: string) => adminDeletePost({ data: { id } }),
    onSuccess: () => {
      toast.success("Post deleted");
      qc.invalidateQueries({ queryKey: ["admin", "posts"] });
      qc.invalidateQueries({ queryKey: ["blog"] });
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Failed"),
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-4xl font-bold">Blog posts</h1>
          <p className="text-charcoal/60 mt-1">Create, edit and publish articles.</p>
        </div>
        <Link
          to="/admin/blogs/new"
          className="bg-gradient-brand text-white px-5 py-3 rounded-full text-sm font-bold flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> New post
        </Link>
      </div>

      {isLoading ? (
        <Loader2 className="w-6 h-6 animate-spin text-charcoal/40" />
      ) : posts.length === 0 ? (
        <div className="bg-white p-10 rounded-3xl ring-1 ring-charcoal/10 text-center text-charcoal/50">
          No posts yet — create your first one.
        </div>
      ) : (
        <div className="bg-white rounded-3xl ring-1 ring-charcoal/10 divide-y divide-charcoal/5 overflow-hidden">
          {posts.map((p) => (
            <div key={p.id} className="p-5 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="font-bold truncate">{p.title}</div>
                <div className="text-xs text-charcoal/50 mt-1 flex items-center gap-2">
                  <span>/{p.slug}</span>
                  {p.published ? (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold uppercase tracking-wider text-[10px]">
                      Published
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-zinc-200 text-zinc-700 font-bold uppercase tracking-wider text-[10px]">
                      Draft
                    </span>
                  )}
                </div>
              </div>
              {p.published && (
                <Link
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="p-2 text-charcoal/50 hover:text-magenta"
                  aria-label="View"
                >
                  <ExternalLink className="w-4 h-4" />
                </Link>
              )}
              <Link
                to="/admin/blogs/$id"
                params={{ id: p.id }}
                className="p-2 text-charcoal/50 hover:text-magenta"
                aria-label="Edit"
              >
                <Edit className="w-4 h-4" />
              </Link>
              <button
                onClick={() => {
                  if (confirm(`Delete "${p.title}"?`)) del.mutate(p.id);
                }}
                className="p-2 text-charcoal/50 hover:text-red-600"
                aria-label="Delete"
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
