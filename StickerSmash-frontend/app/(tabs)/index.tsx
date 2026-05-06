import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';
import { useCallback, useState } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

import { useTheme } from '@/components/theme-context';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

type BMIData = {
  value: string;
  category: string;
};

export default function HomeScreen() {
  const { colors } = useTheme();

  const [bmiData, setBmiData] = useState<BMIData | null>(null);

  // useEffect(() => {
  //   const loadBMI = async () => {
  //     const data = await AsyncStorage.getItem('bmi');
  //     if (data) setBmiData(JSON.parse(data));
  //   };
  //   loadBMI();
  // }, []);

  useFocusEffect(
    useCallback(() => {
      const loadBMI = async () => {
        const data = await AsyncStorage.getItem('bmi');
        if (data) setBmiData(JSON.parse(data));
      };
      loadBMI();
    }, [])
  );

// ... keep EVERYTHING same above

  return (
    <ScrollView style={{ backgroundColor: colors.background }}>

      <ThemedView style={[
        styles.container,
        { backgroundColor: colors.background }
      ]}>

        {/* HERO IMAGE */}
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438' }}
          style={styles.heroImage}
        />

        {/* HEADER */}
        <ThemedView style={[styles.textContainer, {backgroundColor: colors.background}]}>
          <ThemedText type="title" style={{ color: colors.text }}>
            💪 Fitness Dashboard
          </ThemedText>

          <ThemedText style={{ color: colors.text, opacity: 0.7 }}>
            Track your progress and stay consistent every day.
          </ThemedText>
        </ThemedView>

        {/* QUICK STATS */}
        <ThemedView style={[styles.statsContainer, {backgroundColor: colors.background}]}>

          <ThemedView style={[
            styles.statBox,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              // borderWidth: 1,
              elevation: 2,
            }
          ]}>
            <ThemedText type="subtitle" style={{ color: colors.text }}>
              {bmiData?.value ?? '--'}
            </ThemedText>

            <ThemedText style={{ color: colors.text, opacity: 0.7 }}>
              BMI
            </ThemedText>

            {bmiData?.category && (
              <ThemedText style={{
                fontSize: 11,
                color: colors.text,
                opacity: 0.6
              }}>
                {bmiData.category}
              </ThemedText>
            )}
          </ThemedView>

          <ThemedView style={[
            styles.statBox,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              // borderWidth: 1,
              elevation: 2,
            }
          ]}>
            <ThemedText type="subtitle" style={{ color: colors.text }}>
              1800
            </ThemedText>

            <ThemedText style={{ color: colors.text, opacity: 0.7 }}>
              Calories
            </ThemedText>
          </ThemedView>

          <ThemedView style={[
            styles.statBox,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              // borderWidth: 1,
              elevation: 2,
            }
          ]}>
            <ThemedText type="subtitle" style={{ color: colors.text }}>
              5
            </ThemedText>

            <ThemedText style={{ color: colors.text, opacity: 0.7 }}>
              Day Streak
            </ThemedText>
          </ThemedView>

        </ThemedView>

        {/* FEATURE CARDS */}
        <TouchableOpacity
          style={[
            styles.card,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              // borderWidth: 1,
              elevation: 2,
            }
          ]}
          onPress={() => router.push('/bmi')}
        >
          <ThemedText type="defaultSemiBold" style={{ color: colors.text }}>
            📊 BMI Calculator
          </ThemedText>

          <ThemedText style={{ color: colors.text, opacity: 0.7 }}>
            Check your body index instantly
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.card,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              // borderWidth: 1,
              elevation: 2,
            }
          ]}
          onPress={() => router.push('/calorie')}
        >
          <ThemedText type="defaultSemiBold" style={{ color: colors.text }}>
            🔥 Calorie Tracker
          </ThemedText>

          <ThemedText style={{ color: colors.text, opacity: 0.7 }}>
            Track daily nutrition easily
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.card,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              elevation: 2,
            }
          ]}
          onPress={() => router.push('/history')}
        >
          <ThemedText type = "defaultSemiBold" style = {{color: colors.text}}>
            📅 View History
          </ThemedText>

          <ThemedText style={{color: colors.text, opacity: 0.7}}>
            See your past BMI records
          </ThemedText>

        </TouchableOpacity>

      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  heroImage: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    marginBottom: 20,
  },

  textContainer: {
    marginBottom: 20,
    gap: 5,
  },

  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  statBox: {
    flex: 1,
    marginHorizontal: 5,
    padding: 15,
    borderRadius: 16,
    alignItems: 'center',
  },

  card: {
    padding: 15,
    borderRadius: 16,
    marginBottom: 15,
  },
});