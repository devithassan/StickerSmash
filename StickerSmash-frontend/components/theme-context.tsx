import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  type TextProps,
  type ViewProps,
} from 'react-native';

//
// ✅ THEMES
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
// ✅ CONTEXT TYPE
//
type ThemeContextType = {
  dark: boolean;
  colors: ThemeType;
  toggleTheme: () => void;
};

//
// ✅ CONTEXT
//
export const ThemeContext = createContext<ThemeContextType>({
  dark: false,
  colors: LightTheme,
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
// ✅ THEMED VIEW
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

  const backgroundColor =
    dark ? darkColor ?? colors.background : lightColor ?? colors.background;

  return <View style={[{ backgroundColor }, style]} {...props} />;
}

//
// ✅ THEMED TEXT (UPDATED SYNCED VERSION)
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

  // ✅ FIX: proper fallback chain (this was breaking readability)
  const color =
    lightColor || darkColor
      ? dark
        ? darkColor ?? lightColor ?? colors.text
        : lightColor ?? darkColor ?? colors.text
      : colors.text;

  return (
    <Text
      style={[
        { color },
        type === 'default' && styles.default,
        type === 'title' && styles.title,
        type === 'defaultSemiBold' && styles.defaultSemiBold,
        type === 'subtitle' && styles.subtitle,
        type === 'link' && styles.link,
        style,
      ]}
      {...rest}
    />
  );
}

//
// ✅ STYLES (UNCHANGED)
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
    color: '#0a7ea4',
  },
});