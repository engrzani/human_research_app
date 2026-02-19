import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop, Ellipse } from 'react-native-svg';

const StomachIcon = ({ size = 60 }) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} viewBox="0 0 100 100">
        <Defs>
          <LinearGradient id="stomachGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#E8A0A0" stopOpacity="1" />
            <Stop offset="30%" stopColor="#D88A8A" stopOpacity="1" />
            <Stop offset="60%" stopColor="#C87878" stopOpacity="1" />
            <Stop offset="100%" stopColor="#B06868" stopOpacity="1" />
          </LinearGradient>
          <LinearGradient id="stomachInner" x1="30%" y1="30%" x2="70%" y2="70%">
            <Stop offset="0%" stopColor="#F0B8B8" stopOpacity="1" />
            <Stop offset="100%" stopColor="#E0A0A0" stopOpacity="1" />
          </LinearGradient>
          <LinearGradient id="stomachHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#F8D0D0" stopOpacity="0.8" />
            <Stop offset="100%" stopColor="#F0B8B8" stopOpacity="0" />
          </LinearGradient>
        </Defs>
        
        {/* Esophagus (tube coming into stomach) */}
        <Path
          d="M 60 5 
             C 65 5, 70 10, 72 20
             C 74 30, 70 40, 65 45"
          fill="none"
          stroke="#C87878"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <Path
          d="M 60 5 
             C 65 5, 70 10, 72 20
             C 74 30, 70 40, 65 45"
          fill="none"
          stroke="#E8A0A0"
          strokeWidth="5"
          strokeLinecap="round"
        />
        
        {/* Main stomach body */}
        <Path
          d="M 65 45 
             C 85 45, 95 55, 95 70
             C 95 85, 80 95, 55 95
             C 30 95, 15 85, 15 70
             C 15 55, 25 45, 35 42
             C 45 39, 55 42, 65 45"
          fill="url(#stomachGrad)"
          stroke="#B06868"
          strokeWidth="2"
        />
        
        {/* Inner stomach highlight/fold */}
        <Ellipse
          cx="50"
          cy="70"
          rx="25"
          ry="15"
          fill="url(#stomachInner)"
          opacity="0.7"
        />
        
        {/* Light reflection */}
        <Path
          d="M 30 55
             C 35 50, 50 48, 55 52
             C 45 50, 35 52, 30 55"
          fill="url(#stomachHighlight)"
        />
        
        {/* Bottom curve detail */}
        <Path
          d="M 25 75 
             C 30 82, 45 88, 60 85"
          fill="none"
          stroke="#B06868"
          strokeWidth="1.5"
          opacity="0.5"
        />
        
        {/* Intestine connection at bottom */}
        <Path
          d="M 20 70
             C 10 72, 8 80, 15 88
             C 20 94, 25 92, 28 85"
          fill="url(#stomachGrad)"
          stroke="#B06868"
          strokeWidth="1.5"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default StomachIcon;
