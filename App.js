import React, { useState, useEffect } from 'react';
import { StyleSheet, AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import VolunteerHome from './screens/VolunteerHome';
import LoginModal from './screens/LoginModal';
import ConfirmList from './screens/ConfirmList';
import SelectList from './screens/SelectList';
import VolunteerLoginModal from './screens/VolunteerLoginModal';
import AtRiskTabs from './screens/AtRiskTabs';
import VolunteerTabs from './screens/VolunteerTabs';
import { UserProvider } from './user-context';
import { VolunteerProvider } from './volunteer-context';
import * as Location from 'expo-location';

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
        ? { items: [...cart.items, newItem], status: 'not submitted' }
        : { items: [newItem], status: 'not submitted' },
    );
  const removeFromCart = (selectedItem) => {
    let items = [...cart.items];
    let desiredItem = items.find((item) => {
      return item.upc === selectedItem.upc;
    });
    let index = items.indexOf(desiredItem);
    items[index].quantity = 0;
    setCart({
      items: items.filter((item) => item.upc !== selectedItem.upc),
      status: 'not submitted',
    });
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
    setCart({ items: cart.items, status: 'pending' });
  };
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [installationId, setInstallationId] = useState(null);
  const [volunteer, setVolunteer] = useState(null);
  const [assignedLists, setAssignedLists] = useState([]);
  const [singleList, findSingleList] = useState(null);
  const [allLists, setAllLists] = useState(null);

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
        findSingleList,
        singleList,
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
          updateCart,
        }}
      >
        <NavigationContainer>
          <RootStack.Navigator mode="modal">
            <RootStack.Screen
              name="Main"
              component={MainStackScreen}
              options={{ headerShown: false }}
            />
            <RootStack.Screen name="Your profile" component={LoginModal} />
            <RootStack.Screen
              name="Volunteer profile"
              component={VolunteerLoginModal}
            />
            <RootStack.Screen name="Confirm list" component={ConfirmList} />
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
