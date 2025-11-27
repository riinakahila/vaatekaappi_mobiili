import { StyleSheet, View, Image } from 'react-native';
import { Card, Text, Button, TextInput } from 'react-native-paper';
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
        <Button mode='contained' icon="account-alert" onPress={requestPermission}>Anna kameran käyttöoikeus</Button>
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
      <Button mode='contained' onPress={snap}>Ota kuva</Button>
    </View>
  );
}


 return (
  <View style={styles.container}>
    <Card style={styles.card}>
    <Card.Cover source={{uri: photoUri}} style={styles.image}/>
    <Card.Content>
    <Text variant='titleMedium'>Uusi vaate</Text>
    <Text variant='bodyMedium'>Vaatteen nimi:</Text>
      <TextInput mode='outlined' value={title} onChangeText={setTitle} placeholder='Vaatteen nimi'/>
    <Text variant='bodyMedium'>Valitse kategoria:</Text>
    <View style={styles.pickerWrap}>
    <Picker selectedValue={category} onValueChange={(value) => setCategory(value)}>
      <Picker.Item label='T-paita' value='t-paita'/>
      <Picker.Item label='Pitkähihainen paita' value='pitkähihainen'/>
      <Picker.Item label='Housut' value='housut'/>
      <Picker.Item label='Takki' value='takki'/>
    </Picker>
    </View>
  </Card.Content>

  <Card.Actions>
    <Button mode='contained' icon='content-save' onPress={handleSave}>Tallenna vaate</Button>
  </Card.Actions>
    </Card>
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
  card: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#e6e6fa'
  },
  image: {
    height:200,
  },
  pickerWrap: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#ccc',
    overflow: 'hidden',
    marginBottom: 8,
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