import { ThemeProvider } from '@/components/theme-context';
import '@/i18n';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style = {{flex: 1}}>
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
    </GestureHandlerRootView>
    
  );
}