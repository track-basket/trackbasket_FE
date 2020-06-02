import React, { useContext } from 'react';
import UserContext from '../user-context';

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Logo from '../components/Logo';
import TimeOfDay from '../components/TimeOfDay';

const Home = ({ navigation, route }) => {
  const { user, cart } = useContext(UserContext);
  const handleEditOrder = () => {
    navigation.navigate('AtRiskTabs', {
      screen: 'Cart',
    });
  };
  return (
    <View style={styles.container}>
      {!user && (
        <View style={styles.innerContainer}>
          <Logo />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Your Profile');
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
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Volunteer Profile');
              }}
            >
              <View style={styles.button}>
                <Text style={styles.buttonText}>I'm a volunteer</Text>
              </View>
            </TouchableOpacity>
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
            onPress={() => navigation.navigate('Your Profile')}
            style={styles.editProfile}
          >
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
          {!cart.items.length && (
            <Text style={styles.orders}>No Current Orders</Text>
          )}
          {!!cart.items.length && (
            <View style={styles.currentOrder}>
              <Text style={styles.orders}>Current Order</Text>
              <View style={styles.orderStatus}>
                <View style={styles.orderBadge}>
                  <Text style={styles.orderBadgeText}>
                    {cart.status.toUpperCase()}
                  </Text>
                </View>
                <TouchableOpacity style={styles.editBtn}>
                  <Text style={styles.editBtnText} onPress={handleEditOrder}>
                    Edit Order
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.details}>
                <Text style={styles.detailsText}>
                  Items:{' '}
                  {cart.items.reduce((itemCount, item) => {
                    itemCount += item.quantity;
                    return itemCount;
                  }, 0)}
                </Text>
                <Text style={styles.detailsText}>
                  Submitted: {cart.submittedAt}
                </Text>
              </View>
            </View>
          )}
          {!cart.items.length && (
            <TouchableOpacity onPress={() => navigation.navigate('AtRiskTabs')}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Start Shopping</Text>
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
    fontFamily: 'HelveticaNeue-Bold',
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
    paddingVertical: 7,
    paddingHorizontal: 10,
    marginTop: 10,
    alignItems: 'center',
    borderRadius: 30,
  },
  editProfileText: {
    color: '#59DE7E',
    fontSize: 18,
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
    fontSize: 20,
  },
  currentOrder: {
    alignItems: 'center',
  },
  editBtn: {
    backgroundColor: 'lightgray',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    alignSelf: 'center',
  },
  editBtnText: {
    fontSize: 20,
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
