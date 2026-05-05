import { ThemeContext } from '@/components/theme-context';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { router } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

export default function SettingsScreen() {
  const { dark, toggleTheme, colors } = useContext(ThemeContext);

  const [name, setName] = useState('Hassan Tahir');
  const [username, setUsername] = useState('');
  const [tempName, setTempName] = useState('');
  const [usernameLocked, setUsernameLocked] = useState(false);
  const [editField, setEditField] = useState<'name' | 'username' | null>(null);
  const [tempValue, setTempValue] = useState('');
  const [avatar, setAvatar] = useState<string | null>(null);

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

    if (editField === 'name') setName(tempValue);
    if (editField === 'username') {
      setUsername(tempValue);
      setUsernameLocked(true);
    }

    setEditField(null);
  };

  useEffect(() => {
    (async () => {
      await ImagePicker.requestCameraPermissionsAsync();
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const chooseImage = () => {
    Alert.alert('Profile Picture', 'Choose an option', [
      { text: '📷 Take Photo', onPress: takePhoto },
      { text: '🖼 Pick from Gallery', onPress: pickImage },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    router.replace('/(auth-jwt)/login-jwt');
  };

  return (
    <>
      <ScrollView
        style={{ backgroundColor: colors.background }}
        contentContainerStyle={[
          styles.container,
          { backgroundColor: colors.background }
        ]}
      >

        {/* PROFILE */}
        <ThemedView style={[styles.profileCard, { backgroundColor: colors.card }]}>

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
                <ThemedText style={{ color: colors.text, fontSize: 18, fontWeight: 'bold' }}>
                  {name}
                </ThemedText>

                <ThemedText style={{ color: colors.text, opacity: 0.6 }}>
                  Name
                </ThemedText>
              </View>

              <Pressable onPress={() => openEdit('name')}>
                <Feather name="edit-2" size={18} color={colors.text} />
              </Pressable>
            </View>

            {/* USERNAME */}
            <View style={styles.row}>
              <View>
                <ThemedText style={{ color: colors.text, fontSize: 18, fontWeight: 'bold' }}>
                  {username ? `@${username}` : 'Set username'}
                </ThemedText>

                <ThemedText style={{ color: colors.text, opacity: 0.6 }}>
                  One time only
                </ThemedText>
              </View>

              <Pressable onPress={() => openEdit('username')}>
                <Feather name="edit-2" size={18} color={colors.text} />
              </Pressable>
            </View>

          </View>
        </ThemedView>

        {/* SETTINGS */}
        <ThemedView style={[styles.card, { backgroundColor: colors.card }]}>
          <ThemedText style={{ color: colors.text, fontSize: 16, fontWeight: 'bold' }}>
            General
          </ThemedText>

          <TouchableOpacity style={styles.row}>
            <ThemedText style={{ color: colors.text }}>🔔 Notifications</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.row} onPress={toggleTheme}>
            <ThemedText style={{ color: colors.text }}>🌙 Dark Mode</ThemedText>
            <ThemedText style={{ color: dark ? colors.primary : colors.text, opacity: 0.6 }}>
              {dark ? 'Enabled' : 'Disabled'}
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.row}>
            <ThemedText style={{ color: colors.text }}>🌍 Language</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        {/* DATA */}
        <ThemedView style={[styles.card, { backgroundColor: colors.card }]}>
          <ThemedText style={{ color: colors.text, fontSize: 16, fontWeight: 'bold' }}>
            Data
          </ThemedText>

          <TouchableOpacity style={styles.row}>
            <ThemedText style={{ color: colors.text }}>📊 Reset Data</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.row}>
            <ThemedText style={{ color: colors.text }}>💾 Backup Data</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        {/* ABOUT */}
        <ThemedView style={[styles.card, { backgroundColor: colors.card }]}>
          <ThemedText style={{ color: colors.text, fontSize: 16, fontWeight: 'bold' }}>
            About
          </ThemedText>

          <ThemedText style={{ color: colors.text }}>Version: 1.0.0</ThemedText>
          <ThemedText style={{ color: colors.text }}>Made with React Native</ThemedText>
        </ThemedView>

        {/* LOGOUT */}
        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <ThemedText style={styles.logoutText}>🚪 Logout</ThemedText>
        </TouchableOpacity>

      </ScrollView>

      {/* MODAL */}
      {editField && (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalWrapper}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[styles.modal, { backgroundColor: colors.card }]}>
              <TextInput
                value={tempValue}
                onChangeText={setTempValue}
                placeholder={`Enter ${editField}`}
                placeholderTextColor={colors.text + '99'}
                style={[
                  styles.input,
                  { color: colors.text, borderColor: colors.border }
                ]}
                autoFocus
              />

              <Pressable
                onPress={saveEdit}
                style={[styles.saveBtn, { backgroundColor: colors.primary }]}
              >
                <ThemedText>Save</ThemedText>
              </Pressable>

              <Pressable onPress={() => setEditField(null)}>
                <ThemedText style={{ color: colors.text }}>Cancel</ThemedText>
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
    gap: 10,
    elevation: 2,
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  row: {
    paddingVertical: 10,
  },

  item: {
    fontSize: 14,

  },

  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },

  saveBtn: {
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  modal: {

    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    gap: 10,

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