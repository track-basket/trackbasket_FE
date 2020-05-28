/* eslint-disable no-shadow */
import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
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
        description: "Nature's Own Honey Wheat Sliced Bread",
        image_url:
          'https://user-images.githubusercontent.com/4350550/83094330-b3ac3980-a05e-11ea-97fb-9dfb29bc817b.png',
        price: 2.99,
      },
      {
        upc: '3842389434',
        aisleNumber: 12,
        description: 'Klondike The Original Ice Cream Bars',
        image_url:
          'https://user-images.githubusercontent.com/4350550/83094526-17cefd80-a05f-11ea-9856-7a5c8c3566e5.png',
        price: 3.49,
      },
      {
        upc: '9128485812',
        aisleNumber: 2,
        description: 'Kroger® Restaurant Style Tortilla Chips',
        image_url:
          'https://user-images.githubusercontent.com/4350550/83095102-dc80fe80-a05f-11ea-9027-73ae65963359.png',
        price: 1.25,
      },
      {
        upc: '1592384912',
        aisleNumber: 4,
        description: 'Simple Truth Organic™ Gala Apples Pouch',
        image_url:
          'https://user-images.githubusercontent.com/4350550/83095372-6fba3400-a060-11ea-91fc-f646038c2dfd.png',
        price: 3.99,
      },
    ],
  },
};

const Shop = () => {
  const [text, setText] = useState('');
  const { attributes } = sampleData;
  const { items } = attributes;
  const { removeFromCart, addToCart, cart } = useContext(UserContext);
  const toggleCartItem = (upc, quantity) => {
    let selectedItem = items.find((item) => item.upc === upc);
    if (cart.items.find((item) => item.upc === upc)) {
      removeFromCart(selectedItem);
      selectedItem.quantity = quantity;
    } else {
      selectedItem.quantity = quantity;
      addToCart(selectedItem);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.innercontainer}>
        <TextInput
          placeholder="Search Items..."
          style={styles.searchBar}
          onChangeText={(text) => setText(text)}
          onSubmitEditing={() => console.log(text)}
        />
        <ScrollView>
          {items.map((item) => {
            return (
              <GroceryItem
                upc={item.upc}
                aisleNumber={item.aisleNumber}
                description={item.description}
                image_url={item.image_url}
                price={item.price}
                clickHandler={toggleCartItem}
                quantity={item.quantity || 1}
                key={item.upc}
              />
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  innercontainer: {
    width: 350,
  },
  searchBar: {
    borderWidth: 1,
    fontSize: 18,
    height: 50,
    marginTop: 10,
    marginBottom: 40,
    padding: 5,
  },
});

export default Shop;
