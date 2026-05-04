import { ThemedText } from '@/components/themed-text';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

export default function SignupJWT() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      const res = await fetch('http://192.168.100.17:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.text(); // backend sends plain text

      if (!res.ok) {
        Alert.alert('Error', data);
        return;
      }

      Alert.alert('Success ✅', 'Account created');

      // 👉 Optional: auto redirect to login
      router.replace('/(auth-jwt)/login-jwt' as any);

    } catch (err) {
      Alert.alert('Error', 'Server not reachable');
      console.log(err);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>

          <ThemedText type="title">Create Account 🧾</ThemedText>

          <TextInput
            placeholder="Username"
            style={styles.input}
            value={username}
            onChangeText={setUsername}
          />

          <TextInput
            placeholder="Password"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />

          <Pressable style={styles.btn} onPress={handleSignup}>
            <ThemedText>Sign Up</ThemedText>
          </Pressable>

          <Pressable onPress={() => router.push('/(auth-jwt)/login-jwt')}>
            <ThemedText>Already have an account? Login</ThemedText>
          </Pressable>

        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    gap: 12,
  },
  input: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  btn: {
    backgroundColor: '#A1CEDC',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
});