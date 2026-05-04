import { ThemeContext } from '@/components/theme-context';
import { Feather } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useContext } from 'react';

export default function TabsLayout() {
  const { dark } = useContext(ThemeContext);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#38bdf8',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: dark ? '#0f172a' : '#ffffff',
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