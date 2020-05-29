import React, { useContext, useEffect, useState } from 'react';
import VolunteerContext from '../volunteer-context';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Logo from '../components/Logo';
import TimeOfDay from '../components/TimeOfDay';
import { AsyncStorage } from 'react-native';

const data = [
  {
    listId: 1,
    storeId: '94738291',
    created_at: 'Jan 20 2020',
    number_items: 24,
    lat: '39.716350',
    lng: '-104.932437',
  },
  {
    listId: 2,
    storeId: '9284093',
    created_at: 'Apr 15 2020',
    number_items: 16,
    lat: '39.743810',
    lng: '-104.999385',
  },
  {
    listId: 3,
    storeId: '9284098',
    created_at: 'May 1 2020',
    number_items: 11,
    lat: '39.674611',
    lng: '-104.938273',
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

const storeData = async () => {
  try {
    await AsyncStorage.setItem(
      '@MySuperStore:key',
      JSON.stringify({
        lists: ['list1', 'list2', 'list3'],
      }),
    );
  } catch (error) {
    // Error saving data
  }
};

const retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem('@MySuperStore:key');
    if (value !== null) {
      // We have data!!
      console.log(JSON.parse(value));
    }
  } catch (error) {
    // Error retrieving data
  }
};

const VolunteerHome = ({ navigation }) => {
  const { volunteer } = useContext(VolunteerContext);
  const [listData, setListData] = useState([]);
  useEffect(() => {
    let newData = data.map((item) => {
      let distance = calcCrow(
        item.lat,
        item.lng,
        volunteer.location[0],
        volunteer.location[1],
      );
      return { distance, ...item };
    });
    setListData(newData);
    console.log(newData);
    console.log(listData);
  }, []);

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
        <FlatList
          style={styles.list}
          data={listData}
          keyExtractor={(item) => item.listId.toString()}
          renderItem={({ item }) => {
            console.log(item);
            return (
              <View>
                <Text style={styles.listtext}>
                  Distance: {item.distance.toFixed(2)}
                </Text>
                <Text style={styles.listtext}>Items: {item.number_items}</Text>
                <Text style={styles.listtext}>
                  Days old: {item.number_items}
                </Text>
              </View>
            );
          }}
        />
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
  currentOrder: {
    alignItems: 'center',
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
  details: {
    alignSelf: 'flex-start',
    marginTop: 15,
  },
  detailsText: {
    fontSize: 18,
    marginTop: 2,
  },
  submitted: {
    fontSize: 24,
    marginTop: 20,
  },
  listtext: {
    color: 'black',
  },
  list: {},
});

export default VolunteerHome;
