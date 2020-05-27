import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Logo from '../components/Logo';
const Home = ({ navigation, route }) => {
  const user = route.params ? route.params.name : undefined;

  return (
    <View>
      {!user && (
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Logo style={styles.logo} />
            <Text style={styles.logoText}>Trackbasket</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('LoginModal');
            }}
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>I need groceries</Text>
            </View>
          </TouchableOpacity>
          <Text>Set up an account and shop</Text>
          <View style={styles.button}>
            <Text style={styles.buttonText}>I'm a volunteer</Text>
          </View>
          <Text>Choose a grocery list to shop</Text>
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
  container: {
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoText: {
    color: '#59DE7E',
    fontFamily: 'HelveticaNeue-Bold',
    fontSize: 24,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#59DE7E',
    borderRadius: 5,
    marginTop: 60,
    marginBottom: 10,
    height: 75,
    width: 160,
  },
  buttonText: {
    color: '#EEEEEE',
    fontFamily: 'Helvetica-Bold',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Home;
