import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import UserContext from '../user-context';
import { TextField } from '../components/Form';
import { Button } from '../components/Button';
import Constants from 'expo-constants';

const LoginModal = ({ navigation }) => {
  const { user, setNewUser, setInstallationId } = useContext(UserContext);

  const [name, setName] = useState(handleNameValue('name'));
  const [address, setAddress] = useState(handleNameValue('address'));
  const [city, setCity] = useState(handleNameValue('city'));
  const [zip, setZip] = useState(handleNameValue('zip'));
  const [phone, setPhone] = useState(handleNameValue('phone'));
  const [cart] = useState();

  useEffect(() => {
    setInstallationId(Constants.deviceId);
  }, []);

  const handleSubmit = () => {
    if (!name) {
      Alert.alert('Please enter your name');
    } else if (!address) {
      Alert.alert('Please enter your address');
    } else if (!city) {
      Alert.alert('Please enter your city');
    } else if (!zip) {
      Alert.alert('Please enter your zip');
    } else if (!phone) {
      Alert.alert('Please enter your phone');
    } else {
      const info = {
        name,
        address,
        city,
        zip,
        phone,
        cart,
      };
      setNewUser(info);
      navigation.navigate('Home');
    }
  };

  function handleNameValue(type) {
    if (!user) {
      return '';
    } else {
      return user[type];
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerInner}>
        {!user && (
          <Text style={styles.introtext}>
            Sign up to order groceries and have them delivered by a volunteer
          </Text>
        )}
        {user && <Text style={styles.introtext}>Update your info</Text>}
        <TextField
          label="Name"
          placeholder="Name"
          onChangeText={setName}
          value={name}
        />
        <TextField
          label="Delivery address"
          placeholder="Name"
          onChangeText={setAddress}
          value={address}
        />
        <TextField
          label="City"
          placeholder="City"
          onChangeText={setCity}
          value={city}
        />
        <TextField
          label="Zip code"
          placeholder="Zip Code"
          onChangeText={setZip}
          value={zip}
        />
        <TextField
          label="Phone number"
          placeholder="Phone number"
          onChangeText={setPhone}
          value={phone}
        />
        <View style={styles.btnContainer}>
          <Button onPress={handleSubmit} text="SUBMIT" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  containerInner: {
    justifyContent: 'center',
    width: 300,
    marginBottom: 50,
  },
  introtext: {
    fontSize: 30,
    marginBottom: 20,
    textAlign: 'center',
  },
  btnContainer: {
    marginTop: 10,
  },
});

export default LoginModal;
