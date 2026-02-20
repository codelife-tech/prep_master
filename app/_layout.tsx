import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
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
        <Stack.Screen name="subjects" options={{ title: 'Subjects' }} />
        <Stack.Screen name="years" options={{ title: 'Select Year' }} />
        <Stack.Screen name="questions" options={{ title: 'Past Questions' }} />
        <Stack.Screen name="quiz" options={{ title: 'Quiz Mode', headerBackVisible: false }} />
      </Stack>
    </>
  );
}
