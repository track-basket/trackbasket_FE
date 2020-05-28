import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import UserContext from '../user-context';
import GroceryItem from '../components/GroceryItem';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from '../components/Button';

const Cart = ({ navigation }) => {
  const { removeFromCart, addToCart, cart } = useContext(UserContext);
  const toggleCartItem = (upc) => {
    let selectedItem = cart.find((item) => item.upc === upc);
    addToCart(selectedItem);
    if (cart.find((item) => item.upc === upc)) {
      removeFromCart(selectedItem);
    }
  };
  const submitShoppingList = () => {
    console.log(cart);
    //apicalls method to post shopping list
    navigation.navigate('Home', { info: 'Your order has been submitted!' });
  };
  if (cart.length > 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Your cart</Text>

        <View style={styles.innercontainer}>
          {cart.map((item) => {
            if (item.upc) {
              return (
                <GroceryItem
                  upc={item.upc}
                  aisleNumber={item.aisleNumber}
                  description={item.description}
                  image_url={item.image_url}
                  price={item.price}
                  clickHandler={toggleCartItem}
                  quantity={1}
                  key={item.upc + 'cart'}
                />
              );
            }
          })}
          <TouchableOpacity onPress={() => submitShoppingList()}>
            <Button text="SUBMIT ORDER" onPress={submitShoppingList} />
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Your cart is empty</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header: {
    fontSize: 30,
    marginTop: 10,
    marginBottom: 30,
  },
  innercontainer: {
    width: 350,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 24,
  },
});

export default Cart;
