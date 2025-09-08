import React, { useState } from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import ShowText from '../Components/Shared/ShowText';
import apiClient from '../Util/apiClient';

const { width } = Dimensions.get('screen');

const BLOOD_GROUPS = [
  'A_POS',
  'A_NEG',
  'B_POS',
  'B_NEG',
  'AB_POS',
  'AB_NEG',
  'O_POS',
  'O_NEG',
];

function CreateRequestScreen() {
  const navigation = useNavigation();

  const [hospitalName, setHospitalName] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [message, setMessage] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!hospitalName || !bloodGroup || !message || !contactNo) {
      Alert.alert('Validation', 'Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await apiClient.post('/request', {
        userId: 'add4b121-4263-42d3-9000-6fb66867a78c',
        hospitalName,
        bloodGroup,
        message,
        contactNo,
      });

      if (response.data?.request) {
        Alert.alert('Success', 'Blood request created successfully', [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]);
      } else {
        Alert.alert('Error', response.data?.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('API Error:', error.message);
      Alert.alert('Error', 'Failed to create request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ShowText size={22} weight="bold" style={{ marginBottom: 20 }}>
            Create Blood Request
          </ShowText>

          {/* Hospital Name */}
          <ShowText size={14} weight="bold" style={{ marginBottom: 5 }}>
            Hospital Name
          </ShowText>
          <TextInput
            style={styles.input}
            placeholder="Enter hospital name"
            value={hospitalName}
            onChangeText={setHospitalName}
          />

          {/* Blood Group Picker */}
          <ShowText
            size={14}
            weight="bold"
            style={{ marginTop: 15, marginBottom: 5 }}
          >
            Blood Group
          </ShowText>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={bloodGroup}
              onValueChange={itemValue => setBloodGroup(itemValue)}
            >
              <Picker.Item label="Select Blood Group" value="" />
              {BLOOD_GROUPS.map(group => (
                <Picker.Item
                  key={group}
                  label={group.replace('_', '+')}
                  value={group}
                />
              ))}
            </Picker>
          </View>

          {/* Message */}
          <ShowText
            size={14}
            weight="bold"
            style={{ marginTop: 15, marginBottom: 5 }}
          >
            Message
          </ShowText>
          <TextInput
            style={[styles.input, { height: 80 }]}
            placeholder="Enter message"
            value={message}
            onChangeText={setMessage}
            multiline
          />

          {/* Contact Number */}
          <ShowText
            size={14}
            weight="bold"
            style={{ marginTop: 15, marginBottom: 5 }}
          >
            Contact Number
          </ShowText>
          <TextInput
            style={styles.input}
            placeholder="Enter contact number"
            value={contactNo}
            onChangeText={setContactNo}
            keyboardType="phone-pad"
          />

          {/* Submit Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <ShowText size={16} weight="bold" color="#fff">
                Create Request
              </ShowText>
            )}
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaf9ffff',
    paddingHorizontal: width * 0.05,
    paddingTop: 20,
  },
  input: {
    backgroundColor: '#f6f6f6',
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 15,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#d32f2f',
    borderRadius: 12,
    marginTop: 30,
    paddingVertical: 15,
    alignItems: 'center',
  },
});

export default CreateRequestScreen;
