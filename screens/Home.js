import React, { useContext } from 'react';
import UserContext from '../user-context';

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Logo from '../components/Logo';
import TimeOfDay from '../components/TimeOfDay';
import { Button } from '../components/Button';

const Home = ({ navigation, route }) => {
  const { user, cart } = useContext(UserContext);
  const handleEditOrder = () => {
    navigation.navigate('AtRiskTabs', { destination: 'cart' });
  };
  return (
    <View style={styles.container}>
      {!user && (
        <View style={styles.innerContainer}>
          <Logo />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Your profile');
              }}
            >
              <View style={styles.button}>
                <Text style={styles.buttonText}>I need groceries</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.secondaryTextContainer}>
              <Text style={styles.secondaryText}>
                Set up an account and shop
              </Text>
            </View>
            <View style={styles.button}>
              <Text style={styles.buttonText}>I'm a volunteer</Text>
            </View>
            <View style={styles.secondaryTextContainer}>
              <Text style={styles.secondaryText}>
                Choose a grocery list to shop
              </Text>
            </View>
          </View>
        </View>
      )}
      {!!user && (
        <View style={styles.innerContainer}>
          <Logo />
          <Text style={styles.greeting}>
            <TimeOfDay />, {user.name}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Your profile')}
            style={styles.editProfile}
          >
            <Text style={styles.editProfileText}>EDIT PROFILE</Text>
          </TouchableOpacity>
          {!cart.length && <Text style={styles.orders}>No current orders</Text>}
          {!!cart.length && (
            <View style={styles.currentOrder}>
              <Text style={styles.submitted}>
                {route.params ? route.params.msg : ''}
              </Text>
              <Text style={styles.orders}>Current order</Text>

              <View style={styles.orderStatus}>
                <View style={styles.orderBadge}>
                  <Text style={styles.orderBadgeText}>PENDING</Text>
                </View>
                <TouchableOpacity style={styles.editBtn}>
                  <Text style={styles.editBtnText} onPress={handleEditOrder}>
                    EDIT ORDER
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.details}>
                <Text style={styles.detailsText}>Items: {cart.length} </Text>
                <Text style={styles.detailsText}>Submitted: May 21, 2020 </Text>
              </View>
            </View>
          )}
          {!cart.length && (
            <TouchableOpacity onPress={() => navigation.navigate('AtRiskTabs')}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Start shopping</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      )}
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

export default Home;
