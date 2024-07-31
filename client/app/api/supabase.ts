import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  'https://fxzhhfyirbljyzfowyvd.supabase.co/',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4emhoZnlpcmJsanl6Zm93eXZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIzOTQ1NDQsImV4cCI6MjAzNzk3MDU0NH0.s1r7af8I_-hNhVRp3vWWdxs9La1O54jQiHaORYLECsQ'
)