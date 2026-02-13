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
      <StatusBar barStyle="dark-content" backgroundColor="#a8d4f0" />
      
      <View style={styles.content}>
        {/* Shield Icon */}
        <View style={styles.iconContainer}>
          <Ionicons name="shield-checkmark-outline" size={60} color="#2c3e50" />
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
    backgroundColor: '#a8d4f0',
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
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 15,
    color: '#4a4a5a',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 40,
  },
  link: {
    color: '#2980b9',
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
    borderColor: '#7f8c8d',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  checkboxChecked: {
    backgroundColor: '#2980b9',
    borderColor: '#2980b9',
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 15,
    color: '#1a1a2e',
    lineHeight: 22,
  },
  continueButton: {
    width: '100%',
    backgroundColor: '#2980b9',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 40,
    shadowColor: '#2980b9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  continueButtonDisabled: {
    backgroundColor: '#bdc3c7',
    shadowOpacity: 0,
    elevation: 0,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  continueButtonTextDisabled: {
    color: '#95a5a6',
  },
});

export default DisclaimerScreen;
