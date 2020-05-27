import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Cart from './Cart';
import Shop from './Shop';

const Tab = createBottomTabNavigator();

const shopBasket = <Icon.Button name="shopping_basket" />;

const AtRiskTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        component={Shop}
        name="Shop"
        options={{
          tabBarLabel: 'Shop',
          tabBarIcon: () => {
            return (
              <Icon.Button
                name="shopping-basket"
                style={styles.tabIcon}
                size={20}
                color={'#3d70ff'}
                component={Shop}
              />
            );
          },
        }}
      />
      <Tab.Screen
        component={Cart}
        name="Cart"
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: () => {
            return (
              <Icon.Button
                name="shopping-cart"
                style={styles.tabIcon}
                size={20}
                color={'#3d70ff'}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabIcon: {
    color: '#3d70ff',
    backgroundColor: '#FFF',
    paddingLeft: 10,
  },
});
export default AtRiskTabs;
