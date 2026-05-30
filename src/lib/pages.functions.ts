import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export type Page = {
  id: string;
  slug: string;
  title: string;
  content: string;
  meta_description: string | null;
  hero_image: string | null;
  is_system: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export const getPageBySlug = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) => z.object({ slug: z.string().min(1).max(160) }).parse(d))
  .handler(async ({ data }) => {
    const { data: page, error } = await supabaseAdmin
      .from("pages")
      .select("*")
      .eq("slug", data.slug)
      .eq("published", true)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return page as Page | null;
  });

export const adminListPages = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("pages")
      .select("*")
      .order("is_system", { ascending: false })
      .order("title");
    if (error) throw new Error(error.message);
    return (data ?? []) as Page[];
  });

export const adminGetPage = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const { data: page, error } = await context.supabase
      .from("pages")
      .select("*")
      .eq("id", data.id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return page as Page | null;
  });

const pageInput = z.object({
  id: z.string().uuid().optional(),
  slug: z.string().min(1).max(160).regex(/^[a-z0-9-]+$/),
  title: z.string().min(1).max(200),
  content: z.string().max(50000),
  meta_description: z.string().max(300).nullable().optional(),
  hero_image: z.string().max(2000).nullable().optional(),
  published: z.boolean(),
});

export const adminUpsertPage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => pageInput.parse(d))
  .handler(async ({ data, context }) => {
    const payload = {
      slug: data.slug,
      title: data.title,
      content: data.content,
      meta_description: data.meta_description ?? null,
      hero_image: data.hero_image ?? null,
      published: data.published,
    };
    if (data.id) {
      const { data: updated, error } = await context.supabase
        .from("pages")
        .update(payload)
        .eq("id", data.id)
        .select()
        .single();
      if (error) throw new Error(error.message);
      return updated as Page;
    }
    const { data: inserted, error } = await context.supabase
      .from("pages")
      .insert(payload)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return inserted as Page;
  });

export const adminDeletePage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("pages").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
