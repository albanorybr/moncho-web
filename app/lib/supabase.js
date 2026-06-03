import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jxrxnrctkfiifpecqrgt.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_CcPjDQUuopvIV9lyRSdiug_H2uzMUXA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)