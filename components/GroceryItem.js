import React, { useState, useContext } from 'react';
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
  qc,
}) => {
  const { cart, updateCart } = useContext(UserContext);
  const [itemCount, setItemCount] = useState(quantity);
  const determineIfInCart = () => {
    if (cart && cart.items.find((item) => item.upc === upc)) {
      return quantity;
    } else {
      return itemCount;
    }
  };
  const quantityController = (operator) => {
    if (operator === 'add') {
      setItemCount(itemCount + 1);
      let selectedItem = cart.items.find((item) => item.upc === upc);
      if (selectedItem) {
        updateCart(selectedItem, operator);
      }
    }
    if (operator === 'subtract' && itemCount > 1) {
      setItemCount(itemCount - 1);
      let selectedItem = cart.items.find((item) => item.upc === upc);
      if (selectedItem) {
        updateCart(selectedItem, operator);
      }
    }
  };
  const getButtonText = () => {
    if (cart && cart.items.find((item) => item.upc === upc)) {
      return 'Remove From Cart';
    } else {
      return 'Add To Cart';
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.imgDescriptionContainer}>
        <View style={styles.imgBorder}>
          <Image
            key={description + 'url'}
            source={{ uri: image_url }}
            style={styles.itemImage}
          />
        </View>
        <View style={styles.descriptionArea}>
          <Text key={description} style={styles.description}>
            {description}
          </Text>
          <Text key={description + 'price'} style={styles.description}>
            ${price}
          </Text>
        </View>
      </View>

      <View style={styles.quantityBtnRow}>
        <QuantityPicker
          quantity={determineIfInCart()}
          upc={upc}
          quantityController={quantityController}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => clickHandler(upc, itemCount)}
        >
          <Text style={styles.buttonText}>{getButtonText()}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imgDescriptionContainer: {
    flexDirection: 'row',
  },
  imgBorder: {
    // borderWidth: 1,
    // borderRadius: 2,
    // borderColor: '#DEE078',
    marginRight: 20,
    backgroundColor: 'white',
  },
  container: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#DEE078',
    padding: 15,
    marginBottom: 40,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DEE078',
    padding: 10,
  },
  buttonText: {
    color: 'black',
    fontFamily: 'Helvetica',
    fontSize: 18,
  },
  itemImage: {
    flex: 1,
    width: 110,
    height: 110,
    resizeMode: 'contain',
  },
  description: {
    fontFamily: 'HelveticaNeue-Bold',
    fontSize: 18,
  },
  descriptionArea: {
    flexShrink: 1,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  quantityBtnRow: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default GroceryItem;
