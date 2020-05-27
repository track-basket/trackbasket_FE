import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';
import Logo from '../components/Logo';
import TimeOfDay from '../components/TimeOfDay';
const Home = ({ navigation, route }) => {
  const user = route.params ? route.params.name : undefined;

  return (
    <View>
      {!user && (
        <View style={styles.container}>
          <Logo />
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
        <View style={styles.container}>
          <Logo />
          <Text style={styles.greeting}>
            <TimeOfDay />, {user}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('LoginModal')}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>View/Edit Profile</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('AtRiskTabs')}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Start Shopping</Text>
            </View>
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
  greeting: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 28,
    marginTop: 30,
    textAlign: 'center',
  },
});

export default Home;
