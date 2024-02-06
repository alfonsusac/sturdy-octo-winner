import { createClient } from "@supabase/supabase-js"
import { createSingleton } from "./singleton"
import { Database } from "../types/database.types"
import { env } from "../env"
import fetch2 from "node-fetch"

export const supabase = createSingleton('supabase',
  () => createClient<Database>(env('SUPABASE_URL'), env('SUPABASE_SERVICE_KEY'),
    {
      auth: { persistSession: false },
      global: { fetch: fetch2 as unknown as typeof fetch }
    },
  )
)
