import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import VolunteerContext from '../volunteer-context';
import { Button } from '../components/Button';
import { updateList } from '../components/ApiCalls';

const ConfirmDelete = ({ navigation, route }) => {
  const {
    setSingleList,
    singleList,
    assignedLists,
    setAssignedLists,
  } = useContext(VolunteerContext);
  const handlePress = (status) => {
    const updatedList = {
      status: 'pending',
      items: singleList.data.attributes.items,
      at_risk_user_id: singleList.id,
    };
    updateList(updatedList);
    let assignedListsCopy = [...assignedLists];
    let filteredLists = assignedListsCopy.filter((list) => {
      return list !== singleList.id;
    });
    setAssignedLists(filteredLists);
    setSingleList(null);
    navigation.navigate('VolunteerHome', { id: updatedList.at_risk_user_id });
  };
  return (
    <View style={styles.container}>
      <View style={styles.containerInner}>
        <Text style={styles.introtext}>
          Are you sure you want to abandon this task?
        </Text>
        <Button text="CONFIRM" onPress={handlePress} />
        <Button
          text="CANCEL"
          onPress={() =>
            navigation.navigate('VolunteerTabs', { screen: 'Volunteer Task' })
          }
          customStyles={{ backgroundColor: 'red', marginTop: 20 }}
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
  introtext: {
    fontSize: 30,
    marginBottom: 20,
    textAlign: 'center',
  },
  containerInner: {
    justifyContent: 'center',
    width: 300,
    marginBottom: 100,
  },
});

export default ConfirmDelete;
