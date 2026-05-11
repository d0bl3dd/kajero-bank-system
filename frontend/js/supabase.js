const SUPABASE_URL = 'https://uwvbygpnqvamhqqickqz.supabase.co';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3dmJ5Z3BucXZhbWhxcWlja3F6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0NTMxNDYsImV4cCI6MjA5NDAyOTE0Nn0.BlyXE3A_YPCLgJIMIFYOrEkkCnzQDHYhIiNxAdLj27o';

export const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);