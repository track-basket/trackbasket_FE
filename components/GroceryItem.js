import React, { useContext } from 'react';
import UserContext from '../user-context';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import QuantityPicker from '../components/QuantityPicker';

const GroceryItem = ({
  upc,
  price,
  image_url,
  description,
  aisleNumber,
  clickHandler,
  quantity,
}) => {
  const { cart } = useContext(UserContext);
  const getButtonText = () => {
    if (cart.find((item) => item.upc === upc)) {
      return 'Remove From Cart';
    } else {
      return 'Add To Cart';
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.descriptionArea}>
        <Text key={description} style={styles.description}>
          {description}
        </Text>
        <Text key={description + 'price'} style={styles.description}>
          ${price}
        </Text>
      </View>
      <Image
        key={description + 'url'}
        source={{ uri: image_url }}
        style={styles.itemImage}
      />
      <QuantityPicker />
      <TouchableOpacity style={styles.button} onPress={() => clickHandler(upc)}>
        <Text style={styles.buttonText}>{getButtonText()}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#59DE7E',
    borderRadius: 5,
    marginTop: 60,
    marginBottom: 10,
    height: 25,
    width: 160,
  },
  buttonText: {
    color: '#EEEEEE',
    fontFamily: 'Helvetica-Bold',
    fontSize: 18,
    textAlign: 'center',
  },
  itemImage: {
    marginTop: 15,
    marginBottom: 15,
    height: 100,
    width: 110,
  },
  description: {
    textAlign: 'right',
  },
});

export default GroceryItem;
