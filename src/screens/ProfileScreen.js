import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  StatusBar,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { deleteUser } from 'firebase/auth';
import { auth } from '../config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({ navigation }) => {
  const { user, signOut, isAuthenticated } = useAuth();
  const { clearCart } = useCart();

  // signOut keeps disclaimer flags — user returns to Login screen only
  // deleteAccount clears all flags — full restart from AgeGate

  const handleSignIn = () => {
    const rootNav = navigation.getParent()?.getParent() || navigation;
    rootNav.navigate('Login');
  };

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Sign Out', 
          style: 'destructive',
          onPress: async () => {
            clearCart();
            await signOut();
          }
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            try {
              const currentUser = auth?.currentUser;
              if (currentUser) {
                await deleteUser(currentUser);
              }
              // Clear all onboarding flags so user restarts from AgeGate
              await AsyncStorage.multiRemove([
                '@peptify_age_verified',
                '@peptify_disclaimer_acknowledged',
                '@peptify_terms_accepted',
                '@peptify_v3_migrated',
              ]);
              clearCart();
              await signOut();
            } catch (error) {
              if (error.code === 'auth/requires-recent-login') {
                Alert.alert('Re-authentication Required', 'Please sign out, sign back in, and try again.');
              } else {
                Alert.alert('Error', 'Failed to delete account. Please contact support@peptfied.org.');
              }
            }
          }
        },
      ]
    );
  };

  const SettingsRow = ({ label, value, onPress, showChevron = true }) => (
    <Pressable 
      style={({ pressed }) => [
        styles.settingsRow,
        pressed && { opacity: 0.6 },
      ]}
      onPress={onPress}
      disabled={!onPress}
    >
      <Text style={styles.settingsLabel}>{label}</Text>
      <View style={styles.settingsRight}>
        {value && <Text style={styles.settingsValue}>{value}</Text>}
        {showChevron && onPress && <Ionicons name="chevron-forward" size={18} color="#666" />}
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Account</Text>
        <Text style={styles.headerSubtitle}>
          {isAuthenticated ? 'Signed in via Email' : 'Not signed in'}
        </Text>
      </View>

      {!isAuthenticated ? (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.guestContainer}>
            <Ionicons name="person-circle-outline" size={64} color="#444" />
            <Text style={styles.guestTitle}>Sign in to manage your account</Text>
            <Text style={styles.guestSubtitle}>
              Create an account to save your research list and preferences across devices.
            </Text>
            <TouchableOpacity
              style={styles.signInButton}
              onPress={handleSignIn}
              activeOpacity={0.8}
            >
              <Text style={styles.signInButtonText}>Sign In / Sign Up</Text>
            </TouchableOpacity>
          </View>

          {/* Legal — always accessible */}
          <Text style={[styles.sectionHeader, { marginTop: 30 }]}>LEGAL</Text>
          <View style={styles.sectionGroup}>
            <SettingsRow 
              label="Terms of Use" 
              onPress={() => navigation.navigate('Terms')}
            />
            <View style={styles.separator} />
            <SettingsRow 
              label="Privacy Policy" 
              onPress={() => navigation.navigate('Privacy')}
            />
          </View>
          <View style={styles.bottomSpacer} />
        </ScrollView>
      ) : (
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Email Section */}
        <View style={styles.section}>
          <Text style={styles.emailLabel}>Email</Text>
          <Text style={styles.emailValue}>{user?.email || 'Not signed in'}</Text>
        </View>

        {/* Sign-In Method & Change Password */}
        <View style={styles.sectionGroup}>
          <SettingsRow 
            label="Sign-In Method" 
            value="Email"
            onPress={() => {}}
          />
          <View style={styles.separator} />
          <SettingsRow 
            label="Change Password" 
            value="Email"
            onPress={() => Alert.alert('Change Password', 'Password reset email will be sent to your email address.')}
          />
        </View>

        {/* App Access Section */}
        <Text style={styles.sectionHeader}>APP ACCESS</Text>
        <View style={styles.sectionGroup}>
          <SettingsRow 
            label="Age Requirement" 
            value="Verified: 21+"
            onPress={null}
            showChevron={false}
          />
          <View style={styles.separator} />
          <SettingsRow 
            label="Educational Disclaimer" 
            value="Acknowledged"
            onPress={() => navigation.navigate('ResearchDisclaimer')}
          />
        </View>

        {/* Legal Section */}
        <Text style={styles.sectionHeader}>LEGAL</Text>
        <View style={styles.sectionGroup}>
          <SettingsRow 
            label="Terms of Use" 
            onPress={() => navigation.navigate('Terms')}
          />
          <View style={styles.separator} />
          <SettingsRow 
            label="Privacy Policy" 
            onPress={() => navigation.navigate('Privacy')}
          />
        </View>

        {/* Sign Out Button */}
        <TouchableOpacity 
          style={styles.signOutButton}
          onPress={handleSignOut}
          activeOpacity={0.7}
        >
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>

        {/* Delete Account */}
        <TouchableOpacity 
          style={styles.deleteAccountButton}
          onPress={handleDeleteAccount}
          activeOpacity={0.7}
        >
          <Text style={styles.deleteAccountText}>Delete Account</Text>
        </TouchableOpacity>

        <View style={styles.bottomSpacer} />
      </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#888',
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  emailLabel: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 4,
  },
  emailValue: {
    fontSize: 14,
    color: '#888',
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 8,
    letterSpacing: 0.5,
  },
  sectionGroup: {
    backgroundColor: '#1e1e1e',
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  settingsLabel: {
    fontSize: 15,
    color: '#fff',
  },
  settingsRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsValue: {
    fontSize: 14,
    color: '#888',
    marginRight: 6,
  },
  separator: {
    height: 1,
    backgroundColor: '#2a2a2a',
    marginLeft: 20,
  },
  signOutButton: {
    backgroundColor: '#2a2a2a',
    marginHorizontal: 20,
    marginTop: 30,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  deleteAccountButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  deleteAccountText: {
    fontSize: 14,
    color: '#666',
  },
  bottomSpacer: {
    height: 40,
  },
  guestContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
  },
  guestTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginTop: 16,
    textAlign: 'center',
  },
  guestSubtitle: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  signInButton: {
    backgroundColor: '#1abc9c',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 24,
  },
  signInButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default ProfileScreen;
