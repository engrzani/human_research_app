import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';

// Extracted outside SettingsScreen to avoid remounting on every render
const SettingItem = ({ label, subtitle, onPress, showChevron = true }) => (
  <Pressable
    style={({ pressed }) => [
      styles.settingItem,
      pressed && { opacity: 0.6 },
    ]}
    onPress={onPress}
  >
    <View style={styles.settingItemContent}>
      <Text style={styles.settingItemLabel}>{label}</Text>
      {subtitle && <Text style={styles.settingItemSubtitle}>{subtitle}</Text>}
    </View>
    {showChevron && (
      <Ionicons name="chevron-forward" size={20} color="#666" />
    )}
  </Pressable>
);

const SettingItemWithValue = ({ label, value }) => (
  <View style={styles.settingItem}>
    <Text style={styles.settingItemLabel}>{label}</Text>
    <Text style={styles.settingItemValue}>{value}</Text>
  </View>
);

const SettingsScreen = ({ navigation }) => {
  const { clearCart } = useCart();

  const handleClearResearchList = () => {
    Alert.alert(
      'Clear Research List',
      'Are you sure you want to clear all saved compounds from your research list?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear', 
          style: 'destructive',
          onPress: () => {
            try {
              clearCart();
              setTimeout(() => {
                Alert.alert('Cleared', 'Your research list has been cleared.');
              }, 300);
            } catch (e) {
              console.error('Error clearing cart:', e);
            }
          }
        },
      ],
      { cancelable: true }
    );
  };

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', style: 'destructive', onPress: () => {} },
      ]
    );
  };

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
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.headerIcon}>
          <Ionicons name="settings" size={22} color="#888" />
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Account */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ACCOUNT</Text>
          <SettingItem 
            label="example@email.com" 
            subtitle="Age verified: 21+"
            onPress={() => {}}
          />
          <SettingItem 
            label="Sign Out" 
            onPress={handleSignOut}
          />
        </View>

        {/* Research Controls */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>RESEARCH CONTROLS</Text>
          <SettingItem 
            label="Clear Research List" 
            onPress={handleClearResearchList}
          />
        </View>

        {/* Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SUPPORT</Text>
          <SettingItem 
            label="Contact Support" 
            onPress={() => {}}
          />
          <SettingItem 
            label="Report an Issue" 
            onPress={() => {}}
          />
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ABOUT</Text>
          <SettingItemWithValue label="App Version" value="1.0" />
          <SettingItemWithValue label="Company Name" value="Example Inc." />
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
  headerIcon: {
    padding: 5,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  settingItem: {
    backgroundColor: '#1e1e1e',
    paddingVertical: 14,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  settingItemContent: {
    flex: 1,
  },
  settingItemLabel: {
    fontSize: 15,
    color: '#fff',
  },
  settingItemSubtitle: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  settingItemValue: {
    fontSize: 15,
    color: '#888',
  },
  bottomSpacer: {
    height: 40,
  },
});

export default SettingsScreen;
