import React, { useContext } from 'react';
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
}) => {
  const { cart } = useContext(UserContext);
  const getButtonText = () => {
    if (cart.find((item) => item.upc === upc)) {
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
        <QuantityPicker key={Math.random()} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => clickHandler(upc)}
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
    marginRight: 10,
  },
  container: {
    marginBottom: 50,
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
    fontSize: 18,
  },
  descriptionArea: {
    flexShrink: 1,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  quantityBtnRow: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default GroceryItem;
