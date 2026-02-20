import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { AuthProvider, useAuth } from '../context/auth';

function RootLayoutNav() {
  const { session, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === 'auth';

    if (!session && !inAuthGroup) {
      // Redirect to login if not authenticated and not in auth group
      router.replace('/auth/login');
    } else if (session && inAuthGroup) {
      // Redirect to home if authenticated and trying to access auth group
      router.replace('/');
    }
  }, [session, loading, segments]);

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#0F1923' },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: { fontWeight: '700' },
        contentStyle: { backgroundColor: '#0F1923' },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="auth/login" options={{ headerShown: false }} />
      <Stack.Screen name="auth/signup" options={{ headerShown: false }} />
      <Stack.Screen name="subjects" options={{ title: 'Subjects' }} />
      <Stack.Screen name="years" options={{ title: 'Select Year' }} />
      <Stack.Screen name="questions" options={{ title: 'Past Questions' }} />
      <Stack.Screen name="quiz" options={{ title: 'Quiz Mode', headerBackVisible: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar style="light" />
      <RootLayoutNav />
    </AuthProvider>
  );
}
