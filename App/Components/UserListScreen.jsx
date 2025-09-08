import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  FlatList,
  Dimensions,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import apiClient from '../Util/apiClient';
import { useNavigation } from '@react-navigation/native';
const { width } = Dimensions.get('screen');

// Default avatar
const defaultAvatar = require('../Assets/user.jpg');

function UserListScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch donors from API
  const fetchUsers = async () => {
    try {
      const response = await apiClient.get('/donation/donors');
      setAllUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch donors:', error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchUsers();
  };

  // Handle search input
  const handleSearch = text => {
    setSearchQuery(text);
    const filteredData = allUsers.filter(
      user =>
        user.fullName.toLowerCase().includes(text.toLowerCase()) ||
        user.bloodGroup.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredUsers(filteredData);
  };

  // Render each user item
  const renderUserItem = ({ item }) => (
    <TouchableOpacity
      style={styles.userItem}
      onPress={() => navigation.navigate('UserDetails', { user: item })}
    >
      <Image
        source={
          item.profilePicture ? { uri: item.profilePicture } : defaultAvatar
        }
        style={styles.userAvatar}
      />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.fullName}</Text>
        <Text style={styles.userLocation}>{item.email}</Text>
      </View>
      <Text
        style={[
          styles.bloodGroup,
          { color: getBloodGroupColor(item.bloodGroup) },
        ]}
      >
        {item.bloodGroup}
      </Text>
    </TouchableOpacity>
  );

  // Get color for blood group
  const getBloodGroupColor = bloodGroup => {
    if (bloodGroup.endsWith('-')) return 'red';
    return '#4CAF50';
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#d32f2f" />
        <Text>Loading donors...</Text>
      </View>
    );
  }

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
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            No donors found
          </Text>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
