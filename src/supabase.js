import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://tiwuhxljzjknkvplrxrg.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpd3VoeGxqemprbmt2cGxyeHJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgzOTQ3MTksImV4cCI6MjA4Mzk3MDcxOX0.HrNFt9TEvtwQZs1kVtTX4iyfV9rFKS2s-EtRJgfnSEE'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
})
