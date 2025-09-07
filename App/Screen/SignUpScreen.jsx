import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import ShowText from '../Components/Shared/ShowText';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('screen');

function SignUpScreen() {
  const navigation = useNavigation();

  // State to hold the form input values
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* Top Section */}
        <View style={styles.topSection}>
          {/* Back Button */}
          <View style={styles.BackANDImage}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-back-outline" size={22} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Header */}
        </View>

        {/* Bottom Form Section */}
        <KeyboardAvoidingView
          style={styles.formWrapper}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.header}>
            <ShowText size={width * 0.08} weight="bold" color="#fff">
              Create Account
            </ShowText>
          </View>
          <ScrollView
            style={styles.formContainer}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 30 }}
          >
            {/* Full Name */}
            <View style={styles.inputGroup}>
              <Icon name="person-outline" size={20} color="#999" />
              <TextInput
                placeholder="Full Name"
                placeholderTextColor="#aaa"
                style={styles.input}
                value={fullName}
                onChangeText={setFullName}
                returnKeyType="next"
              />
            </View>

            {/* Gender + Blood Group */}
            <View style={styles.RowForGenderGroup}>
              {/* Gender */}
              <View style={styles.inputGroupRow}>
                <Picker
                  selectedValue={gender}
                  style={styles.picker}
                  onValueChange={itemValue => setGender(itemValue)}
                >
                  <Picker.Item label="Gender" value="" />
                  <Picker.Item label="Male" value="male" />
                  <Picker.Item label="Female" value="female" />
                </Picker>
              </View>

              {/* Blood Group */}
              <View style={styles.inputGroupRow}>
                <Picker
                  selectedValue={bloodGroup}
                  style={styles.picker}
                  onValueChange={itemValue => setBloodGroup(itemValue)}
                >
                  <Picker.Item label="Blood Group" value="" />
                  <Picker.Item label="A+" value="A+" />
                  <Picker.Item label="B+" value="B+" />
                  <Picker.Item label="O+" value="O+" />
                  <Picker.Item label="AB+" value="AB+" />
                  <Picker.Item label="A-" value="A-" />
                  <Picker.Item label="B-" value="B-" />
                  <Picker.Item label="O-" value="O-" />
                  <Picker.Item label="AB-" value="AB-" />
                </Picker>
              </View>
            </View>

            {/* Email */}
            <View style={styles.inputGroup}>
              <Icon name="mail-outline" size={20} color="#999" />
              <TextInput
                placeholder="Email"
                placeholderTextColor="#aaa"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
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
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                returnKeyType="next"
              />
            </View>

            {/* Confirm Password */}
            <View style={styles.inputGroup}>
              <Icon name="lock-closed-outline" size={20} color="#999" />
              <TextInput
                placeholder="Confirm Password"
                placeholderTextColor="#aaa"
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                returnKeyType="done"
              />
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity style={styles.signUpButton}>
              <Text style={styles.signUpButtonText}>Sign Up</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d32f2f',
  },
  topSection: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  BackANDImage: {
    width,
    paddingHorizontal: width * 0.07,
    paddingTop: height * 0.08,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  RowForGenderGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  header: {
    width,
    paddingLeft: width * 0.07,
    paddingVertical: width * 0.01,
  },
  formWrapper: {
    flexShrink: 0,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: width * 0.07,
    paddingHorizontal: width * 0.07,
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
  inputGroupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 16,
    width: width * 0.4,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    color: '#333',
    fontSize: 15,
  },
  picker: {
    flex: 1,
  },
  signUpButton: {
    backgroundColor: '#d32f2f',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
    elevation: 3,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
});

export default SignUpScreen;
