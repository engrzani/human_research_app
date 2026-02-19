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

const ResearchDisclaimerScreen = ({ navigation }) => {
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
        <Text style={styles.headerTitle}>Research Disclaimer</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Section 1: Purpose */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Purpose of This App</Text>
          <Text style={styles.paragraph}>
            This application is intended solely as an educational and informational research reference tool.
          </Text>
          <Text style={styles.paragraph}>
            The information presented is designed to help users organize and review publicly available research information related to biochemical compounds.
          </Text>
        </View>

        {/* Section 2: No Medical Use */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>No Medical or Therapeutic Use</Text>
          <Text style={styles.paragraph}>
            This app does not provide medical advice, diagnostic guidance, treatment recommendations, or therapeutic instructions.
          </Text>
          <Text style={styles.paragraph}>
            Information within the app should not be interpreted as medical, health, or clinical guidance.
          </Text>
        </View>

        {/* Section 3: Research Use Only */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Research Context Only</Text>
          <Text style={styles.paragraph}>
            Compounds referenced in this app are discussed strictly within a research and academic context.
          </Text>
          <Text style={styles.paragraph}>
            Human applications, dosages, administration methods, or outcomes are not provided or established within this app.
          </Text>
        </View>

        {/* Section 4: External Links */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>External Resources</Text>
          <Text style={styles.paragraph}>
            Any external links provided within the app lead to third-party websites for general research reference.
          </Text>
          <Text style={styles.paragraph}>
            These external resources are not owned, operated, or controlled by this app, and the app does not endorse or guarantee their content.
          </Text>
        </View>

        {/* Section 5: User Responsibility */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>User Responsibility</Text>
          <Text style={styles.paragraph}>
            Users are responsible for how they interpret and use information accessed through this app.
          </Text>
          <Text style={styles.paragraph}>
            The app is not responsible for actions taken based on information viewed within or outside the app.
          </Text>
        </View>

        {/* Section 6: Closing */}
        <View style={styles.closingSection}>
          <Text style={styles.closingText}>
            By using this app, you acknowledge and agree to this research disclaimer.
          </Text>
        </View>

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
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1abc9c',
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 14,
    color: '#bbb',
    lineHeight: 22,
    marginBottom: 10,
  },
  closingSection: {
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    padding: 16,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  closingText: {
    fontSize: 14,
    color: '#888',
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 20,
  },
  bottomSpacer: {
    height: 40,
  },
});

export default ResearchDisclaimerScreen;
