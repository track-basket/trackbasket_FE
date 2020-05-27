import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons';

const QuantityPicker = () => {
  const [itemCount, setItemCount] = useState(1);
  const quantityController = (operator) => {
    if (operator === 'add') {
      setItemCount(itemCount + 1);
    }
    if (operator === 'subtract' && itemCount > 1) {
      setItemCount(itemCount - 1);
    }
  };
  return (
    <View style={styles.quantity}>
      <Text>Quantity:</Text>
      <TextInput style={styles.textInput} value={itemCount.toString()} />
      <MaterialIcons
        name="control-point"
        color="black"
        size={30}
        onPress={() => quantityController('add')}
      />
      <MaterialIcons
        name="remove-circle-outline"
        color="black"
        size={30}
        onPress={() => quantityController('subtract')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    textAlign: 'center',
    width: 20,
  },
});

export default QuantityPicker;
