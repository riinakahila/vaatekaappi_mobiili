import { StyleSheet, View, Button, Text, Image, FlatList } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';

export default function CameraScreen() {
  const cameraRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [photos, setPhotos] = useState([]);

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text>Kameran käyttölupa:</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const snap = async () => {
    if (!cameraRef.current) return;
    const photo = await cameraRef.current.takePictureAsync({ base64: true, quality: 0.8 });
    setPhotos(prev => [...prev, photo.uri]);
  };

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing="back" />
      <Button title="Ota kuva" onPress={snap} />
      <FlatList
      data={photos}
      keyExtractor={(item, index) => index.toString()}
      horizontal
      contentContainerStyle={{ paddingTop: 20 }}
      renderItem={({ item }) => (
    <Image source={{ uri: item }} style={styles.thumbnail} />
  )}
  />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 12, 
    justifyContent: 'center', 
    backgroundColor: '#fff' 
  },
  center: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  camera: { 
    height: 320, 
    borderRadius: 12 
  },
  thumbnail: { 
    width: 80, 
    height: 80, 
    borderRadius: 8, 
    marginRight: 8 
  },
});