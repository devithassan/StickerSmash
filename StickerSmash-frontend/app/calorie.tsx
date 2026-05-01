import { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

type FoodItem = {
  food: string;
  calories: number;
};

export default function CalorieTracker() {
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
    <ScrollView contentContainerStyle={styles.container}>
      
      <ThemedText type="title">🍎 Calorie Tracker</ThemedText>

      {/* INPUTS */}
      <TextInput
        placeholder="Food name"
        value={food}
        onChangeText={setFood}
        style={styles.input}
      />

      <TextInput
        placeholder="Calories"
        value={calories}
        onChangeText={setCalories}
        keyboardType="numeric"
        style={styles.input}
      />

      {/* BUTTON */}
      <TouchableOpacity style={styles.button} onPress={addFood}>
        <ThemedText style={styles.buttonText}>Add Food</ThemedText>
      </TouchableOpacity>

      {/* TOTAL */}
      <ThemedText style={styles.total}>
        🔥 Total Calories: {total}
      </ThemedText>

      {/* LIST */}
      {list.map((item, index) => (
        <ThemedView key={index} style={styles.item}>
          <ThemedText style={styles.foodText}>
            {item.food}
          </ThemedText>

          <ThemedText style={styles.calText}>
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
    gap: 12,
    justifyContent: 'center',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 10,
    color: '#fff',
    backgroundColor: "#222",
  },

  button: {
    backgroundColor: '#A1CEDC',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    fontWeight: 'bold',
  },

  total: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#a83636',
    backgroundColor: "#222",
  },

  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#aa5555',
  },

  foodText: {
    fontSize: 16,
  },

  calText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});