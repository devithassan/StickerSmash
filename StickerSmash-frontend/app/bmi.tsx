import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useState } from 'react';
import { Keyboard, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

export default function BMI() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState<string | null>(null);
  const [category, setCategory] = useState<string>('');

  const calculateBMI = () => {
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
    setBmi(result);

    // 🎯 BMI categories
    if (bmiValue < 18.5) setCategory('Underweight');
    else if (bmiValue < 25) setCategory('Normal');
    else if (bmiValue < 30) setCategory('Overweight');
    else setCategory('Obese');
  };

  return (
    <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
      <ThemedView style={styles.container}>
        <ThemedText type="title">BMI Calculator 🧮</ThemedText>

        {/* Height Input */}
        <TextInput
          placeholder="Height (cm)"
          keyboardType="numeric"
          value={height}
          onChangeText={setHeight}
          style={styles.input}
        />

        {/* Weight Input */}
        <TextInput
          placeholder="Weight (kg)"
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
          style={styles.input}
        />

        {/* Button */}
        <TouchableOpacity style={styles.button} onPress={calculateBMI}>
          <ThemedText>Calculate</ThemedText>
        </TouchableOpacity>

        {/* Result */}
        {bmi && (
          <>
            <ThemedText style={styles.result}>Your BMI: {bmi}</ThemedText>
            <ThemedText style={styles.category}>{category}</ThemedText>
          </>
        )}
      </ThemedView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    gap: 10,
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
  result: {
    fontSize: 20,
    marginTop: 10,
  },
  category: {
    fontSize: 16,
  },
});