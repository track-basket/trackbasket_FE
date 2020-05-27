import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export const Button = ({ text, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.submitBtn}>
    <Text style={styles.submitBtnText}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
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
});
