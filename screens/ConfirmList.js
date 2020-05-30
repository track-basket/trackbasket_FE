import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '../components/Button';
import VolunteerContext from '../volunteer-context';
import moment from 'moment';

const ConfirmList = ({ navigation, route }) => {
  const item = route.params;
  const { assignedLists, setAssignedLists } = useContext(VolunteerContext);

  const handleSubmit = () => {
    setAssignedLists([item, ...assignedLists]);
    navigation.navigate('VolunteerHome');
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerInner}>
        <View style={styles.orderContainer}>
          <View style={styles.userDetails}>
            <Text style={styles.introtext}>Order details</Text>
            <Text style={styles.orderText}>
              <Text style={styles.orderTextBold}>Name: </Text>
              {route.params.userDetails.name}
            </Text>
            <Text style={styles.orderText}>
              <Text style={styles.orderTextBold}>Delivery address: </Text>
              {route.params.userDetails.address}
            </Text>
            <Text style={styles.orderText}>
              <Text style={styles.orderTextBold}>Store:</Text>{' '}
              {route.params.storeId}
            </Text>
            <Text style={styles.orderText}>
              <Text style={styles.orderTextBold}>Distance from you:</Text>{' '}
              {route.params.distance.toFixed(2)} miles
            </Text>
          </View>
          <View style={styles.orderInfo}>
            <Text style={styles.orderText}>
              <Text style={styles.orderTextBold}>Ordered:</Text>{' '}
              {moment(route.params.created_at).format('MMM D')}
            </Text>
            <Text style={styles.orderText}>
              <Text style={styles.orderTextBold}>Items:</Text>{' '}
              {route.params.number_items}
            </Text>
          </View>
        </View>
        <Text style={styles.introtext}>Do you want to select this list?</Text>
        <Button text="CONFIRM" onPress={handleSubmit} />
        <Button
          text="CANCEL"
          customStyles={{ backgroundColor: '#DE5959', marginTop: 10 }}
          onPress={() => navigation.navigate('SelectList')}
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
