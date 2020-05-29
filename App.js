import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import LoginModal from './screens/LoginModal';
import AtRiskTabs from './screens/AtRiskTabs';
import { UserProvider } from './user-context';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

const RootStack = createStackNavigator();
const MainStack = createStackNavigator();

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
  const removeFromCart = (selectedItem) =>
    setCart({
      items: cart.items.filter((item) => item.upc !== selectedItem.upc),
      status: 'not submitted',
    });
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
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation);
    })();
  }, []);
  return (
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
        </RootStack.Navigator>
      </NavigationContainer>
    </UserProvider>
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
