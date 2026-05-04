import { ThemeContext } from '@/components/theme-context';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { router } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { Alert, Image, Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

export default function SettingsScreen() {
  const [name, setName] = useState('Hassan Tahir');
  const [username, setUsername] = useState('');
  const [tempName, setTempName] = useState('');
  const [usernameLocked, setUsernameLocked] = useState(false);
  // const [isLocked, setIsLocked] = useState(false);
  const [editField, setEditField] = useState<'name' | 'username' | null>(null);
  const [tempValue, setTempValue] = useState('');
  const { dark, toggleTheme } = useContext(ThemeContext);

  //   useEffect(() => {
  //   const check = async () => {
  //     const token = await AsyncStorage.getItem('token');

  //     if (token) {
  //       router.replace('/(tabs)');
  //     } else {
  //       router.replace('/(auth-jwt)/login-jwt');
  //     }
  //   };

  //   check();
  // }, []);

  const openEdit = (field: 'name' | 'username') => {
    if (field === 'username' && usernameLocked) {
      Alert.alert('Locked 🔒', 'Username can only be set once.');
      return;
    }

    setTempValue(field === 'name' ? name : username);
    setEditField(field);
  };

  const saveEdit = () => {
    if (!tempValue.trim()) return;

    if (editField === 'name') {
      setName(tempValue);
    }

    if (editField === 'username') {
      setUsername(tempValue);
      setUsernameLocked(true);
    }

    setEditField(null);
  };


  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const camera = await ImagePicker.requestCameraPermissionsAsync();
      const gallery = await ImagePicker.requestMediaLibraryPermissionsAsync();
      const media = await MediaLibrary.requestPermissionsAsync();
  
      if (!camera.granted || !gallery.granted || !media.granted) {
        Alert.alert('Permission required', 'Please allow camera & gallery access');
      }
    })();
  }, []);


    const pickImage = async () => {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
          alert("Permission required");
          return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          quality: 1,
      });

      if (result.canceled || !result.assets?.length) return;

      const uri = result.assets[0].uri;

      console.log("FINAL URI:", uri);

      setAvatar(uri);
      };
  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
  
    if (!result.canceled){
      setAvatar(result.assets[0].uri);
    }
  };

  const chooseImage = () => {
    Alert.alert(
      'Profile Picture',
      'Choose an option',
      [
        { text: '📷 Take Photo', onPress: takePhoto },
        { text: '🖼 Pick from Gallery', onPress: pickImage },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  // useEffect(() => {
  //   (async () => {
  //     await ImagePicker.requestCameraPermissionsAsync();
  //     await ImagePicker.requestMediaLibraryPermissionsAsync();
  //   })();
  // }, []);

  const logout = async () => {
    await AsyncStorage.removeItem('token');

    console.log('🚪 Logging out...');

    router.replace('/(auth-jwt)/login-jwt');
  };

  return (
    <>
      <ScrollView style = {{flex:1 }} contentContainerStyle={styles.container}>

        {/* PROFILE */}
        <ThemedView style={styles.profileCard}>
          
          <Pressable onPress={chooseImage}>
            <Image
              source={
                avatar
                  ? { uri: avatar }
                  : { uri: 'https://i.pravatar.cc/150' }
              }
              style={styles.avatar}
            />
          </Pressable>

          <View style={{ flex: 1, gap: 10 }}>

            {/* NAME */}
            <View style={styles.row}>
              <View>
                <ThemedText style={styles.name}>{name}</ThemedText>
                <ThemedText style={styles.subText}>Name</ThemedText>
              </View>

              <Pressable onPress={() => openEdit('name')}>
                <Feather name="edit-2" size={18} color="black" />
              </Pressable>
            </View>

            {/* USERNAME */}
            <View style={styles.row}>
              <View>
                <ThemedText style={styles.name}>
                  {username ? `@${username}` : 'Set username'}
                </ThemedText>
                <ThemedText style={styles.subText}>
                  One time only
                </ThemedText>
              </View>

              <Pressable onPress={() => openEdit('username')}>
                <Feather name="edit-2" size={18} color="black" />
              </Pressable>
            </View>

          </View>
        </ThemedView>

        {/* SETTINGS */}
        <ThemedView style={styles.card}>
          <ThemedText style={styles.title}>General</ThemedText>

          <TouchableOpacity style={styles.row}>
            <ThemedText style={styles.item}>🔔 Notifications</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.row} onPress = {toggleTheme}>
            <ThemedText style={styles.item}>🌙 Dark Mode</ThemedText>
            <ThemedText style = {{ color: dark ? 'green' : 'gray'}}>
              {dark ? 'Enabled' : 'Disabled'}
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.row}>
            <ThemedText style={styles.item}>🌍 Language</ThemedText>
          </TouchableOpacity>
        </ThemedView>

          {/* 📊 DATA SECTION */}
        <ThemedView style={styles.card}>
          <ThemedText style={styles.title}>Data</ThemedText>

          <TouchableOpacity style={styles.row}>
            <ThemedText style={styles.item}>📊 Reset Data</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.row}>
            <ThemedText style={styles.item}>💾 Backup Data</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        {/* ℹ️ ABOUT */}
        <ThemedView style={styles.card}>
          <ThemedText style={styles.title}>About</ThemedText>

          <ThemedText style={styles.item}>Version: 1.0.0</ThemedText>
          <ThemedText style={styles.item}>Made with React Native</ThemedText>
        </ThemedView>
              {/* Logout button */}
        <TouchableOpacity style = {styles.logoutBtn} onPress={logout}>
          <ThemedText style = {styles.logoutText}>🚪 Logout</ThemedText>
        </TouchableOpacity>

      </ScrollView>

      {/* MODAL (FIXED WRAPPER) */}
      {editField && (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalWrapper}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

            <View style={styles.modal}>
                       
              
              <TextInput
                value={tempValue}
                onChangeText={setTempValue}
                placeholder={`Enter ${editField}`}
                style={styles.input}
                autoFocus
                returnKeyType="done"
                blurOnSubmit
              />

              <Pressable onPress={saveEdit} style={styles.saveBtn}>
                <ThemedText>Save</ThemedText>
              </Pressable>

              <Pressable onPress={() => setEditField(null)}>
                <ThemedText>Cancel</ThemedText>
              </Pressable>

            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    
    padding: 20,
    gap: 15,
    backgroundColor: '#f5f5f5', // 👈 better than pure black
  },

  /* 👤 PROFILE */
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    padding: 15,
    borderRadius: 16,
    backgroundColor: '#a85454',
    elevation: 3,
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },

  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d8c3c3',
  },

  subText: {
    fontSize: 14,
    color: 'grey',
  },

  /* 📦 CARDS */
  card: {
    padding: 15,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    gap: 10,
    elevation: 2,
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },

  row: {
    paddingVertical: 10,
  },

  item: {
    fontSize: 14,
    color: '#333',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },

  saveBtn: {
    backgroundColor: '#A1CEDC',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  modal: {

    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    gap: 10,
    // elevation: 5,
    marginBottom: 10,
  },
  modalWrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'flex-end',
    flex: 1,
  },

  logoutBtn: {
    marginTop: 10,
    backgroundColor: '#ef4444', // red
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoutText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
});