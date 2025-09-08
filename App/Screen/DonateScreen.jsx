import React, { useState } from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import ShowText from '../Components/Shared/ShowText';

const { width, height } = Dimensions.get('screen');
const defaultAvatar = require('../Assets/user.jpg');

function DonateScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params;

  const getBloodGroupColor = bloodGroup => {
    if (bloodGroup?.endsWith('NEG')) return '#d32f2f';
    return '#4CAF50';
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 30 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Profile Section */}
          <View style={styles.profileCard}>
            <Image
              source={
                item.user?.profilePicture
                  ? { uri: item.user.profilePicture }
                  : defaultAvatar
              }
              style={styles.avatar}
            />
            <View style={{ flex: 1, marginLeft: 15 }}>
              <ShowText style={styles.name}>
                {item.user?.fullName || 'Unknown'}
              </ShowText>
              <ShowText style={styles.subText}>Requested Blood</ShowText>
              <ShowText
                style={[
                  styles.bloodGroup,
                  { color: getBloodGroupColor(item.bloodGroup) },
                ]}
              >
                {item.bloodGroup.replace('_', '+')}
              </ShowText>
            </View>
          </View>

          {/* Request Details */}
          <View style={styles.detailCard}>
            <ShowText style={styles.cardTitle}>Request Details</ShowText>

            <View style={styles.detailRow}>
              <ShowText style={styles.label}>Hospital:</ShowText>
              <ShowText style={styles.value}>{item.hospitalName}</ShowText>
            </View>

            <View style={styles.detailRow}>
              <ShowText style={styles.label}>Message:</ShowText>
              <ShowText style={styles.value}>{item.message || 'N/A'}</ShowText>
            </View>

            <View style={styles.detailRow}>
              <ShowText style={styles.label}>Contact No:</ShowText>
              <ShowText style={styles.value}>{item.contactNo}</ShowText>
            </View>

            <View style={styles.detailRow}>
              <ShowText style={styles.label}>Status:</ShowText>
              <ShowText style={styles.value}>{item.status}</ShowText>
            </View>

            {item.donations?.length > 0 && (
              <View style={styles.detailRow}>
                <ShowText style={styles.label}>Donations:</ShowText>
                <ShowText style={styles.value}>
                  {item.donations.length}
                </ShowText>
              </View>
            )}
          </View>

          {/* Donate Button */}
          <TouchableOpacity
            style={styles.donateButton}
            onPress={() => console.log(true)}
          >
            <Text style={styles.donateButtonText}>Donate Now</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaf9ffff',
    paddingHorizontal: width * 0.05,
  },
  profileCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 16,
    marginTop: 20,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#00000033',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    margin: 2,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 40,
    backgroundColor: '#eee',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  subText: {
    fontSize: 13,
    color: '#777',
    marginTop: 4,
  },
  bloodGroup: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 6,
  },
  detailCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    elevation: 3,
    margin: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#d32f2f',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: '#555',
    fontWeight: '600',
  },
  value: {
    fontSize: 14,
    color: '#333',
    flexShrink: 1,
    textAlign: 'right',
  },
  donateButton: {
    marginTop: 30,
    backgroundColor: '#d32f2f',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    margin: 2,
    elevation: 3,
  },
  donateButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
});

export default DonateScreen;
