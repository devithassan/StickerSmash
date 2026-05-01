// import { ThemedText } from '@/components/themed-text';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { router } from 'expo-router';
// import { useState } from 'react';
// import { Alert, Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet, TextInput, TouchableWithoutFeedback, View } from 'react-native';

// export default function Signup() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSignup = async () => {
//     if (!username || !password) {
//       Alert.alert('Fill all fields');
//       return;
//     }

//     await AsyncStorage.setItem(
//       'user',
//       JSON.stringify({ username, password })
//     );

//     Alert.alert('Account created!');
//     router.replace('login' as any);
//   };

//   return (
//     <KeyboardAvoidingView
//       style = {{flex: 1}}
//       behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//     >
//       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//         <View style={styles.container}>
//           <ThemedText type="title">Sign Up</ThemedText>

//           <TextInput
//             placeholder="Username"
//             style={styles.input}
//             onChangeText={setUsername}
//           />

//           <TextInput
//             placeholder="Password"
//             secureTextEntry
//             style={styles.input}
//             onChangeText={setPassword}
//           />

//           <Pressable style={styles.btn} onPress={handleSignup}>
//             <ThemedText>Create Account</ThemedText>
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
// });