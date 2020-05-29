import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '../components/Button';
import VolunteerContext from '../volunteer-context';

const ConfirmList = ({ navigation, route }) => {
  const item = route.params;
  const { assignedLists, setAssignedLists } = useContext(VolunteerContext);
  console.log(assignedLists);

  const handleSubmit = () => {
    console.log(item);
    setAssignedLists([item, ...assignedLists]);
    console.log(assignedLists);
    navigation.navigate('VolunteerHome');
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerInner}>
        <Text style={styles.introtext}>
          Are you sure you want to select this list?
        </Text>
        <View style={styles.orderContainer}>
          <View style={styles.userDetails}>
            <Text style={styles.orderText}>
              <Text style={styles.orderTextBold}>Name:</Text>
            </Text>
            <Text style={styles.orderText}>
              <Text style={styles.orderTextBold}>Delivery address:</Text>
            </Text>
            <Text style={styles.orderText}>
              <Text style={styles.orderTextBold}>Store:</Text>{' '}
              {route.params.storeId}
            </Text>
          </View>
          <View style={styles.orderInfo}>
            <Text style={styles.orderText}>
              <Text style={styles.orderTextBold}>Ordered at:</Text>{' '}
              {route.params.created_at}
            </Text>
            <Text style={styles.orderText}>
              <Text style={styles.orderTextBold}>Items:</Text>{' '}
              {route.params.number_items}
            </Text>
          </View>
        </View>
        <Button text="CONFIRM" onPress={handleSubmit} />
        <Button
          text="CANCEL"
          customStyles={{ backgroundColor: '#DE5959', marginTop: 10 }}
          onPress={() => navigation.navigate('VolunteerHome')}
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
    marginBottom: 50,
  },
  userDetails: {
    marginBottom: 10,
  },
  orderContainer: {
    marginBottom: 30,
  },
  orderText: {
    fontSize: 20,
  },
  orderTextBold: {
    fontWeight: 'bold',
  },
});

export default ConfirmList;
