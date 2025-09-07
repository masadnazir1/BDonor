import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import ShowText from '../Components/Shared/ShowText';
const { width, height } = Dimensions.get('screen');

const UserProfile = () => {
  const user = {
    name: 'Albert',
    gender: 'Male',
    contact: '03---------',
    country: 'Pakistan',
    savedLives: 3,
    bloodGroup: 'B+',
    image: require('../Assets/user.jpg'),
  };

  const getBloodGroupColor = bloodGroup => {
    if (bloodGroup === 'B-' || bloodGroup === 'O-') return '#d32f2f';
    return '#4CAF50';
  };

  return (
    <View style={styles.container}>
      {/* Top Stats Boxes */}
      <View style={styles.header}>
        <View style={styles.box}>
          <Icon name="heart-outline" size={28} color="#d32f2f" />
          <Text style={styles.boxLabel}>Saved Lives</Text>
          <ShowText style={styles.boxValue}>{user.savedLives}</ShowText>
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
            {user.bloodGroup}
          </ShowText>
        </View>
      </View>

      {/* Profile Info Card */}
      <View style={styles.profileInfoContainer}>
        <Image source={user.image} style={styles.profileImage} />
        <View style={styles.profileDetails}>
          <ShowText style={styles.infoLabel}>
            Name: <ShowText style={styles.infoValue}>{user.name}</ShowText>
          </ShowText>
          <ShowText style={styles.infoLabel}>
            Gender: <ShowText style={styles.infoValue}>{user.gender}</ShowText>
          </ShowText>
          <ShowText style={styles.infoLabel}>
            Contact:{' '}
            <ShowText style={styles.infoValue}>{user.contact}</ShowText>
          </ShowText>
          <ShowText style={styles.infoLabel}>
            Country:{' '}
            <ShowText style={styles.infoValue}>{user.country}</ShowText>
          </ShowText>
        </View>
      </View>

      {/* Available to Donate Button */}
      <TouchableOpacity style={styles.donateButton}>
        <Text style={styles.donateButtonText}>Available To Donate</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.05,
    backgroundColor: '#fafafa',
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
    elevation: 4, // Android shadow
    shadowColor: '#00000057', // iOS shadow
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
    elevation: 4, // Android shadow
    shadowColor: '#00000057', // iOS shadow
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
  },
  donateButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
});

export default UserProfile;
