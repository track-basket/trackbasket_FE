import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import UserContext from '../user-context';
import GroceryItem from '../components/GroceryItem';

const Cart = () => {
  const { removeFromCart, addToCart, cart } = useContext(UserContext);
  const toggleCartItem = (upc) => {
    let selectedItem = cart.find((item) => item.upc === upc);
    addToCart(selectedItem);
    if (cart.find((item) => item.upc === upc)) {
      removeFromCart(selectedItem);
    }
  };
  if (cart.length) {
    return (
      <View>
        <Text>Cart</Text>
        {cart.map((item) => {
          return (
            <GroceryItem
              upc={item.upc}
              aisleNumber={item.aisleNumber}
              description={item.description}
              image_url={item.image_url}
              price={item.price}
              clickHandler={toggleCartItem}
              key={item.upc}
            />
          );
        })}
      </View>
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
