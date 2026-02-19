import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Animated,
  Easing,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Defs, LinearGradient, RadialGradient, Stop, Circle, Ellipse } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const SplashScreen = ({ navigation }) => {
  // Animation values
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0.6)).current;
  const chevronAnim = useRef(new Animated.Value(0)).current;
  
  // Bubble animations
  const bubble1Y = useRef(new Animated.Value(0)).current;
  const bubble2Y = useRef(new Animated.Value(0)).current;
  const bubble3Y = useRef(new Animated.Value(0)).current;
  const bubble4Y = useRef(new Animated.Value(0)).current;
  const bubble1Opacity = useRef(new Animated.Value(0.7)).current;
  const bubble2Opacity = useRef(new Animated.Value(0.5)).current;
  const bubble3Opacity = useRef(new Animated.Value(0.6)).current;
  const bubble4Opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    // Micro bounce animation
    const bounceLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -8,
          duration: 1500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 1500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

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

    // Bubble 1 animation
    const bubble1Loop = Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(bubble1Y, {
            toValue: -35,
            duration: 2000,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(bubble1Y, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(bubble1Opacity, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(bubble1Opacity, {
            toValue: 0.7,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
      ])
    );

    // Bubble 2 animation (offset timing)
    const bubble2Loop = Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.delay(400),
          Animated.timing(bubble2Y, {
            toValue: -40,
            duration: 2200,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(bubble2Y, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.delay(400),
          Animated.timing(bubble2Opacity, {
            toValue: 0,
            duration: 2200,
            useNativeDriver: true,
          }),
          Animated.timing(bubble2Opacity, {
            toValue: 0.5,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
      ])
    );

    // Bubble 3 animation
    const bubble3Loop = Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.delay(800),
          Animated.timing(bubble3Y, {
            toValue: -30,
            duration: 1800,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(bubble3Y, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.delay(800),
          Animated.timing(bubble3Opacity, {
            toValue: 0,
            duration: 1800,
            useNativeDriver: true,
          }),
          Animated.timing(bubble3Opacity, {
            toValue: 0.6,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
      ])
    );

    // Bubble 4 animation (small fast bubble)
    const bubble4Loop = Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.delay(1200),
          Animated.timing(bubble4Y, {
            toValue: -25,
            duration: 1500,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(bubble4Y, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.delay(1200),
          Animated.timing(bubble4Opacity, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(bubble4Opacity, {
            toValue: 0.4,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
      ])
    );

    bounceLoop.start();
    glowLoop.start();
    chevronLoop.start();
    bubble1Loop.start();
    bubble2Loop.start();
    bubble3Loop.start();
    bubble4Loop.start();

    return () => {
      bounceLoop.stop();
      glowLoop.stop();
      chevronLoop.stop();
      bubble1Loop.stop();
      bubble2Loop.stop();
      bubble3Loop.stop();
      bubble4Loop.stop();
    };
  }, []);

  const handleContinue = () => {
    navigation.replace('Login');
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
        <Text style={styles.title}>PEPTIFY</Text>
        
        {/* Animated Beaker */}
        <Animated.View 
          style={[
            styles.beakerContainer,
            { transform: [{ translateY: bounceAnim }] }
          ]}
        >
          {/* Glow effect behind beaker */}
          <Animated.View 
            style={[
              styles.glowEffect,
              { opacity: glowAnim }
            ]}
          />
          
          <Svg width={200} height={280} viewBox="0 0 200 280">
            <Defs>
              {/* Liquid gradient - green glow */}
              <LinearGradient id="liquidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <Stop offset="0%" stopColor="#2ECC71" stopOpacity="0.9" />
                <Stop offset="50%" stopColor="#27AE60" stopOpacity="1" />
                <Stop offset="100%" stopColor="#1E8449" stopOpacity="0.8" />
              </LinearGradient>
              
              {/* Glow gradient */}
              <RadialGradient id="glowGrad" cx="50%" cy="80%" r="50%">
                <Stop offset="0%" stopColor="#2ECC71" stopOpacity="0.6" />
                <Stop offset="100%" stopColor="#2ECC71" stopOpacity="0" />
              </RadialGradient>
              
              {/* Glass gradient */}
              <LinearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <Stop offset="0%" stopColor="#3a3a3a" stopOpacity="1" />
                <Stop offset="15%" stopColor="#4a4a4a" stopOpacity="1" />
                <Stop offset="50%" stopColor="#5a5a5a" stopOpacity="1" />
                <Stop offset="85%" stopColor="#4a4a4a" stopOpacity="1" />
                <Stop offset="100%" stopColor="#3a3a3a" stopOpacity="1" />
              </LinearGradient>

              {/* Cap/stopper gradient */}
              <LinearGradient id="capGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <Stop offset="0%" stopColor="#2c2c2c" stopOpacity="1" />
                <Stop offset="50%" stopColor="#1a1a1a" stopOpacity="1" />
                <Stop offset="100%" stopColor="#0d0d0d" stopOpacity="1" />
              </LinearGradient>
            </Defs>

            {/* Glow behind liquid */}
            <Ellipse cx="100" cy="230" rx="70" ry="40" fill="url(#glowGrad)" />

            {/* Erlenmeyer Flask shape */}
            {/* Flask body - conical shape */}
            <Path
              d="M70 50 L70 60 L35 230 C30 250 45 265 100 265 C155 265 170 250 165 230 L130 60 L130 50"
              fill="none"
              stroke="url(#glassGrad)"
              strokeWidth="4"
            />
            
            {/* Flask neck */}
            <Path
              d="M70 50 L70 30 L130 30 L130 50"
              fill="none"
              stroke="url(#glassGrad)"
              strokeWidth="4"
            />

            {/* Liquid inside flask - about half full */}
            <Path
              d="M52 170 L38 230 C33 248 48 260 100 260 C152 260 167 248 162 230 L148 170 Z"
              fill="url(#liquidGrad)"
            />
            
            {/* Liquid surface wave effect */}
            <Path
              d="M52 170 Q76 165 100 170 Q124 175 148 170"
              fill="none"
              stroke="#3EE07A"
              strokeWidth="2"
              opacity="0.6"
            />

            {/* Cap/Stopper */}
            <Path
              d="M65 30 L65 15 C65 8 75 5 100 5 C125 5 135 8 135 15 L135 30 L65 30"
              fill="url(#capGrad)"
              stroke="#222"
              strokeWidth="2"
            />
            
            {/* Cap rim */}
            <Path
              d="M63 30 L137 30"
              stroke="#444"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Glass reflection */}
            <Path
              d="M55 80 L42 200"
              stroke="#ffffff"
              strokeWidth="2"
              opacity="0.15"
              strokeLinecap="round"
            />
            <Path
              d="M60 85 L48 190"
              stroke="#ffffff"
              strokeWidth="1"
              opacity="0.1"
              strokeLinecap="round"
            />
          </Svg>

          {/* Animated bubbles overlaid */}
          <Animated.View 
            style={[
              styles.bubble,
              styles.bubble1,
              { 
                transform: [{ translateY: bubble1Y }],
                opacity: bubble1Opacity,
              }
            ]}
          />
          <Animated.View 
            style={[
              styles.bubble,
              styles.bubble2,
              { 
                transform: [{ translateY: bubble2Y }],
                opacity: bubble2Opacity,
              }
            ]}
          />
          <Animated.View 
            style={[
              styles.bubble,
              styles.bubble3,
              { 
                transform: [{ translateY: bubble3Y }],
                opacity: bubble3Opacity,
              }
            ]}
          />
          <Animated.View 
            style={[
              styles.bubble,
              styles.bubble4,
              { 
                transform: [{ translateY: bubble4Y }],
                opacity: bubble4Opacity,
              }
            ]}
          />
        </Animated.View>

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
  bubble: {
    position: 'absolute',
    backgroundColor: 'rgba(62, 224, 122, 0.6)',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'rgba(62, 224, 122, 0.8)',
  },
  bubble1: {
    width: 12,
    height: 12,
    bottom: 50,
    left: 75,
  },
  bubble2: {
    width: 8,
    height: 8,
    bottom: 60,
    left: 110,
  },
  bubble3: {
    width: 10,
    height: 10,
    bottom: 45,
    left: 95,
  },
  bubble4: {
    width: 6,
    height: 6,
    bottom: 70,
    left: 85,
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
