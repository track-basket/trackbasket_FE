import React, { useContext } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import VolunteerContext from '../volunteer-context';

const StatusBadge = ({ onPress, status, customStyles, highlighted }) => {
  const { assignedLists, setAssignedLists } = useContext(VolunteerContext);
  let color;
  let highlightStyle;
  if (status === 'pending') {
    color = { backgroundColor: '#DEE078' };
  }
  if (status === 'assigned') {
    color = { backgroundColor: '#1712C4' };
  }
  if (status === 'at store') {
    color = { backgroundColor: '#0A3D46' };
  }
  if (status === 'on way') {
    color = { backgroundColor: '#821CBA' };
  }
  if (status === 'delivered') {
    color = { backgroundColor: '#1CA3BA' };
  }
  if (highlighted) {
    highlightStyle = { borderWidth: 10, borderColor: 'lightgray' };
  } else {
    highlightStyle = { borderWidth: 10, borderColor: 'white' };
  }
  return (
    <TouchableOpacity
      style={[styles.orderBadge, color, customStyles, highlightStyle]}
      onPress={onPress}
    >
      <Text style={styles.orderBadgeText}>{status.toUpperCase()}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  orderBadge: {
    backgroundColor: '#DEE078',
    borderRadius: 30,
    padding: 10,
    // marginRight: 10,
    alignSelf: 'center',
  },
  orderBadgeText: {
    color: 'white',
    fontSize: 20,
  },
});

export default StatusBadge;
