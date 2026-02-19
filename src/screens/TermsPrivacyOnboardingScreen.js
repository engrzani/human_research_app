import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Modal,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TERMS_ACCEPTED_KEY = '@peptify_terms_accepted';

const TermsPrivacyOnboardingScreen = ({ navigation }) => {
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const handleContinue = async () => {
    try {
      await AsyncStorage.setItem(TERMS_ACCEPTED_KEY, 'true');
    } catch (error) {
      console.log('Error saving terms acceptance:', error);
    }
    navigation.replace('Splash');
  };

  // Terms & Conditions Modal Content
  const TermsModal = () => (
    <Modal
      visible={showTerms}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={() => setShowTerms(false)}
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Terms & Conditions</Text>
          <TouchableOpacity onPress={() => setShowTerms(false)}>
            <Ionicons name="close" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.modalScroll} contentContainerStyle={styles.modalContent}>
          <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
          <Text style={styles.modalText}>
            By accessing or using this application, you agree to be bound by these Terms & Conditions. If you do not agree, do not use the app.
          </Text>

          <Text style={styles.sectionTitle}>2. Eligibility</Text>
          <Text style={styles.modalText}>
            You must be at least 21 years of age to access or use this app.
          </Text>

          <Text style={styles.sectionTitle}>3. Purpose of the App</Text>
          <Text style={styles.modalText}>
            This app is provided solely for educational and informational research reference purposes.{'\n'}
            The app is not intended to provide professional, medical, or clinical guidance.
          </Text>

          <Text style={styles.sectionTitle}>4. No Medical Advice</Text>
          <Text style={styles.modalText}>
            The app does not provide medical advice, diagnosis, treatment, or healthcare services.{'\n'}
            Information presented should not be relied upon for medical decisions.
          </Text>

          <Text style={styles.sectionTitle}>5. No Commerce Within the App</Text>
          <Text style={styles.modalText}>
            The app does not sell, distribute, or process purchases of any products or substances.{'\n'}
            Any references to compounds are provided strictly in a research and informational context.
          </Text>

          <Text style={styles.sectionTitle}>6. Research Context Only</Text>
          <Text style={styles.modalText}>
            Compounds discussed in the app are referenced for research and academic purposes only.{'\n'}
            Human applications, dosages, administration methods, or outcomes are not established or provided within the app.
          </Text>

          <Text style={styles.sectionTitle}>7. Third-Party Websites</Text>
          <Text style={styles.modalText}>
            The app may include links to third-party websites for general research reference.{'\n'}
            These websites are not owned, operated, or controlled by the app, and the app is not responsible for their content, products, or services.
          </Text>

          <Text style={styles.sectionTitle}>8. User Responsibility</Text>
          <Text style={styles.modalText}>
            You are responsible for how you interpret and use information accessed through the app.{'\n'}
            The app is not responsible for actions taken based on information viewed within or outside the app.
          </Text>

          <Text style={styles.sectionTitle}>9. Disclaimer of Warranties</Text>
          <Text style={styles.modalText}>
            The app is provided "as is" and "as available" without warranties of any kind, express or implied.
          </Text>

          <Text style={styles.sectionTitle}>10. Limitation of Liability</Text>
          <Text style={styles.modalText}>
            To the maximum extent permitted by law, the app shall not be liable for any damages arising from use of the app or reliance on its content.
          </Text>

          <Text style={styles.sectionTitle}>11. Changes to These Terms</Text>
          <Text style={styles.modalText}>
            These Terms may be updated from time to time. Continued use of the app constitutes acceptance of any changes.
          </Text>

          <Text style={styles.sectionTitle}>12. Contact</Text>
          <Text style={styles.modalText}>
            For questions regarding these Terms, contact:{'\n'}
            support@yourdomain.com
          </Text>

          <View style={styles.modalPadding} />
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );

  // Privacy Policy Modal Content
  const PrivacyModal = () => (
    <Modal
      visible={showPrivacy}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={() => setShowPrivacy(false)}
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Privacy Policy</Text>
          <TouchableOpacity onPress={() => setShowPrivacy(false)}>
            <Ionicons name="close" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.modalScroll} contentContainerStyle={styles.modalContent}>
          <Text style={styles.sectionTitle}>1. Overview</Text>
          <Text style={styles.modalText}>
            This Privacy Policy explains how this app collects, uses, and protects information when you use the app.
          </Text>

          <Text style={styles.sectionTitle}>2. Information We Collect</Text>
          <Text style={styles.modalText}>
            We collect only the information necessary to operate the app and provide its features.{'\n\n'}
            This may include:{'\n'}
            • Account information (such as email address){'\n'}
            • App usage data related to saved research and preferences{'\n'}
            • Device and technical information (such as app version and device type){'\n\n'}
            We do not collect sensitive personal data.
          </Text>

          <Text style={styles.sectionTitle}>3. How Information Is Used</Text>
          <Text style={styles.modalText}>
            Information collected is used solely to:{'\n'}
            • Provide and maintain app functionality{'\n'}
            • Save user preferences and research lists{'\n'}
            • Improve app performance and reliability{'\n'}
            • Communicate with users regarding app-related matters
          </Text>

          <Text style={styles.sectionTitle}>4. Data Sharing</Text>
          <Text style={styles.modalText}>
            We do not sell, rent, or trade personal information.{'\n\n'}
            Information may be shared only:{'\n'}
            • With service providers necessary to operate the app{'\n'}
            • When required by law
          </Text>

          <Text style={styles.sectionTitle}>5. External Websites</Text>
          <Text style={styles.modalText}>
            The app may include links to third-party websites for general research reference.{'\n'}
            We are not responsible for the privacy practices or content of third-party websites.
          </Text>

          <Text style={styles.sectionTitle}>6. Data Security</Text>
          <Text style={styles.modalText}>
            We take reasonable measures to protect user information from unauthorized access, disclosure, or misuse.
          </Text>

          <Text style={styles.sectionTitle}>7. User Rights</Text>
          <Text style={styles.modalText}>
            Users may request access to, correction of, or deletion of their account information by contacting support.
          </Text>

          <Text style={styles.sectionTitle}>8. Children's Privacy</Text>
          <Text style={styles.modalText}>
            This app is intended for users 21 years of age or older.{'\n'}
            We do not knowingly collect information from individuals under 21.
          </Text>

          <Text style={styles.sectionTitle}>9. Changes to This Policy</Text>
          <Text style={styles.modalText}>
            This Privacy Policy may be updated from time to time. Continued use of the app indicates acceptance of the updated policy.
          </Text>

          <Text style={styles.sectionTitle}>10. Contact</Text>
          <Text style={styles.modalText}>
            For questions regarding this Privacy Policy, contact:{'\n'}
            support@yourdomain.com
          </Text>

          <View style={styles.modalPadding} />
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      <TermsModal />
      <PrivacyModal />
      
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <View style={styles.content}>
          {/* Icon */}
          <View style={styles.iconContainer}>
            <Ionicons name="document-text" size={64} color="#1abc9c" />
          </View>

          {/* Title */}
          <Text style={styles.title}>Terms & Privacy</Text>
          
          {/* Body */}
          <Text style={styles.body}>
            By continuing, you agree to our{' '}
            <Text style={styles.link} onPress={() => setShowTerms(true)}>
              Terms & Conditions
            </Text>
            {' '}and{' '}
            <Text style={styles.link} onPress={() => setShowPrivacy(true)}>
              Privacy Policy
            </Text>
            .
          </Text>
        </View>

        {/* Button */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleContinue}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 24,
  },
  body: {
    fontSize: 17,
    color: '#aaaaaa',
    textAlign: 'center',
    lineHeight: 26,
  },
  link: {
    color: '#1abc9c',
    textDecorationLine: 'underline',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  button: {
    height: 56,
    borderRadius: 12,
    backgroundColor: '#1abc9c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },
  modalScroll: {
    flex: 1,
  },
  modalContent: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1abc9c',
    marginTop: 20,
    marginBottom: 8,
  },
  modalText: {
    fontSize: 15,
    color: '#cccccc',
    lineHeight: 24,
  },
  modalPadding: {
    height: 40,
  },
});

export default TermsPrivacyOnboardingScreen;
