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

const TermsOnboardingScreen = ({ navigation }) => {
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 50;
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
      setHasScrolledToBottom(true);
    }
  };

  const handleContinue = () => {
    if (accepted) {
      navigation.replace('PrivacyOnboarding');
    } else {
      Alert.alert(
        'Acceptance Required',
        'You must accept the Terms & Conditions to continue.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleDecline = () => {
    Alert.alert(
      'Cannot Continue',
      'You must accept the Terms & Conditions to use this application.',
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
        <Ionicons name="document-text" size={32} color="#1abc9c" />
        <Text style={styles.headerTitle}>Terms & Conditions</Text>
      </View>

      {/* Progress indicator */}
      <View style={styles.progressContainer}>
        <View style={[styles.progressDot, styles.progressComplete]} />
        <View style={styles.progressLine} />
        <View style={[styles.progressDot, styles.progressComplete]} />
        <View style={styles.progressLine} />
        <View style={[styles.progressDot, styles.progressActive]} />
        <View style={styles.progressLine} />
        <View style={styles.progressDot} />
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

        <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
        <Text style={styles.termsText}>
          By accessing or using the Peptify mobile application ("App"), you agree to be bound 
          by these Terms and Conditions. If you do not agree to these terms, do not use the App.
        </Text>

        <Text style={styles.sectionTitle}>2. Research Purposes Only</Text>
        <Text style={styles.termsText}>
          All products available through Peptify are intended strictly for in-vitro research, 
          laboratory experimentation, and educational purposes. Products are NOT for human 
          consumption, veterinary use, or any therapeutic application.
        </Text>

        <Text style={styles.sectionTitle}>3. Age Requirement</Text>
        <Text style={styles.termsText}>
          You must be at least 21 years of age to use this App. By using the App, you represent 
          and warrant that you meet this age requirement.
        </Text>

        <Text style={styles.sectionTitle}>4. User Responsibilities</Text>
        <Text style={styles.termsText}>
          Users are solely responsible for ensuring compliance with all applicable laws and 
          regulations regarding the purchase, possession, storage, and use of research compounds 
          in their jurisdiction.
        </Text>

        <Text style={styles.sectionTitle}>5. Prohibited Uses</Text>
        <Text style={styles.termsText}>
          You agree NOT to:{'\n'}
          • Use products for human or animal consumption{'\n'}
          • Resell products for unapproved purposes{'\n'}
          • Misrepresent or relabel products{'\n'}
          • Violate any applicable laws or regulations
        </Text>

        <Text style={styles.sectionTitle}>6. Intellectual Property</Text>
        <Text style={styles.termsText}>
          All content, trademarks, and intellectual property within the App are owned by Peptify 
          or its licensors. Unauthorized use is prohibited.
        </Text>

        <Text style={styles.sectionTitle}>7. Disclaimer of Warranties</Text>
        <Text style={styles.termsText}>
          The App and all products are provided "AS IS" without warranties of any kind. Peptify 
          does not guarantee accuracy of information or fitness for any particular purpose.
        </Text>

        <Text style={styles.sectionTitle}>8. Limitation of Liability</Text>
        <Text style={styles.termsText}>
          Peptify shall not be liable for any direct, indirect, incidental, special, or 
          consequential damages arising from use of the App or products purchased through it.
        </Text>

        <Text style={styles.sectionTitle}>9. Indemnification</Text>
        <Text style={styles.termsText}>
          You agree to indemnify and hold harmless Peptify from any claims, damages, or expenses 
          arising from your use of the App or violation of these Terms.
        </Text>

        <Text style={styles.sectionTitle}>10. Modifications</Text>
        <Text style={styles.termsText}>
          Peptify reserves the right to modify these Terms at any time. Continued use of the 
          App constitutes acceptance of modified Terms.
        </Text>

        <Text style={styles.sectionTitle}>11. Contact</Text>
        <Text style={styles.termsText}>
          For questions about these Terms, contact us through the App's support channels.
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
            I have read and agree to the Terms & Conditions
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
            <Text style={styles.acceptButtonText}>Accept & Continue</Text>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  lastUpdated: {
    fontSize: 13,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1abc9c',
    marginTop: 20,
    marginBottom: 8,
  },
  termsText: {
    fontSize: 14,
    color: '#cccccc',
    lineHeight: 22,
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

export default TermsOnboardingScreen;
