import { StyleSheet, View, Button } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';

export default function Camera() {

  const [photoName, setPhotoName] = useState('');
  const [photoBase64, setPhotoBase64] = useState('');
  const cameraRef = useRef(null);

  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <View/>;
  }
  if (!permission.granted) {
    return(
    <View style={styles.container}>
      <Button onPress={requestPermission} title="grant permission" />
    </View>
    );
  }

  const snap = async () => {
  if (cameraRef) {
    const photo = await cameraRef.current.takePictureAsync({base64: true});
    setPhotoName(photo.uri);
    setPhotoBase64(photo.base64); 
  }
};

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} ref={cameraRef}/>
      <Button title="ota kuva" onPress={snap}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
    maxWidth: '100%',
  }
});