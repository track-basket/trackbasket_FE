import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import LoginModal from './screens/LoginModal';
import AtRiskTabs from './screens/AtRiskTabs';
import { UserProvider } from './user-context';

const RootStack = createStackNavigator();
const MainStack = createStackNavigator();

const MainStackScreen = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Home" component={Home} />
      <MainStack.Screen name="AtRiskTabs" component={AtRiskTabs} />
    </MainStack.Navigator>
  );
};

const App = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(['item 1', 'item 2', 'apples', 'bananas']);
  const addToCart = (newItem) => setCart([...cart, newItem]);
  const setNewUser = (user) => setUser(user);
  const [location, setLocation] = useState(null);
  return (
    <UserProvider
      value={{
        user,
        cart,
        addToCart,
        setNewUser,
        location,
      }}
    >
      <NavigationContainer style={styles.container}>
        <RootStack.Navigator mode="modal">
          <RootStack.Screen
            name="Main"
            component={MainStackScreen}
            options={{ headerShown: false }}
          />
          <RootStack.Screen name="LoginModal" component={LoginModal} />
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
