import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const PrivacyScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Privacy Policy</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>1. Overview</Text>
        <Text style={styles.paragraph}>
          This Privacy Policy explains how this app collects, uses, and protects information when you use the app.
        </Text>

        <Text style={styles.sectionTitle}>2. Information We Collect</Text>
        <Text style={styles.paragraph}>
          We collect only the information necessary to operate the app and provide its features.
        </Text>
        <Text style={styles.paragraph}>
          This may include: Account information (such as email address), App usage data related to saved research and preferences, Device and technical information (such as app version and device type).
        </Text>
        <Text style={styles.paragraph}>
          We do not collect sensitive personal data.
        </Text>

        <Text style={styles.sectionTitle}>3. How Information Is Used</Text>
        <Text style={styles.paragraph}>
          Information collected is used solely to: Provide and maintain app functionality, Save user preferences and research lists, Improve app performance and reliability, Communicate with users regarding app-related matters.
        </Text>

        <Text style={styles.sectionTitle}>4. Data Sharing</Text>
        <Text style={styles.paragraph}>
          We do not sell, rent, or trade personal information.
        </Text>
        <Text style={styles.paragraph}>
          Information may be shared only: With service providers necessary to operate the app, When required by law.
        </Text>

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
          For questions regarding this Privacy Policy, contact: support@yourdomain.com
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  header: {
    backgroundColor: '#2c3e50',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    color: '#fff',
    fontSize: 16,
    marginRight: 15,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 10,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 20,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 20,
    marginBottom: 10,
  },
});

export default PrivacyScreen;