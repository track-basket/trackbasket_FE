/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useEffect } from 'react';
import VolunteerContext from '../volunteer-context';
import { Button } from '../components/Button';
import StatusBadge from '../components/StatusBadge';
import moment from 'moment';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Logo from '../components/Logo';
import TimeOfDay from '../components/TimeOfDay';
import { getList } from '../components/ApiCalls';

const VolunteerHome = ({ navigation }) => {
  const {
    volunteer,
    assignedLists,
    formatDate,
    volunteersLists,
    setVolunteersLists,
  } = useContext(VolunteerContext);
  const getName = () => {
    if (volunteer) {
      return volunteer.name;
    } else {
      return '';
    }
  };
  const handlePress = (item) => {
    navigation.navigate('VolunteerTabs', {
      screen: 'Volunteer Shop',
      params: { selectedList: item.id },
    });
  };
  useEffect(() => {
    const fetchedLists = assignedLists.map((list) => {
      return getList(list);
    });
    Promise.all(fetchedLists).then((data) => setVolunteersLists(data));
  }, [assignedLists]);

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Logo />
          <Text style={styles.greeting}>
            <TimeOfDay />, {getName()}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Volunteer Profile')}
            style={styles.editProfile}
          >
            <Text style={styles.editProfileText}>Edit profile</Text>
          </TouchableOpacity>
          <Button
            text="Find new list"
            onPress={() => navigation.navigate('SelectList')}
            customStyles={{ marginTop: 20, width: 250 }}
          />
          {volunteersLists && (
            <View style={styles.assignedLists}>
              <Text style={styles.orders}>Your lists</Text>
              {volunteersLists.map((item, i) => {
                return (
                  <View key={i} style={styles.item}>
                    <View style={styles.details}>
                      <Text
                        style={[styles.detailsText, styles.detailsTextName]}
                      >
                        Store: {item.data.attributes.address}
                      </Text>
                      <View style={styles.numAge}>
                        <Text style={styles.detailsText}>
                          Submitted:{' '}
                          {item.data.attributes.created_date &&
                            moment(
                              formatDate(item.data.attributes.created_date),
                            )
                              .subtract(6, 'hours')
                              .fromNow()}
                        </Text>
                        <Text style={styles.detailsText}>
                          Items:{' '}
                          {item.data.attributes.items &&
                            item.data.attributes.items.reduce((acc, el) => {
                              acc += el.quantity;
                              return acc;
                            }, 0)}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.orderStatus}>
                      <StatusBadge
                        onPress={() =>
                          navigation.navigate('Change Status', { item })
                        }
                        status={item.data.attributes.status}
                      />
                      <TouchableOpacity
                        style={styles.editBtn}
                        onPress={() => handlePress(item)}
                      >
                        <Text style={styles.editBtnText}>SHOP ORDER</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </View>
          )}
          {!assignedLists.length && (
            <View style={styles.noListsContainer}>
              <Text style={styles.volunteerOpportunitiesSubtitle}>
                You have no lists
              </Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
    marginTop: 0,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#59DE7E',
    marginTop: 45,
    marginBottom: 10,
    height: 90,
    width: 200,
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowRadius: 15,
    shadowOpacity: 0.2,
    shadowColor: 'black',
  },
  buttonText: {
    fontFamily: 'Helvetica',
    fontSize: 26,
    textAlign: 'center',
    width: 150,
    color: 'white',
  },
  greeting: {
    fontFamily: 'Helvetica',
    fontSize: 28,
    marginTop: 30,
    textAlign: 'center',
  },
  innerContainer: {
    alignItems: 'center',
    width: 600,
    marginTop: 100,
  },
  secondaryText: {
    fontSize: 18,
    textAlign: 'center',
  },
  secondaryTextContainer: {
    width: 150,
  },
  editProfile: {
    backgroundColor: 'white',
    borderColor: '#59DE7E',
    borderWidth: 2,
    color: '#59DE7E',
    paddingVertical: 7,
    paddingHorizontal: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  editProfileText: {
    color: '#59DE7E',
    fontSize: 18,
  },
  orders: {
    fontSize: 26,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  orderStatus: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  orderBadge: {
    backgroundColor: '#DEE078',
    borderRadius: 30,
    padding: 10,
    marginRight: 10,
  },
  orderBadgeText: {
    color: 'white',
    fontSize: 20,
  },

  editBtn: {
    backgroundColor: 'lightgray',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    alignSelf: 'center',
  },
  editBtnText: {
    fontSize: 20,
  },

  submitted: {
    fontSize: 24,
    marginTop: 20,
  },

  list: {
    flexGrow: 0,
    width: 350,
    height: 250,
  },

  assignedLists: {
    width: 350,
    marginTop: 30,
  },
  noListsContainer: {
    marginTop: 100,
    marginBottom: 20,
  },
  detailsText: {
    fontSize: 18,
    marginTop: 2,
  },
  detailsTextName: {
    fontSize: 20,
  },
  item: {
    marginBottom: 35,
  },
  volunteerOpportunitiesSubtitle: {
    fontSize: 20,
    textAlign: 'center',
  },
  numAge: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default VolunteerHome;
