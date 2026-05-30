import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ArrowLeft, Loader2 } from "lucide-react";
import { adminGetService, adminUpsertService, type Service } from "@/lib/cms.functions";

export const Route = createFileRoute("/admin/services/$id")({
  component: EditService,
});

const EMPTY: Partial<Service> = {
  slug: "",
  name: "",
  short: "",
  description: "",
  bullets: [],
  image: "",
  accent: "magenta",
  sort_order: 0,
  published: true,
};

function EditService() {
  const { id } = Route.useParams();
  const isNew = id === "new";
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [form, setForm] = useState<Partial<Service>>(EMPTY);
  const [bulletsText, setBulletsText] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "service", id],
    queryFn: () => adminGetService({ data: { id } }),
    enabled: !isNew,
  });

  useEffect(() => {
    if (data) {
      setForm(data);
      setBulletsText((data.bullets ?? []).join("\n"));
    }
  }, [data]);

  const save = useMutation({
    mutationFn: (payload: Partial<Service>) =>
      adminUpsertService({
        data: {
          ...(isNew ? {} : { id }),
          slug: payload.slug!,
          name: payload.name!,
          short: payload.short || null,
          description: payload.description || null,
          bullets: bulletsText.split("\n").map((s) => s.trim()).filter(Boolean),
          image: payload.image || null,
          accent: (payload.accent as "magenta" | "orange" | "yellow") ?? "magenta",
          sort_order: Number(payload.sort_order ?? 0),
          published: !!payload.published,
        },
      }),
    onSuccess: () => {
      toast.success("Saved");
      qc.invalidateQueries({ queryKey: ["admin", "services"] });
      qc.invalidateQueries({ queryKey: ["services"] });
      navigate({ to: "/admin/services" });
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Failed"),
  });

  if (!isNew && isLoading) return <Loader2 className="w-6 h-6 animate-spin text-charcoal/40" />;

  return (
    <div className="max-w-3xl">
      <Link to="/admin/services" className="inline-flex items-center gap-2 text-sm text-charcoal/60 hover:text-magenta mb-6">
        <ArrowLeft className="w-4 h-4" /> All services
      </Link>
      <h1 className="font-heading text-4xl font-bold mb-8">{isNew ? "New service" : "Edit service"}</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          save.mutate(form);
        }}
        className="space-y-5 bg-white p-8 rounded-3xl ring-1 ring-charcoal/10"
      >
        <Field label="Name">
          <input required value={form.name ?? ""} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} />
        </Field>
        <Field label="Slug">
          <input required pattern="[a-z0-9-]+" value={form.slug ?? ""} onChange={(e) => setForm({ ...form, slug: e.target.value })} className={inputCls} />
        </Field>
        <Field label="Short tagline">
          <input value={form.short ?? ""} onChange={(e) => setForm({ ...form, short: e.target.value })} className={inputCls} />
        </Field>
        <Field label="Description">
          <textarea rows={4} value={form.description ?? ""} onChange={(e) => setForm({ ...form, description: e.target.value })} className={inputCls} />
        </Field>
        <Field label="Bullets (one per line)">
          <textarea rows={6} value={bulletsText} onChange={(e) => setBulletsText(e.target.value)} className={inputCls} />
        </Field>
        <Field label="Image URL">
          <input value={form.image ?? ""} onChange={(e) => setForm({ ...form, image: e.target.value })} className={inputCls} />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Accent color">
            <select
              value={form.accent ?? "magenta"}
              onChange={(e) => setForm({ ...form, accent: e.target.value })}
              className={inputCls}
            >
              <option value="magenta">Magenta</option>
              <option value="orange">Orange</option>
              <option value="yellow">Yellow</option>
            </select>
          </Field>
          <Field label="Sort order">
            <input
              type="number"
              min={0}
              value={form.sort_order ?? 0}
              onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
              className={inputCls}
            />
          </Field>
        </div>
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
          <Link to="/admin/services" className="px-6 py-3 rounded-full font-bold text-sm text-charcoal/70 hover:text-charcoal">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

const inputCls = "w-full px-4 py-2.5 rounded-xl border border-charcoal/15 focus:border-magenta focus:outline-none";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-bold uppercase tracking-wider text-charcoal/60 block mb-1.5">{label}</label>
      {children}
    </div>
  );
}
