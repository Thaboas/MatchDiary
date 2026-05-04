import { router, Stack } from 'expo-router';
import { useEffect } from 'react';
import { supabase } from '../supabase';

export default function RootLayout() {
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.replace('/(tabs)' as any);
      } else {
        router.replace('/auth/login' as any);
      }
    });

    supabase.auth.onAuthStateChange((_event: any, session: any) => {
      if (session) {
        router.replace('/(tabs)' as any);
      } else {
        router.replace('/auth/login' as any);
      }
    });
  }, []);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="auth/login" options={{ headerShown: false }} />
      <Stack.Screen name="auth/signup" options={{ headerShown: false }} />
      <Stack.Screen name="auth/onboarding" options={{ headerShown: false }} />
    </Stack>
  );
}