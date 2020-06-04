/* eslint-disable no-shadow */
import React, { useContext, useEffect } from 'react';
import { StyleSheet, View, Text, SectionList } from 'react-native';
import VolunteerContext from '../volunteer-context';
import VolunteerItems from '../components/VolunteerItems';
import { getList, getAtRiskUser } from '../components/ApiCalls';

const VolunteerShop = ({ route }) => {
  const { setSingleList, singleList } = useContext(VolunteerContext);

  if (route) {
    var singleListId = route.params.selectedList;
    // console.log(singleListId);
  }
  useEffect(() => {
    getList(singleListId).then((data) => {
      getAtRiskUser(singleListId).then((user) => {
        setSingleList({ ...data, userDetails: user.data.attributes });
      });
    });
  }, []);

  if (!singleList) {
    return (
      <View>
        <Text>No selected list</Text>
      </View>
    );
  }

  const aisles = singleList.data.attributes.items
    .reduce((acc, el) => {
      if (!acc.includes(el.aisle_number)) {
        acc.push(el.aisle_number);
      }
      return acc;
    }, [])
    .sort((a, b) => a - b);
  const DATA = aisles.map((aisle) => {
    return {
      title: 'Aisle ' + aisle,
      data: singleList.data.attributes.items.filter(
        (item) => item.aisle_number === aisle,
      ),
    };
  });

  const handleClick = (upc, type) => {
    const singleListCopy = { ...singleList };
    const selectedList = singleListCopy.data.attributes;
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
    singleListCopy.data.attributes = selectedList;
    setSingleList(singleListCopy);
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
              image={item.image}
              price={item.unit_price}
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
