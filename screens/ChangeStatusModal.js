import React from 'react';
import { View, Text } from 'react-native';

const ChangeStatusModal = ({ route }) => {
  return (
    <View>
      <Text>{route.params.item.status}</Text>
    </View>
  );
};

export default ChangeStatusModal;
