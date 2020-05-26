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

  const handleSubmit = () => {
    if (!name) {
      Alert.alert('Please Enter Your Name');
    } else {
      navigation.navigate('Home', { name });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Phone Number" />
      <TextInput placeholder="Street Address" />
      <TextInput placeholder="City" />
      <TextInput placeholder="Zip Code" />
      <Text>Hello Login Modal</Text>
      <TouchableOpacity onPress={handleSubmit}>
        <Text>Submit</Text>
      </TouchableOpacity>
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
});

export default LoginModal;
