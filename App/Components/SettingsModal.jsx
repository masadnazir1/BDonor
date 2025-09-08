import React, { useState, useEffect, useRef } from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Switch,
  Dimensions,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('screen');

const SettingsModal = ({ isVisible, onClose }) => {
  const navigation = useNavigation();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [nightLightEnabled, setNightLightEnabled] = useState(false);

  const slideAnim = useRef(new Animated.Value(-width)).current; // start hidden (off screen left)

  useEffect(() => {
    if (isVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -width,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, slideAnim]);

  const toggleNotifications = () => setNotificationsEnabled(prev => !prev);
  const toggleNightLight = () => setNightLightEnabled(prev => !prev);

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
      animationType="none" // disable default animation
    >
      <View style={styles.modalOverlay}>
        <Animated.View
          style={[
            styles.modalContent,
            { transform: [{ translateX: slideAnim }] },
          ]}
        >
          {/* Back Button */}
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Icon name="arrow-back-outline" size={24} color="#000" />
          </TouchableOpacity>

          {/* Header */}
          <View style={styles.header}>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>Albert</Text>
              <Text style={styles.email}>example@example.com</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('LoginScreen')}
              style={styles.logoutButton}
            >
              <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
          </View>

          {/* Settings List */}
          <View style={styles.settingsList}>
            <TouchableOpacity style={styles.settingItem}>
              <Text style={styles.settingText}>Edit Profile</Text>
              <Icon name="chevron-forward-outline" size={20} color="#333" />
            </TouchableOpacity>

            <View style={styles.settingItem}>
              <Text style={styles.settingText}>Notifications</Text>
              <Switch
                value={notificationsEnabled}
                onValueChange={toggleNotifications}
              />
            </View>

            <View style={styles.settingItem}>
              <Text style={styles.settingText}>Night Light</Text>
              <Switch
                value={nightLightEnabled}
                onValueChange={toggleNightLight}
              />
            </View>

            <TouchableOpacity style={styles.settingItem}>
              <Text style={styles.settingText}>Check for Update</Text>
              <Icon name="chevron-forward-outline" size={20} color="#333" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <Text style={styles.settingText}>About</Text>
              <Icon name="chevron-forward-outline" size={20} color="#333" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <Text style={styles.settingText}>Help</Text>
              <Icon name="chevron-forward-outline" size={20} color="#333" />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  modalContent: {
    position: 'absolute',
    bottom: 50,
    top: 50,
    left: 0,
    width: width * 0.8,
    backgroundColor: '#fff',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 15,
    left: 15,
    zIndex: 10,
    padding: 6,
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
  },
  header: {
    marginTop: 50, // push below back button
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'column',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  email: {
    fontSize: 16,
    color: '#777',
    marginTop: 2,
  },
  logoutButton: {
    backgroundColor: '#d32f2f',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  settingsList: {
    marginTop: 25,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingText: {
    fontSize: 16,
    color: '#333',
  },
});

export default SettingsModal;
