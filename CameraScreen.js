import { StyleSheet, View, Button, Text, TextInput, Image, FlatList } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState, useEffect } from 'react';
import { initialize, saveClothes } from './Database';
import {Picker} from '@react-native-picker/picker';

export default function CameraScreen({navigation}) {

  const cameraRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');

  const pickerRef = useRef();

  function open() {
  pickerRef.current.focus();
}

  function close() {
  pickerRef.current.blur();
}

  useEffect(() => {
    initialize();
  }, []);

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
    setPhotoUri(photo.uri);
  }

  const handleSave = async () => {
    if (!photoUri) return;

    await saveClothes({
      title: title,
      category: category,
      uri: photoUri
    })
    setTitle('');
    setCategory('');
    setPhotoUri(null);
   
    navigation.navigate('Wardrobe');
  };

  if (!photoUri) {
  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing="back" />
      <Button title="Ota kuva" onPress={snap} />
    </View>
  );
}


 return (
  <View style={styles.container}>
    <Image source={{uri: photoUri}}/>
    <Text>Vaatteen nimi:</Text>
    <TextInput value={title} onChangeText={setTitle} placeholder='Vaatteen nimi'/>
    <Text>Kategoria:</Text>
    <Picker ref={pickerRef} selectedValue={category} onValueChange={(value) => setCategory(value)}>
      <Picker.Item label='T-paita' value='t-paita'/>
      <Picker.Item label='Pitkähihainen paita' value='pitkähihainen'/>
      <Picker.Item label='Housut' value='housut'/>
      <Picker.Item label='Takki' value='takki'/>
    </Picker>
    <Button onPress={handleSave} title='Tallenna'/>

  </View>
 )
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