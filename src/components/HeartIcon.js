import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Defs, LinearGradient, RadialGradient, Stop, Ellipse } from 'react-native-svg';

const HeartIcon = ({ size = 60 }) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} viewBox="0 0 100 100">
        <Defs>
          {/* Main heart gradient - deep red */}
          <LinearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#E8475C" stopOpacity="1" />
            <Stop offset="40%" stopColor="#D13B50" stopOpacity="1" />
            <Stop offset="70%" stopColor="#C02040" stopOpacity="1" />
            <Stop offset="100%" stopColor="#A01030" stopOpacity="1" />
          </LinearGradient>
          
          {/* Glossy highlight gradient */}
          <RadialGradient id="heartHighlight" cx="30%" cy="25%" r="40%">
            <Stop offset="0%" stopColor="#FF8090" stopOpacity="0.9" />
            <Stop offset="50%" stopColor="#F06070" stopOpacity="0.4" />
            <Stop offset="100%" stopColor="#E8475C" stopOpacity="0" />
          </RadialGradient>
          
          {/* Secondary highlight */}
          <RadialGradient id="heartHighlight2" cx="70%" cy="30%" r="30%">
            <Stop offset="0%" stopColor="#FF7080" stopOpacity="0.6" />
            <Stop offset="100%" stopColor="#E8475C" stopOpacity="0" />
          </RadialGradient>
          
          {/* Bottom shadow gradient */}
          <LinearGradient id="heartShadow" x1="50%" y1="50%" x2="50%" y2="100%">
            <Stop offset="0%" stopColor="#C02040" stopOpacity="0" />
            <Stop offset="100%" stopColor="#801020" stopOpacity="0.5" />
          </LinearGradient>
        </Defs>
        
        {/* Main heart shape */}
        <Path
          d="M 50 90
             C 20 70, 5 50, 5 35
             C 5 20, 15 10, 30 10
             C 40 10, 48 18, 50 25
             C 52 18, 60 10, 70 10
             C 85 10, 95 20, 95 35
             C 95 50, 80 70, 50 90
             Z"
          fill="url(#heartGrad)"
        />
        
        {/* Glossy highlight on left lobe */}
        <Path
          d="M 30 15
             C 18 18, 10 28, 12 40
             C 10 30, 18 18, 30 15
             Z"
          fill="url(#heartHighlight)"
        />
        
        {/* Glossy shine ellipse - left */}
        <Ellipse
          cx="25"
          cy="30"
          rx="12"
          ry="8"
          fill="#FF9090"
          opacity="0.5"
        />
        
        {/* Small bright highlight spot */}
        <Ellipse
          cx="22"
          cy="26"
          rx="5"
          ry="4"
          fill="#FFCCCC"
          opacity="0.7"
        />
        
        {/* Right lobe slight highlight */}
        <Ellipse
          cx="72"
          cy="32"
          rx="8"
          ry="6"
          fill="#FF8080"
          opacity="0.3"
        />
        
        {/* Center divider shadow */}
        <Path
          d="M 50 25
             C 50 30, 50 35, 50 45"
          fill="none"
          stroke="#A01030"
          strokeWidth="2"
          opacity="0.3"
        />
        
        {/* Bottom shadow overlay */}
        <Path
          d="M 50 90
             C 30 75, 15 60, 12 48
             C 25 65, 40 80, 50 88
             C 60 80, 75 65, 88 48
             C 85 60, 70 75, 50 90
             Z"
          fill="url(#heartShadow)"
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

export default HeartIcon;
