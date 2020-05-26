import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const Home = ({ navigation, route }) => {
  const user = route.params ? route.params.name : undefined;

  return (
    <View style={styles.container}>
      {!user && (
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('LoginModal');
            }}
          >
            <Text>Login</Text>
          </TouchableOpacity>
        </View>
      )}
      {!!user && (
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('LoginModal');
            }}
          >
            <Text>Hello {user}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AtRiskTabs')}>
              <Text>Start Shopping</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      )}
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

export default Home;
