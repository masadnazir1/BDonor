import { StyleSheet, View, Dimensions } from 'react-native';
import { useEffect } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import ShowImage from '../Components/Shared/Image';
import logo from '../Assets/logo.png';
import { useNavigation } from '@react-navigation/native';
import { getItem } from '../Util/storage';

const { width, height } = Dimensions.get('screen');

function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    let timeout;
    const checkAuth = async () => {
      try {
        const token = await getItem('authToken');
        timeout = setTimeout(() => {
          if (token) {
            navigation.reset({
              index: 0,
              routes: [{ name: 'HomeScreen' }],
            });
          } else {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Itro1' }],
            });
          }
        }, 2000);
      } catch (error) {
        console.error('Error checking auth token:', error);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Itro1' }],
        });
      }
    };
    checkAuth();

    return () => clearTimeout(timeout); // cleanup
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ShowImage source={logo} width={width * 0.5} height={width * 0.5} />
        <View style={styles.TextGroup}></View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaf9ffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextGroup: {
    marginTop: 20,
    width: width * 0.6,
  },
});

export default SplashScreen;
