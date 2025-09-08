import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import apiClient from '../Util/apiClient';

const { width, height } = Dimensions.get('screen');
const defaultAvatar = require('../Assets/user.jpg');

function BloodRequestListScreen() {
  const navigation = useNavigation();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchRequests = async () => {
    try {
      const response = await apiClient.get('/request');
      setRequests(response.data);
    } catch (error) {
      console.error('Failed to fetch requests:', error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchRequests();
  };

  const getBloodGroupColor = bloodGroup => {
    if (bloodGroup?.endsWith('NEG')) return '#d32f2f';
    return '#4CAF50';
  };

  const renderBloodRequestItem = ({ item }) => (
    <View style={styles.requestItem}>
      <Image
        source={
          item.user?.profilePicture
            ? { uri: item.user.profilePicture }
            : defaultAvatar
        }
        style={styles.userAvatar}
      />
      <View style={styles.requestInfo}>
        <Text style={styles.userName}>{item.user?.fullName || 'Unknown'}</Text>
        <Text style={styles.hospital}>{item.hospitalName}</Text>

        <Text style={styles.message} numberOfLines={2}>
          {item.message}
        </Text>
      </View>
      <View style={styles.column}>
        <Text
          style={[
            styles.bloodNeeds,
            { color: getBloodGroupColor(item.bloodGroup) },
          ]}
        >
          {item.bloodGroup.replace('_', '+')}
        </Text>
        <TouchableOpacity
          style={styles.donateButton}
          onPress={() => navigation.navigate('DonateScreen', { item })}
        >
          <Text style={styles.donateButtonText}>Donate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#d32f2f" />
        <Text>Loading requests...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={requests}
        renderItem={renderBloodRequestItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.requestList}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            No requests found
          </Text>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  requestList: { paddingBottom: 20 },
  requestItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    marginHorizontal: width * 0.04,
    marginBottom: 12,
    padding: width * 0.04,
    borderRadius: 12,
    borderWidth: 0.2,
    borderColor: '#ccc',
    flexWrap: 'wrap',
    elevation: 3,
    shadowColor: '#00000033',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  userAvatar: {
    width: width * 0.14,
    height: width * 0.14,
    borderRadius: (width * 0.14) / 2,
    backgroundColor: '#eee',
  },
  requestInfo: {
    flex: 1,
    marginLeft: width * 0.04,
    justifyContent: 'center',
  },
  userName: { fontSize: width * 0.045, fontWeight: 'bold', color: '#333' },
  hospital: { fontSize: width * 0.035, color: '#777', marginVertical: 2 },
  bloodNeeds: { fontSize: width * 0.04, fontWeight: 'bold', marginBottom: 4 },
  message: { fontSize: width * 0.035, color: '#555' },
  column: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    gap: 10,
  },
  donateButton: {
    backgroundColor: '#d32f2f',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    minWidth: width * 0.22,
  },
  donateButtonText: {
    color: '#fff',
    fontSize: width * 0.036,
    fontWeight: 'bold',
  },
});

export default BloodRequestListScreen;
