import { MaterialIcons } from 'react-native-vector-icons';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Cart from './Cart';
import Shop from './Shop';

const Tab = createBottomTabNavigator();

const AtRiskTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        component={Shop}
        name="Shop"
        options={{
          tabBarLabel: 'Shop',
          tabBarIcon: ({ color, size }) => {
            <MaterialIcons name="home" color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        component={Cart}
        name="Cart"
        options={{ tabBarLabel: 'Cart' }}
      />
    </Tab.Navigator>
  );
};

export default AtRiskTabs;