/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StatusBadge from '../components/StatusBadge';
import VolunteerContext from '../volunteer-context';
import { updateList } from '../components/ApiCalls';

const ChangeStatusModal = ({ route, navigation: { goBack } }) => {
  const { assignedLists, setAssignedLists } = useContext(VolunteerContext);
  const item = route.params.item;

  const handlePress = (status) => {
    let lists = [...assignedLists];
    let selectedList = lists.find((list) => {
      return list.listId === item.listId;
    });
    const updatedList = {
      status,
      items: selectedList.items,
      id: selectedList.at_risk_user_id,
    };
    updateList(updatedList).then((response) => {

      const index = lists.indexOf(selectedList);
      lists[index].status = response.data.attributes.status;
      setAssignedLists(lists);
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
            status="pending"
            highlighted={item.status === 'pending'}
            onPress={() => {
              handlePress('pending');
            }}
            customStyles={{ width: 200 }}
          />
        </View>
        <View style={styles.statusContainer}>
          <StatusBadge
            status="assigned"
            highlighted={item.status === 'assigned'}
            onPress={() => {
              handlePress('assigned');
            }}
            customStyles={{ width: 200 }}
          />
        </View>
        <View style={styles.statusContainer}>
          <StatusBadge
            status="at store"
            highlighted={item.status === 'at store'}
            onPress={() => {
              handlePress('at store');
            }}
            customStyles={{ width: 200 }}
          />
        </View>
        <View style={styles.statusContainer}>
          <StatusBadge
            status="on way"
            highlighted={item.status === 'on way'}
            onPress={() => {
              handlePress('on way');
            }}
            customStyles={{ width: 200 }}
          />
        </View>
        <View style={styles.statusContainer}>
          <StatusBadge
            status="delivered"
            highlighted={item.status === 'delivered'}
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
