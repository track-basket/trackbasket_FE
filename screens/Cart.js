import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import UserContext from '../user-context';
import GroceryItem from '../components/GroceryItem';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from '../components/Button';

const Cart = ({ navigation, route }) => {
  const { removeFromCart, addToCart, cart, submitOrder } = useContext(
    UserContext,
  );
  const toggleCartItem = (upc) => {
    let selectedItem = cart.items.find((item) => item.upc === upc);
    addToCart(selectedItem);
    if (cart.items.find((item) => item.upc === upc)) {
      removeFromCart(selectedItem);
    }
  };
  const submitShoppingList = () => {
    console.log(cart);
    //apicalls method to post shopping list
    submitOrder();
    navigation.navigate('Home', { msg: 'Your order has been submitted!' });
  };
  if (cart.items.length > 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Your cart</Text>

        <View style={styles.innercontainer}>
          {cart.items.map((item) => {
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
          {cart.status === 'not submitted' && (
            <TouchableOpacity onPress={() => submitShoppingList()}>
              <Button text="SUBMIT ORDER" onPress={submitShoppingList} />
            </TouchableOpacity>
          )}
          {cart.status === 'pending' && (
            <TouchableOpacity onPress={() => submitShoppingList()}>
              <Button text="EDIT ORDER" onPress={submitShoppingList} />
            </TouchableOpacity>
          )}
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
