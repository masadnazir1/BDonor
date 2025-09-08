import React, { useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('screen');

function CreateRequestScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}></SafeAreaView>
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
});

export default CreateRequestScreen;
