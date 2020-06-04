/* eslint-disable no-shadow */
import React, { useState, useContext } from 'react';
import { StyleSheet, View, TextInput, ScrollView, Text } from 'react-native';
import GroceryItem from '../components/GroceryItem';
import UserContext from '../user-context';
import { fetchItems } from '../components/ApiCalls';

const Shop = () => {
  const [text, setText] = useState('');
  const [currentSearch, setCurrentSearch] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);

  const { removeFromCart, addToCart, cart, user } = useContext(UserContext);
  const toggleCartItem = (upc, quantity) => {
    let selectedItem = currentSearch.data.attributes.find(
      (item) => item.upc === upc,
    );
    if (cart.items.find((item) => item.upc === upc)) {
      removeFromCart(selectedItem);
      selectedItem.quantity = 1;
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
  const handleSearch = (item) => {
    setCurrentItem(item);
    fetchItems(item, user.id)
      .then((response) => response.json())
      .then((result) => setCurrentSearch(result))
      .catch((error) => console.log('error', error));
    setText('');
  };

  const validator = () => {
    if (currentSearch) {
      if (currentSearch.data) {
        if (!currentSearch.data.attributes.error) {
          return 'item found';
        }
      }
      if (currentSearch.message === 'Internal Server Error') {
        return '500 Error';
      }
      if (currentSearch.data.attributes.error) {
        return 'not found';
      }
    } else {
      return false;
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.innercontainer}>
        <TextInput
          placeholder="Search Items..."
          style={styles.searchBar}
          onChangeText={(text) => setText(text)}
          onSubmitEditing={() => handleSearch(text)}
          value={text}
        />
        {validator() === 'item found' && (
          <Text>{currentSearch.data.attributes.length} Items Found</Text>
        )}
        <ScrollView>
          {validator() === 'item found' &&
            currentSearch.data.attributes.map((item) => {
              return (
                <GroceryItem
                  upc={item.upc}
                  aisleNumber={item.aisle_number}
                  description={item.description}
                  image_url={item.image}
                  price={item.unit_price}
                  clickHandler={toggleCartItem}
                  quantity={checkForCart(item.upc)}
                  key={item.upc}
                />
              );
            })}
        </ScrollView>
        {!validator() && (
          <Text style={styles.initialHeader}>Enter a search term.</Text>
        )}
        {validator() === 'not found' && (
          <Text style={styles.initialHeader}>
            {'No items matching' + ' ' + currentItem}
          </Text>
        )}
        {validator() === '500 Error' && (
          <View>
            <Text style={styles.error}>Internal Server Error (500)</Text>
            <Text style={styles.initialHeader}>
              There was a problem on our end. Please try again shortly.
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingBottom: 100,
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
  initialHeader: {
    textAlign: 'center',
    fontFamily: 'HelveticaNeue',
    fontSize: 18,
    color: 'grey',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
});

export default Shop;
