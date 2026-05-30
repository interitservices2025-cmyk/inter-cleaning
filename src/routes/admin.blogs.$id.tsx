import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ArrowLeft, Loader2, Upload } from "lucide-react";
import { adminGetPost, adminUpsertPost, type BlogPost } from "@/lib/blog.functions";
import { uploadCmsMedia } from "@/lib/admin-client";

export const Route = createFileRoute("/admin/blogs/$id")({
  component: EditPost,
});

const EMPTY: Partial<BlogPost> = {
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  cover_image: "",
  published: false,
  author_name: "",
};

function EditPost() {
  const { id } = Route.useParams();
  const isNew = id === "new";
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [form, setForm] = useState<Partial<BlogPost>>(EMPTY);
  const [uploading, setUploading] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "post", id],
    queryFn: () => adminGetPost({ data: { id } }),
    enabled: !isNew,
  });

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  const save = useMutation({
    mutationFn: (payload: Partial<BlogPost>) =>
      adminUpsertPost({
        data: {
          ...(isNew ? {} : { id }),
          slug: payload.slug!,
          title: payload.title!,
          excerpt: payload.excerpt || null,
          content: payload.content ?? "",
          cover_image: payload.cover_image || null,
          published: !!payload.published,
          author_name: payload.author_name || null,
        },
      }),
    onSuccess: () => {
      toast.success("Saved");
      qc.invalidateQueries({ queryKey: ["admin", "posts"] });
      qc.invalidateQueries({ queryKey: ["blog"] });
      navigate({ to: "/admin/blogs" });
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Failed"),
  });

  const onUpload = async (file: File) => {
    setUploading(true);
    try {
      const url = await uploadCmsMedia(file);
      setForm((f) => ({ ...f, cover_image: url }));
      toast.success("Image uploaded");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  if (!isNew && isLoading) {
    return <Loader2 className="w-6 h-6 animate-spin text-charcoal/40" />;
  }

  return (
    <div className="max-w-3xl">
      <Link to="/admin/blogs" className="inline-flex items-center gap-2 text-sm text-charcoal/60 hover:text-magenta mb-6">
        <ArrowLeft className="w-4 h-4" /> All posts
      </Link>
      <h1 className="font-heading text-4xl font-bold mb-8">{isNew ? "New post" : "Edit post"}</h1>

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
        <Field label="Slug (URL)">
          <input
            required
            pattern="[a-z0-9-]+"
            value={form.slug ?? ""}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            placeholder="my-first-post"
            className={inputCls}
          />
        </Field>
        <Field label="Excerpt">
          <textarea
            rows={2}
            value={form.excerpt ?? ""}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            className={inputCls}
          />
        </Field>
        <Field label="Cover image">
          <div className="flex items-center gap-3">
            <input
              value={form.cover_image ?? ""}
              onChange={(e) => setForm({ ...form, cover_image: e.target.value })}
              placeholder="https://… or upload below"
              className={inputCls}
            />
          </div>
          <label className="mt-2 inline-flex items-center gap-2 text-xs text-charcoal/60 cursor-pointer hover:text-magenta">
            <Upload className="w-3.5 h-3.5" />
            {uploading ? "Uploading…" : "Upload from your device"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && onUpload(e.target.files[0])}
            />
          </label>
          {form.cover_image && (
            <img src={form.cover_image} alt="" className="mt-3 w-48 aspect-video object-cover rounded-xl" />
          )}
        </Field>
        <Field label="Content (Markdown)">
          <textarea
            rows={14}
            value={form.content ?? ""}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            className={`${inputCls} font-mono text-sm`}
          />
        </Field>
        <Field label="Author">
          <input
            value={form.author_name ?? ""}
            onChange={(e) => setForm({ ...form, author_name: e.target.value })}
            className={inputCls}
          />
        </Field>
        <label className="flex items-center gap-3 text-sm">
          <input
            type="checkbox"
            checked={!!form.published}
            onChange={(e) => setForm({ ...form, published: e.target.checked })}
            className="w-4 h-4 accent-magenta"
          />
          Published (visible on the public site)
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
          <Link to="/admin/blogs" className="px-6 py-3 rounded-full font-bold text-sm text-charcoal/70 hover:text-charcoal">
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
