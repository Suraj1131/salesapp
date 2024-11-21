

import { createClient } from '@supabase/supabase-js';

console.log("Supabase client initialized");

const supabaseUrl = "https://lysazdxmzyizduhyuetz.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5c2F6ZHhtenlpemR1aHl1ZXR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIxMDI1MjMsImV4cCI6MjA0NzY3ODUyM30.YLNJvG4br3GoknVSl7-5ecyGoXLKS5br4RMTFCBGtN0";

const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
