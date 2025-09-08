import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('screen');

const ProfileHeader = ({ userName, profileImage, onSettingsPress }) => {
  return (
    <View style={styles.container}>
      {/* Profile Image */}
      <Image source={profileImage} style={styles.avatar} />

      {/* Welcome Text */}
      <View style={styles.textWrapper}>
        <Text style={styles.welcomeText}>Welcome</Text>
        <Text style={styles.userName}>{userName}</Text>
      </View>

      {/* Settings Button */}
      <TouchableOpacity onPress={onSettingsPress} style={styles.settingsButton}>
        <Icon name="settings-outline" size={25} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    // height: height * 0.2,
    backgroundColor: '#d32f2f',

    paddingLeft: width * 0.05,
    paddingRight: width * 0.05,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: width * 0.02,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
  },
  textWrapper: {
    flex: 1,
    marginLeft: width * 0.05,
  },
  welcomeText: {
    color: '#fff',
    fontSize: 18,
  },
  userName: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  settingsButton: {
    // justifyContent: 'center',
    // alignItems: 'center',
    padding: 8,
    backgroundColor: 'transparent',
    borderRadius: 25,
  },
});

export default ProfileHeader;
