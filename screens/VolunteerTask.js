import React, { useState, useContext } from 'react';
import VolunteerContext from '../volunteer-context';
import StatusBadge from '../components/StatusBadge';
import { Button } from '../components/Button';

import {
  View,
  Text,
  Picker,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
let ScreenHeight = Dimensions.get('window').height;

const VolunteerTask = ({ navigation }) => {
  const [selectedValue, setSelectedValue] = useState('Pending');
  const { volunteer, assignedLists, setAssignedLists, singleList } = useContext(
    VolunteerContext,
  );
  const selectedList = assignedLists[singleList];

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View>
          <View style={styles.details}>
            <Text style={styles.header}>Task Details</Text>
            <View style={styles.infoField}>
              <Text style={styles.detailsKind}>
                <Text style={styles.infoKind}>Name: </Text>
                {selectedList.userDetails.name}
              </Text>
            </View>
            <View style={styles.infoField}>
              <Text style={styles.detailsKind}>
                <Text style={styles.infoKind}>Delivery Address: </Text>
                {selectedList.userDetails.address}
              </Text>
            </View>
            <View style={styles.infoField}>
              <Text style={styles.detailsKind}>
                <Text style={styles.infoKind}>Store: </Text>
                King Soopers, 333 Speer Blvd
              </Text>
            </View>
            <View style={styles.infoField}>
              <Text style={styles.detailsKind}>
                <Text style={styles.infoKind}>Ordered at: </Text>
                {selectedList.created_at}
              </Text>
            </View>
            <View style={styles.infoField}>
              <Text style={styles.detailsKind}>
                <Text style={styles.infoKind}>Items: </Text>
                {selectedList.number_items}
              </Text>
            </View>
          </View>
          <View>
            <View style={styles.statusRow}>
              <Text style={[styles.infoKind, styles.detailsKind]}>Status:</Text>
              <StatusBadge
                status={selectedList.status}
                onPress={() =>
                  navigation.navigate('Change status', {
                    item: selectedList,
                  })
                }
                customStyles={{ borderWidth: 0 }}
              />
            </View>
            <Button
              text="UPDATE STATUS"
              customTextStyles={{ fontSize: 20, color: 'black' }}
              customStyles={{ backgroundColor: 'lightgray', width: 250 }}
              onPress={() =>
                navigation.navigate('Change status', {
                  item: selectedList,
                })
              }
            />
          </View>
        </View>

        <Button
          text="ABANDON TASK"
          // style={styles.redButton}
          // onPress={() => handlePress('pending')}
          onPress={() =>
            navigation.navigate('Confirm delete', {
              item: selected.selectedList,
            })
          }
          customStyles={{ backgroundColor: 'red', width: 250 }}
          customTextStyles={{ fontSize: 20 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    alignItems: 'center',
    width: 400,
    marginVertical: 50,
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  infoField: {
    flexDirection: 'row',
    paddingBottom: 20,
  },
  infoKind: {
    fontFamily: 'HelveticaNeue-Bold',
  },
  detailsKind: {
    fontSize: 18,
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
    fontSize: 24,
    textAlign: 'center',
    paddingBottom: 35,
    fontWeight: 'bold',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 5,
    // justifyContent: 'center',
  },
  statusText: {
    fontSize: 16,
    marginBottom: -4,
  },
  details: {
    marginBottom: -20,
  },
});

export default VolunteerTask;
