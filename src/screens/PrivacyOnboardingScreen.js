import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Alert,
  BackHandler,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ONBOARDING_COMPLETE_KEY = '@peptify_onboarding_complete';

const PrivacyOnboardingScreen = ({ navigation }) => {
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 50;
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
      setHasScrolledToBottom(true);
    }
  };

  const handleContinue = async () => {
    if (accepted) {
      try {
        await AsyncStorage.setItem(ONBOARDING_COMPLETE_KEY, 'true');
      } catch (error) {
        console.log('Error saving onboarding status:', error);
      }
      navigation.replace('Splash');
    } else {
      Alert.alert(
        'Acceptance Required',
        'You must accept the Privacy Policy to continue.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleDecline = () => {
    Alert.alert(
      'Cannot Continue',
      'You must accept the Privacy Policy to use this application.',
      [
        { text: 'Review Again', style: 'cancel' },
        { text: 'Exit App', style: 'destructive', onPress: () => BackHandler.exitApp() },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="lock-closed" size={32} color="#1abc9c" />
        <Text style={styles.headerTitle}>Privacy Policy</Text>
      </View>

      {/* Progress indicator */}
      <View style={styles.progressContainer}>
        <View style={[styles.progressDot, styles.progressComplete]} />
        <View style={[styles.progressLine, styles.progressLineComplete]} />
        <View style={[styles.progressDot, styles.progressComplete]} />
        <View style={[styles.progressLine, styles.progressLineComplete]} />
        <View style={[styles.progressDot, styles.progressComplete]} />
        <View style={styles.progressLine} />
        <View style={[styles.progressDot, styles.progressActive]} />
      </View>

      {/* Scrollable Content */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={true}
      >
        <Text style={styles.lastUpdated}>Last Updated: February 2026</Text>

        <Text style={styles.introText}>
          Peptfied ("we," "our," or "us") is committed to protecting your privacy. This Privacy 
          Policy explains how we collect, use, and safeguard your information when you use our 
          mobile application.
        </Text>

        <Text style={styles.sectionTitle}>1. Information We Collect</Text>
        <Text style={styles.privacyText}>
          <Text style={styles.boldText}>Account Information:</Text> When you create an account, 
          we collect your email address and any profile information you provide.{'\n\n'}
          <Text style={styles.boldText}>Usage Data:</Text> We automatically collect information 
          about how you interact with the App, including pages viewed and features used.{'\n\n'}
          <Text style={styles.boldText}>Device Information:</Text> We may collect device type, 
          operating system, and unique device identifiers.
        </Text>

        <Text style={styles.sectionTitle}>2. How We Use Your Information</Text>
        <Text style={styles.privacyText}>
          • To provide and maintain our services{'\n'}
          • To process your research list and orders{'\n'}
          • To communicate with you about your account{'\n'}
          • To improve our App and user experience{'\n'}
          • To comply with legal obligations
        </Text>

        <Text style={styles.sectionTitle}>3. Data Security</Text>
        <Text style={styles.privacyText}>
          We implement appropriate security measures to protect your personal information. 
          However, no method of electronic storage is 100% secure, and we cannot guarantee 
          absolute security.
        </Text>

        <Text style={styles.sectionTitle}>4. Data Sharing</Text>
        <Text style={styles.privacyText}>
          We do not sell your personal information. We may share data with:{'\n\n'}
          • Service providers who assist our operations{'\n'}
          • Legal authorities when required by law{'\n'}
          • Business partners with your consent
        </Text>

        <Text style={styles.sectionTitle}>5. Your Rights</Text>
        <Text style={styles.privacyText}>
          You have the right to:{'\n\n'}
          • Access your personal data{'\n'}
          • Request correction of inaccurate data{'\n'}
          • Request deletion of your data{'\n'}
          • Opt-out of marketing communications
        </Text>

        <Text style={styles.sectionTitle}>6. Data Retention</Text>
        <Text style={styles.privacyText}>
          We retain your information only as long as necessary to provide our services and 
          fulfill the purposes described in this policy.
        </Text>

        <Text style={styles.sectionTitle}>7. Children's Privacy</Text>
        <Text style={styles.privacyText}>
          Our App is not intended for individuals under 21 years of age. We do not knowingly 
          collect information from minors.
        </Text>

        <Text style={styles.sectionTitle}>8. Changes to This Policy</Text>
        <Text style={styles.privacyText}>
          We may update this Privacy Policy from time to time. We will notify you of significant 
          changes through the App.
        </Text>

        <Text style={styles.sectionTitle}>9. Contact Us</Text>
        <Text style={styles.privacyText}>
          If you have questions about this Privacy Policy, please contact us through the App's 
          support channels.
        </Text>

        <View style={styles.scrollPadding} />
      </ScrollView>

      {/* Scroll indicator */}
      {!hasScrolledToBottom && (
        <View style={styles.scrollIndicator}>
          <Text style={styles.scrollIndicatorText}>Scroll down to read all</Text>
          <Ionicons name="chevron-down" size={20} color="#666" />
        </View>
      )}

      {/* Acceptance Section */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.checkboxRow, !hasScrolledToBottom && styles.checkboxDisabled]}
          onPress={() => hasScrolledToBottom && setAccepted(!accepted)}
          activeOpacity={hasScrolledToBottom ? 0.7 : 1}
        >
          <View style={[styles.checkbox, accepted && styles.checkboxChecked]}>
            {accepted && <Ionicons name="checkmark" size={18} color="#000" />}
          </View>
          <Text style={[styles.checkboxText, !hasScrolledToBottom && styles.textDisabled]}>
            I have read and agree to the Privacy Policy
          </Text>
        </TouchableOpacity>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.declineButton]}
            onPress={handleDecline}
            activeOpacity={0.8}
          >
            <Text style={styles.declineButtonText}>Decline</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.acceptButton, !accepted && styles.buttonDisabled]}
            onPress={handleContinue}
            activeOpacity={0.8}
          >
            <Text style={styles.acceptButtonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 12,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 40,
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#333',
  },
  progressActive: {
    backgroundColor: '#1abc9c',
  },
  progressComplete: {
    backgroundColor: '#1abc9c',
  },
  progressLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#333',
    marginHorizontal: 4,
  },
  progressLineComplete: {
    backgroundColor: '#1abc9c50',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  lastUpdated: {
    fontSize: 13,
    color: '#666',
    marginBottom: 16,
    textAlign: 'center',
  },
  introText: {
    fontSize: 14,
    color: '#cccccc',
    lineHeight: 22,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1abc9c',
    marginTop: 20,
    marginBottom: 8,
  },
  privacyText: {
    fontSize: 14,
    color: '#cccccc',
    lineHeight: 22,
  },
  boldText: {
    fontWeight: '700',
    color: '#ffffff',
  },
  scrollPadding: {
    height: 40,
  },
  scrollIndicator: {
    position: 'absolute',
    bottom: 160,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingVertical: 8,
  },
  scrollIndicatorText: {
    fontSize: 13,
    color: '#666',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#1a1a1a',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#111111',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2a2a2a',
    marginBottom: 16,
  },
  checkboxDisabled: {
    opacity: 0.5,
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#1abc9c',
    marginRight: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#1abc9c',
  },
  checkboxText: {
    flex: 1,
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '500',
  },
  textDisabled: {
    color: '#666666',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  declineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#333333',
  },
  acceptButton: {
    backgroundColor: '#1abc9c',
  },
  buttonDisabled: {
    backgroundColor: '#1abc9c50',
  },
  declineButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
  },
  acceptButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
});

export default PrivacyOnboardingScreen;
