/* eslint-disable no-shadow */
import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  Text,
  SectionList,
} from 'react-native';
import VolunteerContext from '../volunteer-context';
import VolunteerItems from '../components/VolunteerItems';

const VolunteerShop = ({ route }) => {
  const {
    volunteer,
    assignedLists,
    setSingleList,
    setAssignedLists,
  } = useContext(VolunteerContext);
  assignedLists.map((list) =>
    list.items.sort((a, b) => {
      return a.aisleNumber - b.aisleNumber;
    }),
  );

  let singleListId = route.params.selectedList;
  setSingleList(singleListId);
  let selectedList = assignedLists.find((item) => item.listId === singleListId);
  if (selectedList) {
    selectedList = selectedList.items;
  } else {
    return (
      <View>
        <Text>No selected list</Text>
      </View>
    );
  }

  const aisles = selectedList.reduce((acc, el) => {
    if (!acc.includes(el.aisle_number)) {
      acc.push(el.aisle_number);
    }
    return acc;
  }, []);
  const DATA = aisles.map((aisle) => {
    return {
      title: 'Aisle ' + aisle,
      data: selectedList.filter((item) => item.aisle_number === aisle),
    };
  });

  const handleClick = (upc, type) => {
    const items = [...assignedLists];
    const selectedList = items.find((list) => list.listId === singleListId);
    const selectedItem = selectedList.items.find((item) => item.upc === upc);
    const index = selectedList.items.indexOf(selectedItem);
    if (type === 'acquired') {
      selectedList.items[index].acquired = !selectedItem.acquired;
    }
    if (type === 'acquired' && selectedItem.unavailable) {
      selectedList.items[index].unavailable = false;
    }
    if (type === 'unavailable') {
      selectedList.items[index].unavailable = !selectedItem.unavailable;
      if (type === 'unavailable' && selectedItem.acquired) {
        selectedList.items[index].acquired = false;
      }
    }

    setAssignedLists(items);
  };
  return (
    <View style={styles.container}>
      <View style={styles.innercontainer}>
        <SectionList
          sections={DATA}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => (
            <VolunteerItems
              aisleNumber={item.aisleNumber}
              description={item.description}
              image={item.image_url}
              price={item.price}
              upc={item.upc}
              quantity={item.quantity}
              key={item.upc}
              handleClick={handleClick}
              acquired={item.acquired}
              unavailable={item.unavailable}
            />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.header}>{title}</Text>
          )}
          stickySectionHeadersEnabled={false}
        />
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
    marginTop: 10,
  },
  searchBar: {
    borderWidth: 1,
    fontSize: 18,
    height: 50,
    marginTop: 10,
    marginBottom: 40,
    padding: 5,
  },
  header: {
    fontSize: 25,
    marginBottom: 10,
  },
});

export default VolunteerShop;
