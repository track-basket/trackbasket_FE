import React, { useState, useContext, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
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
  const formatNumber = () => {
    var cleaned = ('' + text).replace(/\D/g, '');
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      var intlCode = match[1] ? '+1 ' : '',
        number = [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join(
          '',
        );

      this.setState({
        phoneNum: number,
      });

      return;
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.containerInner}>
        {!user && (
          <Text style={styles.introtext}>
            Sign up to order groceries and have them delivered by a volunteer
          </Text>
        )}
        {user && <Text style={styles.introtext}>Update your info</Text>}
        <Text>* All Fields Required</Text>
        <TextField
          label="Name"
          placeholder="Name"
          onChangeText={setName}
          value={name}
        />
        <TextField
          label="Delivery address"
          placeholder="Delivery address"
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
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderWidth: 1,
  },
  containerInner: {
    justifyContent: 'center',
    width: 300,
    marginTop: 70,
  },
  introtext: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'HelveticaNeue-Bold',
  },
  btnContainer: {
    marginTop: 10,
  },
});

export default LoginModal;
