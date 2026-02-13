import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const TermsScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Terms & Conditions</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
        <Text style={styles.paragraph}>
          By accessing or using this application, you agree to be bound by these Terms & Conditions. If you do not agree, do not use the app.
        </Text>

        <Text style={styles.sectionTitle}>2. Eligibility</Text>
        <Text style={styles.paragraph}>
          You must be at least 21 years of age to access or use this app.
        </Text>

        <Text style={styles.sectionTitle}>3. Purpose of the App</Text>
        <Text style={styles.paragraph}>
          This app is provided solely for educational and informational research reference purposes.
        </Text>
        <Text style={styles.paragraph}>
          The app is not intended to provide professional, medical, or clinical guidance.
        </Text>

        <Text style={styles.sectionTitle}>4. No Medical Advice</Text>
        <Text style={styles.paragraph}>
          The app does not provide medical advice, diagnosis, treatment, or healthcare services.
        </Text>
        <Text style={styles.paragraph}>
          Information presented should not be relied upon for medical decisions.
        </Text>

        <Text style={styles.sectionTitle}>5. No Commerce Within the App</Text>
        <Text style={styles.paragraph}>
          The app does not sell, distribute, or process purchases of any products or substances.
        </Text>
        <Text style={styles.paragraph}>
          Any references to compounds are provided strictly in a research and informational context.
        </Text>

        <Text style={styles.sectionTitle}>6. Research Context Only</Text>
        <Text style={styles.paragraph}>
          Compounds discussed in the app are referenced for research and academic purposes only.
        </Text>
        <Text style={styles.paragraph}>
          Human applications, dosages, administration methods, or outcomes are not established or provided within the app.
        </Text>

        <Text style={styles.sectionTitle}>7. Third-Party Websites</Text>
        <Text style={styles.paragraph}>
          The app may include links to third-party websites for general research reference.
        </Text>
        <Text style={styles.paragraph}>
          These websites are not owned, operated, or controlled by the app, and the app is not responsible for their content, products, or services.
        </Text>

        <Text style={styles.sectionTitle}>8. User Responsibility</Text>
        <Text style={styles.paragraph}>
          You are responsible for how you interpret and use information accessed through the app.
        </Text>
        <Text style={styles.paragraph}>
          The app is not responsible for actions taken based on information viewed within or outside the app.
        </Text>

        <Text style={styles.sectionTitle}>9. Disclaimer of Warranties</Text>
        <Text style={styles.paragraph}>
          The app is provided "as is" and "as available" without warranties of any kind, express or implied.
        </Text>

        <Text style={styles.sectionTitle}>10. Limitation of Liability</Text>
        <Text style={styles.paragraph}>
          To the maximum extent permitted by law, the app shall not be liable for any damages arising from use of the app or reliance on its content.
        </Text>

        <Text style={styles.sectionTitle}>11. Changes to These Terms</Text>
        <Text style={styles.paragraph}>
          These Terms may be updated from time to time. Continued use of the app constitutes acceptance of any changes.
        </Text>

        <Text style={styles.sectionTitle}>12. Contact</Text>
        <Text style={styles.paragraph}>
          For questions regarding these Terms, contact: support@yourdomain.com
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

export default TermsScreen;