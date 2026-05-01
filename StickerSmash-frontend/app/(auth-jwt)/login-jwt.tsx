import { ThemedText } from '@/components/themed-text';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

export default function LoginJWT() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    console.log('🚀 LOGIN BUTTON PRESSED');
    console.log('📦 Username:', username);
    console.log('📦 Password:', password);

    try {
      console.log('🌐 Sending request to backend...');

      const res = await fetch('http://192.168.1.22:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      console.log('📡 Response received');
      console.log('📡 Status:', res.status);
      console.log('📡 OK:', res.ok);

      const text = await res.text(); // safer than json first
      console.log('📨 Raw response:', text);

      let data;
      try {
        data = JSON.parse(text);
        console.log('📦 Parsed JSON:', data);
      } catch (e) {
        console.log('❌ JSON parse error:', e);
        Alert.alert('Server Error', 'Invalid response from server');
        return;
      }

      if (!res.ok) {
        console.log('❌ Backend rejected login');
        Alert.alert('Error', data.message || 'Login failed');
        return;
      }

      console.log('💾 Saving token...');
      await AsyncStorage.setItem('token', data.token);

      console.log('✅ Login successful, navigating...');
      router.replace('/(tabs)');

    } catch (err) {
      console.log('🔥 FETCH ERROR OCCURRED');
      console.log('🔥 Error details:', err);

      Alert.alert(
        'Error',
        'Server not reachable (check logs)'
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>

          <ThemedText type="title">JWT Login 🔐</ThemedText>

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

          <Pressable style={styles.btn} onPress={handleLogin}>
            <ThemedText>Login</ThemedText>
          </Pressable>

          <Pressable onPress={() => router.push('/(auth-jwt)/signup-jwt')}>
            <ThemedText style={{ textAlign: 'center', marginTop: 15 }}>
              Don't have an account? Sign up
            </ThemedText>
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