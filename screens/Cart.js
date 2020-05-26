import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const Cart = ({ navigation, route }) => {
  return (
    <View>
      <Text>Cart</Text>
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
