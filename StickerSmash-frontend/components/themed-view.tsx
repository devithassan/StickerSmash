import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, type TextProps, type ViewProps } from 'react-native';

//
// ✅ THEME DEFINITIONS
//
const LightTheme = {
  background: '#ffffff',
  card: '#f1f5f9',
  text: '#0f172a',
  border: '#cbd5e1',
  primary: '#38bdf8',
};

const DarkTheme = {
  background: '#0f172a',
  card: '#1e293b',
  text: '#ffffff',
  border: '#334155',
  primary: '#38bdf8',
};

type ThemeType = typeof LightTheme;

//
// ✅ CONTEXT
//
const ThemeContext = createContext<{
  dark: boolean;
  colors: ThemeType;
  toggleTheme: () => void;
}>({
  dark: false,
  colors: DarkTheme,
  toggleTheme: () => {},
});

//
// ✅ PROVIDER
//
export const ThemeProvider = ({ children }: any) => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    const saved = await AsyncStorage.getItem('theme');
    if (saved !== null) {
      setDark(saved === 'dark');
    }
  };

  const toggleTheme = async () => {
    const newTheme = !dark;
    setDark(newTheme);
    await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const colors = dark ? DarkTheme : LightTheme;

  return (
    <ThemeContext.Provider value={{ dark, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

//
// ✅ HOOK
//
export const useTheme = () => useContext(ThemeContext);

//
// ✅ THEMED VIEW (UNCHANGED LOGIC, CLEAN STYLE)
//
export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  ...props
}: ThemedViewProps) {
  const { dark, colors } = useTheme();

  const backgroundColor = dark
    ? darkColor ?? colors.background
    : lightColor ?? colors.background;

  return <View style={[{ backgroundColor }, style]} {...props} />;
}

//
// ✅ THEMED TEXT (FIXED SYMMETRY + CONTRAST SAFE)
//
export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const { dark, colors } = useTheme();

  // ✅ CLEAN + SAFE COLOR RESOLUTION
  const color =
    lightColor || darkColor
      ? dark
        ? darkColor ?? colors.text
        : lightColor ?? colors.text
      : colors.text;

  return (
    <Text
      style={[
        { color },

        type === 'default' && styles.default,
        type === 'title' && styles.title,
        type === 'defaultSemiBold' && styles.defaultSemiBold,
        type === 'subtitle' && styles.subtitle,

        // ✅ FIX: link now adapts to theme
        type === 'link' && {
          ...styles.link,
          color: colors.primary,
        },

        style,
      ]}
      {...rest}
    />
  );
}

//
// ✅ STYLES
//
const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    fontSize: 16,
    lineHeight: 30,
    // ✅ removed hardcoded color (now theme-driven)
  },
});