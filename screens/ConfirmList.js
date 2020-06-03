import React, { useContext, useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '../components/Button';
import { getList, getAtRiskUser } from '../components/ApiCalls';
import VolunteerContext from '../volunteer-context';
import moment from 'moment';
import { updateList } from '../components/ApiCalls';

const ConfirmList = ({ navigation, route }) => {
  const [list, setList] = useState({});
  const selectedList = route.params;

  useEffect(() => {
    getAtRiskUser(selectedList.at_risk_user_id).then((response) => {
      selectedList.userDetails = response.data.attributes;
      getList(selectedList.at_risk_user_id).then((res) => {
        setList({
          ...selectedList,
          ...res.data.attributes,
          status: 'assigned',
        });
      });
    });
  }, []);

  const { assignedLists, setAssignedLists, formatDate } = useContext(
    VolunteerContext,
  );
  const handleSubmit = () => {
    updateList(list).then((response) => {
      console.log(response);
      setAssignedLists([list.at_risk_user_id, ...assignedLists]);
      navigation.navigate('VolunteerHome');
    });
  };

  const getInfo = (infoType) => {
    if (route) {
      return route.params.userDetails.infoType;
    }
  };
  const getOrderInfo = (infoType) => {
    if (route) {
      return route.params.infoType;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerInner}>
        <View style={styles.orderContainer}>
          <View style={styles.userDetails}>
            <Text style={styles.introtext}>Order details</Text>
            <Text style={styles.orderText}>
              <Text style={styles.orderTextBold}>Name: </Text>
              {list.userDetails && list.userDetails.name}
            </Text>
            <Text style={styles.orderText}>
              <Text style={styles.orderTextBold}>Delivery address: </Text>
              {list.userDetails &&
                `${list.userDetails.address}, ${
                  list.userDetails.city
                } ${list.userDetails.state.toUpperCase()}`}
            </Text>
            <Text style={styles.orderText}>
              <Text style={styles.orderTextBold}>Store:</Text>{' '}
              {`${list.name === 'KINGSOOPERS' ? 'King Soopers' : list.name}, ${
                list.address
              }, ${list.city} ${list.state}`}
            </Text>
            <Text style={styles.orderText}>
              <Text style={styles.orderTextBold}>Distance from you:</Text>{' '}
              {list.userDetails && list.distance.toFixed(2)} miles
            </Text>
          </View>
          <View style={styles.orderInfo}>
            <Text style={styles.orderText}>
              <Text style={styles.orderTextBold}>Ordered:</Text>{' '}
              {list.userDetails &&
                moment(formatDate(list.created_at))
                  .subtract(6, 'hours')
                  .format('MMM. D h:mm a')}
            </Text>
            <Text style={styles.orderText}>
              <Text style={styles.orderTextBold}>Items:</Text>{' '}
              {list.userDetails && list.item_count}
            </Text>
          </View>
        </View>
        {/* <Text style={styles.introtext}>Do you want to select this list?</Text> */}
        <Button text="Confirm" onPress={handleSubmit} />
        <Button
          text="Cancel"
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
