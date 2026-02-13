import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, ScrollView, Animated } from 'react-native';
import Svg, { Path, Circle, Ellipse, G, Rect, Defs, RadialGradient, Stop } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const InteractiveBodySVG = ({ onBodyPartPress }) => {
  const [selectedPart, setSelectedPart] = useState(null);
  
  // Animation values
  const brainPulse = useRef(new Animated.Value(1)).current;
  const hairPulse = useRef(new Animated.Value(1)).current;
  const stomachPulse = useRef(new Animated.Value(1)).current;
  const bicepPulse = useRef(new Animated.Value(1)).current;
  const heartBeat = useRef(new Animated.Value(1)).current;
  const skinGlow = useRef(new Animated.Value(0.3)).current;
  const pelvicGlow = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    // Brain popping animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(brainPulse, { toValue: 1.15, duration: 400, useNativeDriver: true }),
        Animated.timing(brainPulse, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.delay(800),
      ])
    ).start();

    // Hair popping animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(hairPulse, { toValue: 1.1, duration: 500, useNativeDriver: true }),
        Animated.timing(hairPulse, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.delay(1000),
      ])
    ).start();

    // Stomach popping animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(stomachPulse, { toValue: 1.12, duration: 600, useNativeDriver: true }),
        Animated.timing(stomachPulse, { toValue: 1, duration: 600, useNativeDriver: true }),
      ])
    ).start();

    // Bicep flexing animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(bicepPulse, { toValue: 1.08, duration: 700, useNativeDriver: true }),
        Animated.timing(bicepPulse, { toValue: 1, duration: 700, useNativeDriver: true }),
      ])
    ).start();

    // Heart beating animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(heartBeat, { toValue: 1.2, duration: 300, useNativeDriver: true }),
        Animated.timing(heartBeat, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.timing(heartBeat, { toValue: 1.15, duration: 300, useNativeDriver: true }),
        Animated.timing(heartBeat, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.delay(500),
      ])
    ).start();

    // Skin glowing pulse (center chest)
    Animated.loop(
      Animated.sequence([
        Animated.timing(skinGlow, { toValue: 1, duration: 1500, useNativeDriver: true }),
        Animated.timing(skinGlow, { toValue: 0.3, duration: 1500, useNativeDriver: true }),
      ])
    ).start();

    // Pelvic area glow
    Animated.loop(
      Animated.sequence([
        Animated.timing(pelvicGlow, { toValue: 1, duration: 2000, useNativeDriver: true }),
        Animated.timing(pelvicGlow, { toValue: 0.3, duration: 2000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const handlePress = (part) => {
    setSelectedPart(part);
    if (onBodyPartPress) {
      onBodyPartPress(part);
    }
  };

  const getPartColor = (part) => {
    return selectedPart === part ? '#e74c3c' : '#3498db';
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.svgContainer}>
        <Svg width={width * 0.9} height={height * 0.8} viewBox="0 0 300 600">
          <Defs>
            <RadialGradient id="skinGlow" cx="50%" cy="50%">
              <Stop offset="0%" stopColor="#FFD700" stopOpacity="0.8" />
              <Stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
            </RadialGradient>
            <RadialGradient id="pelvicGlow" cx="50%" cy="50%">
              <Stop offset="0%" stopColor="#FF69B4" stopOpacity="0.7" />
              <Stop offset="100%" stopColor="#FF69B4" stopOpacity="0" />
            </RadialGradient>
          </Defs>

          {/* Hair - Interactive with animation */}
          <G onPress={() => handlePress('hair')}>
            <Animated.View style={{ transform: [{ scale: hairPulse }] }}>
              <Path
                d="M 150 20 Q 100 10, 80 40 Q 70 60, 75 80 Q 80 60, 90 50 Q 100 40, 110 45 Q 120 30, 130 25 Q 140 20, 150 20 Z"
                fill={getPartColor('hair')}
                stroke="#8B4513"
                strokeWidth="2"
              />
              <Path
                d="M 150 20 Q 200 10, 220 40 Q 230 60, 225 80 Q 220 60, 210 50 Q 200 40, 190 45 Q 180 30, 170 25 Q 160 20, 150 20 Z"
                fill={getPartColor('hair')}
                stroke="#8B4513"
                strokeWidth="2"
              />
            </Animated.View>
          </G>

          {/* Head */}
          <Ellipse
            cx="150"
            cy="100"
            rx="50"
            ry="60"
            fill="#f39c12"
            stroke="#2c3e50"
            strokeWidth="2"
          />

          {/* Brain - Interactive with pop animation */}
          <G onPress={() => handlePress('brain')}>
            <Animated.View style={{ transform: [{ scale: brainPulse }] }}>
              <Path
                d="M 130 70 Q 125 65, 130 60 Q 135 55, 140 60 Q 145 55, 150 60 Q 155 55, 160 60 Q 165 55, 170 60 Q 175 65, 170 70 Q 165 75, 160 70 Q 155 75, 150 70 Q 145 75, 140 70 Q 135 75, 130 70 Z"
                fill={getPartColor('brain')}
                stroke="#c0392b"
                strokeWidth="1.5"
              />
              <Circle cx="142" cy="65" r="1.5" fill="#ff1744" />
              <Circle cx="158" cy="65" r="1.5" fill="#ff1744" />
              <Path
                d="M 135 67 Q 140 65, 145 67 M 155 67 Q 160 65, 165 67"
                fill="none"
                stroke="#c0392b"
                strokeWidth="1"
              />
            </Animated.View>
          </G>

          {/* Eyes */}
          <Circle cx="135" cy="95" r="5" fill="#2c3e50" />
          <Circle cx="165" cy="95" r="5" fill="#2c3e50" />
          <Circle cx="136" cy="93" r="2" fill="#fff" />
          <Circle cx="166" cy="93" r="2" fill="#fff" />

          {/* Mouth */}
          <Path
            d="M 135 115 Q 150 120, 165 115"
            fill="none"
            stroke="#2c3e50"
            strokeWidth="2"
          />

          {/* Neck */}
          <Rect
            x="135"
            y="155"
            width="30"
            height="25"
            fill="#f39c12"
            stroke="#2c3e50"
            strokeWidth="2"
          />

          {/* Torso Base */}
          <Path
            d="M 100 180 L 200 180 L 190 340 L 110 340 Z"
            fill="#e8e8e8"
            stroke="#2c3e50"
            strokeWidth="2"
          />

          {/* Skin Glow (Center Chest) - Interactive */}
          <G onPress={() => handlePress('skin')}>
            <Animated.View style={{ opacity: skinGlow }}>
              <Circle
                cx="150"
                cy="220"
                r="25"
                fill="url(#skinGlow)"
              />
            </Animated.View>
            <Circle
              cx="150"
              cy="220"
              r="12"
              fill="#FFD700"
              opacity="0.6"
              stroke="#FFB300"
              strokeWidth="2"
            />
          </G>

          {/* Heart - Interactive with beat animation */}
          <G onPress={() => handlePress('heart')}>
            <Animated.View style={{ transform: [{ scale: heartBeat }] }}>
              <Path
                d="M 125 210 Q 120 205, 120 200 Q 120 195, 125 195 Q 130 195, 133 200 Q 136 195, 141 195 Q 146 195, 146 200 Q 146 205, 141 210 Q 133 218, 125 210 Z"
                fill={getPartColor('heart')}
                stroke="#c0392b"
                strokeWidth="1.5"
              />
            </Animated.View>
          </G>

          {/* Stomach - Interactive with pop animation */}
          <G onPress={() => handlePress('stomach')}>
            <Animated.View style={{ transform: [{ scale: stomachPulse }] }}>
              <Ellipse
                cx="150"
                cy="270"
                rx="22"
                ry="28"
                fill={getPartColor('stomach')}
                stroke="#2c3e50"
                strokeWidth="2"
                opacity="0.8"
              />
            </Animated.View>
          </G>

          {/* Sexual Health Glow (Pelvic Area) - Interactive */}
          <G onPress={() => handlePress('sexual')}>
            <Animated.View style={{ opacity: pelvicGlow }}>
              <Circle
                cx="150"
                cy="320"
                r="20"
                fill="url(#pelvicGlow)"
              />
            </Animated.View>
            <Circle
              cx="150"
              cy="320"
              r="8"
              fill="#FF69B4"
              opacity="0.5"
              stroke="#FF1493"
              strokeWidth="1.5"
            />
          </G>

          {/* Left Bicep (Muscle) - Interactive with flex animation */}
          <G onPress={() => handlePress('muscle')}>
            <Animated.View style={{ transform: [{ scale: bicepPulse }] }}>
              <Ellipse
                cx="85"
                cy="220"
                rx="18"
                ry="25"
                fill={getPartColor('muscle')}
                stroke="#2c3e50"
                strokeWidth="2"
              />
            </Animated.View>
            {/* Left Arm */}
            <Rect
              x="70"
              y="195"
              width="30"
              height="100"
              fill="#d4a574"
              stroke="#2c3e50"
              strokeWidth="2"
            />
            <Circle cx="85" cy="305" r="15" fill="#f39c12" stroke="#2c3e50" strokeWidth="2" />
          </G>

          {/* Right Arm */}
          <G>
            <Rect
              x="200"
              y="195"
              width="30"
              height="100"
              fill="#d4a574"
              stroke="#2c3e50"
              strokeWidth="2"
            />
            <Circle cx="215" cy="305" r="15" fill="#f39c12" stroke="#2c3e50" strokeWidth="2" />
          </G>

          {/* Legs */}
          <Rect
            x="120"
            y="340"
            width="25"
            height="110"
            fill="#5882a8"
            stroke="#2c3e50"
            strokeWidth="2"
          />
          <Rect
            x="155"
            y="340"
            width="25"
            height="110"
            fill="#5882a8"
            stroke="#2c3e50"
            strokeWidth="2"
          />
          <Ellipse
            cx="132.5"
            cy="460"
            rx="18"
            ry="10"
            fill="#2c3e50"
            stroke="#2c3e50"
            strokeWidth="2"
          />
          <Ellipse
            cx="167.5"
            cy="460"
            rx="18"
            ry="10"
            fill="#2c3e50"
            stroke="#2c3e50"
            strokeWidth="2"
          />
        </Svg>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  svgContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
});

export default InteractiveBodySVG;
