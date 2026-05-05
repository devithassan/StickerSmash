import { useTheme } from '@/components/theme-context';
import { Feather } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  const { dark, colors } = useTheme(); // ✅ CHANGED

  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        // ✅ CHANGED (no hardcoding)
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: 'gray',

        tabBarStyle: {
          backgroundColor: colors.background, // ✅ CHANGED
          borderTopWidth: 0,
          height: 60,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Feather name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}