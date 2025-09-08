import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../Screen/SplashScreen';
import Itro1 from '../Screen/Itro1';
import LoginScreen from '../Screen/LoginScreen';
import SignUpScreen from '../Screen/SignUpScreen';
import HomeScreen from '../Screen/HomeScreen';
import DonateScreen from '../Screen/DonateScreen';
import CreateRequestScreen from '../Screen/CreateRequestScreen';
import UserDetails from '../Screen/UserDetails';

const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{ headerShown: false }} // default hidden
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Itro1" component={Itro1} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />

        {/* Only show header on this screen */}
        <Stack.Screen
          name="DonateScreen"
          component={DonateScreen}
          options={{ headerShown: true, title: 'Donate Screen' }}
        />
        <Stack.Screen
          name="CreateRequest"
          component={CreateRequestScreen}
          options={{ headerShown: true, title: 'Create Request' }}
        />
        <Stack.Screen
          name="UserDetails"
          component={UserDetails}
          options={{ headerShown: true, title: 'User Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
