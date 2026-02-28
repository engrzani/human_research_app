import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Defs, LinearGradient, RadialGradient, Stop, Ellipse } from 'react-native-svg';

const BeakerIcon = memo(({ size = 60, fillLevel = 0.5, liquidColor = '#1abc9c', animated = false }) => {
  // fillLevel: 0 to 1 (0 = empty, 1 = full)
  // Calculate liquid height based on fill level (in Erlenmeyer flask shape)
  const maxLiquidHeight = 36;
  const liquidHeight = maxLiquidHeight * fillLevel;
  
  // Determine liquid color gradient based on passed color
  const liquidColorDark = liquidColor === '#1abc9c' ? '#1E8449' : liquidColor;
  const liquidColorMid = liquidColor === '#1abc9c' ? '#27AE60' : liquidColor;
  const liquidColorLight = liquidColor === '#1abc9c' ? '#2ECC71' : liquidColor;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} viewBox="0 0 64 64">
        <Defs>
          {/* Liquid gradient - green glow */}
          <LinearGradient id="liquidGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor={liquidColorLight} stopOpacity="0.9" />
            <Stop offset="50%" stopColor={liquidColorMid} stopOpacity="1" />
            <Stop offset="100%" stopColor={liquidColorDark} stopOpacity="0.8" />
          </LinearGradient>
          
          {/* Glow gradient */}
          <RadialGradient id="glowGradient" cx="50%" cy="85%" r="45%">
            <Stop offset="0%" stopColor={liquidColorLight} stopOpacity="0.5" />
            <Stop offset="100%" stopColor={liquidColorLight} stopOpacity="0" />
          </RadialGradient>
          
          {/* Glass gradient */}
          <LinearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#3a3a3a" stopOpacity="1" />
            <Stop offset="15%" stopColor="#4a4a4a" stopOpacity="1" />
            <Stop offset="50%" stopColor="#5a5a5a" stopOpacity="1" />
            <Stop offset="85%" stopColor="#4a4a4a" stopOpacity="1" />
            <Stop offset="100%" stopColor="#3a3a3a" stopOpacity="1" />
          </LinearGradient>

          {/* Cap/stopper gradient */}
          <LinearGradient id="capGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#2c2c2c" stopOpacity="1" />
            <Stop offset="50%" stopColor="#1a1a1a" stopOpacity="1" />
            <Stop offset="100%" stopColor="#0d0d0d" stopOpacity="1" />
          </LinearGradient>
        </Defs>

        {/* Glow behind liquid */}
        {fillLevel > 0 && (
          <Ellipse cx="32" cy="52" rx="18" ry="10" fill="url(#glowGradient)" />
        )}

        {/* Erlenmeyer Flask shape - conical body */}
        <Path
          d="M24 14 L24 18 L12 54 C10 58 14 60 32 60 C50 60 54 58 52 54 L40 18 L40 14"
          fill="none"
          stroke="url(#glassGradient)"
          strokeWidth="1.5"
        />
        
        {/* Flask neck */}
        <Path
          d="M24 14 L24 8 L40 8 L40 14"
          fill="none"
          stroke="url(#glassGradient)"
          strokeWidth="1.5"
        />

        {/* Liquid inside flask - based on fill level */}
        {fillLevel > 0 && (
          <>
            <Path
              d={`M18 ${58 - liquidHeight * 0.8} L13 54 C11 57 15 59 32 59 C49 59 53 57 51 54 L46 ${58 - liquidHeight * 0.8} Z`}
              fill="url(#liquidGradient)"
            />
            
            {/* Liquid surface wave effect */}
            <Path
              d={`M18 ${58 - liquidHeight * 0.8} Q25 ${56 - liquidHeight * 0.8} 32 ${58 - liquidHeight * 0.8} Q39 ${60 - liquidHeight * 0.8} 46 ${58 - liquidHeight * 0.8}`}
              fill="none"
              stroke={liquidColorLight}
              strokeWidth="0.8"
              opacity="0.6"
            />
          </>
        )}

        {/* Cap/Stopper */}
        <Path
          d="M22 8 L22 4 C22 2 26 1 32 1 C38 1 42 2 42 4 L42 8 L22 8"
          fill="url(#capGradient)"
          stroke="#222"
          strokeWidth="0.8"
        />
        
        {/* Cap rim */}
        <Path
          d="M21 8 L43 8"
          stroke="#444"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        {/* Glass reflection */}
        <Path
          d="M19 22 L14 48"
          stroke="#ffffff"
          strokeWidth="0.8"
          opacity="0.15"
          strokeLinecap="round"
        />
        <Path
          d="M21 24 L16 46"
          stroke="#ffffff"
          strokeWidth="0.5"
          opacity="0.1"
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BeakerIcon;
