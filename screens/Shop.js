/* eslint-disable no-shadow */
import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import GroceryItem from '../components/GroceryItem';
import UserContext from '../user-context';

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

const Shop = () => {
  const [text, setText] = useState('');
  const { attributes } = sampleData;
  const { items } = attributes;
  const { user, addToCart } = useContext(UserContext);
  const addItem = (upc) => {
    let selectedItem = items.find((item) => item.upc === upc);
    addToCart(selectedItem);
  };
  return (
    <View>
      <TextInput
        placeholder="Search Items..."
        style={styles.searchBar}
        onChangeText={(text) => setText(text)}
        onSubmitEditing={() => console.log(text)}
      />
      {items.map((item) => {
        return (
          <GroceryItem
            upc={item.upc}
            aisleNumber={item.aisleNumber}
            description={item.description}
            image_url={item.image_url}
            price={item.price}
            clickHandler={addItem}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    borderWidth: 1,
    fontSize: 18,
    height: 50,
    margin: 10,
    padding: 5,
  },
});

export default Shop;
