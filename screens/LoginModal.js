import React, { useState, useContext, useEffect } from 'react';
import { AsYouType } from 'libphonenumber-js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { atRiskProfileHandler } from '../components/ApiCalls';

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
  const [state, setState] = useState(handleNameValue('state'));
  const [phone, setPhone] = useState(handleNameValue('phone'));

  const [cart] = useState();

  useEffect(() => {
    setInstallationId(Constants.deviceId);
  }, []);

  const asYouType = new AsYouType('US');

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
        state,
        id: phone + address,
      };
      if (!user) {
        atRiskProfileHandler(info, 'POST')
          .then((res) => res.json())
          .then((result) => {
            if (result.data.attributes.error) {
              Alert.alert(
                'No nearby locations',
                'There are no nearby Kroger stores near your zip code. Sorry!',
                [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                ],
                { cancelable: false },
              );
            } else {
              setNewUser({ ...info, edited: false });
              navigation.navigate('Home');
            }
          });
      } else {
        atRiskProfileHandler(info, 'PATCH');
        setNewUser({ ...info, edited: true });
        navigation.navigate('Home');
      }
    }
  };
  function handleNameValue(type) {
    if (!user) {
      return '';
    } else {
      return user[type];
    }
  }

  const initiateFormatter = () => {
    if (phone.length > 1) {
      return asYouType.input(phone);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behaviour="padding">
      <View style={styles.containerInner}>
        <KeyboardAwareScrollView>
          {!user && (
            <Text style={styles.introtext}>
              Sign up to order groceries and have them delivered by a volunteer
            </Text>
          )}
          {user && <Text style={styles.introtext}>Update your info</Text>}
          <Text style={styles.h2}> * All Fields Required</Text>
          <TextField
            label="Name"
            placeholder="Name"
            onChangeText={setName}
            value={name}
          />
          <TextField
            label="Phone Number"
            placeholder="Phone Number"
            keyboardType="numeric"
            onChangeText={setPhone}
            value={initiateFormatter()}
            maxLength={14}
          />
          <TextField
            label="Delivery Address"
            placeholder="Delivery Address"
            onChangeText={setAddress}
            value={address}
          />
          <TextField
            label="Zip Code"
            keyboardType="numeric"
            placeholder="Zip Code"
            maxLength={5}
            onChangeText={setZip}
            value={zip}
          />
          <TextField
            label="City"
            placeholder="City"
            onChangeText={setCity}
            value={city}
          />
          <TextField
            label="State"
            placeholder="State"
            onChangeText={setState}
            value={state}
          />
          <View style={styles.btnContainer}>
            <Button onPress={handleSubmit} text="Submit" />
          </View>
        </KeyboardAwareScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderWidth: 1,
  },
  containerInner: {
    justifyContent: 'flex-end',
    width: 300,
    marginTop: 70,
    marginBottom: 50,
  },
  introtext: {
    fontSize: 20,
    marginBottom: 30,
    textAlign: 'center',
    fontFamily: 'HelveticaNeue-Bold',
  },
  btnContainer: {
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  h2: {
    color: 'red',
    fontSize: 16,
    fontFamily: 'HelveticaNeue-BoldItalic',
  },
});

export default LoginModal;
