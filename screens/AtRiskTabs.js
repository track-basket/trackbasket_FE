import { MaterialIcons } from 'react-native-vector-icons';
import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import UserContext from '../user-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Cart from './Cart';
import Shop from './Shop';

const Tab = createBottomTabNavigator();

const AtRiskTabs = () => {
  const { cart } = useContext(UserContext);
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
    if (cart) {
      return (
        <IconWithBadge
          {...props}
          badgeCount={cart.items.reduce((itemCount, item) => {
            itemCount += item.quantity;
            return itemCount;
          }, 0)}
        />
      );
    } else {
      return '';
    }
  }

  return (
    <Tab.Navigator>
      <Tab.Screen
        component={Shop}
        name="Shop"
        options={{
          tabBarLabel: 'Shop',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="shopping-basket" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        component={Cart}
        name="Cart"
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({ color, size }) => (
            <HomeIconWithBadge name="shopping-cart" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AtRiskTabs;
