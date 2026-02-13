import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const ResearchDisclaimerScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Research Disclaimer</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Purpose of This App</Text>
        <Text style={styles.paragraph}>
          This application is intended solely as an educational and informational research reference tool.
        </Text>
        <Text style={styles.paragraph}>
          The information presented is designed to help users organize and review publicly available research information related to biochemical compounds.
        </Text>

        <Text style={styles.sectionTitle}>No Medical or Therapeutic Use</Text>
        <Text style={styles.paragraph}>
          This app does not provide medical advice, diagnostic guidance, treatment recommendations, or therapeutic instructions.
        </Text>
        <Text style={styles.paragraph}>
          Information within the app should not be interpreted as medical, health, or clinical guidance.
        </Text>

        <Text style={styles.sectionTitle}>Research Context Only</Text>
        <Text style={styles.paragraph}>
          Compounds referenced in this app are discussed strictly within a research and academic context.
        </Text>
        <Text style={styles.paragraph}>
          Human applications, dosages, administration methods, or outcomes are not provided or established within this app.
        </Text>

        <Text style={styles.sectionTitle}>External Resources</Text>
        <Text style={styles.paragraph}>
          Any external links provided within the app lead to third-party websites for general research reference.
        </Text>
        <Text style={styles.paragraph}>
          These external resources are not owned, operated, or controlled by the app, and the app does not endorse or guarantee their content.
        </Text>

        <Text style={styles.sectionTitle}>User Responsibility</Text>
        <Text style={styles.paragraph}>
          Users are responsible for how they interpret and use information accessed through this app.
        </Text>
        <Text style={styles.paragraph}>
          The app is not responsible for actions taken based on information viewed within or outside the app.
        </Text>

        <Text style={styles.closing}>
          By using this app, you acknowledge and agree to this research disclaimer.
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
  closing: {
    fontSize: 14,
    color: '#2c3e50',
    fontStyle: 'italic',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default ResearchDisclaimerScreen;