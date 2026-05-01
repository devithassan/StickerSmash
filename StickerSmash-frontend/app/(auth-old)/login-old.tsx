// import { ThemedText } from '@/components/themed-text';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { router } from 'expo-router';
// import { useState } from 'react';
// import { Alert, Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet, TextInput, TouchableWithoutFeedback, View } from 'react-native';

// export default function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async () => {
//     const storedUser = await AsyncStorage.getItem('user');

//     if (!storedUser) {
//       Alert.alert('No account found');
//       return;
//     }

//     const user = JSON.parse(storedUser);

//     if (user.username === username && user.password === password) {
//       await AsyncStorage.setItem('loggedIn', 'true');
//       router.replace('/(tabs)');
//     } else {
//       Alert.alert('Invalid credentials');
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       style={{ flex: 1 }}
//       behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//     >
//       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//         <View style={styles.container}>
          
//           <ThemedText type="title">Login</ThemedText>

//           <TextInput
//             placeholder="Username"
//             style={styles.input}
//             value={username}
//             onChangeText={setUsername}
//           />

//           <TextInput
//             placeholder="Password"
//             secureTextEntry
//             style={styles.input}
//             value={password}
//             onChangeText={setPassword}
//           />

//           <Pressable style={styles.btn} onPress={handleLogin}>
//             <ThemedText>Login</ThemedText>
//           </Pressable>

//           <Pressable onPress={() => router.push('/signup')}>
//             <ThemedText>Don't have account? Sign Up</ThemedText>
//           </Pressable>

//         </View>
//       </TouchableWithoutFeedback>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', padding: 20, gap: 10 },
//   input: { borderWidth: 1, padding: 10, borderRadius: 10, color: 'white', },
//   btn: { backgroundColor: '#A1CEDC', padding: 12, borderRadius: 10, alignItems: 'center' },
//     modalWrapper: {
//     position: 'absolute',
//     top: 0,
//     bottom: 0,
//     left: 0,
//     right: 0,
//     justifyContent: 'flex-end',
//     flex: 1,
//   },
// });