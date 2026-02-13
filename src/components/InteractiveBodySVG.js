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

  // Touch area component
  const TouchArea = ({ part, top, left, width, height, label, color = '#1abc9c' }) => (
    <TouchableOpacity
      style={[
        styles.touchArea,
        {
          top: top * scaleY,
          left: left * scaleX,
          width: width * scaleX,
          height: height * scaleY,
          backgroundColor: `${color}40`,
          borderColor: color,
        }
      ]}
      onPress={() => handlePress(part)}
      activeOpacity={0.7}
    >
      <Text style={[styles.touchLabel, { color }]}>{label}</Text>
    </TouchableOpacity>
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

          {/* Brain indicator */}
          <Circle cx="150" cy="55" r="18" fill="#E74C3C" opacity="0.8" />

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

          {/* Heart indicator */}
          <Circle cx="130" cy="210" r="15" fill="#E74C3C" opacity="0.9" />
          
          {/* Skin/Chest indicator */}
          <Circle cx="150" cy="230" r="20" fill="#FFD700" opacity="0.6" />

          {/* Stomach indicator */}
          <Ellipse cx="150" cy="280" rx="25" ry="30" fill="#27ae60" opacity="0.7" />

          {/* Sexual Health indicator */}
          <Circle cx="150" cy="330" r="15" fill="#FF69B4" opacity="0.8" />

          {/* Left Arm */}
          <Rect x="55" y="185" width="35" height="110" rx="10" fill="#FDBF6F" stroke="#E8A850" strokeWidth="2" />
          {/* Muscle indicator */}
          <Ellipse cx="72" cy="220" rx="15" ry="20" fill="#9b59b6" opacity="0.8" />
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
        <TouchArea part="hair" top={15} left={85} width={130} height={50} label="HAIR" color="#8B4513" />
        <TouchArea part="brain" top={35} left={115} width={70} height={45} label="BRAIN" color="#E74C3C" />
        <TouchArea part="heart" top={190} left={100} width={50} height={45} label="HEART" color="#E74C3C" />
        <TouchArea part="skin" top={210} left={125} width={50} height={45} label="SKIN" color="#FFD700" />
        <TouchArea part="stomach" top={250} left={115} width={70} height={65} label="FAT LOSS" color="#27ae60" />
        <TouchArea part="sexual" top={315} left={125} width={50} height={35} label="SEXUAL" color="#FF69B4" />
        <TouchArea part="muscle" top={195} left={50} width={50} height={60} label="MUSCLE" color="#9b59b6" />
      </View>
      
      {/* Legend */}
      <View style={styles.legend}>
        <Text style={styles.legendTitle}>Tap any area to browse compounds</Text>
        <View style={styles.legendRow}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#E74C3C' }]} />
            <Text style={styles.legendText}>Brain/Heart</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#27ae60' }]} />
            <Text style={styles.legendText}>Fat Loss</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#9b59b6' }]} />
            <Text style={styles.legendText}>Muscle</Text>
          </View>
        </View>
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
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchLabel: {
    fontSize: 9,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  legend: {
    marginTop: 15,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  legendTitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 15,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  legendText: {
    fontSize: 12,
    color: '#aaa',
  },
});

export default InteractiveBodySVG;
