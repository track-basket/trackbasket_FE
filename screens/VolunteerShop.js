/* eslint-disable no-shadow */
import React, { useState, useContext } from 'react';
import { StyleSheet, View, TextInput, ScrollView } from 'react-native';
import VolunteerContext from '../volunteer-context';
import VolunteerItems from '../components/VolunteerItems';

const VolunteerShop = () => {
  const { volunteer, assignedLists, singleList } = useContext(VolunteerContext);
  assignedLists.map((list) =>
    list.items.sort((a, b) => {
      return a.aisleNumber - b.aisleNumber;
    }),
  );
  console.log('c', singleList);

  return (
    <View style={styles.container}>
      <View style={styles.innercontainer}>
        {!!singleList &&
          singleList.selectedList.items.map((item) => (
            <VolunteerItems
              aisleNumber={item.aisleNumber}
              description={item.description}
              image={item.image_url}
              price={item.price}
              upc={item.upc}
              quantity={item.quantity}
              key={item.upc}
            />
          ))}
        {/* <ScrollView>
            {assignedLists.items.map((item) => {
              return item.upc;
            })}
          </ScrollView> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  innercontainer: {
    width: 350,
  },
  searchBar: {
    borderWidth: 1,
    fontSize: 18,
    height: 50,
    marginTop: 10,
    marginBottom: 40,
    padding: 5,
  },
});

export default VolunteerShop;
