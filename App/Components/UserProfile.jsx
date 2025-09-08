import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ShowText from '../Components/Shared/ShowText';
import apiClient from '../Util/apiClient';

const { width, height } = Dimensions.get('screen');

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchUser = async () => {
    try {
      const { data } = await apiClient.get('/auth/user', {
        params: { email: 'asad2@asad.com' },
      });

      if (data.user) setUser(data.user);
    } catch (error) {
      console.error(
        'Error fetching user:',
        error.response?.data || error.message,
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchUser();
  };

  const getBloodGroupColor = bloodGroup => {
    if (bloodGroup === 'B-' || bloodGroup === 'O-') return '#d32f2f';
    return '#4CAF50';
  };

  if (loading && !refreshing) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#d32f2f" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={{ color: 'red' }}>Failed to load user</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Top Stats */}
      <View style={styles.header}>
        <View style={styles.box}>
          <Icon name="heart-outline" size={28} color="#d32f2f" />
          <Text style={styles.boxLabel}>Saved Lives</Text>
          <ShowText style={styles.boxValue}>{user.donationCount || 0}</ShowText>
        </View>

        <View style={styles.box}>
          <Icon
            name="water"
            size={28}
            color={getBloodGroupColor(user.bloodGroup)}
          />
          <ShowText style={styles.boxLabel}>Blood Group</ShowText>
          <ShowText
            style={[
              styles.boxValue,
              { color: getBloodGroupColor(user.bloodGroup) },
            ]}
          >
            {user.bloodGroup?.replace('_', '+')}
          </ShowText>
        </View>
      </View>

      {/* Profile Info */}
      <View style={styles.profileInfoContainer}>
        <Image
          source={
            user.profilePicture
              ? { uri: user.profilePicture }
              : require('../Assets/user.jpg')
          }
          style={styles.profileImage}
        />
        <View style={styles.profileDetails}>
          <ShowText style={styles.infoLabel}>
            Name: <ShowText style={styles.infoValue}>{user.fullName}</ShowText>
          </ShowText>
          <ShowText style={styles.infoLabel}>
            Gender: <ShowText style={styles.infoValue}>{user.gender}</ShowText>
          </ShowText>
          <ShowText style={styles.infoLabel}>
            Email: <ShowText style={styles.infoValue}>{user.email}</ShowText>
          </ShowText>
          <ShowText style={styles.infoLabel}>
            Available:{' '}
            <ShowText style={styles.infoValue}>
              {user.available ? 'Yes' : 'No'}
            </ShowText>
          </ShowText>
        </View>
      </View>

      {/* Available Button */}
      <TouchableOpacity style={styles.donateButton}>
        <Text style={styles.donateButtonText}>Available To Donate</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.05,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: height * 0.03,
    gap: 10,
  },
  box: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    alignItems: 'center',
    paddingVertical: 20,
    marginHorizontal: 5,
    elevation: 4,
    shadowColor: '#00000057',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
  },
  boxLabel: {
    fontSize: 14,
    color: '#777',
    marginTop: 6,
  },
  boxValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
    color: '#333',
  },
  profileInfoContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 15,
    marginBottom: height * 0.04,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#00000057',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
  },
  profileImage: {
    width: 75,
    height: 75,
    borderRadius: 40,
    backgroundColor: '#eee',
  },
  profileDetails: {
    marginLeft: width * 0.05,
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#777',
    marginBottom: 3,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  donateButton: {
    backgroundColor: '#d32f2f',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    elevation: 3,
    marginTop: 10,
  },
  donateButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
});

export default UserProfile;
