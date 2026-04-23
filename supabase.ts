import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'tzzxvyjjuxpyretkeido';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6enh2eWpqdXhweXJldGtlaWRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5NTc1MDIsImV4cCI6MjA5MjUzMzUwMn0.GOHtfoeNNhBpjOje_mfX9Dcg3fYIpx2XmJxH46FRTAE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});