import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type BMIData = {
  value: string;
  category: string;
};
export default function HomeScreen() {
  const [bmiData, setBmiData] = useState<BMIData | null>(null);

  useEffect(() => {
    const loadBMI = async () => {
      try {
        const data = await AsyncStorage.getItem('bmi');

        if (data) {
          setBmiData(JSON.parse(data));
        }
      } catch (e) {
        console.log('BMI load error:', e);
      }
    };

    loadBMI();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const loadBMI = async () => {
        try {
          const data = await AsyncStorage.getItem('bmi');

          if (data) {
            setBmiData(JSON.parse(data));
          }
        } catch (e) {
          console.log('BMI load error:', e);
        }
      };

      loadBMI();
    }, [])
  );

  return (
    <ScrollView style={{ backgroundColor: '#0f172a' }}>
      <View style={styles.container}>

        {/* HERO IMAGE */}
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438' }}
          style={styles.heroImage}
        />

        {/* HEADER */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>💪 Fitness Dashboard</Text>
          <Text style={styles.subtitle}>
            Track your progress and stay consistent every day.
          </Text>
        </View>

        {/* QUICK STATS */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>
              {bmiData?.value ?? '--'}
            </Text>
            <Text style={styles.statLabel}>BMI</Text>

            {/* optional category */}
            {bmiData?.category && (
              <Text style={{ color: '#94a3b8', fontSize: 11 }}>
                {bmiData.category}
              </Text>
            )}
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statNumber}>1800</Text>
            <Text style={styles.statLabel}>Calories</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
        </View>

        {/* FEATURE CARDS */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push('/bmi')}
        >
          <Text style={styles.cardTitle}>📊 BMI Calculator</Text>
          <Text style={styles.cardText}>Check your body index instantly</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push('/calorie')}
        >
          <Text style={styles.cardTitle}>🔥 Calorie Tracker</Text>
          <Text style={styles.cardText}>Track daily nutrition easily</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={styles.card}
          onPress={() => router.push('/workouts')}
        >
          <Text style={styles.cardTitle}>🏋️ Workouts</Text>
          <Text style={styles.cardText}>Start your training session</Text>
        </TouchableOpacity> */}

      </View>
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
    borderRadius: 20,
    marginBottom: 20,
  },

  textContainer: {
    marginBottom: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },

  subtitle: {
    fontSize: 14,
    color: '#cbd5e1',
    marginTop: 5,
  },

  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  statBox: {
    flex: 1,
    backgroundColor: '#1e293b',
    marginHorizontal: 5,
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
  },

  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },

  statLabel: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 5,
  },

  card: {
    backgroundColor: '#1e293b',
    padding: 18,
    borderRadius: 18,
    marginBottom: 15,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },

  cardText: {
    fontSize: 13,
    color: '#94a3b8',
    marginTop: 5,
  },
});