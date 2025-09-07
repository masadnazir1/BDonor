import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import ShowImage from '../Components/Shared/Image';
import ShowText from '../Components/Shared/ShowText';
import blooddrop from '../Assets/blood-drop.png';
import Hands from '../Assets/person-voluntarily.png';
import Heart from '../Assets/Heart.png';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

function Intro1() {
  const navigation = useNavigation();
  const [steps, setSteps] = useState(1);
  const [dynamicPIC, setdynamicPIC] = useState(Hands);
  const [Heading, setHeading] = useState('Donate Blood');
  const [SubHeading, setSubHeading] = useState(
    'Request for blood in a few quick \nsimple and easy steps',
  );

  const HandleSteps = () => {
    if (steps < 4) {
      setSteps(prev => prev + 1);
    }
  };

  //
  useEffect(() => {
    if (steps === 2) {
      setHeading('Save Lives');
      setSubHeading('Blood is mean to circulate \nPass it around as donor');
      setdynamicPIC(Hands);
    } else if (steps === 3) {
      setHeading('Find Donor');
      setSubHeading(
        'Search the blood type you need \nand reach to the nearest',
      );
      setdynamicPIC(Heart);
    } else if (steps === 4) {
      navigation.navigate('LoginScreen');
    }
  }, [steps]);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* Red Diagonal Background */}
        <View style={styles.leftShape} />
        <View style={styles.rightShape} />

        {/* Blood Drop Icons */}
        <View
          style={
            steps == 2 || steps == 3
              ? styles.IconsMainContainer
              : styles.dropContainer
          }
        >
          <View
            style={
              steps == 2 || steps == 3
                ? styles.IconsInnerContainer
                : styles.dropInnerContainer
            }
          >
            {steps === 2 && (
              <ShowImage
                source={dynamicPIC}
                width={width * 0.5}
                height={height * 0.1}
                resizeMode="contain"
                tintColor="red"
              />
            )}
            {steps === 3 && (
              <ShowImage
                source={dynamicPIC}
                width={width * 0.5}
                height={height * 0.1}
                style={{ left: width * 0.1 }}
                resizeMode="contain"
                tintColor="red"
              />
            )}
            {steps === 1 && (
              <ShowImage
                source={blooddrop}
                width={width * 0.1}
                height={height * 0.05}
                style={styles.DropSmall}
                tintColor="red"
              />
            )}
            {steps === 1 && (
              <ShowImage
                source={blooddrop}
                width={width * 0.1}
                height={height * 0.06}
                style={styles.DropMid}
                tintColor="red"
              />
            )}
            {steps === 1 && (
              <ShowImage
                source={blooddrop}
                width={width * 0.2}
                height={height * 0.1}
                style={styles.DropBig}
                tintColor="red"
              />
            )}
          </View>
        </View>

        {/* Text Section */}
        <View style={styles.textGroup}>
          <ShowText align="left" weight="bold" color="red" size={width * 0.06}>
            {Heading}
          </ShowText>
          <ShowText align="left" color="#555" size={width * 0.035}>
            {SubHeading}
          </ShowText>
        </View>

        {/* Floating Button */}
        <TouchableOpacity style={styles.fab} onPress={HandleSteps}>
          <Icon name="arrow-forward-outline" size={22} color="red" />
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: width,
  },

  DropBig: {
    tintColor: '#000',
    position: 'absolute',
    bottom: 0,
    left: 50,
    right: 50,
  },
  DropSmall: {
    tintColor: '#000',
    position: 'absolute',
    top: width * 0.1,
    left: width * 0.1,
  },
  DropMid: {
    position: 'absolute',
    top: width * 0.05,
    right: width * 0.1,
  },
  dropContainer: {
    marginTop: height * 0.05,
    height: height * 0.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width,
  },
  IconsMainContainer: {
    marginTop: height * 0.05,
    flexDirection: 'row',
    width: width * 0.5,
    alignContent: 'center',
    justifyContent: 'flex-start',
  },
  dropInnerContainer: {
    position: 'relative',
    width: width * 0.5,
  },
  IconsInnerContainer: {
    width: width * 1,

    position: 'relative',
  },
  textGroup: {
    marginTop: height * 0.03,
    left: width * 0.1,
    justifyContent: 'flex-start',
    width: width,
  },
  // Red diagonal backgrounds
  leftShape: {
    position: 'absolute',
    bottom: 0,
    left: -width * 0.4,
    width: width * 2.4,
    height: height * 0.5,
    backgroundColor: '#ff0905bf',
    transform: [{ skewY: '-45deg' }],
  },
  rightShape: {
    position: 'absolute',
    bottom: 0,
    right: -width * 0.25,
    width: width * 2.2,
    height: height * 0.5,
    backgroundColor: '#ff0905bf',
    transform: [{ skewY: '45deg' }],
  },
  bottomRed: {
    position: 'absolute',
    bottom: 0,
    height: height * 0.18,
    width: '100%',
    backgroundColor: '#e53935',
  },
  fab: {
    position: 'absolute',
    bottom: height * 0.09,
    right: width * 0.08,
    backgroundColor: '#fff',
    borderRadius: width * 0.1,
    width: width * 0.15,
    height: width * 0.15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});

export default Intro1;
