import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://fgjjwffkbebpibvrklra.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZnamp3ZmZrYmVicGlidnJrbHJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkyMTU4NDQsImV4cCI6MjAyNDc5MTg0NH0.kWzzRqi9pkOeauWNalFNI_yZu4f4MHz66Gbo-KKooZo';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
