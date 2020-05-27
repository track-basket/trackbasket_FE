import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import UserContext from '../user-context';
import GroceryItem from '../components/GroceryItem';

const Cart = () => {
  const { user, cart } = useContext(UserContext);
  console.log(user, cart);
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
});

export default Cart;
