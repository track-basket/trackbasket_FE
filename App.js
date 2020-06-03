import React, { useState, useEffect } from 'react';
import { StyleSheet, AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  HeaderHeightContext,
} from '@react-navigation/stack';
import Home from './screens/Home';
import VolunteerHome from './screens/VolunteerHome';
import LoginModal from './screens/LoginModal';
import ChangeStatusModal from './screens/ChangeStatusModal';
import ConfirmDelete from './screens/ConfirmDelete';
import ConfirmList from './screens/ConfirmList';
import SelectList from './screens/SelectList';
import CompletedModal from './screens/CompletedModal';
import VolunteerLoginModal from './screens/VolunteerLoginModal';
import AtRiskTabs from './screens/AtRiskTabs';
import VolunteerTabs from './screens/VolunteerTabs';
import { UserProvider } from './user-context';
import { VolunteerProvider } from './volunteer-context';
import * as Location from 'expo-location';
import moment from 'moment';
import { postList, updateList } from './components/ApiCalls';

const RootStack = createStackNavigator();
const MainStack = createStackNavigator();

const storeData = async (lists) => {
  try {
    await AsyncStorage.setItem(
      'assignedLists',
      JSON.stringify({
        lists,
      }),
    );
  } catch (error) {
    console.log('Error saving data');
  }
};

const MainStackScreen = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="AtRiskTabs"
        component={AtRiskTabs}
        options={{ title: '' }}
      />
      <MainStack.Screen
        name="VolunteerHome"
        component={VolunteerHome}
        options={({ title: '' }, { headerShown: false })}
      />
      <MainStack.Screen
        name="VolunteerTabs"
        component={VolunteerTabs}
        options={{ title: '' }}
      />
      <MainStack.Screen
        name="SelectList"
        component={SelectList}
        options={{ title: '' }}
      />
    </MainStack.Navigator>
  );
};

const App = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState({ items: [], status: 'not submitted' });
  const addToCart = (newItem) =>
    setCart(
      cart.items.length
        ? { items: [...cart.items, newItem], status: cart.status }
        : { items: [newItem], status: cart.status },
    );
  const removeFromCart = (selectedItem) => {
    let items = [...cart.items];
    let desiredItem = items.find((item) => {
      return item.upc === selectedItem.upc;
    });
    let index = items.indexOf(desiredItem);
    items[index].quantity = 1;
    setCart({
      items: items.filter((item) => item.upc !== selectedItem.upc),
      status: 'not submitted',
    });
  };
  const formatDate = (malformedDate) => {
    if (malformedDate.charAt(2) === '/') {
      const [date, time] = malformedDate.split(' ');
      const [day, month, year] = date.split('/');
      return `${year}-${month}-${day} ${time}`;
    } else {
      return malformedDate;
    }
  };
  const updateCart = (updatedItem, operator) => {
    let items = [...cart.items];
    let desiredItem = items.find((item) => {
      return item.upc === updatedItem.upc;
    });
    if (operator === 'add') {
      desiredItem.quantity = updatedItem.quantity + 1;
    }
    if (operator === 'subtract') {
      desiredItem.quantity = updatedItem.quantity - 1;
    }
    let index = items.indexOf(desiredItem);
    items[index].quantity = updatedItem.quantity;
    setCart({ items: items, status: cart.status });
  };
  const setNewUser = (user) => setUser(user);
  const submitOrder = () => {
    postList({
      items: cart.items,
      status: 'pending',
      id: user.id,
    }).then((res) => {
      let resultCart = res.data.attributes;
      let [date, time] = resultCart.created_date.split(' ');

      const [day, month, year] = date.split('/');
      const newTime = moment(`${year}-${month}-${day} ${time}`)
        .subtract(6, 'hours')
        .format('YYYY-MM-DD HH:mm');
      resultCart.created_date = newTime;
      setCart(resultCart);
    });
  };
  const editOrder = () => {
    updateList({
      items: cart.items,
      status: 'pending',
      id: user.id,
    }).then((res) => {
      let resultCart = res.data.attributes;
      let [date, time] = resultCart.created_date.split(' ');

      const [day, month, year] = date.split('/');
      const newTime = moment(`${year}-${month}-${day} ${time}`)
        .subtract(6, 'hours')
        .format('YYYY-MM-DD HH:mm');
      resultCart.created_date = newTime;
      setCart(resultCart);
    });
  };
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [installationId, setInstallationId] = useState(null);
  const [volunteer, setVolunteer] = useState(null);
  const [assignedLists, setAssignedLists] = useState([]);
  const [singleList, setSingleList] = useState(null);
  const [allLists, setAllLists] = useState(null);
  const [volunteersLists, setVolunteersLists] = useState([]);

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('assignedLists');
      if (value !== null) {
        // We have data!!
        console.log('retrieving: ' + JSON.parse(value).lists);
        setAssignedLists(JSON.parse(value).lists);
      }
    } catch (error) {}
  };

  useEffect(() => {
    storeData(assignedLists);
  }, [assignedLists]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation([
        userLocation.coords.latitude,
        userLocation.coords.longitude,
      ]);
    })();
    retrieveData();
  }, []);
  return (
    <VolunteerProvider
      value={{
        volunteer,
        setVolunteer,
        installationId,
        setInstallationId,
        submitOrder,
        assignedLists,
        setAssignedLists,
        location,
        setLocation,
        allLists,
        setAllLists,
        setSingleList,
        singleList,
        formatDate,
        volunteersLists,
        setVolunteersLists,
      }}
    >
      <UserProvider
        value={{
          user,
          cart,
          addToCart,
          removeFromCart,
          setNewUser,
          location,
          installationId,
          setInstallationId,
          submitOrder,
          editOrder,
          updateCart,
          setCart,
          formatDate,
        }}
      >
        <NavigationContainer>
          <RootStack.Navigator mode="modal">
            <RootStack.Screen
              name="Main"
              component={MainStackScreen}
              options={{ headerShown: false }}
            />
            <RootStack.Screen name="Your Profile" component={LoginModal} />
            <RootStack.Screen
              name="Volunteer Profile"
              component={VolunteerLoginModal}
            />
            <RootStack.Screen name="Confirm List" component={ConfirmList} />
            <RootStack.Screen
              name="Change Status"
              component={ChangeStatusModal}
            />
            <MainStack.Screen
              name="CompletedModal"
              component={CompletedModal}
              options={{ title: '' }}
            />
            <RootStack.Screen name="Confirm Delete" component={ConfirmDelete} />
          </RootStack.Navigator>
        </NavigationContainer>
      </UserProvider>
    </VolunteerProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
