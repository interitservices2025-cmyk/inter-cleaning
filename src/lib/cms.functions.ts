import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

// ----- Roles / admin bootstrap -----
export const isCurrentUserAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();
    if (error) throw new Error(error.message);
    return { isAdmin: !!data, userId: context.userId };
  });

// Bootstrap: the FIRST authenticated caller becomes admin if no admin exists yet.
export const claimAdminIfNone = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { count, error: countErr } = await supabaseAdmin
      .from("user_roles")
      .select("id", { count: "exact", head: true })
      .eq("role", "admin");
    if (countErr) throw new Error(countErr.message);
    if ((count ?? 0) > 0) return { claimed: false, reason: "Admin already exists" };
    const { error } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: context.userId, role: "admin" });
    if (error) throw new Error(error.message);
    return { claimed: true };
  });

// ----- Services -----
export type Service = {
  id: string;
  slug: string;
  name: string;
  short: string | null;
  description: string | null;
  bullets: string[];
  image: string | null;
  accent: string;
  sort_order: number;
  published: boolean;
};

export const listPublishedServices = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await supabaseAdmin
    .from("services")
    .select("*")
    .eq("published", true)
    .order("sort_order");
  if (error) throw new Error(error.message);
  return ((data ?? []) as unknown) as Service[];
});

export const adminListServices = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("services")
      .select("*")
      .order("sort_order");
    if (error) throw new Error(error.message);
    return ((data ?? []) as unknown) as Service[];
  });

export const adminGetService = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const { data: s, error } = await context.supabase
      .from("services")
      .select("*")
      .eq("id", data.id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return s as unknown as Service | null;
  });

const serviceInput = z.object({
  id: z.string().uuid().optional(),
  slug: z.string().min(1).max(160).regex(/^[a-z0-9-]+$/),
  name: z.string().min(1).max(200),
  short: z.string().max(300).nullable().optional(),
  description: z.string().max(5000).nullable().optional(),
  bullets: z.array(z.string().max(300)).max(20),
  image: z.string().max(2000).nullable().optional(),
  accent: z.enum(["magenta", "orange", "yellow"]),
  sort_order: z.number().int().min(0).max(999),
  published: z.boolean(),
});

export const adminUpsertService = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => serviceInput.parse(d))
  .handler(async ({ data, context }) => {
    const payload = {
      slug: data.slug,
      name: data.name,
      short: data.short ?? null,
      description: data.description ?? null,
      bullets: data.bullets,
      image: data.image ?? null,
      accent: data.accent,
      sort_order: data.sort_order,
      published: data.published,
    };
    if (data.id) {
      const { data: updated, error } = await context.supabase
        .from("services")
        .update(payload)
        .eq("id", data.id)
        .select()
        .single();
      if (error) throw new Error(error.message);
      return updated as unknown as Service;
    }
    const { data: inserted, error } = await context.supabase
      .from("services")
      .insert(payload)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return inserted as unknown as Service;
  });

export const adminDeleteService = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("services").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
