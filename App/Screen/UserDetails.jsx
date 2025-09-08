import React from 'react';
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
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import ShowText from '../Components/Shared/ShowText';

const { width } = Dimensions.get('screen');

function UserDetails({ route }) {
  const navigation = useNavigation();
  const { user } = route.params; // details passed via navigation

  const handleEditProfile = () => {
    // Navigate to EditProfile screen or open modal
    navigation.navigate('EditProfile', { user });
  };

  const handleSendMessage = () => {
    // Navigate to chat screen
    navigation.navigate('Chat', { user });
  };

  const handleRequestBlood = () => {
    // Navigate to blood request screen
    navigation.navigate('CreateRequest', { user });
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Profile Picture */}
          <View style={styles.profileImageWrapper}>
            <Image
              source={
                user.profilePicture
                  ? { uri: user.profilePicture }
                  : require('../Assets/user.jpg') // fallback image
              }
              style={styles.profileImage}
            />
          </View>

          {/* Full Name */}

          <ShowText style={styles.name}>{user.fullName}</ShowText>

          {/* Info Cards */}
          <View style={styles.infoWrapper}>
            <View style={styles.infoCard}>
              <Icon name="male-female-outline" size={22} color="#8B0000" />
              <ShowText style={styles.infoText}>{user.gender}</ShowText>
            </View>
            <View style={styles.infoCard}>
              <Icon name="water-outline" size={22} color="#8B0000" />
              <ShowText style={styles.infoText}>{user.bloodGroup}</ShowText>
            </View>
            <View style={styles.infoCard}>
              <Icon name="mail-outline" size={22} color="#8B0000" />
              <ShowText style={styles.infoText}>{user.email}</ShowText>
            </View>
            <View style={styles.infoCard}>
              <Icon
                name={
                  user.available
                    ? 'checkmark-circle-outline'
                    : 'close-circle-outline'
                }
                size={22}
                color={user.available ? 'green' : 'red'}
              />
              <ShowText style={styles.infoText}>
                {user.available ? 'Available' : 'Not Available'}
              </ShowText>
            </View>
            <View style={styles.infoCard}>
              <Icon name="heart-outline" size={22} color="#8B0000" />
              <ShowText style={styles.infoText}>
                Donations: {user.donationCount ?? 0}
              </ShowText>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonsWrapper}>
            {/* <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
              <Icon name="create-outline" size={20} color="#fff" />
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity> */}

            <TouchableOpacity style={styles.button} onPress={handleSendMessage}>
              <Icon name="chatbubble-outline" size={20} color="#fff" />
              <ShowText style={styles.buttonText}>Send Message</ShowText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={handleRequestBlood}
            >
              <Icon name="medkit-outline" size={20} color="#fff" />
              <ShowText style={styles.buttonText}>Request Blood</ShowText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaf9ffff',
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
    paddingTop: 20,
    paddingBottom: 40,
  },
  profileImageWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    marginBottom: 15,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B0000',
    marginBottom: 20,
  },
  infoWrapper: {
    width: '100%',
    marginBottom: 30,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2, // shadow for android
    shadowColor: '#000', // shadow for ios
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  buttonsWrapper: {
    width: '100%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8B0000',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 15,
    justifyContent: 'center',
    gap: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserDetails;
