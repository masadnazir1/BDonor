import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  FlatList,
  Dimensions,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('screen');

// Dummy user data
const users = [
  {
    id: '1',
    name: 'M. Aslam',
    location: 'Islamabad, Pakistan',
    bloodGroup: 'B-',
    image: require('../Assets/user.jpg'),
  },
  {
    id: '2',
    name: 'Zeeshan',
    location: 'Karachi, Pakistan',
    bloodGroup: 'AB+',
    image: require('../Assets/user.jpg'),
  },
  {
    id: '3',
    name: 'Faraz',
    location: 'Lahore, Pakistan',
    bloodGroup: 'O+',
    image: require('../Assets/user.jpg'),
  },
  {
    id: '4',
    name: 'Ali',
    location: 'Rawalpindi, Pakistan',
    bloodGroup: 'A+',
    image: require('../Assets/user.jpg'),
  },
  {
    id: '5',
    name: 'Ali',
    location: 'Rawalpindi, Pakistan',
    bloodGroup: 'A+',
    image: require('../Assets/user.jpg'),
  },
  {
    id: '6',
    name: 'Ali',
    location: 'Rawalpindi, Pakistan',
    bloodGroup: 'A+',
    image: require('../Assets/user.jpg'),
  },
  {
    id: '7',
    name: 'Ali',
    location: 'Rawalpindi, Pakistan',
    bloodGroup: 'A+',
    image: require('../Assets/user.jpg'),
  },
  {
    id: '8',
    name: 'Ali',
    location: 'Rawalpindi, Pakistan',
    bloodGroup: 'A+',
    image: require('../Assets/user.jpg'),
  },
];

function UserListScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);

  // Handle search input
  const handleSearch = text => {
    setSearchQuery(text);
    const filteredData = users.filter(
      user =>
        user.name.toLowerCase().includes(text.toLowerCase()) ||
        user.bloodGroup.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredUsers(filteredData);
  };

  // Render each user item
  const renderUserItem = ({ item }) => (
    <View style={styles.userItem}>
      <Image source={item.image} style={styles.userAvatar} />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userLocation}>{item.location}</Text>
      </View>
      <Text
        style={[
          styles.bloodGroup,
          { color: getBloodGroupColor(item.bloodGroup) },
        ]}
      >
        {item.bloodGroup}
      </Text>
    </View>
  );

  // Get color for blood group (example logic)
  const getBloodGroupColor = bloodGroup => {
    if (bloodGroup === 'B-' || bloodGroup === 'O-') return 'red';
    return '#4CAF50'; // Green for positive groups
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Icon name="search-outline" size={20} color="#aaa" />
        <TextInput
          placeholder="Search"
          value={searchQuery}
          onChangeText={handleSearch}
          style={styles.searchInput}
        />
      </View>

      {/* User List */}
      <FlatList
        data={filteredUsers}
        renderItem={renderUserItem}
        keyExtractor={item => item.id}
        style={{ flex: 1 }}
        contentContainerStyle={styles.userList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#f6f6f6',
    // paddingTop: height * 0.05,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: width * 0.05,
    padding: 10,
    borderRadius: 12,
    marginBottom: 5,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  userList: {
    paddingBottom: 20,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: width * 0.05,
    marginBottom: 15,
    padding: 15,
    borderRadius: 12,
    // elevation: 5,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#eee',
  },
  userInfo: {
    flex: 1,
    marginLeft: 15,
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
  bloodGroup: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default UserListScreen;
