import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Logo from '../components/Logo';
const Home = ({ navigation, route }) => {
  const user = route.params ? route.params.name : undefined;

  return (
    <View>
      {!user && (
        <View>
          <View style={styles.logoContainer}>
            <Logo style={styles.logo} />
            <Text style={styles.logoText}>Trackbasket</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('LoginModal');
            }}
          >
            <Text style={styles.button}>I need groceries</Text>
          </TouchableOpacity>
          <Text>Set up an account and shop</Text>
          <Text style={styles.button}>I'm a volunteer</Text>
          <Text style={styles.login}>Login</Text>
        </View>
      )}
      {!!user && (
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('LoginModal');
            }}
          >
            <Text>Hello {user}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AtRiskTabs')}>
              <Text>Start Shopping</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    flex: 1,
  },
  logoText: {
    color: '#59DE7E',
    fontFamily: 'HelveticaNeue-Bold',
    fontSize: 24,
  },
  button: {
    backgroundColor: '#59DE7E',
    width: 120,
    height: 65,
  },
});

export default Home;
