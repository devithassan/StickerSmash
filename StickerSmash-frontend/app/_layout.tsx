import { ThemeProvider } from '@/components/theme-context';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* ✅ App entry (tabs) */}
        <Stack.Screen name="(tabs)" />

        {/* ✅ Other screens */}
        <Stack.Screen name="bmi" />
        <Stack.Screen name="camera" />
        <Stack.Screen name="calories" />
      </Stack>
    </ThemeProvider>
  );
}