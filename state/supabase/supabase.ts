import { createBrowserClient } from "@supabase/ssr";
const supabaseUrl = "https://ustowvbylqottnlzxouw.supabase.co" as string;
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzdG93dmJ5bHFvdHRubHp4b3V3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY4ODg0ODAsImV4cCI6MjAzMjQ2NDQ4MH0.8frIdjCjrZjoXLmdZ_6LaNVdx1OXJJSN2O63qz9Vw60" as string;

export const supabase = createBrowserClient(supabaseUrl, supabaseKey);
