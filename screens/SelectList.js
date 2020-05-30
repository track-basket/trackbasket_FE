import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Picker, FlatList } from 'react-native';
import ShoppingListItem from '../components/ShoppingListItem';
import VolunteerContext from '../volunteer-context';
import moment from 'moment';

const data = [
  {
    listId: 1,
    storeId: '94738291',
    created_at: '2020-01-20',
    number_items: 24,
    lat: '39.716350',
    lng: '-104.932437',
  },
  {
    listId: 2,
    storeId: '9284093',
    created_at: '2020-04-15',
    number_items: 16,
    lat: '39.743810',
    lng: '-104.999385',
  },
  {
    listId: 3,
    storeId: '9284098',
    created_at: '2020-05-22',
    number_items: 11,
    lat: '39.674611',
    lng: '-104.938273',
  },
  {
    listId: 4,
    storeId: '3434958',
    created_at: '2020-04-22',
    number_items: 17,
    lat: '39.732540',
    lng: '-104.973261',
  },
  {
    listId: 5,
    storeId: '9284098',
    created_at: '2020-02-22',
    number_items: 2,
    lat: '39.674611',
    lng: '-104.938273',
  },
  {
    listId: 6,
    storeId: '3434958',
    created_at: '2020-05-01',
    number_items: 55,
    lat: '39.732540',
    lng: '-104.973261',
  },
];

function calcCrow(lat1, lon1, lat2, lon2) {
  var R = 6371; // km
  var dLat = toRad(lat2 - lat1);
  var dLon = toRad(lon2 - lon1);
  var lat1 = toRad(lat1);
  var lat2 = toRad(lat2);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
}

// Converts numeric degrees to radians
function toRad(Value) {
  return (Value * Math.PI) / 180;
}

const SelectList = ({ navigation }) => {
  const [listData, setListData] = useState([]);
  const [sort, setSort] = useState('quantity-ascending');
  const { volunteer, assignedLists } = useContext(VolunteerContext);
  useEffect(() => {
    let newData = data.map((item) => {
      let distance = calcCrow(
        item.lat,
        item.lng,
        volunteer.location[0],
        volunteer.location[1],
      );
      let daysOld = moment().diff(moment(item.created_at), 'days');
      let age = moment(item.created_at).fromNow();
      let userDetails = {
        atriskuser_id: '2334534',
        name: 'John Doe',
        address: '729 E 10th Avenue',
        city: 'Denver',
        state: 'Colorado',
        'zip code': '80203',
        'phone number': '(721) 400-1342',
      };
      let status = 'SELECTED';
      return { distance, age, status, userDetails, daysOld, ...item };
    });
    setListData(newData);
  }, []);

  let sortedData;
  if (sort === 'distance-ascending') {
    sortedData = listData.sort((a, b) => {
      return a.distance < b.distance ? 1 : -1;
    });
  }
  if (sort === 'distance-descending') {
    sortedData = listData.sort((a, b) => {
      return a.distance > b.distance ? 1 : -1;
    });
  }
  if (sort === 'daysold-ascending') {
    sortedData = listData.sort((a, b) => {
      return a.daysOld < b.daysOld ? 1 : -1;
    });
  }
  if (sort === 'daysold-descending') {
    sortedData = listData.sort((a, b) => {
      return a.daysOld > b.daysOld ? 1 : -1;
    });
  }
  if (sort === 'quantity-ascending') {
    sortedData = listData.sort((a, b) => {
      return a.number_items < b.number_items ? 1 : -1;
    });
  }
  if (sort === 'quantity-descending') {
    sortedData = listData.sort((a, b) => {
      return a.number_items > b.number_items ? 1 : -1;
    });
  }
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.volunteerOpportunitiesContainer}>
          <Text style={styles.volunteerOpportunitiesSubtitle}>
            Volunteer Opportunities
          </Text>
          <View style={styles.sortContainer}>
            <Text style={styles.sortTitle}>Sort by:</Text>
            <Picker
              selectedValue={sort}
              onValueChange={(itemValue, itemIndex) => setSort(itemValue)}
              style={styles.onePicker}
              itemStyle={styles.onePickerItem}
            >
              <Picker.Item
                label="Items (most to least)"
                value="quantity-ascending"
              />
              <Picker.Item
                label="Items (least to most)"
                value="quantity-descending"
              />
              <Picker.Item
                label="Distance (farthest to closest)"
                value="distance-ascending"
              />
              <Picker.Item
                label="Distance (closest to farthest)"
                value="distance-descending"
              />
              <Picker.Item
                label="Days Old (oldest to newest)"
                value="daysold-ascending"
              />
              <Picker.Item
                label="Days Old (newest to oldest)"
                value="daysold-descending"
              />
            </Picker>
          </View>
          <FlatList
            style={styles.list}
            data={sortedData.filter(
              (item) => assignedLists.indexOf(item) === -1,
            )}
            keyExtractor={(item) => item.listId.toString()}
            renderItem={({ item }) => {
              return <ShoppingListItem item={item} navigation={navigation} />;
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    // justifyContent: 'center',
    flex: 1,
    backgroundColor: 'white',
    marginTop: 0,
  },
  volunteerOpportunitiesContainer: {
    marginTop: 20,
  },
  volunteerOpportunitiesSubtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    // marginBottom: 10,
  },
  sortTitle: {
    textAlign: 'center',
    marginBottom: 10,
  },
  sortContainer: {
    marginVertical: 20,
  },
  picker: {
    width: 200,
    height: 44,
    // borderColor: 'black',
    // borderWidth: 1,
  },
  onePickerItem: {
    height: 44,
    color: 'black',
  },
});

export default SelectList;
