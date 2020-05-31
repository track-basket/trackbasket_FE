import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StatusBadge from '../components/StatusBadge';
import VolunteerContext from '../volunteer-context';

const ChangeStatusModal = ({ route, navigation: { goBack } }) => {
  const { assignedLists, setAssignedLists } = useContext(VolunteerContext);
  const item = route.params.item;

  const handlePress = (status) => {
    let lists = [...assignedLists];
    console.log(lists);
    let selectedList = lists.find((list) => {
      return list.listId === item.listId;
    });
    let index = assignedLists.indexOf(selectedList);
    lists[index].status = status;
    setAssignedLists(lists);
    goBack();
  };
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View>
          <Text style={styles.title}>Change order status</Text>
        </View>
        <StatusBadge
          status="pending"
          customStyles={{ marginTop: 10 }}
          highlighted={item.status === 'pending'}
          onPress={() => {
            handlePress('pending');
          }}
        />
        <StatusBadge
          status="assigned"
          customStyles={{ marginTop: 10 }}
          highlighted={item.status === 'assigned'}
          onPress={() => {
            handlePress('assigned');
          }}
        />
        <StatusBadge
          status="at store"
          customStyles={{ marginTop: 10 }}
          highlighted={item.status === 'at store'}
          onPress={() => {
            handlePress('at store');
          }}
        />
        <StatusBadge
          status="on way"
          customStyles={{ marginTop: 10 }}
          highlighted={item.status === 'on way'}
          onPress={() => {
            handlePress('on way');
          }}
        />
        <StatusBadge
          status="delivered"
          customStyles={{ marginTop: 10 }}
          highlighted={item.status === 'delivered'}
          onPress={() => {
            handlePress('delivered');
          }}
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
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  innerContainer: {
    marginBottom: 100,
  },
});

export default ChangeStatusModal;
