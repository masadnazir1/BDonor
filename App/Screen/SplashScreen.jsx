import { StyleSheet, View } from 'react-native';
import { useEffect } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import ShowImage from '../Components/Shared/Image';
import ShowText from '../Components/Shared/ShowText';
import { Dimensions } from 'react-native';
import blooddrop from '../Assets/blood-drop.png';
import plus from '../Assets/plus.png';
const { width, height } = Dimensions.get('screen');
import { useNavigation } from '@react-navigation/native';

//
function SplashScreen() {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Itro1');
    }, 3000);
  }, []);

  //
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ShowImage source={blooddrop} />

        <View style={styles.TextGroup}>
          <ShowImage
            source={plus}
            width={20}
            height={20}
            style={styles.PlusIcon}
          />
          <ShowText
            align="center"
            weight="bold"
            color="#fff"
            size={width * 0.05}
          >
            Blood Donor
          </ShowText>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'darkred',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '30',
  },
  TextGroup: {
    position: 'relative',
    alignContent: 'center',
    justifyContent: 'flex-end',
    height: 40,
    width: width * 0.5,
  },
  PlusIcon: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
});

export default SplashScreen;
