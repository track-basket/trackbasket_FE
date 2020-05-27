import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const sampleData = {
  id: 'searchItems',
  attributes: {
    items: [
      {
        upc: '0001111042852',
        aisleNumber: 7,
        description: 'Simple Truth Organic™ 2% Reduced Fat Milk',
        image_url:
          'https://silk.com/wp-content/uploads/2019/02/unsweet-almond-coconut-blend-1.png',
        price: 3.29,
      },
      {
        upc: '8305729934',
        aisleNumber: 3,
        description: 'Nutella',
        image_url:
          'https://silk.com/wp-content/uploads/2019/02/unsweet-almond-coconut-blend-1.png',
        price: 4.59,
      },
    ],
  },
};

const GroceryItem = () => {
  const { attributes } = sampleData;
  const { items } = attributes;
  console.log(items);
  return items.map((item) => (
    <View style={styles.container}>
      <Text key={item.description} style={styles.description}>{item.description}</Text>
      <Image
        key={item.description + 'url'}
        source={{ uri: item.image_url }}
        style={styles.itemImage}
      />
    </View>
  ));
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  itemImage: {
    marginTop: 15,
    marginBottom: 15,
    height: 100,
    width: 110,
  },
});

export default GroceryItem;
