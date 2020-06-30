/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StatusBadge from '../components/StatusBadge';
import VolunteerContext from '../volunteer-context';
import { updateList } from '../components/ApiCalls';

const ChangeStatusModal = ({ route, navigation: { goBack } }) => {
  const {
    setSingleList,
    singleList,
    volunteersLists,
    setVolunteersLists,
  } = useContext(VolunteerContext);
  const item = route.params.item;
  const handlePress = (status) => {
    const updatedList = {
      status,
      items: item.data.attributes.items,
      at_risk_user_id: item.id,
    };
    updateList(updatedList).then((response) => {
      setSingleList({
        ...response,
        id: item.id,
        userDetails: item.userDetails,
        completed: singleList && !!singleList.completed,
      });

      const newVolunteersLists = [...volunteersLists];
      const selectedList = newVolunteersLists.find((list) => {
        return list.id === item.id;
      });
      const index = newVolunteersLists.indexOf(selectedList);
      newVolunteersLists[index].data.attributes.status = status;
      setVolunteersLists(newVolunteersLists);
      goBack();
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View>
          <Text style={styles.title}>Change order status</Text>
        </View>
        <View style={styles.statusContainer}>
          <StatusBadge
            status="assigned"
            highlighted={item.data.attributes.status === 'assigned'}
            onPress={() => {
              handlePress('assigned');
            }}
            customStyles={{ width: 200 }}
          />
        </View>
        <View style={styles.statusContainer}>
          <StatusBadge
            status="at store"
            highlighted={item.data.attributes.status === 'at store'}
            onPress={() => {
              handlePress('at store');
            }}
            customStyles={{ width: 200 }}
          />
        </View>
        <View style={styles.statusContainer}>
          <StatusBadge
            status="on way"
            highlighted={item.data.attributes.status === 'on way'}
            onPress={() => {
              handlePress('on way');
            }}
            customStyles={{ width: 200 }}
          />
        </View>
        <View style={styles.statusContainer}>
          <StatusBadge
            status="delivered"
            highlighted={item.data.attributes.status === 'delivered'}
            onPress={() => {
              handlePress('delivered');
            }}
            customStyles={{ width: 200 }}
          />
        </View>
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
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  innerContainer: {
    marginBottom: 100,
  },
  statusContainer: {
    height: 70,
    justifyContent: 'center',
  },
});

export default ChangeStatusModal;
