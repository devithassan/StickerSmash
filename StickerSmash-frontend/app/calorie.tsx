import { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import { useTheme } from '@/components/theme-context';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { router } from 'expo-router';

type FoodItem = {
  food: string;
  calories: number;
};

export default function CalorieTracker() {
  const { colors } = useTheme(); // ✅ ADDED THEME

  const [food, setFood] = useState('');
  const [calories, setCalories] = useState('');
  const [list, setList] = useState<FoodItem[]>([]);

  const addFood = () => {
    if (!food.trim() || !calories.trim()) return;

    const newItem: FoodItem = {
      food: food.trim(),
      calories: Number(calories),
    };

    setList([...list, newItem]);
    setFood('');
    setCalories('');
  };

  const total = list.reduce((sum, item) => sum + item.calories, 0);

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: colors.background } // ✅ FIX
      ]}
    >

      {/* HEADER */}
      <ThemedView
        style={[
          styles.header,
          { backgroundColor: colors.background }
        ]}
      >

        <TouchableOpacity onPress={() => router.back()}>
          <ThemedText style={{ color: colors.text, fontSize: 22, fontWeight: 'bold' }}>
            ←
          </ThemedText>
        </TouchableOpacity>

        <ThemedText style={[styles.title, { color: colors.text }]}>
          Calorie Tracker
        </ThemedText>

      </ThemedView>

      {/* INPUT CARD */}
      <ThemedView
        style={[
          styles.card,
          { backgroundColor: colors.card }
        ]}
      >
        <TextInput
          placeholder="Food name"
          placeholderTextColor={colors.text + '80'}
          value={food}
          onChangeText={setFood}
          style={[
            styles.input,
            {
              backgroundColor: colors.background,
              color: colors.text,
              borderColor: colors.border,
            }
          ]}
        />

        <TextInput
          placeholder="Calories"
          placeholderTextColor={colors.text + '80'}
          value={calories}
          onChangeText={setCalories}
          keyboardType="numeric"
          style={[
            styles.input,
            {
              backgroundColor: colors.background,
              color: colors.text,
              borderColor: colors.border,
            }
          ]}
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={addFood}
        >
          <ThemedText style={styles.buttonText}>+ Add Food</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {/* TOTAL */}
      <ThemedView
        style={[
          styles.totalCard,
          { backgroundColor: colors.primary }
        ]}
      >
        <ThemedText style={styles.totalText}>
          🔥 {total} kcal
        </ThemedText>
      </ThemedView>

      {/* LIST */}
      {list.map((item, index) => (
        <ThemedView
          key={index}
          style={[
            styles.item,
            { backgroundColor: colors.card }
          ]}
        >
          <ThemedText style={[styles.foodText, { color: colors.text }]}>
            {item.food}
          </ThemedText>

          <ThemedText style={[styles.calText, { color: colors.text }]}>
            {item.calories} kcal
          </ThemedText>
        </ThemedView>
      ))}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    gap: 12,
  },

  backText: {
    fontSize: 22,
    fontWeight: 'bold',
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },

  card: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    gap: 10,
  },

  input: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
  },

  button: {
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 6,
  },

  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },

  totalCard: {
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 16,
  },

  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },

  item: {
    padding: 14,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  foodText: {
    fontSize: 16,
  },

  calText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});