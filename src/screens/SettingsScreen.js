import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const SettingsScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Legal & Disclaimers</Text>
        
        <TouchableOpacity 
          style={styles.option}
          onPress={() => navigation.navigate('ResearchDisclaimer')}
        >
          <Text style={styles.optionText}>Research Disclaimers</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.option}
          onPress={() => navigation.navigate('Terms')}
        >
          <Text style={styles.optionText}>Terms & Conditions</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.option}
          onPress={() => navigation.navigate('Privacy')}
        >
          <Text style={styles.optionText}>Privacy Policy</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  section: {
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 10,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  option: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  optionText: {
    fontSize: 16,
    color: '#2c3e50',
  },
});

export default SettingsScreen;