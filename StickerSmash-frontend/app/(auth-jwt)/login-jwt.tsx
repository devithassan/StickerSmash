import { useTheme } from '@/components/theme-context';
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
  const { dark } = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {

    console.log('🚀 LOGIN BUTTON PRESSED');
    console.log('📦 Username:', username);
    console.log('📦 Password:', password);
    

    try {
      console.log('🌐 Sending request to backend...');

      const res = await fetch('http://192.168.1.42:3000/login', {
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
        <View style={[
          styles.container,
          { backgroundColor: dark ? '#000' : '#f5f5f5' }
        ]}>

          <ThemedText type="title">JWT Login 🔐</ThemedText>

          <TextInput
            placeholderTextColor={dark ? '#aaa' : '#666'}
            placeholder="Username"
            style={[
              styles.input,
              {
                backgroundColor: dark ? '#1a1a1a' : '#fff',
                color: dark ? '#fff' : '#000',
                borderColor: dark ? '#333' : '#ccc',
              },
            ]}
            value={username}
            onChangeText={setUsername}
          />

          <TextInput
            placeholderTextColor={dark ? '#aaa' : '#666'}
            placeholder="Password"
            secureTextEntry
            style={[
              styles.input,
              {
                backgroundColor: dark ? '#1a1a1a' : '#fff',
                color: dark ? '#fff' : '#000',
                borderColor: dark ? '#333' : '#ccc',
              },
            ]}
            value={password}
            onChangeText={setPassword}
          />

          <Pressable style={[
              styles.btn,
              { backgroundColor: dark ? '#2d7a8c' : '#A1CEDC' }
            ]} 
            onPress={handleLogin}>
            <ThemedText>Login</ThemedText>
          </Pressable>

          <Pressable onPress={() => router.push('/(auth-jwt)/signup-jwt')}>
            <ThemedText style={{
              textAlign: 'center',
              marginTop: 15,
              color: dark ? '#fff' : '#000'
            }}>
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