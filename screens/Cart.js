import React, { useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import UserContext from '../user-context';
import GroceryItem from '../components/GroceryItem';
import { Button } from '../components/Button';

const Cart = ({ navigation, route }) => {
  const { removeFromCart, addToCart, cart, submitOrder } = useContext(
    UserContext,
  );
  const toggleCartItem = (upc, quantity) => {
    let selectedItem = cart.items.find((item) => item.upc === upc);
    if (cart.items.find((item) => item.upc === upc)) {
      removeFromCart(selectedItem);
      selectedItem.quantity = quantity;
    } else {
      selectedItem.quantity = quantity;
      addToCart(selectedItem);
    }
  };
  const checkForCart = (upc) => {
    if (cart.items.find((item) => item.upc === upc)) {
      console.log(cart.items.find((item) => item.upc === upc).quantity);
      return cart.items.find((item) => item.upc === upc).quantity;
    } else {
      return 1;
    }
  };
  const submitShoppingList = () => {
    //apicalls method to post shopping list
    submitOrder();
    navigation.navigate('Home', { msg: 'Your order has been submitted!' });
  };
  if (cart.items.length > 0) {
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
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
                    quantity={checkForCart(item.upc)}
                    key={item.upc + 'cart'}
                  />
                );
              }
            })}
            {cart.status === 'not submitted' && (
              <TouchableOpacity
                onPress={() => submitShoppingList()}
                style={styles.submitBtn}
              >
                <Button text="SUBMIT ORDER" onPress={submitShoppingList} />
              </TouchableOpacity>
            )}
            {cart.status === 'pending' && (
              <TouchableOpacity
                onPress={() => submitShoppingList()}
                style={styles.submitBtn}
              >
                <Button text="SAVE ORDER" onPress={submitShoppingList} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
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
  contentContainer: {
    flexGrow: 1,
  },
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
  submitBtn: {
    marginBottom: 50,
  },
});

export default Cart;
