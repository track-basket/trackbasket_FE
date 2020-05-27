import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';

const LoginModal = ({ navigation }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [phone, setPhone] = useState('');
  const handleSubmit = () => {
    if (!name) {
      Alert.alert('Please Enter Your Name');
    } else {
      const info = {
        name,
        address,
        city,
        zip,
        phone,
      };
      navigation.navigate('Home', { info });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerInner}>
        <Text style={styles.introtext}>
          Sign up to order groceries and have them delivered by a volunteer
        </Text>
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
