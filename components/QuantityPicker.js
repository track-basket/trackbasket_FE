import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons';

const QuantityPicker = ({ quantity, quantityController }) => {
  return (
    <View style={styles.quantity}>
      <MaterialIcons
        name="remove-circle-outline"
        color="black"
        size={30}
        onPress={() => quantityController('subtract')}
      />

      <TextInput style={styles.textInput} value={quantity.toString()} />
      <MaterialIcons
        name="control-point"
        color="black"
        size={30}
        onPress={() => quantityController('add')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    textAlign: 'center',
    width: 30,
    fontSize: 20,
    marginHorizontal: 10,
  },
  quantity: {
    flexDirection: 'row',
  },
});

export default QuantityPicker;
