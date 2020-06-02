import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import VolunteerContext from '../volunteer-context';
import { MaterialIcons } from 'react-native-vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import VolunteerShop from './VolunteerShop';
import VolunteerTask from './VolunteerTask';

const Tab = createBottomTabNavigator();

const VolunteerTabs = ({ navigation, route }) => {
  const { singleList, assignedLists, setAssignedLists } = useContext(
    VolunteerContext,
  );

  const list = assignedLists.find(
    (list) => list.listId === route.params.params.selectedList,
  );
  let totalItemsLeft;
  if (list) {
    let itemsLeft = list.items.filter(
      (item) => !item.acquired && !item.unavailable,
    );
    totalItemsLeft = itemsLeft.reduce((acc, el) => {
      acc += el.quantity;
      return acc;
    }, 0);
    if (!totalItemsLeft && !list.completed) {
      navigation.navigate('CompletedModal');
      const items = [...assignedLists];
      items.find(
        (list) => list.listId === route.params.params.selectedList,
      ).completed = true;
      setAssignedLists(items);
    }
  }

  function IconWithBadge({ name, badgeCount, color, size }) {
    return (
      <View style={{ width: 24, height: 24, margin: 5 }}>
        <MaterialIcons name={name} size={size} color={color} />
        {badgeCount > 0 && (
          <View
            style={{
              // On React Native < 0.57 overflow outside of parent will not work on Android, see https://git.io/fhLJ8
              position: 'absolute',
              right: -6,
              top: -3,
              backgroundColor: 'red',
              borderRadius: 6,
              width: 12,
              height: 12,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
              {badgeCount}
            </Text>
          </View>
        )}
      </View>
    );
  }

  function HomeIconWithBadge(props) {
    // You should pass down the badgeCount in some other ways like React Context API, Redux, MobX or event emitters.
    return <IconWithBadge {...props} badgeCount={totalItemsLeft} />;
  }

  return (
    <Tab.Navigator>
      <Tab.Screen
        component={VolunteerShop}
        name="Volunteer Shop"
        options={{
          tabBarLabel: 'Shop',
          tabBarIcon: ({ color, size }) => (
            <HomeIconWithBadge name="shopping-cart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        component={VolunteerTask}
        name="Volunteer Task"
        options={{
          tabBarLabel: 'Info',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="info" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default VolunteerTabs;
