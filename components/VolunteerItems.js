/* eslint-disable no-shadow */
import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import VolunteerContext from '../volunteer-context';
import { MaterialIcons } from 'react-native-vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const VolunteerItems = ({
  upc,
  price,
  image,
  description,
  aisleNumber,
  quantity,
  handleClick,
  acquired,
  unavailable,
}) => {
  const { volunteer, assignedLists, setAssignedLists } = useContext(
    VolunteerContext,
  );
  let highlightedAcquired;
  let highlightedUnavailable;
  if (acquired) {
    highlightedAcquired = { borderColor: 'gray', borderWidth: 1 };
  }
  if (unavailable) {
    highlightedUnavailable = { borderColor: 'gray', borderWidth: 1 };
  }
  console.log(acquired);
  return (
    <View style={styles.container}>
      <View style={styles.imgDescriptionContainer}>
        <View style={styles.imgBorder}>
          <Image
            key={description + 'url'}
            source={{ uri: image }}
            style={styles.itemImage}
          />
        </View>
        <View style={styles.descriptionArea}>
          <Text key={description} style={styles.description}>
            {description}
          </Text>

          <Text key={description + 'price'} style={styles.description}>
            Price: ${price}
          </Text>
        </View>
      </View>

      <View style={styles.bottomRow}>
        <View style={styles.quantity}>
          <Text style={styles.quantityText}>Quantity: {quantity}</Text>
        </View>
        <View style={styles.options}>
          <View style={styles.bottomBlock}>
            <TouchableOpacity
              style={styles.icon}
              onPress={() => {
                handleClick(upc, 'acquired');
              }}
            >
              <View style={[styles.iconContainer, highlightedAcquired]}>
                <MaterialIcons name="done" color="green" size={30} />
              </View>
              <Text>Retrieved</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomBlock}>
            <TouchableOpacity
              style={styles.icon}
              onPress={() => {
                handleClick(upc, 'unavailable');
              }}
            >
              <View style={[styles.iconContainer, highlightedUnavailable]}>
                <MaterialIcons name="close" color="red" size={30} />
              </View>
              <Text>Unavailable</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    backgroundColor: 'white',
    marginRight: 20,
    justifyContent: 'center',
  },
  container: {
    marginBottom: 40,
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
  bottomRow: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomBlock: {
    marginHorizontal: 10,
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  options: {
    flexDirection: 'row',
  },
  icon: {
    alignItems: 'center',
  },
  iconContainer: {
    padding: 5,
    borderRadius: 100,
  },
});

export default VolunteerItems;
