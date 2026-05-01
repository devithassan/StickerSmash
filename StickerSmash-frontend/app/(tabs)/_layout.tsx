import { Tabs } from 'expo-router';
import React from 'react';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,

        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 5,
          borderTopWidth: 0,
          elevation: 5,
        },

        tabBarLabelStyle: {
          fontSize: 12,
        },

        tabBarHideOnKeyboard: true,
      }}
    >

      {/* 🏠 HOME */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={28}
              name="house.fill"
              color={focused ? color : '#999'}
            />
          ),
        }}
      />

      {/* ⚙️ SETTINGS */}
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={28}
              name="gearshape.fill"
              color={focused ? color : '#999'}
            />
          ),
        }}
      />

    </Tabs>
  );
}