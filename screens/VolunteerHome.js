import React, { useContext, useEffect, useState } from 'react';
import VolunteerContext from '../volunteer-context';
import { SafeAreaView } from 'react-native-safe-area-context';
import moment from 'moment';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Picker,
} from 'react-native';
import Logo from '../components/Logo';
import TimeOfDay from '../components/TimeOfDay';
// import { AsyncStorage } from 'react-native';

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

// const storeData = async () => {
//   try {
//     await AsyncStorage.setItem(
//       '@MySuperStore:key',
//       JSON.stringify({
//         lists: ['list1', 'list2', 'list3'],
//       }),
//     );
//   } catch (error) {
//     // Error saving data
//   }
// };

// const retrieveData = async () => {
//   try {
//     const value = await AsyncStorage.getItem('@MySuperStore:key');
//     if (value !== null) {
//       // We have data!!
//       console.log(JSON.parse(value));
//     }
//   } catch (error) {
//     // Error retrieving data
//   }
// };

const VolunteerHome = ({ navigation }) => {
  const { volunteer } = useContext(VolunteerContext);
  const [listData, setListData] = useState([]);
  const [sort, setSort] = useState('quantity-ascending');
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
      return { distance, age, daysOld, ...item };
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
        <Logo />
        <Text style={styles.greeting}>
          <TimeOfDay />, {volunteer.name}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Volunteer profile')}
          style={styles.editProfile}
        >
          <Text style={styles.editProfileText}>EDIT PROFILE</Text>
        </TouchableOpacity>
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
            data={sortedData}
            keyExtractor={(item) => item.listId.toString()}
            renderItem={({ item }) => {
              return (
                <View style={styles.listItem}>
                  <View style={styles.listInfo}>
                    <Text style={styles.listText}>
                      Distance: {item.distance.toFixed(2)} miles
                    </Text>
                    <Text style={styles.listText}>
                      Items: {item.number_items}
                    </Text>
                    <Text style={styles.listText}>Requested {item.age}</Text>
                  </View>
                  <TouchableOpacity style={styles.selectListBtn}>
                    <Text
                      style={styles.selectListBtnText}
                      onPress={() => navigation.navigate('Confirm list', item)}
                    >
                      SELECT
                    </Text>
                  </TouchableOpacity>
                </View>
              );
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
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#59DE7E',
    marginTop: 45,
    marginBottom: 10,
    height: 90,
    width: 200,
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowRadius: 15,
    shadowOpacity: 0.2,
    shadowColor: 'black',
  },
  buttonText: {
    fontFamily: 'Helvetica',
    fontSize: 26,
    textAlign: 'center',
    width: 150,
    color: 'white',
  },
  greeting: {
    fontFamily: 'Helvetica',
    fontSize: 28,
    marginTop: 30,
    textAlign: 'center',
  },
  innerContainer: {
    marginBottom: 68,
    alignItems: 'center',
    width: 600,
  },
  secondaryText: {
    fontSize: 18,
    textAlign: 'center',
  },
  secondaryTextContainer: {
    width: 150,
  },
  editProfile: {
    backgroundColor: 'white',
    borderColor: '#59DE7E',
    borderWidth: 2,
    color: '#59DE7E',
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginTop: 15,
    width: 200,
    alignItems: 'center',
  },
  editProfileText: {
    color: '#59DE7E',
    fontSize: 26,
  },
  orders: {
    fontSize: 26,
    marginTop: 30,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  orderStatus: {
    flexDirection: 'row',
    marginTop: 20,
  },
  orderBadge: {
    backgroundColor: '#DEE078',
    borderRadius: 30,
    padding: 10,
    marginRight: 10,
  },
  orderBadgeText: {
    color: 'white',
    fontSize: 26,
  },

  editBtn: {
    backgroundColor: 'lightgray',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    alignSelf: 'center',
  },
  editBtnText: {
    fontSize: 24,
  },

  submitted: {
    fontSize: 24,
    marginTop: 20,
  },
  listText: {
    fontSize: 18,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    alignItems: 'center',
  },
  selectListBtn: {
    borderWidth: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginLeft: 20,
  },
  selectListBtnText: {
    fontSize: 20,
  },
  list: {
    flexGrow: 0,
    width: 350,
    height: 250,
  },
  volunteerOpportunitiesSubtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  volunteerOpportunitiesContainer: {
    marginTop: 20,
  },
  picker: {
    width: 200,
    height: 44,
    borderColor: 'black',
    borderWidth: 1,
  },
  onePickerItem: {
    height: 44,
    color: 'black',
  },
  sortTitle: {
    textAlign: 'center',
    marginBottom: 10,
  },
  sortContainer: {
    marginVertical: 20,
  },
});

export default VolunteerHome;
