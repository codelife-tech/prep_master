import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { AuthProvider, useAuth } from '../context/auth';
import { ThemeProvider, useTheme } from '../context/theme';
import SplashScreen from '../components/SplashScreen';

function RootLayoutNav() {
  const { session, loading: authLoading } = useAuth();
  const { colors, isDark } = useTheme();
  const segments = useSegments();
  const router = useRouter();
  const [splashComplete, setSplashComplete] = useState(false);

  useEffect(() => {
    if (authLoading || !splashComplete) return;

    const inAuthGroup = segments[0] === 'auth';

    if (!session && !inAuthGroup) {
      router.replace('/auth/login');
    } else if (session && inAuthGroup) {
      router.replace('/');
    }
  }, [session, authLoading, segments, splashComplete]);

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      {!splashComplete && (
        <SplashScreen onAnimationComplete={() => setSplashComplete(true)} />
      )}
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerTitleStyle: { fontWeight: '700' },
          contentStyle: { backgroundColor: colors.background },
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
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RootLayoutNav />
      </AuthProvider>
    </ThemeProvider>
  );
}
