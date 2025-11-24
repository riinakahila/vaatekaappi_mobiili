import { useEffect, useState } from 'react';
import { View, Image, FlatList, StyleSheet, Text, Button } from 'react-native';
import { getClothesList, deleteItem } from './Database';


export default function WardrobeScreen({ navigation }) {

  const [clothes, setClothes] = useState([]);

  const loadClothes = async () => {
    const list = await getClothesList();
    setClothes(list);
  };

  useEffect(() => {
    loadClothes();
  }, []);

  const handleDelete = async (id) => {
    await deleteItem(id);
    loadClothes();
  };

  return(
  <View style={styles.container}>
    <Button title="Camera" onPress={() => navigation.navigate('Camera')} />
      {clothes.length === 0 ? (
        <View style={styles.emptyWrap}>
          <Text style={styles.empty}>Ei vielä yhtään vaatetta</Text>
        </View>
      ) : (
        <FlatList
          data={clothes}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          contentContainerStyle={styles.grid}
          renderItem={({ item }) => (
          <View>
            <Image source={{ uri: item.uri }} style={styles.image} />
            <Text>{item.title}</Text>
            <Text>{item.category}</Text>
            <Button title="Poista" onPress={() => handleDelete(item.id)} />
          </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff', 
    paddingTop: 20 
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    color: '#888',
    fontSize: 16,
  },
  grid: {
    paddingHorizontal: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    margin: 5,
  },
  
});