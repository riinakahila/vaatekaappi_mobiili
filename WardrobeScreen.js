import React, { useEffect, useState } from 'react';
import { View, Image, FlatList, StyleSheet, Text, Button } from 'react-native';
import { getClothesList, deleteItem } from './Database';


export default function WardrobeScreen({ navigation }) {

  const [clothes, setClothes] = useState([]);

  const loadClothes = async () => {
    const list = await getClothesList();
    setClothes(list);
  };

  const handleDelete = async (id) => {
    await deleteItem(id);
    return getClothesList;
  };

  return(
  <View style={styles.container}>
    <Button title="Camera" onPress={() => navigation.navigate('Camera')} />
      {photos.length === 0 ? (
        <View style={styles.emptyWrap}>
          <Text style={styles.empty}>Ei vielä yhtään kuvaa</Text>
        </View>
      ) : (
        <FlatList
          data={photos}
          keyExtractor={(uri, index) => uri + index}
          numColumns={3}
          contentContainerStyle={styles.grid}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.image} />
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