import React, { useState } from 'react';
import { View, Text, Picker, StyleSheet, Button } from 'react-native';

const VolunteerTask = ({ navigation }) => {
  const [selectedValue, setSelectedValue] = useState('Change Status');
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Task Details</Text>
      <View style={styles.infoField}>
        <Text style={styles.infoKind}>Name: </Text>
        <Text>Joe Smith</Text>
      </View>
      <View style={styles.infoField}>
        <Text style={styles.infoKind}>Delivery Address: </Text>
        <Text>123 Main Street, Denver CO 80203</Text>
      </View>
      <View style={styles.infoField}>
        <Text style={styles.infoKind}>Store: </Text>
        <Text>King Soopers, 333 Speer Blvd</Text>
      </View>
      <View style={styles.infoField}>
        <Text style={styles.infoKind}>Ordered at: </Text>
        <Text>1:21 PM May 21</Text>
      </View>
      <View style={styles.infoField}>
        <Text style={styles.infoKind}>Items: </Text>
        <Text>29</Text>
      </View>

      <Button
        title="Abandon Task"
        style={styles.button}
        onPress={() => navigation.navigate('VolunteerHome')}
      />
      <Picker
        selectedValue={selectedValue}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Change Status" value="Change Status" />
        <Picker.Item label="Shopping" value="shopping" />
        <Picker.Item label="On The Way" value="on the way" />
        <Picker.Item label="Delivered" value="delivered" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: 'white',
  },
  infoField: {
    flexDirection: 'row',
    padding: 15,
  },
  infoKind: {
    fontFamily: 'HelveticaNeue-Bold',
  },
  picker: {
    alignSelf: 'center',
    height: 90,
    width: 200,
  },
  header: {
    fontFamily: 'HelveticaNeue-Bold',
    fontSize: 36,
    textAlign: 'center',
    paddingBottom: 45,
  },
  button: {
    alignSelf: 'center',
  },
});

export default VolunteerTask;
