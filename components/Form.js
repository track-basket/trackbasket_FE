import React from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';

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
    fontSize: 15,
    marginBottom: 5,
    height: 35,
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
    fontSize: 14,
    marginBottom: 3,
  },
});

export const TextField = ({ label, ...props }) => {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        testID="Form.TextInput"
        placeholder="Name"
        style={styles.textbox}
        {...props}
      />
    </View>
  );
};
