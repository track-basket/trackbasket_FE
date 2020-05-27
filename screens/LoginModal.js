import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import UserContext from '../user-context';

const LoginModal = ({ navigation }) => {
  const { user, cart, addToCart, setNewUser, location } = useContext(
    UserContext,
  );

  const [name, setName] = useState(handleNameValue('name'));
  const [address, setAddress] = useState(handleNameValue('address'));
  const [city, setCity] = useState(handleNameValue('city'));
  const [zip, setZip] = useState(handleNameValue('zip'));
  const [phone, setPhone] = useState(handleNameValue('phone'));

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
      };
      setNewUser(info);
      navigation.navigate('Home', { info });
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
        <Text style={styles.label}>Name</Text>
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          style={styles.textbox}
        />
        <Text style={styles.label}>Delivery address</Text>
        <TextInput
          placeholder="Delivery address"
          style={styles.textbox}
          value={address}
          onChangeText={setAddress}
        />
        <Text style={styles.label}>City</Text>
        <TextInput
          placeholder="City"
          style={styles.textbox}
          value={city}
          onChangeText={setCity}
        />
        <Text style={styles.label}>Zip code</Text>
        <TextInput
          placeholder="Zip Code"
          style={styles.textbox}
          value={zip}
          onChangeText={setZip}
        />
        <Text style={styles.label}>Phone number</Text>
        <TextInput
          placeholder="Phone Number"
          style={styles.textbox}
          value={phone}
          onChangeText={setPhone}
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.submitBtn}>
          <Text style={styles.submitBtnText}>SUBMIT</Text>
        </TouchableOpacity>
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
  },
  containerInner: {
    flex: 1,
    width: 300,
    marginTop: 75,
  },
  textbox: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 5,
    fontSize: 18,
    marginBottom: 20,
    height: 40,
  },
  introtext: {
    fontSize: 30,
    marginBottom: 20,
    textAlign: 'center',
  },
  submitBtn: {
    backgroundColor: '#59DE7E',
    padding: 10,
    width: 150,
    alignItems: 'center',
    alignSelf: 'center',
  },
  submitBtnText: {
    fontSize: 24,
    color: 'white',
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
});

export default LoginModal;
