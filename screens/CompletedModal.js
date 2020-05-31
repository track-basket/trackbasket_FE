import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons';
import { Button } from '../components/Button';

const CompletedModal = ({ navigation: { goBack } }) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View>
          <MaterialIcons name="done" color="green" size={120} />
        </View>
        <Text style={styles.introtext}>
          You have shopped all items on this list!
        </Text>
        <Button
          text="CLOSE"
          customStyles={{ backgroundColor: '#59DE7E', marginTop: 20 }}
          onPress={() => goBack()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    width: 300,
    marginBottom: 50,
    alignItems: 'center',
  },
  introtext: {
    fontSize: 30,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default CompletedModal;
