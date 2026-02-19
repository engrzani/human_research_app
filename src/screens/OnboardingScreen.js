import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import BeakerIcon from '../components/BeakerIcon';

export const ONBOARDING_SEEN_KEY = '@human_research_onboarding_seen';

const onboardingItems = [
  {
    title: 'Tap the Body',
    description: 'Select a body part to explore research compounds by category.',
    icon: 'body-outline',
  },
  {
    title: 'Save to Research List',
    description: 'Use Save to Research List to keep compounds organized in one place.',
    icon: 'bookmark-outline',
  },
  {
    title: 'Use Search Filters',
    description: 'Filter by nootropics, fat loss, muscle, hair, skin, sexual health, and more.',
    icon: 'options-outline',
  },
];

const OnboardingScreen = ({ navigation }) => {
  const [isSaving, setIsSaving] = useState(false);

  const handleContinue = async () => {
    try {
      setIsSaving(true);
      await AsyncStorage.setItem(ONBOARDING_SEEN_KEY, 'true');
      navigation.replace('Disclaimer');
    } catch (error) {
      navigation.replace('Disclaimer');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.logoWrap}>
          <BeakerIcon size={82} fillLevel={0.5} liquidColor="#1abc9c" />
        </View>
        <Text style={styles.title}>Welcome to Peptify</Text>
        <Text style={styles.subtitle}>A quick walkthrough before you start.</Text>

        <View style={styles.card}>
          {onboardingItems.map((item) => (
            <View style={styles.itemRow} key={item.title}>
              <View style={styles.itemIconWrap}>
                <Ionicons name={item.icon} size={20} color="#1abc9c" />
              </View>
              <View style={styles.itemTextWrap}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.continueButton, isSaving && styles.continueDisabled]}
          onPress={handleContinue}
          activeOpacity={0.8}
          disabled={isSaving}
        >
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    paddingHorizontal: 22,
    paddingTop: 24,
    paddingBottom: 20,
  },
  logoWrap: {
    alignSelf: 'center',
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 8,
    marginBottom: 24,
    fontSize: 14,
    color: '#9b9b9b',
    textAlign: 'center',
  },
  card: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#2a2a2a',
    backgroundColor: '#111111',
    paddingVertical: 8,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1d1d1d',
  },
  itemIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(26,188,156,0.14)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
    marginRight: 10,
  },
  itemTextWrap: {
    flex: 1,
  },
  itemTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemDescription: {
    color: '#999',
    fontSize: 13,
    lineHeight: 18,
  },
  footer: {
    padding: 20,
  },
  continueButton: {
    height: 52,
    borderRadius: 12,
    backgroundColor: '#1abc9c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueDisabled: {
    opacity: 0.7,
  },
  continueText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default OnboardingScreen;
