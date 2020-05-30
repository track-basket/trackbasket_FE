/* eslint-disable no-shadow */
import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView } from 'react-native';
import VolunteerContext from '../volunteer-context';

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
    <View>
      <Text>Hi</Text>
    </View>
    // <View style={styles.container}>
    //   <View style={styles.imgDescriptionContainer}>
    //     <View style={styles.imgBorder}>
    //       <Image
    //         key={description + 'url'}
    //         source={{ uri: image_url }}
    //         style={styles.itemImage}
    //       />
    //     </View>
    //     <View style={styles.descriptionArea}>
    //       <Text key={description} style={styles.description}>
    //         {description}
    //       </Text>

    //       <Text key={description + 'price'} style={styles.description}>
    //         ${price} Hi
    //       </Text>
    //     </View>
    //   </View>
    // </View>
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

export default VolunteerItems;
