import { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Text,
  Image,
  ActivityIndicator,
  NativeModules,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const { GoogleSignInModule } = NativeModules;
import ShowText from '../Components/Shared/ShowText';
import { useNavigation } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Icon from 'react-native-vector-icons/Ionicons';
import doctorEquipment from '../Assets/doctor-equipment.png';
import apiClient from '../Util/apiClient';
import { setItem } from '../Util/storage';

const { width, height } = Dimensions.get('screen');

GoogleSignin.configure({
  webClientId:
    '78919977610-e2b9milf5p6ts9im1puirttkp6qejnph.apps.googleusercontent.com',
  offlineAccess: false,
});

function LoginScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const GoogleLogin = async () => {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    return userInfo;
  };

  const signInGoogle = async () => {
    setLoading(true);
    try {
      const response = await GoogleLogin(); // Google sign-in

      console.log('user:', response.data.user);
      console.log('idToken:', response.data.idToken);
    } catch (error) {
      console.log('Login Error:', error);
    } finally {
      setLoading(false);
    }
  };

  //
  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await apiClient.post('/auth/login', {
        email,
        password,
      });

      const { token, user } = response.data || response;

      // save to async storage
      await setItem('authToken', token);
      await setItem('user', user);

      console.log('user and token', user, token);

      // Navigate to Home or Dashboard
      navigation.replace('HomeScreen');
    } catch (error) {
      console.log('Login Error:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.BackANDImage}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back-outline" size={22} color="#fff" />
          </TouchableOpacity>
          <Image source={doctorEquipment} />
        </View>

        <View style={styles.header}>
          <ShowText size={width * 0.08} weight="bold" color="#fff">
            Welcome
          </ShowText>
          <ShowText size={width * 0.045} color="#fff">
            Sign In
          </ShowText>
        </View>

        <View style={styles.content}>
          <View style={styles.spacer} />

          {/* Login Box */}
          <View style={styles.loginBox}>
            {/* Email */}
            <View style={styles.inputGroup}>
              <Icon name="mail-outline" size={20} color="#999" />
              <TextInput
                placeholder="Email"
                placeholderTextColor="#aaa"
                style={styles.input}
                keyboardType="email-address"
                returnKeyType="next"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            {/* Password */}
            <View style={styles.inputGroup}>
              <Icon name="lock-closed-outline" size={20} color="#999" />
              <TextInput
                placeholder="Password"
                placeholderTextColor="#aaa"
                style={styles.input}
                secureTextEntry
                returnKeyType="done"
                value={password}
                onChangeText={setPassword}
              />
            </View>

            {/* Login Button */}
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.loginButtonText}>Login</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.signInGoogle}
              onPress={signInGoogle}
            >
              {loading ? (
                <ActivityIndicator color="#0099ffff" />
              ) : (
                <Text style={styles.signInGoogleButtonText}>
                  Continue with Google
                </Text>
              )}
            </TouchableOpacity>

            {/* Forgot password */}
            <TouchableOpacity>
              <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>

            {/* Sign Up */}
            <TouchableOpacity
              onPress={() => navigation.navigate('SignUpScreen')}
            >
              <Text style={styles.signupText}>
                Don’t have an account?{' '}
                <Text style={styles.signupLink}>Sign Up</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d32f2f',
  },
  BackANDImage: {
    width,
    paddingHorizontal: width * 0.1,
    paddingTop: height * 0.08,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  header: {
    width,
    paddingLeft: width * 0.1,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  spacer: {
    flex: 1,
  },
  loginBox: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: width * 0.07,
    width: width,
    elevation: 8,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    color: '#333',
    fontSize: 15,
  },
  loginButton: {
    backgroundColor: '#d32f2f',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 3,
  },
  signInGoogle: {
    backgroundColor: '#ffffffff',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 3,
    borderWidth: 2,
    borderColor: '#ccc',
  },

  signInGoogleButtonText: {
    color: '#000',
    fontSize: 17,
    fontWeight: 'bold',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  forgotText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 13,
    marginBottom: 18,
  },
  signupText: {
    textAlign: 'center',
    color: '#333',
    fontSize: 14,
  },
  signupLink: {
    color: '#d32f2f',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
