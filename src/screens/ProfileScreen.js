import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }) => {

  const menuItems = [
    { 
      icon: 'cube-outline', 
      iconBg: '#1a3a2e',
      label: 'Orders', 
      subtitle: '0 orders',
      screen: 'Orders' 
    },
    { 
      icon: 'document-text-outline', 
      iconBg: '#1a3a2e',
      label: 'Legal & Disclaimers', 
      subtitle: 'Research compliance',
      screen: 'ResearchDisclaimer' 
    },
    { 
      icon: 'shield-outline', 
      iconBg: '#1a3a2e',
      label: 'Terms & Conditions', 
      subtitle: 'App usage terms',
      screen: 'Terms' 
    },
    { 
      icon: 'lock-closed-outline', 
      iconBg: '#1a3a2e',
      label: 'Privacy Policy', 
      subtitle: 'Data protection',
      screen: 'Privacy' 
    },
    { 
      icon: 'settings-outline', 
      iconBg: '#1a3a2e',
      label: 'Settings', 
      subtitle: 'App preferences',
      screen: 'Settings' 
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Account</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* User Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={32} color="#1abc9c" />
            </View>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>Research User</Text>
            <Text style={styles.userEmail}>No email set</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => {
                if (item.screen === 'Orders') {
                  // Orders screen not implemented yet, could show alert
                  alert('Order history will appear here');
                } else {
                  navigation.navigate(item.screen);
                }
              }}
              activeOpacity={0.7}
            >
              <View style={[styles.menuIconContainer, { backgroundColor: item.iconBg }]}>
                <Ionicons name={item.icon} size={22} color="#1abc9c" />
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuLabel}>{item.label}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#444" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Research Warning Banner */}
        <View style={styles.warningBanner}>
          <Ionicons name="warning" size={20} color="#f39c12" style={styles.warningIcon} />
          <Text style={styles.warningText}>
            FOR LABORATORY RESEARCH USE ONLY. NOT FOR HUMAN OR VETERINARY USE.
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>BioResearch Market v1.0.0</Text>
          <Text style={styles.footerCopyright}>2026 BioResearch Market</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a3a2e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 25,
  },
  avatarContainer: {
    marginRight: 15,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#0d2018',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#888',
  },
  menuContainer: {
    backgroundColor: '#1e1e1e',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 25,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  menuIconContainer: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 13,
    color: '#666',
  },
  warningBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(243, 156, 18, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(243, 156, 18, 0.3)',
    borderRadius: 12,
    padding: 14,
    marginBottom: 30,
  },
  warningIcon: {
    marginRight: 12,
  },
  warningText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    color: '#f39c12',
    lineHeight: 18,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  footerText: {
    fontSize: 13,
    color: '#555',
    marginBottom: 4,
  },
  footerCopyright: {
    fontSize: 12,
    color: '#444',
  },
});

export default ProfileScreen;
