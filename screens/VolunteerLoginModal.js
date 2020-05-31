import React, { useState, useContext, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import VolunteerContext from '../volunteer-context';
import { TextField } from '../components/Form';
import { Button } from '../components/Button';
import Constants from 'expo-constants';

const VolunteerLoginModal = ({ navigation }) => {
  const {
    volunteer,
    setVolunteer,
    setInstallationId,
    installationId,
    location,
  } = useContext(VolunteerContext);

  useEffect(() => {
    setInstallationId(Constants.deviceId);
  }, []);

  const [name, setName] = useState(handleNameValue('name'));
  const [phone, setPhone] = useState(handleNameValue('phone'));

  useEffect(() => {
    setInstallationId(Constants.deviceId);
  }, []);

  const handleSubmit = () => {
    if (!name) {
      Alert.alert('Please enter your name');
    } else if (!phone) {
      Alert.alert('Please enter your phone');
    } else {
      const info = {
        name,
        phone,
        installationId,
        location,
      };
      setVolunteer(info);
      navigation.navigate('VolunteerHome');
    }
  };

  function handleNameValue(type) {
    if (!volunteer) {
      return '';
    } else {
      return volunteer[type];
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.containerInner}>
        {!volunteer && (
          <Text style={styles.introtext}>
            Sign up to volunteer to shop for a person in need
          </Text>
        )}
        {volunteer && <Text style={styles.introtext}>Update your info</Text>}
        <Text style={styles.h2}> * All Fields Required</Text>

        <TextField
          label="Name"
          placeholder="Name"
          onChangeText={setName}
          value={name}
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
    marginBottom: 50,
  },
  introtext: {
    fontSize: 20,
    marginBottom: 30,
    textAlign: 'center',
    fontFamily: 'HelveticaNeue-Bold',
  },
  btnContainer: {
    marginTop: 10,
  },
  h2: {
    color: 'red',
    fontSize: 16,
    fontFamily: 'HelveticaNeue-BoldItalic',
    marginBottom: 20,
  },
});

export default VolunteerLoginModal;
