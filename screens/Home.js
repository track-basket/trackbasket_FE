import React, { useContext, useState, useCallback, useEffect } from 'react';
import UserContext from '../user-context';
import { getList } from '../components/ApiCalls';
import moment from 'moment';
import StatusBadge from '../components/StatusBadge';
import io from 'socket.io-client';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import Logo from '../components/Logo';
import TimeOfDay from '../components/TimeOfDay';

let socket;

const Home = ({ navigation, route }) => {
  const {
    user,
    cart,
    setCart,
    formatDate,
    setAllMessages,
    allMessages,
    newMessage,
  } = useContext(UserContext);

  const handleEditOrder = () => {
    navigation.navigate('AtRiskTabs', {
      screen: 'Cart',
    });
  };

  useEffect(() => {
    if (user) {
      socket = io('https://trackbasket.herokuapp.com', {
        transports: ['websocket'],
      });
      socket.emit('joinRoom', { id: user.id });
      socket.on('chat message', (msg) => {
        setAllMessages((allMessages) => [...allMessages, msg]);
      });
      socket.on('status change', (msg) => {
        getList(user.id).then((result) => {
          if (result.message !== 'Internal Server Error') {
            let resultCart = result.data.attributes;
            setCart(resultCart);
          }
        });
      });
    }
  }, [user]);

  useEffect(() => {
    if (newMessage) {
      socket.emit('chat message', {
        id: user.id,
        message: user.name + ': ' + newMessage,
        volunteer_id: cart.volunteer_id,
      });
    }
  }, [newMessage]);

  let draft = cart.items.length && cart.status === 'not submitted';

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
            <Text style={styles.editProfileText}>Edit profile</Text>
          </TouchableOpacity>
          {!cart.items.length && (
            <Text style={styles.orders}>No current order</Text>
          )}
          {cart.status !== 'not submitted' && (
            <ScrollView>
              <Text style={styles.orders}>Current order</Text>
              <View style={styles.orderStatus}>
                <StatusBadge status={cart.status} />
                {cart.status === 'pending' && (
                  <TouchableOpacity style={styles.editBtn}>
                    <Text style={styles.editBtnText} onPress={handleEditOrder}>
                      Edit order
                    </Text>
                  </TouchableOpacity>
                )}
                {cart.status !== 'pending' && (
                  <TouchableOpacity style={styles.editBtn}>
                    <Text
                      style={styles.editBtnText}
                      onPress={() => navigation.navigate('AtRiskChat')}
                    >
                      {`Chat(${allMessages.length})`}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.details}>
                <Text style={styles.detailsText}>
                  Items:{' '}
                  {cart.items.reduce((itemCount, item) => {
                    itemCount += item.quantity;
                    return itemCount;
                  }, 0)}
                </Text>
                {cart.created_date ? (
                  <Text style={styles.detailsText}>
                    Submitted:{' '}
                    {moment(formatDate(cart.created_date))
                      .subtract(6, 'hours')
                      .format('h:mm a, MMMM D')}
                  </Text>
                ) : (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('AtRiskTabs')}
                  >
                    <View style={styles.button}>
                      <Text style={styles.buttonText}>Continue shopping</Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            </ScrollView>
          )}
          {!!draft && (
            <View>
              <Text style={styles.orders}>Current order</Text>
              <View style={styles.orderStatus}>
                <StatusBadge status={cart.status} />
                {cart.status === 'pending' && (
                  <TouchableOpacity style={styles.editBtn}>
                    <Text style={styles.editBtnText} onPress={handleEditOrder}>
                      Edit order
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.details}>
                <Text style={styles.detailsText}>
                  Items:{' '}
                  {cart.items.reduce((itemCount, item) => {
                    itemCount += item.quantity;
                    return itemCount;
                  }, 0)}
                </Text>
                {cart.created_date ? (
                  <Text style={styles.detailsText}>
                    Submitted:{' '}
                    {moment(formatDate(cart.created_date)).format(
                      'h:mm a, MMMM D',
                    )}
                  </Text>
                ) : (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('AtRiskTabs')}
                  >
                    <View style={styles.button}>
                      <Text style={styles.buttonText}>Continue shopping</Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
          {!cart.items.length && (
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
    paddingTop: 50,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#59DE7E',
    marginTop: 45,
    marginBottom: 10,
    height: 90,
    width: 250,
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
    width: 180,
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
  },
  editProfileText: {
    color: '#59DE7E',
    fontSize: 18,
  },
  orders: {
    fontSize: 26,
    textAlign: 'center',
    marginTop: 30,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  orderStatus: {
    alignSelf: 'center',
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

  padding: {
    height: 100,
  },
});

export default Home;
