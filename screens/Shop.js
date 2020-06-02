/* eslint-disable no-shadow */
import React, { useState, useContext } from 'react';
import { StyleSheet, View, TextInput, ScrollView } from 'react-native';
import GroceryItem from '../components/GroceryItem';
import UserContext from '../user-context';
import { fetchItems } from '../components/ApiCalls';

const sampleData = {
  id: 'searchItems',
  attributes: {
    items: [
      {
        upc: '0001111042852',
        aisle_number: 7,
        description: 'Simple Truth Organic™ 2% Reduced Fat Milk',
        image:
          'https://silk.com/wp-content/uploads/2019/02/unsweet-almond-coconut-blend-1.png',
        unit_price: 3.29,
      },
      {
        upc: '8305729934',
        aisle_number: 3,
        description: "Nature's Own Honey Wheat Sliced Bread",
        image:
          'https://user-images.githubusercontent.com/4350550/83094330-b3ac3980-a05e-11ea-97fb-9dfb29bc817b.png',
        unit_price: 2.99,
      },
      {
        upc: '3842389434',
        aisle_number: 12,
        description: 'Klondike The Original Ice Cream Bars',
        image:
          'https://user-images.githubusercontent.com/4350550/83094526-17cefd80-a05f-11ea-9856-7a5c8c3566e5.png',
        unit_price: 3.49,
      },
      {
        upc: '9128485812',
        aisle_number: 2,
        description: 'Kroger® Restaurant Style Tortilla Chips',
        image:
          'https://user-images.githubusercontent.com/4350550/83095102-dc80fe80-a05f-11ea-9027-73ae65963359.png',
        unit_price: 1.25,
      },
      {
        upc: '1592384912',
        aisle_number: 4,
        description: 'Simple Truth Organic™ Gala Apples Pouch',
        image:
          'https://user-images.githubusercontent.com/4350550/83095372-6fba3400-a060-11ea-91fc-f646038c2dfd.png',
        unit_price: 3.99,
      },
    ],
  },
};

const Shop = () => {
  const [text, setText] = useState('');
  const { attributes } = sampleData;
  const { items } = attributes;
  const { removeFromCart, addToCart, cart, user } = useContext(UserContext);
  const toggleCartItem = (upc, quantity) => {
    let selectedItem = items.find((item) => item.upc === upc);
    if (cart.items.find((item) => item.upc === upc)) {
      selectedItem.quantity = 1;
      removeFromCart(selectedItem);
    } else {
      selectedItem.quantity = quantity;
      addToCart(selectedItem);
    }
  };
  const checkForCart = (upc) => {
    if (cart) {
      if (cart.items.find((item) => item.upc === upc)) {
        return cart.items.find((item) => item.upc === upc).quantity;
      } else {
        return 1;
      }
    } else {
      return '';
    }
  };
  fetchItems('milk', user.id);
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
                quantity={checkForCart(item.upc)}
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
