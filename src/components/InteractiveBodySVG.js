import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import Svg, { Path, Circle, Ellipse, Rect, Defs, RadialGradient, Stop } from 'react-native-svg';

const { width } = Dimensions.get('window');

const InteractiveBodySVG = ({ onBodyPartPress }) => {
  const svgWidth = width * 0.85;
  const svgHeight = svgWidth * 1.8;
  
  // Scale factor to position touch areas
  const scaleX = svgWidth / 300;
  const scaleY = svgHeight / 540;

  const handlePress = (part) => {
    if (onBodyPartPress) {
      onBodyPartPress(part);
    }
  };

  // Touch area component - invisible tap zones
  const TouchArea = ({ part, top, left, width, height, color = '#1abc9c' }) => (
    <TouchableOpacity
      style={[
        styles.touchArea,
        {
          top: top * scaleY,
          left: left * scaleX,
          width: width * scaleX,
          height: height * scaleY,
          backgroundColor: 'transparent',
          borderColor: 'transparent',
        }
      ]}
      onPress={() => handlePress(part)}
      activeOpacity={0.5}
    />
  );

  return (
    <View style={styles.container}>
      <View style={[styles.svgContainer, { width: svgWidth, height: svgHeight }]}>
        <Svg width={svgWidth} height={svgHeight} viewBox="0 0 300 540">
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

          {/* Hair */}
          <Path
            d="M 150 25 Q 100 15, 85 45 Q 75 65, 80 85 Q 85 65, 95 55 Q 105 45, 115 50 Q 125 35, 135 30 Q 145 25, 150 25 Z"
            fill="#8B4513"
            stroke="#5D3A1A"
            strokeWidth="2"
          />
          <Path
            d="M 150 25 Q 200 15, 215 45 Q 225 65, 220 85 Q 215 65, 205 55 Q 195 45, 185 50 Q 175 35, 165 30 Q 155 25, 150 25 Z"
            fill="#8B4513"
            stroke="#5D3A1A"
            strokeWidth="2"
          />

          {/* Head */}
          <Ellipse
            cx="150"
            cy="95"
            rx="55"
            ry="60"
            fill="#FDBF6F"
            stroke="#E8A850"
            strokeWidth="2"
          />

          {/* Cartoon Brain */}
          <Path
            d="M 135 45 
               C 125 45, 120 50, 122 58 
               C 118 55, 112 58, 115 68 
               C 110 70, 112 80, 120 82 
               C 125 88, 140 90, 150 88 
               C 160 90, 175 88, 180 82 
               C 188 80, 190 70, 185 68 
               C 188 58, 182 55, 178 58 
               C 180 50, 175 45, 165 45 
               C 158 42, 142 42, 135 45 Z"
            fill="#F8BBD9"
            stroke="#E91E63"
            strokeWidth="1.5"
          />
          {/* Brain wrinkle lines */}
          <Path
            d="M 135 55 Q 145 60, 155 55 Q 165 60, 175 55"
            fill="none"
            stroke="#E91E63"
            strokeWidth="1"
            opacity="0.6"
          />
          <Path
            d="M 130 68 Q 140 72, 150 68 Q 160 72, 170 68"
            fill="none"
            stroke="#E91E63"
            strokeWidth="1"
            opacity="0.6"
          />

          {/* Eyes */}
          <Circle cx="130" cy="90" r="8" fill="#fff" />
          <Circle cx="170" cy="90" r="8" fill="#fff" />
          <Circle cx="130" cy="90" r="4" fill="#2c3e50" />
          <Circle cx="170" cy="90" r="4" fill="#2c3e50" />

          {/* Mouth */}
          <Path
            d="M 135 115 Q 150 125, 165 115"
            fill="none"
            stroke="#c0392b"
            strokeWidth="2"
          />

          {/* Neck */}
          <Rect x="130" y="150" width="40" height="30" fill="#FDBF6F" stroke="#E8A850" strokeWidth="2" />

          {/* Torso */}
          <Path
            d="M 90 180 L 210 180 L 200 340 L 100 340 Z"
            fill="#3498db"
            stroke="#2980b9"
            strokeWidth="2"
          />

          {/* Cartoon Heart Organ */}
          <Path
            d="M 130 195 
               C 130 190, 120 185, 115 190 
               C 108 195, 108 205, 115 215 
               L 130 235 
               L 145 215 
               C 152 205, 152 195, 145 190 
               C 140 185, 130 190, 130 195 Z"
            fill="#E74C3C"
            stroke="#C0392B"
            strokeWidth="1.5"
          />
          {/* Heart details */}
          <Path
            d="M 122 200 Q 125 195, 128 200"
            fill="none"
            stroke="#F5B7B1"
            strokeWidth="2"
            strokeLinecap="round"
          />
          
          {/* Skin/Chest indicator - sparkle star */}
          <Circle cx="165" cy="220" r="10" fill="#FFD700" opacity="0.7" />
          <Path
            d="M 165 212 L 167 218 L 173 218 L 168 222 L 170 228 L 165 224 L 160 228 L 162 222 L 157 218 L 163 218 Z"
            fill="#FFF176"
            stroke="#FFD700"
            strokeWidth="0.5"
          />

          {/* Cartoon Stomach Organ */}
          <Path
            d="M 125 260 
               C 115 260, 110 270, 112 285 
               C 114 300, 125 315, 150 315 
               C 175 315, 186 300, 188 285 
               C 190 270, 185 260, 175 260 
               C 170 260, 165 265, 150 265 
               C 135 265, 130 260, 125 260 Z"
            fill="#F39C12"
            stroke="#D68910"
            strokeWidth="1.5"
          />
          {/* Stomach opening (esophagus connection) */}
          <Ellipse cx="150" cy="258" rx="12" ry="6" fill="#E67E22" stroke="#D68910" strokeWidth="1" />
          {/* Stomach texture lines */}
          <Path
            d="M 130 280 Q 150 275, 170 280"
            fill="none"
            stroke="#D68910"
            strokeWidth="1"
            opacity="0.6"
          />
          <Path
            d="M 135 295 Q 150 290, 165 295"
            fill="none"
            stroke="#D68910"
            strokeWidth="1"
            opacity="0.6"
          />

          {/* Sexual Health indicator */}
          <Circle cx="150" cy="330" r="15" fill="#FF69B4" opacity="0.8" />

          {/* Left Arm */}
          <Rect x="55" y="185" width="35" height="110" rx="10" fill="#FDBF6F" stroke="#E8A850" strokeWidth="2" />
          
          {/* Cartoon Bicep Muscle (flexing shape) */}
          <Path
            d="M 58 200 
               C 50 205, 48 220, 55 235 
               C 58 240, 65 242, 72 240 
               C 80 238, 88 230, 90 220 
               C 92 210, 88 200, 80 198 
               C 72 196, 65 198, 58 200 Z"
            fill="#9b59b6"
            stroke="#8E44AD"
            strokeWidth="1.5"
          />
          {/* Bicep highlight (flexed peak) */}
          <Path
            d="M 62 210 Q 68 205, 75 210"
            fill="none"
            stroke="#D7BDE2"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Muscle fiber lines */}
          <Path
            d="M 60 220 Q 70 218, 80 222"
            fill="none"
            stroke="#8E44AD"
            strokeWidth="1"
            opacity="0.5"
          />
          
          {/* Left Hand */}
          <Circle cx="72" cy="305" r="18" fill="#FDBF6F" stroke="#E8A850" strokeWidth="2" />

          {/* Right Arm */}
          <Rect x="210" y="185" width="35" height="110" rx="10" fill="#FDBF6F" stroke="#E8A850" strokeWidth="2" />
          {/* Right Hand */}
          <Circle cx="228" cy="305" r="18" fill="#FDBF6F" stroke="#E8A850" strokeWidth="2" />

          {/* Legs */}
          <Rect x="110" y="340" width="35" height="140" rx="8" fill="#34495e" stroke="#2c3e50" strokeWidth="2" />
          <Rect x="155" y="340" width="35" height="140" rx="8" fill="#34495e" stroke="#2c3e50" strokeWidth="2" />
          
          {/* Feet */}
          <Ellipse cx="127" cy="490" rx="22" ry="12" fill="#2c3e50" />
          <Ellipse cx="173" cy="490" rx="22" ry="12" fill="#2c3e50" />
        </Svg>

        {/* Touch overlay areas */}
        <TouchArea part="hair" top={15} left={85} width={130} height={50} />
        <TouchArea part="brain" top={35} left={115} width={70} height={45} />
        <TouchArea part="heart" top={190} left={100} width={50} height={45} />
        <TouchArea part="skin" top={210} left={125} width={50} height={45} />
        <TouchArea part="stomach" top={250} left={115} width={70} height={65} />
        <TouchArea part="sexual" top={315} left={125} width={50} height={35} />
        <TouchArea part="muscle" top={195} left={50} width={50} height={60} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  svgContainer: {
    position: 'relative',
  },
  touchArea: {
    position: 'absolute',
    borderRadius: 8,
  },
});

export default InteractiveBodySVG;
