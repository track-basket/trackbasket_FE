import React, { useState, useContext } from 'react';
import VolunteerContext from '../volunteer-context';

import {
  View,
  Text,
  Picker,
  StyleSheet,
  Button,
  Dimensions,
  Alert,
} from 'react-native';
let ScreenHeight = Dimensions.get('window').height;

const VolunteerTask = ({ navigation }) => {
  const [selectedValue, setSelectedValue] = useState('Pending');
  const { volunteer, assignedLists, setAssignedLists } = useContext(
    VolunteerContext,
  );

  const abandonTask = (id) => {
    // if we are going to allow the user to have multiple lists, we can rewrite this,
    // but if the user can only have one list, we can just set their assigned lists to []
    // we will also want to change the status back to penidng, but can only do that via fetch
    // (can't update an unmounted compon)
    setAssignedLists([]);
    Alert.alert('Task Abandoned', 'Select another list', [{ text: 'OK' }], {
      cancelable: false,
    });
    navigation.navigate('VolunteerHome');
  };
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
      <Picker
        selectedValue={selectedValue}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Pending" value="pending" />
        <Picker.Item label="Shopping" value="shopping" />
        <Picker.Item label="On The Way" value="on the way" />
        <Picker.Item label="Delivered" value="delivered" />
      </Picker>
      <Button
        title="Change Status"
        style={styles.button}
        onPress={(status) =>
          Alert.alert(
            'Update Successful',
            'Status has been changed to' + ' ' + selectedValue + '.',
            [{ text: 'OK' }],
            {
              cancelable: false,
            },
          )
        }
      />
      <Button
        title="Abandon Task"
        style={styles.redButton}
        onPress={() => abandonTask()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: 'white',
    height: ScreenHeight,
  },
  infoField: {
    flexDirection: 'row',
    padding: 15,
    paddingBottom: 0,
  },
  infoKind: {
    fontFamily: 'HelveticaNeue-Bold',
  },
  statusUpdate: {
    fontFamily: 'HelveticaNeue-Bold',
    textAlign: 'center',
  },
  statusUpdateHidden: {
    opacity: 0,
  },
  picker: {
    alignSelf: 'center',
    height: 90,
    width: 200,
    marginBottom: 120,
  },
  header: {
    fontFamily: 'HelveticaNeue-Bold',
    fontSize: 36,
    textAlign: 'center',
    paddingBottom: 35,
  },
  //   redButton: {
  //     // alignSelf: 'center',
  //     color: '#ff0000',
  //   },
  //   button: {
  //     alignSelf: 'center',
  //   },
});

export default VolunteerTask;
