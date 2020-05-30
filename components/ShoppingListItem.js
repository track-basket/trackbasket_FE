import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ShoppingListItem = ({ item, navigation }) => {
  return (
    <View style={styles.listItem}>
      <View style={styles.listInfo}>
        <Text style={styles.listText}>
          Distance: {item.distance.toFixed(2)} miles
        </Text>
        <Text style={styles.listText}>Items: {item.number_items}</Text>
        <Text style={styles.listText}>Requested {item.age}</Text>
      </View>
      <TouchableOpacity
        style={styles.selectListBtn}
        onPress={() => navigation.navigate('Confirm list', item)}
      >
        <Text style={styles.selectListBtnText}>DETAILS</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  listText: {
    fontSize: 18,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    alignItems: 'center',
  },
  selectListBtn: {
    borderWidth: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginLeft: 20,
  },
  selectListBtnText: {
    fontSize: 20,
  },
});

export default ShoppingListItem;
