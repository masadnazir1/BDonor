import { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Text,
  Image,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import ShowText from '../Components/Shared/ShowText';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import doctorEquipment from '../Assets/doctor-equipment.png';

const { width, height } = Dimensions.get('screen');

function LoginScreen() {
  const navigation = useNavigation();

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
              />
            </View>

            {/* Keep me signed in */}
            <View style={styles.checkboxWrapper}>
              <TouchableOpacity>
                <Text style={styles.checkLabel}>
                  <Icon name="checkbox-outline" size={16} color="#d32f2f" />{' '}
                  Keep me signed in
                </Text>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => navigation.navigate('HomeScreen')}
            >
              <Text style={styles.loginButtonText}>Login</Text>
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
  avatarWrapper: {
    alignSelf: 'center',
    backgroundColor: '#eee',
    borderRadius: 60,
    padding: 12,
    marginBottom: 20,
    elevation: 4,
  },
  avatarImage: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
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
  checkboxWrapper: {
    marginBottom: 22,
  },
  checkLabel: {
    color: '#555',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#d32f2f',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 3,
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
