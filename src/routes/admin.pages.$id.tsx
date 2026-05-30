import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ArrowLeft, Loader2 } from "lucide-react";
import { adminGetPage, adminUpsertPage, type Page } from "@/lib/pages.functions";

export const Route = createFileRoute("/admin/pages/$id")({
  component: EditPageRoute,
});

const EMPTY: Partial<Page> = {
  slug: "",
  title: "",
  content: "",
  meta_description: "",
  hero_image: "",
  published: true,
};

function EditPageRoute() {
  const { id } = Route.useParams();
  const isNew = id === "new";
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [form, setForm] = useState<Partial<Page>>(EMPTY);

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "page", id],
    queryFn: () => adminGetPage({ data: { id } }),
    enabled: !isNew,
  });

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  const save = useMutation({
    mutationFn: (payload: Partial<Page>) =>
      adminUpsertPage({
        data: {
          ...(isNew ? {} : { id }),
          slug: payload.slug!,
          title: payload.title!,
          content: payload.content ?? "",
          meta_description: payload.meta_description || null,
          hero_image: payload.hero_image || null,
          published: !!payload.published,
        },
      }),
    onSuccess: () => {
      toast.success("Saved");
      qc.invalidateQueries({ queryKey: ["admin", "pages"] });
      qc.invalidateQueries({ queryKey: ["page"] });
      navigate({ to: "/admin/pages" });
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Failed"),
  });

  if (!isNew && isLoading) return <Loader2 className="w-6 h-6 animate-spin text-charcoal/40" />;

  return (
    <div className="max-w-3xl">
      <Link to="/admin/pages" className="inline-flex items-center gap-2 text-sm text-charcoal/60 hover:text-magenta mb-6">
        <ArrowLeft className="w-4 h-4" /> All pages
      </Link>
      <h1 className="font-heading text-4xl font-bold mb-2">{isNew ? "New page" : "Edit page"}</h1>
      {data?.is_system && (
        <p className="text-xs text-charcoal/50 mb-6">
          This is a system page (used by built-in routes). Slug should remain stable.
        </p>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          save.mutate(form);
        }}
        className="space-y-5 bg-white p-8 rounded-3xl ring-1 ring-charcoal/10"
      >
        <Field label="Title">
          <input
            required
            value={form.title ?? ""}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className={inputCls}
          />
        </Field>
        <Field label="Slug">
          <input
            required
            pattern="[a-z0-9-]+"
            value={form.slug ?? ""}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            disabled={data?.is_system}
            className={inputCls}
          />
        </Field>
        <Field label="Meta description (SEO)">
          <textarea
            rows={2}
            value={form.meta_description ?? ""}
            onChange={(e) => setForm({ ...form, meta_description: e.target.value })}
            className={inputCls}
          />
        </Field>
        <Field label="Hero image URL">
          <input
            value={form.hero_image ?? ""}
            onChange={(e) => setForm({ ...form, hero_image: e.target.value })}
            className={inputCls}
          />
        </Field>
        <Field label="Content (Markdown)">
          <textarea
            rows={16}
            value={form.content ?? ""}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            className={`${inputCls} font-mono text-sm`}
          />
        </Field>
        <label className="flex items-center gap-3 text-sm">
          <input
            type="checkbox"
            checked={!!form.published}
            onChange={(e) => setForm({ ...form, published: e.target.checked })}
            className="w-4 h-4 accent-magenta"
          />
          Published
        </label>

        <div className="flex gap-3 pt-3 border-t border-charcoal/5">
          <button
            type="submit"
            disabled={save.isPending}
            className="bg-gradient-brand text-white px-6 py-3 rounded-full font-bold text-sm disabled:opacity-60 inline-flex items-center gap-2"
          >
            {save.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
            Save
          </button>
          <Link to="/admin/pages" className="px-6 py-3 rounded-full font-bold text-sm text-charcoal/70 hover:text-charcoal">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

const inputCls = "w-full px-4 py-2.5 rounded-xl border border-charcoal/15 focus:border-magenta focus:outline-none disabled:bg-zinc-100";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-bold uppercase tracking-wider text-charcoal/60 block mb-1.5">{label}</label>
      {children}
    </div>
  );
}
