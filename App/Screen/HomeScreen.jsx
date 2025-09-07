import React, { useState } from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import ProfileHeader from '../Components/Shared/ProfileHeader';
import blooddrop from '../Assets/blood-drop.png';
import ShowImage from '../Components/Shared/Image';
import ShowText from '../Components/Shared/ShowText';
import UserListScreen from '../Components/UserListScreen';
import BloodRequestListScreen from '../Components/BloodRequestListScreen';
import UserProfile from '../Components/UserProfile';
import SettingsModal from '../Components/SettingsModal';

const { width, height } = Dimensions.get('screen');
const TABS = [
  { id: 1, title: 'Find Donor' },
  { id: 2, title: 'Requests' },
  { id: 3, title: 'My Profile' },
];

function HomeScreen() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(prev => !prev);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 1:
        return (
          <>
            <UserListScreen />
          </>
        );

      case 2:
        return (
          <>
            <BloodRequestListScreen />
          </>
        );
      case 3:
        return (
          <>
            <UserProfile />
          </>
        );
      default:
        return null;
    }
  };

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
              <ShowText
                size={14}
                weight="bold"
                color={activeTab === tab.id ? '#fff' : '#000'}
              >
                {tab.title}
              </ShowText>
              <ShowImage source={blooddrop} height={40} width={40} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.contentContainer}>{renderContent()}</View>
        <SettingsModal isVisible={isModalVisible} onClose={toggleModal} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    paddingVertical: width * 0.04,
    borderRadius: width * 0.02,
    gap: 5,
  },
  activeTab: {
    backgroundColor: '#8B0000', // reddark
  },
  contentContainer: {
    flex: 1,
  },
});

export default HomeScreen;
