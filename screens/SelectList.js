import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Picker, FlatList } from 'react-native';
import ShoppingListItem from '../components/ShoppingListItem';
import VolunteerContext from '../volunteer-context';
import moment from 'moment';
import { getLists } from '../components/ApiCalls';

function calcCrow(lat1, lon1, lat2, lon2) {
  var R = 6371; // km
  var dLat = toRad(lat2 - lat1);
  var dLon = toRad(lon2 - lon1);
  var lat1 = toRad(lat1);
  var lat2 = toRad(lat2);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
}

// Converts numeric degrees to radians
function toRad(Value) {
  return (Value * Math.PI) / 180;
}

const SelectList = ({ navigation }) => {
  const [listData, setListData] = useState([]);
  const [sort, setSort] = useState('quantity-ascending');
  const { volunteer, assignedLists, formatDate } = useContext(VolunteerContext);

  useEffect(() => {
    getLists().then((response) => {
      let newData = response.data.attributes.lists.map((item) => {
        let distance = calcCrow(
          item.latitude_longitude[0],
          item.latitude_longitude[1],
          volunteer.location[0],
          volunteer.location[1],
        );
        const newTime = moment(formatDate(item.created_at))
          .subtract(6, 'hours')
          .format('YYYY-MM-DD HH:mm');
        let daysOld = moment().diff(moment(newTime), 'days');
        let age = moment(newTime).fromNow();

        return { distance, age, daysOld, ...item };
      });
      setListData(newData);
    });
  }, []);

  let sortedData;
  if (sort === 'distance-ascending') {
    sortedData = listData.sort((a, b) => {
      return a.distance < b.distance ? 1 : -1;
    });
  }
  if (sort === 'distance-descending') {
    sortedData = listData.sort((a, b) => {
      return a.distance > b.distance ? 1 : -1;
    });
  }
  if (sort === 'daysold-ascending') {
    sortedData = listData.sort((a, b) => {
      return a.created_at > b.created_at ? 1 : -1;
    });
  }
  if (sort === 'daysold-descending') {
    sortedData = listData.sort((a, b) => {
      return a.created_at < b.created_at ? 1 : -1;
    });
  }
  if (sort === 'quantity-ascending') {
    sortedData = listData.sort((a, b) => {
      return a.item_count < b.item_count ? 1 : -1;
    });
  }
  if (sort === 'quantity-descending') {
    sortedData = listData.sort((a, b) => {
      return a.item_count > b.item_count ? 1 : -1;
    });
  }
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.volunteerOpportunitiesContainer}>
          <Text style={styles.volunteerOpportunitiesSubtitle}>
            Volunteer Opportunities
          </Text>
          <View style={styles.sortContainer}>
            <Text style={styles.sortTitle}>Sort by:</Text>
            <Picker
              selectedValue={sort}
              onValueChange={(itemValue, itemIndex) => setSort(itemValue)}
              style={styles.onePicker}
              itemStyle={styles.onePickerItem}
            >
              <Picker.Item
                label="Items (most to least)"
                value="quantity-ascending"
              />
              <Picker.Item
                label="Items (least to most)"
                value="quantity-descending"
              />
              <Picker.Item
                label="Distance (farthest to closest)"
                value="distance-ascending"
              />
              <Picker.Item
                label="Distance (closest to farthest)"
                value="distance-descending"
              />
              <Picker.Item
                label="Days Old (oldest to newest)"
                value="daysold-ascending"
              />
              <Picker.Item
                label="Days Old (newest to oldest)"
                value="daysold-descending"
              />
            </Picker>
          </View>
          <FlatList
            style={styles.list}
            data={sortedData}
            keyExtractor={(item, i) => item.at_risk_user_id + i}
            renderItem={({ item }) => {
              return <ShoppingListItem item={item} navigation={navigation} />;
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    // justifyContent: 'center',
    flex: 1,
    backgroundColor: 'white',
    marginTop: 0,
  },
  volunteerOpportunitiesContainer: {
    marginTop: 20,
  },
  volunteerOpportunitiesSubtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    // marginBottom: 10,
  },
  sortTitle: {
    textAlign: 'center',
    marginBottom: 10,
  },
  sortContainer: {
    marginVertical: 20,
  },
  picker: {
    width: 200,
    height: 44,
    // borderColor: 'black',
    // borderWidth: 1,
  },
  onePickerItem: {
    height: 44,
    color: 'black',
  },
});

export default SelectList;
