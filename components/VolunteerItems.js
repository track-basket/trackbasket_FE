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
}) => {
  const { volunteer, assignedLists, setAssignedLists } = useContext(
    VolunteerContext,
  );
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
            ${price} Aisle {aisleNumber}
          </Text>
          <View style={styles.bottomRow}>
            <View style={styles.bottomBlock}>
              <TouchableOpacity>
                <MaterialIcons
                  name="done"
                  color="green"
                  size={30}
                  onPress={() => {}}
                />
                <Text>Retrieved</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.bottomBlock}>
              <TouchableOpacity>
                <MaterialIcons
                  name="close"
                  color="red"
                  size={30}
                  onPress={() => {}}
                />
                <Text>Unavailable</Text>
              </TouchableOpacity>
            </View>
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
  bottomRow: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  bottomBlock: {
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});

export default VolunteerItems;
