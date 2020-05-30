/* eslint-disable no-shadow */
import React, { useState, useContext } from 'react';
import { StyleSheet, View, TextInput, ScrollView } from 'react-native';
import VolunteerContext from '../volunteer-context';

const VolunteerShop = () => {
  const { volunteer, assignedLists, setAssignedLists } = useContext(
    VolunteerContext,
  );
  console.log(
    'b',
    assignedLists
      .map((list) =>
        list.items.map((item) => {
          return item.upc;
        }),
      )
      .flat(),
  );
  return (
    <View style={styles.container}>
      <View style={styles.innercontainer}>
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
