import { createClient, SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null | undefined;

// The publishable key is safe to ship (RLS is the security boundary; anon can
// only insert, and read solely via the get_shared_story RPC). Env vars
// override these defaults, e.g. to point at a different project.
const DEFAULT_URL = "https://uuwylnbshmrsczdcpcne.supabase.co";
const DEFAULT_KEY = "sb_publishable_1gBZ-Og2kNdt-InvI9IBjw_Nh0TFLn-";

/**
 * Server-side Supabase client (anon key, RLS-protected). Returns null when
 * unconfigured so every feature that needs it can degrade gracefully.
 * Only ever import this from route handlers / server components.
 */
export function getSupabase(): SupabaseClient | null {
  if (client !== undefined) return client;
  const url = process.env.SUPABASE_URL ?? DEFAULT_URL;
  const key = process.env.SUPABASE_ANON_KEY ?? DEFAULT_KEY;
  client =
    url && key
      ? createClient(url, key, {
          auth: { persistSession: false, autoRefreshToken: false },
        })
      : null;
  return client;
}
