import { useEffect, useState } from 'react';
import {
    Alert,
    Button,
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';

export default function CameraScreen() {
  const [image, setImage] = useState<string | null>(null);

  // 🔐 Ask permissions
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

  // 📷 Open Camera
  const openCamera = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (result.canceled || !result.assets?.length) return;

      setImage(result.assets[0].uri);
    } catch (error) {
      console.log('Camera error:', error);
    }
  };

  // 🖼 Pick from Gallery
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

    setImage(uri);
    };

  // 💾 Save to phone gallery
  const saveImage = async () => {
    if (!image) return;

    try {
      await MediaLibrary.saveToLibraryAsync(image);
      Alert.alert('Saved!', 'Image saved to gallery 📱');
    } catch (error) {
      Alert.alert('Error', 'Could not save image');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="📷 Open Camera" onPress={openCamera} />
      <Button title="🖼 Pick from Gallery" onPress={pickImage} />

      {image ? (
        <>
          <Image source={{ uri: image }} style={styles.image} />
          <Button title="💾 Save to Gallery" onPress={saveImage} />
        </>
      ) : (
        <Text>No image selected</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 10,
    padding: 20,
  },

  image: {
    width: '100%',
    height: 300,
    marginTop: 10,
    borderRadius: 10,
  },
});

