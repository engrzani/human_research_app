import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  BackHandler,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AGE_VERIFIED_KEY = '@peptify_age_verified';

const AgeGateScreen = ({ navigation }) => {

  const handleConfirm = async () => {
    try {
      // Store boolean flag only - no DOB, no PII
      await AsyncStorage.setItem(AGE_VERIFIED_KEY, 'true');
    } catch (error) {
      console.log('Error saving age verification:', error);
    }
    navigation.replace('ResearchDisclaimerOnboarding');
  };

  const handleExit = () => {
    // Block app usage - exit the app
    BackHandler.exitApp();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <View style={styles.content}>
          {/* 21+ Badge */}
          <View style={styles.badge}>
            <Text style={styles.badgeText}>21+</Text>
          </View>

          {/* Title */}
          <Text style={styles.title}>Adults Only (21+)</Text>
          
          {/* Body */}
          <Text style={styles.body}>
            This app contains educational content intended for adults only.
          </Text>
          <Text style={styles.body}>
            By continuing, you confirm that you are 21 years of age or older.
          </Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirm}
            activeOpacity={0.8}
          >
            <Text style={styles.confirmButtonText}>I am 21+</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.exitButton}
            onPress={handleExit}
            activeOpacity={0.8}
          >
            <Text style={styles.exitButtonText}>Exit</Text>
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
  badge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#1abc9c',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  badgeText: {
    fontSize: 36,
    fontWeight: '800',
    color: '#000000',
  },
  title: {
    fontSize: 28,
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
    marginBottom: 8,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 12,
  },
  confirmButton: {
    height: 56,
    borderRadius: 12,
    backgroundColor: '#1abc9c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
  },
  exitButton: {
    height: 56,
    borderRadius: 12,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  exitButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666666',
  },
});

export default AgeGateScreen;