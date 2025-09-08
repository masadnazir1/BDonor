import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  View,
  BackHandler,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import ProfileHeader from '../Components/Shared/ProfileHeader';
import ShowText from '../Components/Shared/ShowText';
import UserListScreen from '../Components/UserListScreen';
import BloodRequestListScreen from '../Components/BloodRequestListScreen';
import UserProfile from '../Components/UserProfile';
import SettingsModal from '../Components/SettingsModal';
import ConfirmationModal from '../Components/Shared/ConfirmationModal';
import FloatingButton from '../Components/Shared/FloatingButton';

const { width } = Dimensions.get('screen');

const TABS = [
  { id: 1, title: 'Find Donor', icon: 'people-outline' },
  { id: 2, title: 'Requests', icon: 'list-outline' },
  { id: 3, title: 'My Profile', icon: 'person-circle-outline' },
];

function HomeScreen() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [exitModalVisible, setExitModalVisible] = useState(false);

  const toggleModal = () => setIsModalVisible(prev => !prev);

  const renderContent = () => {
    switch (activeTab) {
      case 1:
        return <UserListScreen />;
      case 2:
        return <BloodRequestListScreen />;
      case 3:
        return <UserProfile />;
      default:
        return null;
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        setExitModalVisible(true); // only shows when HomeScreen is focused
        return true; // prevent default back action
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }, []),
  );
  const handleExitApp = () => BackHandler.exitApp();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ProfileHeader
          userName="M Asad"
          profileImage={{
            uri: 'https://images.pexels.com/photos/943084/pexels-photo-943084.jpeg?cs=srgb&dl=pexels-olly-943084.jpg&fm=jpg',
          }}
          onSettingsPress={toggleModal}
        />

        {/* Tabs */}
        <View style={styles.tabsWrapper}>
          {TABS.map(tab => (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tab, activeTab === tab.id && styles.activeTab]}
              onPress={() => setActiveTab(tab.id)}
            >
              <Icon
                name={tab.icon}
                size={24}
                color={activeTab === tab.id ? '#fff' : '#555'}
              />
              <ShowText
                size={14}
                weight="bold"
                color={activeTab === tab.id ? '#fff' : '#555'}
              >
                {tab.title}
              </ShowText>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.contentContainer}>{renderContent()}</View>

        <SettingsModal isVisible={isModalVisible} onClose={toggleModal} />

        {/* Reusable Confirmation Modal for Exit */}
        <ConfirmationModal
          visible={exitModalVisible}
          title="Exit App?"
          message="Are you sure you want to close the app?"
          confirmText="Yes"
          cancelText="No"
          onConfirm={handleExitApp}
          onClose={() => setExitModalVisible(false)}
        />
        <FloatingButton onPress={() => navigation.navigate('CreateRequest')} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaf9ffff',
  },
  tabsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.05,
    paddingVertical: width * 0.03,
    gap: width * 0.02,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#e9c0c0',
    paddingVertical: width * 0.035,
    borderRadius: width * 0.02,
    gap: 5,
  },
  activeTab: {
    backgroundColor: '#8B0000',
  },
  contentContainer: {
    flex: 1,
  },
});

export default HomeScreen;
