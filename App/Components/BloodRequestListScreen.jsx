import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('screen');

// Dummy data for blood requests
const bloodRequests = [
  {
    id: '1',
    name: 'Faisal',
    location: 'Karachi, Pakistan',
    hospital: 'Ziauddin, Karachi',
    bloodGroup: 'B+',
    bloodNeeds: '1 Bottle',
    message: 'Please Help Me',
    contact: '03---------',
    image: require('../Assets/user.jpg'),
  },
  {
    id: '2',
    name: 'Imtiaz',
    location: 'Hyderabad, Pakistan',
    hospital: 'Civil, Hyderabad',
    bloodGroup: 'A-',
    bloodNeeds: '1 Bottle',
    message: 'Please Help Me',
    contact: '03---------',
    image: require('../Assets/user.jpg'),
  },
  {
    id: '3',
    name: 'Imtiaz',
    location: 'Hyderabad, Pakistan',
    hospital: 'Civil, Hyderabad',
    bloodGroup: 'A-',
    bloodNeeds: '1 Bottle',
    message: 'Please Help Me',
    contact: '03---------',
    image: require('../Assets/user.jpg'),
  },
  {
    id: '4',
    name: 'Imtiaz',
    location: 'Hyderabad, Pakistan',
    hospital: 'Civil, Hyderabad',
    bloodGroup: 'A-',
    bloodNeeds: '1 Bottle',
    message: 'Please Help Me',
    contact: '03---------',
    image: require('../Assets/user.jpg'),
  },
];

function BloodRequestListScreen() {
  // Render each blood request item
  const renderBloodRequestItem = ({ item }) => (
    <View style={styles.requestItem}>
      <Image source={item.image} style={styles.userAvatar} />
      <View style={styles.requestInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userLocation}>{item.location}</Text>
        <Text style={styles.hospital}>{`Hospital: ${item.hospital}`}</Text>
        <Text
          style={styles.bloodNeeds}
        >{`Blood Needs: ${item.bloodNeeds}`}</Text>
        <Text style={styles.message}>{`Message: ${item.message}`}</Text>
        <Text style={styles.contact}>{`Contact: ${item.contact}`}</Text>
      </View>
      <View style={styles.Collum}>
        <Text
          style={[
            styles.bloodGroup,
            { color: getBloodGroupColor(item.bloodGroup) },
          ]}
        >
          {item.bloodGroup}
        </Text>
        <TouchableOpacity style={styles.donateButton}>
          <Text style={styles.donateButtonText}>Donate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Get color for blood group (example logic)
  const getBloodGroupColor = bloodGroup => {
    if (bloodGroup === 'B-' || bloodGroup === 'O-') return 'red';
    return '#4CAF50'; // Green for positive groups
  };

  return (
    <View style={styles.container}>
      {/* Blood Request List */}
      <FlatList
        data={bloodRequests}
        renderItem={renderBloodRequestItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.requestList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: width * 0.05,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  requestList: {
    paddingBottom: 20,
  },
  Collum: {
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    height: height * 0.12,
  },
  requestItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    marginHorizontal: width * 0.05,
    marginBottom: 15,
    padding: 15,
    borderRadius: 12,
    borderWidth: 0.2,
    borderColor: '#ccc',
    flexWrap: 'wrap',
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#eee',
  },
  requestInfo: {
    flex: 1,
    marginLeft: 15,
    marginBottom: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  userLocation: {
    fontSize: 14,
    color: '#777',
  },
  hospital: {
    fontSize: 14,
    color: '#777',
  },
  bloodNeeds: {
    fontSize: 14,
    color: '#777',
  },
  message: {
    fontSize: 14,
    color: '#777',
  },
  contact: {
    fontSize: 14,
    color: '#777',
  },
  bloodGroup: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 5,
  },
  donateButton: {
    backgroundColor: '#d32f2f',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  donateButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default BloodRequestListScreen;
