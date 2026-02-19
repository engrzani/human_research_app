import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const PrivacyScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.sectionTitle}>1. Overview</Text>
        <Text style={styles.paragraph}>
          This Privacy Policy explains how this app collects, uses, and protects information when you use the app.
        </Text>

        <Text style={styles.sectionTitle}>2. Information We Collect</Text>
        <Text style={styles.paragraph}>
          We collect only the information necessary to operate the app and provide its features.
        </Text>
        <Text style={styles.paragraph}>This may include:</Text>
        <Text style={styles.bulletPoint}>• Account information (such as email address)</Text>
        <Text style={styles.bulletPoint}>• App usage data related to saved research and preferences</Text>
        <Text style={styles.bulletPoint}>• Device and technical information (such as app version and device type)</Text>
        <Text style={styles.paragraph}>
          We do not collect sensitive personal data.
        </Text>

        <Text style={styles.sectionTitle}>3. How Information Is Used</Text>
        <Text style={styles.paragraph}>Information collected is used solely to:</Text>
        <Text style={styles.bulletPoint}>• Provide and maintain app functionality</Text>
        <Text style={styles.bulletPoint}>• Save user preferences and research lists</Text>
        <Text style={styles.bulletPoint}>• Improve app performance and reliability</Text>
        <Text style={styles.bulletPoint}>• Communicate with users regarding app-related matters</Text>

        <Text style={styles.sectionTitle}>4. Data Sharing</Text>
        <Text style={styles.paragraph}>
          We do not sell, rent, or trade personal information.
        </Text>
        <Text style={styles.paragraph}>Information may be shared only:</Text>
        <Text style={styles.bulletPoint}>• With service providers necessary to operate the app</Text>
        <Text style={styles.bulletPoint}>• When required by law</Text>

        <Text style={styles.sectionTitle}>5. External Websites</Text>
        <Text style={styles.paragraph}>
          The app may include links to third-party websites for general research reference.
        </Text>
        <Text style={styles.paragraph}>
          We are not responsible for the privacy practices or content of third-party websites.
        </Text>

        <Text style={styles.sectionTitle}>6. Data Security</Text>
        <Text style={styles.paragraph}>
          We take reasonable measures to protect user information from unauthorized access, disclosure, or misuse.
        </Text>

        <Text style={styles.sectionTitle}>7. User Rights</Text>
        <Text style={styles.paragraph}>
          Users may request access to, correction of, or deletion of their account information by contacting support.
        </Text>

        <Text style={styles.sectionTitle}>8. Children's Privacy</Text>
        <Text style={styles.paragraph}>
          This app is intended for users 21 years of age or older.
        </Text>
        <Text style={styles.paragraph}>
          We do not knowingly collect information from individuals under 21.
        </Text>

        <Text style={styles.sectionTitle}>9. Changes to This Policy</Text>
        <Text style={styles.paragraph}>
          This Privacy Policy may be updated from time to time. Continued use of the app indicates acceptance of the updated policy.
        </Text>

        <Text style={styles.sectionTitle}>10. Contact</Text>
        <Text style={styles.paragraph}>
          For questions regarding this Privacy Policy, contact:{'\n'}support@yourdomain.com
        </Text>

        <View style={styles.bottomSpacer} />
      </ScrollView>
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
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  headerSpacer: {
    width: 34,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1abc9c',
    marginTop: 20,
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 14,
    color: '#bbb',
    lineHeight: 22,
    marginBottom: 10,
  },
  bulletPoint: {
    fontSize: 14,
    color: '#bbb',
    lineHeight: 22,
    marginBottom: 6,
    paddingLeft: 10,
  },
  bottomSpacer: {
    height: 40,
  },
});

export default PrivacyScreen;
