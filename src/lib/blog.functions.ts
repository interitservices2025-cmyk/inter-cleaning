import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  published: boolean;
  author_name: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

// ---------- PUBLIC ----------
export const listPublishedPosts = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as BlogPost[];
});

export const latestPublishedPosts = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false })
    .limit(3);
  if (error) throw new Error(error.message);
  return (data ?? []) as BlogPost[];
});

export const getPostBySlug = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) => z.object({ slug: z.string().min(1).max(200) }).parse(d))
  .handler(async ({ data }) => {
    const { data: post, error } = await supabaseAdmin
      .from("blog_posts")
      .select("*")
      .eq("slug", data.slug)
      .eq("published", true)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return post as BlogPost | null;
  });

// ---------- ADMIN ----------
export const adminListPosts = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []) as BlogPost[];
  });

export const adminGetPost = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const { data: post, error } = await context.supabase
      .from("blog_posts")
      .select("*")
      .eq("id", data.id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return post as BlogPost | null;
  });

const postInput = z.object({
  id: z.string().uuid().optional(),
  slug: z.string().min(1).max(160).regex(/^[a-z0-9-]+$/, "lowercase letters, numbers, dashes"),
  title: z.string().min(1).max(200),
  excerpt: z.string().max(500).nullable().optional(),
  content: z.string().max(50000),
  cover_image: z.string().max(2000).nullable().optional(),
  published: z.boolean(),
  author_name: z.string().max(120).nullable().optional(),
});

export const adminUpsertPost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => postInput.parse(d))
  .handler(async ({ data, context }) => {
    const payload = {
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt ?? null,
      content: data.content,
      cover_image: data.cover_image ?? null,
      published: data.published,
      author_name: data.author_name ?? null,
      published_at:
        data.published && !data.id ? new Date().toISOString() : undefined,
    };
    if (data.id) {
      const { data: updated, error } = await context.supabase
        .from("blog_posts")
        .update(payload)
        .eq("id", data.id)
        .select()
        .single();
      if (error) throw new Error(error.message);
      return updated as BlogPost;
    }
    const { data: inserted, error } = await context.supabase
      .from("blog_posts")
      .insert(payload)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return inserted as BlogPost;
  });

export const adminDeletePost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("blog_posts").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
