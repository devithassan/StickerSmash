import { useTheme } from '@/components/theme-context';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useState } from 'react';
import { Keyboard, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default function BMI() {
  const { colors } = useTheme();
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState<string | null>(null);
  const [category, setCategory] = useState<string>('');

  const categoryFromValue = (bmiValue: number) => {
    if (bmiValue < 18.5) return 'Underweight';
    if (bmiValue < 25) return 'Normal';
    if (bmiValue < 30) return 'Overweight';
    return 'Obese';
  };

  const calculateBMI = async () => {
    Keyboard.dismiss();

    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);

    if (!h || !w) {
      setBmi(null);
      setCategory('Enter valid values');
      return;
    }

    const bmiValue = w / (h * h);
    const result = bmiValue.toFixed(2);

    const cat = categoryFromValue(bmiValue);

    setBmi(result);
    setCategory(cat);

  };
  const saveBMI = async () => {
    if (!bmi || !category) return;

    await AsyncStorage.setItem(
      'bmi',
      JSON.stringify({
        value: bmi,
        category: category,
      })
    );

    const existing = await AsyncStorage.getItem('bmi_history');
    const history = existing ? JSON.parse(existing) : [];

    const newEntry = {
      value: bmi,
      category: category,
      date: new Date().toISOString(),
    };

    history.unshift(newEntry);
    await AsyncStorage.setItem('bmi_history', JSON.stringify(history));
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: colors.background }
      ]}
    >

      {/* HEADER */}
      <ThemedView style={[styles.header, { backgroundColor: colors.background }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <ThemedText style={{ color: colors.text, fontSize: 22, fontWeight: 'bold' }}>
            ←
          </ThemedText>
        </TouchableOpacity>

        <ThemedText style={[styles.title, { color: colors.text }]}>
          BMI Calculator
        </ThemedText>
      </ThemedView>

      {/* INPUT CARD */}
      <ThemedView style={[styles.card, { backgroundColor: colors.card }]}>

        <TextInput
          placeholder="Height (cm)"
          placeholderTextColor={colors.text + '80'}
          keyboardType="numeric"
          value={height}
          onChangeText={setHeight}
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
          placeholder="Weight (kg)"
          placeholderTextColor={colors.text + '80'}
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
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
          onPress={calculateBMI}
        >
          <ThemedText style={styles.buttonText}>Calculate BMI</ThemedText>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={saveBMI}
        >
          <ThemedText style={styles.buttonText}>Update BMI</ThemedText>
        </TouchableOpacity> */}

      </ThemedView>

      {/* RESULT CARD */}
      {bmi && (
        <ThemedView style={[styles.resultCard, { backgroundColor: colors.primary }]}>
          <ThemedText style={styles.resultText}>
            ⚖️ {bmi}
          </ThemedText>

          <ThemedText style={styles.categoryText}>
            {category}
          </ThemedText>

          <TouchableOpacity
            onPress={saveBMI}
            style={styles.button}
          >
            <ThemedText style={styles.buttonText}>
              Save 
            </ThemedText>
          </TouchableOpacity>


        </ThemedView>
        
      )}

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

  resultCard: {
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },

  resultText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },

  categoryText: {
    fontSize: 16,
    color: '#000',
    marginTop: 4,
  },
});