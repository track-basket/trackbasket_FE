import React, { useContext } from 'react';
import VolunteerContext from '../volunteer-context';
import { MaterialIcons } from 'react-native-vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import VolunteerShop from './VolunteerShop';
import VolunteerTask from './VolunteerTask';

const Tab = createBottomTabNavigator();

const VolunteerTabs = ({ route, navigation }) => {
  const { findSingleList } = useContext(VolunteerContext);

  const { params } = route;
  findSingleList(params);
  // console.log(params.selectedList.listId);
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
        component={VolunteerTask}
        name="Volunteer Task"
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
