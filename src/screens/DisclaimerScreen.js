import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Linking,
  Alert,
  BackHandler,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export const DISCLAIMER_ACCEPTED_KEY = '@human_research_disclaimer_accepted_v3';

const DisclaimerScreen = ({ navigation }) => {
  const [isAgeConfirmed, setIsAgeConfirmed] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [isPrivacyAccepted, setIsPrivacyAccepted] = useState(false);

  // Prevent back button from bypassing disclaimer
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      showExitAlert();
      return true; // Prevent default back behavior
    });

    return () => backHandler.remove();
  }, []);

  const showExitAlert = () => {
    Alert.alert(
      'Cannot Continue',
      'You must be at least 21 years old and agree to our Terms & Conditions and Privacy Policy to use this app.',
      [
        { text: 'Review Requirements', style: 'cancel' },
        { text: 'Exit App', style: 'destructive', onPress: () => BackHandler.exitApp() },
      ]
    );
  };

  const handleContinue = async () => {
    if (isAgeConfirmed && isTermsAccepted && isPrivacyAccepted) {
      try {
        await AsyncStorage.setItem(DISCLAIMER_ACCEPTED_KEY, 'true');
        navigation.replace('MainApp');
      } catch (error) {
        console.log('Error saving disclaimer acceptance:', error);
        navigation.replace('MainApp');
      }
    }
  };

  const handleDecline = () => {
    Alert.alert(
      'Unable to Proceed',
      'You must confirm you are 21+ and agree to our Terms & Conditions and Privacy Policy to use Peptify.',
      [
        { text: 'OK', style: 'cancel' },
        { text: 'Exit App', style: 'destructive', onPress: () => BackHandler.exitApp() },
      ]
    );
  };

  const canContinue = isAgeConfirmed && isTermsAccepted && isPrivacyAccepted;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      <View style={styles.content}>
        {/* Shield Icon */}
        <View style={styles.iconContainer}>
          <Ionicons name="shield-checkmark-outline" size={60} color="#1abc9c" />
        </View>

        {/* Title */}
        <Text style={styles.title}>Age Verification & Legal</Text>

        {/* Description */}
        <Text style={styles.description}>
          To use Peptify, you must confirm the following requirements. Please read each carefully.
        </Text>

        {/* Age Checkbox */}
        <TouchableOpacity 
          style={styles.checkboxRow}
          onPress={() => setIsAgeConfirmed(!isAgeConfirmed)}
          activeOpacity={0.7}
        >
          <View style={[styles.checkbox, isAgeConfirmed && styles.checkboxChecked]}>
            {isAgeConfirmed && <Ionicons name="checkmark" size={16} color="#fff" />}
          </View>
          <Text style={styles.checkboxLabel}>
            <Text style={styles.requiredStar}>* </Text>
            I confirm I am at least 21 years of age
          </Text>
        </TouchableOpacity>

        {/* Terms Checkbox */}
        <TouchableOpacity 
          style={styles.checkboxRow}
          onPress={() => setIsTermsAccepted(!isTermsAccepted)}
          activeOpacity={0.7}
        >
          <View style={[styles.checkbox, isTermsAccepted && styles.checkboxChecked]}>
            {isTermsAccepted && <Ionicons name="checkmark" size={16} color="#fff" />}
          </View>
          <Text style={styles.checkboxLabel}>
            <Text style={styles.requiredStar}>* </Text>
            I have read and agree to the{' '}
            <Text style={styles.link} onPress={() => navigation.navigate('Terms')}>
              Terms & Conditions
            </Text>
          </Text>
        </TouchableOpacity>

        {/* Privacy Checkbox */}
        <TouchableOpacity 
          style={styles.checkboxRow}
          onPress={() => setIsPrivacyAccepted(!isPrivacyAccepted)}
          activeOpacity={0.7}
        >
          <View style={[styles.checkbox, isPrivacyAccepted && styles.checkboxChecked]}>
            {isPrivacyAccepted && <Ionicons name="checkmark" size={16} color="#fff" />}
          </View>
          <Text style={styles.checkboxLabel}>
            <Text style={styles.requiredStar}>* </Text>
            I have read and agree to the{' '}
            <Text style={styles.link} onPress={() => navigation.navigate('Privacy')}>
              Privacy Policy
            </Text>
          </Text>
        </TouchableOpacity>

        {/* Required Notice */}
        <Text style={styles.requiredNotice}>
          <Text style={styles.requiredStar}>* </Text>
          All fields are required to continue
        </Text>

        {/* Continue Button */}
        <TouchableOpacity 
          style={[styles.continueButton, !canContinue && styles.continueButtonDisabled]}
          onPress={handleContinue}
          disabled={!canContinue}
          activeOpacity={0.8}
        >
          <Text style={[styles.continueButtonText, !canContinue && styles.continueButtonTextDisabled]}>
            I Agree & Continue
          </Text>
        </TouchableOpacity>

        {/* Decline Button */}
        <TouchableOpacity 
          style={styles.declineButton}
          onPress={handleDecline}
          activeOpacity={0.7}
        >
          <Text style={styles.declineButtonText}>
            I Do Not Agree
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 60,
    alignItems: 'center',
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(26,188,156,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
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
    marginBottom: 25,
  },
  link: {
    color: '#1abc9c',
    textDecorationLine: 'underline',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 16,
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
  requiredStar: {
    color: '#e74c3c',
    fontWeight: '700',
  },
  requiredNotice: {
    fontSize: 12,
    color: '#888',
    marginTop: 8,
    marginBottom: 10,
  },
  continueButton: {
    width: '100%',
    backgroundColor: '#1abc9c',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 25,
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
  declineButton: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#555',
  },
  declineButtonText: {
    color: '#888',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default DisclaimerScreen;
