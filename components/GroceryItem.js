import React, { useState, useContext } from 'react';
import UserContext from '../user-context';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import QuantityPicker from '../components/QuantityPicker';

const GroceryItem = ({
  upc,
  price,
  image_url,
  description,
  aisleNumber,
  clickHandler,
  quantity,
  qc
}) => {
  const { cart, updateCart } = useContext(UserContext);
  const [itemCount, setItemCount] = useState(quantity);
  const quantityController = (operator) => {
    if (operator === 'add') {
      setItemCount(itemCount + 1);
      let selectedItem = cart.items.find((item) => item.upc === upc);
      if (selectedItem) {
        // selectedItem.quantity = itemCount;
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
    if (cart.items.find((item) => item.upc === upc)) {
      return 'Remove from cart';
    } else {
      return 'Add to cart';
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
          quantity={quantity}
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
    borderWidth: 1,
    marginRight: 20,
    backgroundColor: 'white',
  },
  container: {
    marginBottom: 40,
    alignItems: 'stretch',
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'lightgray',
    padding: 10,
    // borderRadius: 5,
    // height: 25,
  },
  buttonText: {
    color: 'black',
    fontFamily: 'Helvetica',
    fontSize: 18,
  },
  itemImage: {
    marginTop: 15,
    marginBottom: 15,
    height: 100,
    width: 110,
  },
  description: {
    fontSize: 22,
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
    justifyContent: 'space-around',
    marginHorizontal: 20,
  },
});

export default GroceryItem;
