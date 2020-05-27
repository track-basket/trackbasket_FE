import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import QuantityPicker from '../components/QuantityPicker';
import ShoppingCart from '../shopping-cart';

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
  const { cart, addToCart } = useContext(ShoppingCart);

  const [upc, setUpc] = useState(null);
  const [aisle, setAisle] = useState(null);
  const [description, setDescription] = useState(null);
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState(null);


  return items.map((item) => (
    <View style={styles.container}>
      <View style={styles.descriptionArea}>
        <Text key={item.description} style={styles.description}>
          {item.description}
        </Text>
        <Text key={item.description + 'price'} style={styles.description}>
          ${item.price}
        </Text>
      </View>
      <Image
        key={item.description + 'url'}
        source={{ uri: item.image_url }}
        style={styles.itemImage}
      />
      <QuantityPicker key={Math.random()} />
      <TouchableOpacity style={styles.button} onPress={() => addToCart(item)}>
        <Text style={styles.buttonText}>Add To Cart</Text>
      </TouchableOpacity>
    </View>
  ));
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#59DE7E',
    borderRadius: 5,
    marginTop: 60,
    marginBottom: 10,
    height: 25,
    width: 160,
  },
  buttonText: {
    color: '#EEEEEE',
    fontFamily: 'Helvetica-Bold',
    fontSize: 18,
    textAlign: 'center',
  },
  itemImage: {
    marginTop: 15,
    marginBottom: 15,
    height: 100,
    width: 110,
  },
  description: {
    textAlign: 'right',
  },
});

export default GroceryItem;
