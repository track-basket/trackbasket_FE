import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Logo = () => {
  return (
    <View>
      <Image
        style={styles.logo}
        source={require('../assets/trackbasket.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    marginTop: 20,
    height: 99,
    width: 105,
  },
});

export default Logo;
