import React, { useContext } from 'react';
import VolunteerContext from '../volunteer-context';

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Logo from '../components/Logo';
import TimeOfDay from '../components/TimeOfDay';
import { AsyncStorage } from 'react-native';

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
  console.log(volunteer);
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
});

export default VolunteerHome;
