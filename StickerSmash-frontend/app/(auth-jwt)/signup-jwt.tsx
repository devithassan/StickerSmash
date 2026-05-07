import { useTheme } from '@/components/theme-context';
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
  const { dark } = useTheme();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      const res = await fetch('http://192.168.1.93:3000/signup', {
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
        <View
          style={[
            styles.container,
            { backgroundColor: dark ? '#000' : '#f5f5f5' },
          ]}
        >
          <ThemedText type="title">Create Account 🧾</ThemedText>

          <TextInput
            placeholder="Username"
            placeholderTextColor={dark ? '#aaa' : '#666'}
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
            placeholder="Password"
            secureTextEntry
            placeholderTextColor={dark ? '#aaa' : '#666'}
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

          <Pressable
            style={[
              styles.btn,
              { backgroundColor: dark ? '#2d7a8c' : '#A1CEDC' },
            ]}
            onPress={handleSignup}
          >
            <ThemedText>Sign Up</ThemedText>
          </Pressable>

          <Pressable onPress={() => router.push('/(auth-jwt)/login-jwt')}>
            <ThemedText
              style={{
                textAlign: 'center',
                marginTop: 15,
                color: dark ? '#fff' : '#000',
              }}
            >
              Already have an account? Login
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
  },
  btn: {
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
});