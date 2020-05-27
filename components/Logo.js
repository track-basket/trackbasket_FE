import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

const Logo = () => {
  return (
    <View style={styles.logoContainer}>
      <Image
        style={styles.logo}
        source={require('../assets/trackbasket.png')}
      />
      <Text style={styles.logoText}>Trackbasket</Text>
    </View>
  );
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

export default Logo;
