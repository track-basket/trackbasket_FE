import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

const TimeOfDay = () => {
  let today = new Date();
  let hour = today.getHours();
  let greeting;
  if (hour < 12) {
    greeting = 'Good morning';
  }
  if (hour < 18) {
    greeting = 'Good afternoon';
  } else {
    greeting = 'Good evening';
  }
  return greeting;
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    marginTop: 20,
    height: 99,
    width: 105,
  },
  logoText: {
    color: '#59DE7E',
    fontFamily: 'HelveticaNeue-Bold',
    fontSize: 24,
  },
});

export default TimeOfDay;
