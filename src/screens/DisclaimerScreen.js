import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const DisclaimerScreen = ({ navigation }) => {
  const [isAgeConfirmed, setIsAgeConfirmed] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  useEffect(() => {
    checkIfAccepted();
  }, []);

  const checkIfAccepted = async () => {
    try {
      const accepted = await AsyncStorage.getItem('disclaimerAccepted');
      if (accepted === 'true') {
        navigation.replace('MainApp');
      }
    } catch (error) {
      console.log('Error checking disclaimer status:', error);
    }
  };

  const handleContinue = async () => {
    if (isAgeConfirmed && isTermsAccepted) {
      try {
        await AsyncStorage.setItem('disclaimerAccepted', 'true');
        navigation.replace('MainApp');
      } catch (error) {
        console.log('Error saving disclaimer acceptance:', error);
        navigation.replace('MainApp');
      }
    }
  };

  const canContinue = isAgeConfirmed && isTermsAccepted;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      
      <View style={styles.content}>
        {/* Shield Icon */}
        <View style={styles.iconContainer}>
          <Ionicons name="shield-checkmark-outline" size={60} color="#1abc9c" />
        </View>

        {/* Title */}
        <Text style={styles.title}>Before You Continue</Text>

        {/* Description */}
        <Text style={styles.description}>
          By using Peptify, you confirm that you are at least 18 years old and agree to our{' '}
          <Text style={styles.link} onPress={() => navigation.navigate('Terms')}>
            Terms & Conditions
          </Text>
          {' '}and{' '}
          <Text style={styles.link} onPress={() => navigation.navigate('Privacy')}>
            Privacy Policy
          </Text>
          .
        </Text>

        {/* Checkboxes */}
        <TouchableOpacity 
          style={styles.checkboxRow}
          onPress={() => setIsAgeConfirmed(!isAgeConfirmed)}
          activeOpacity={0.7}
        >
          <View style={[styles.checkbox, isAgeConfirmed && styles.checkboxChecked]}>
            {isAgeConfirmed && <Ionicons name="checkmark" size={16} color="#fff" />}
          </View>
          <Text style={styles.checkboxLabel}>I am at least 18 years old</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.checkboxRow}
          onPress={() => setIsTermsAccepted(!isTermsAccepted)}
          activeOpacity={0.7}
        >
          <View style={[styles.checkbox, isTermsAccepted && styles.checkboxChecked]}>
            {isTermsAccepted && <Ionicons name="checkmark" size={16} color="#fff" />}
          </View>
          <Text style={styles.checkboxLabel}>
            I agree to the{' '}
            <Text style={styles.link} onPress={() => navigation.navigate('Terms')}>
              Terms & Conditions
            </Text>
            {' '}and{' '}
            <Text style={styles.link} onPress={() => navigation.navigate('Privacy')}>
              Privacy Policy
            </Text>
          </Text>
        </TouchableOpacity>

        {/* Continue Button */}
        <TouchableOpacity 
          style={[styles.continueButton, !canContinue && styles.continueButtonDisabled]}
          onPress={handleContinue}
          disabled={!canContinue}
          activeOpacity={0.8}
        >
          <Text style={[styles.continueButtonText, !canContinue && styles.continueButtonTextDisabled]}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 80,
    alignItems: 'center',
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(26,188,156,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 15,
    color: '#aaa',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 40,
  },
  link: {
    color: '#1abc9c',
    textDecorationLine: 'underline',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#555',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
  },
  checkboxChecked: {
    backgroundColor: '#1abc9c',
    borderColor: '#1abc9c',
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 15,
    color: '#ddd',
    lineHeight: 22,
  },
  continueButton: {
    width: '100%',
    backgroundColor: '#1abc9c',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 40,
    shadowColor: '#1abc9c',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  continueButtonDisabled: {
    backgroundColor: '#333',
    shadowOpacity: 0,
    elevation: 0,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  continueButtonTextDisabled: {
    color: '#666',
  },
});

export default DisclaimerScreen;
