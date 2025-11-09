import { StyleSheet, View, Button, Text, Image, FlatList } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRef } from 'react';
import { usePhotos } from './PhotoContext';

export default function CameraScreen() {

  const { addPhoto } = usePhotos();
  const cameraRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text>Kameran käyttölupa, jotta voit lisätä omia kuvia:</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const snap = async () => {
    if (!cameraRef.current) return;
    const photo = await cameraRef.current.takePictureAsync({ base64: true, quality: 0.8 });
    addPhoto(photo.uri);
    navigation.navigate('Wardrobe');
  };

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing="back" />
      <Button title="Ota kuva" onPress={snap} />
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
  
});