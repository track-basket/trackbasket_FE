/* eslint-disable no-shadow */
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import GroceryItem from '../components/GroceryItem';

const Shop = ({ navigation, route }) => {
  const [text, setText] = useState('');
  return (
    <View>
      <TextInput
        placeholder="Search Items..."
        style={styles.searchBar}
        onChangeText={(text) => setText(text)}
        onSubmitEditing={() => console.log(text)}
      />
      <GroceryItem />
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
  searchBar: {
    borderWidth: 1,
    fontSize: 18,
    height: 50,
    margin: 10,
    padding: 5,
  },
});

export default Shop;
