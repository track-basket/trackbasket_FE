import React from 'react';
import { MaterialIcons } from 'react-native-vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import VolunteerShop from './VolunteerShop';
import Info from './Info';

const Tab = createBottomTabNavigator();

const VolunteerTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        component={VolunteerShop}
        name="Volunteer Shop"
        options={{
          tabBarLabel: 'Shop',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="shopping-basket" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        component={Info}
        name="Info"
        options={{
          tabBarLabel: 'Info',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="shopping-cart" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default VolunteerTabs;
