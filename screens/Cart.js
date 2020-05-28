import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import UserContext from '../user-context';
import GroceryItem from '../components/GroceryItem';
import { ScrollView } from 'react-native-gesture-handler';

const Cart = () => {
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
  };
  if (cart.length > 1) {
    return (
      <ScrollView>
        <View>
          <Text>Cart</Text>
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
            <Text>Submit Order</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  } else {
    return <Text>Your Cart Is Empty</Text>;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Cart;
