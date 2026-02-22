import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Video, ResizeMode } from 'expo-av';
import Svg, { Path } from 'react-native-svg';

const { width: screenWidth } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  // Animation values
  const chevronAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    // Glow pulse animation
    const glowLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1200,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.6,
          duration: 1200,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    // Chevron bounce
    const chevronLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(chevronAnim, {
          toValue: 8,
          duration: 800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(chevronAnim, {
          toValue: 0,
          duration: 800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    glowLoop.start();
    chevronLoop.start();

    return () => {
      glowLoop.stop();
      chevronLoop.stop();
    };
  }, []);

  const handleContinue = () => {
    // From the beaker splash, go directly to the main app (Home)
    navigation.replace('MainApp');
  };

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={handleContinue}
      activeOpacity={1}
    >
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <StatusBar barStyle="light-content" backgroundColor="#000000" />
        
        {/* Title */}
        <Text style={styles.title}>PEPTFIED</Text>
        
        {/* Beaker Video */}
        <View style={styles.beakerContainer}>
          {/* Glow effect behind beaker */}
          <Animated.View 
            style={[
              styles.glowEffect,
              { opacity: glowAnim }
            ]}
          />
          
          <Video
            source={require('../../beaker.mp4')}
            style={styles.beakerVideo}
            resizeMode={ResizeMode.CONTAIN}
            shouldPlay
            isLooping
            isMuted
          />
        </View>

        {/* Tap to continue */}
        <View style={styles.bottomSection}>
          <Text style={styles.tapText}>Tap to continue</Text>
          <Animated.View style={{ transform: [{ translateY: chevronAnim }] }}>
            <Svg width={24} height={14} viewBox="0 0 24 14">
              <Path
                d="M2 2 L12 12 L22 2"
                stroke="#666"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </Animated.View>
        </View>
      </SafeAreaView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  safeArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '300',
    color: '#ffffff',
    letterSpacing: 12,
    marginTop: 20,
  },
  beakerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: screenWidth * 0.6,
    height: screenWidth * 0.8,
  },
  beakerVideo: {
    width: '100%',
    height: '100%',
  },
  glowEffect: {
    position: 'absolute',
    width: 180,
    height: 120,
    bottom: 20,
    backgroundColor: '#2ECC71',
    borderRadius: 90,
    shadowColor: '#2ECC71',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 40,
    elevation: 20,
  },
  bottomSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  tapText: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
    letterSpacing: 1,
  },
});

export default SplashScreen;
