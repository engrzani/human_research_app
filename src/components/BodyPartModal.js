import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, Circle, Ellipse, Rect } from 'react-native-svg';

const { width } = Dimensions.get('window');

// Custom SVG Icons that match the body parts
const BrainIcon = ({ size = 50, color = '#E91E63' }) => (
  <Svg width={size} height={size} viewBox="0 0 50 50">
    <Path
      d="M 15 12 
         C 8 12, 5 18, 7 26 
         C 3 28, 5 38, 12 40 
         C 16 46, 34 46, 38 40 
         C 45 38, 47 28, 43 26 
         C 45 18, 42 12, 35 12 
         C 30 8, 20 8, 15 12 Z"
      fill={color}
      stroke="#C2185B"
      strokeWidth="1.5"
    />
    <Path
      d="M 15 22 Q 25 26, 35 22"
      fill="none"
      stroke="#F8BBD9"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <Path
      d="M 18 32 Q 25 35, 32 32"
      fill="none"
      stroke="#F8BBD9"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);

const HeartIcon = ({ size = 50, color = '#E74C3C' }) => (
  <Svg width={size} height={size} viewBox="0 0 50 50">
    <Path
      d="M 25 15 
         C 25 10, 15 5, 8 12 
         C 0 20, 0 30, 10 40 
         L 25 48 
         L 40 40 
         C 50 30, 50 20, 42 12 
         C 35 5, 25 10, 25 15 Z"
      fill={color}
      stroke="#C0392B"
      strokeWidth="1.5"
    />
    <Path
      d="M 15 18 Q 20 14, 23 18"
      fill="none"
      stroke="#F5B7B1"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </Svg>
);

const BicepIcon = ({ size = 50, color = '#9B59B6' }) => (
  <Svg width={size} height={size} viewBox="0 0 50 50">
    {/* Arm base */}
    <Rect x="5" y="20" width="40" height="18" rx="6" fill="#FDBF6F" stroke="#E8A850" strokeWidth="1.5" />
    {/* Bicep muscle bulge */}
    <Path
      d="M 8 18 
         C 2 22, 2 32, 10 38 
         C 15 42, 25 42, 32 38 
         C 42 32, 42 22, 35 18 
         C 28 14, 15 14, 8 18 Z"
      fill={color}
      stroke="#8E44AD"
      strokeWidth="1.5"
    />
    {/* Bicep peak highlight */}
    <Path
      d="M 12 22 Q 20 16, 28 22"
      fill="none"
      stroke="#D7BDE2"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    {/* Muscle definition */}
    <Path
      d="M 15 30 Q 22 28, 30 30"
      fill="none"
      stroke="#8E44AD"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.5"
    />
  </Svg>
);

const StomachIcon = ({ size = 50, color = '#F39C12' }) => (
  <Svg width={size} height={size} viewBox="0 0 50 50">
    {/* Stomach body */}
    <Path
      d="M 15 8 
         C 8 8, 4 16, 6 28 
         C 8 40, 18 46, 30 46 
         C 42 46, 48 38, 46 26 
         C 44 14, 38 8, 30 8 
         C 26 8, 22 12, 25 12 
         C 28 12, 24 8, 20 8 
         L 15 8 Z"
      fill={color}
      stroke="#D68910"
      strokeWidth="1.5"
    />
    {/* Esophagus opening */}
    <Ellipse cx="17" cy="10" rx="6" ry="4" fill="#E67E22" stroke="#D68910" strokeWidth="1" />
    {/* Internal texture */}
    <Path
      d="M 15 25 Q 28 22, 38 26"
      fill="none"
      stroke="#D68910"
      strokeWidth="1.5"
      opacity="0.5"
    />
    <Path
      d="M 18 35 Q 28 32, 36 36"
      fill="none"
      stroke="#D68910"
      strokeWidth="1.5"
      opacity="0.5"
    />
  </Svg>
);

const HairIcon = ({ size = 50, color = '#8B4513' }) => (
  <Svg width={size} height={size} viewBox="0 0 50 50">
    {/* Head */}
    <Circle cx="25" cy="30" r="16" fill="#FDBF6F" stroke="#E8A850" strokeWidth="1.5" />
    {/* Hair on top */}
    <Path
      d="M 25 5 Q 8 8, 8 22 Q 10 18, 14 16 Q 18 12, 22 14 Q 25 8, 28 14 Q 32 12, 36 16 Q 40 18, 42 22 Q 42 8, 25 5 Z"
      fill={color}
      stroke="#5D3A1A"
      strokeWidth="1.5"
    />
    {/* Hair strands */}
    <Path
      d="M 18 10 Q 20 6, 22 10"
      fill="none"
      stroke="#5D3A1A"
      strokeWidth="1"
    />
    <Path
      d="M 28 10 Q 30 6, 32 10"
      fill="none"
      stroke="#5D3A1A"
      strokeWidth="1"
    />
  </Svg>
);

const SkinIcon = ({ size = 50, color = '#FFD700' }) => (
  <Svg width={size} height={size} viewBox="0 0 50 50">
    {/* Glowing skin circle */}
    <Circle cx="25" cy="25" r="18" fill={color} opacity="0.3" />
    <Circle cx="25" cy="25" r="12" fill={color} opacity="0.5" />
    {/* Sparkle star */}
    <Path
      d="M 25 10 L 28 20 L 38 20 L 30 27 L 33 38 L 25 31 L 17 38 L 20 27 L 12 20 L 22 20 Z"
      fill="#FFF176"
      stroke={color}
      strokeWidth="1"
    />
  </Svg>
);

const SexualHealthIcon = ({ size = 50, color = '#FF69B4' }) => (
  <Svg width={size} height={size} viewBox="0 0 50 50">
    {/* Outer glow ring */}
    <Circle cx="25" cy="25" r="20" fill="none" stroke={color} strokeWidth="2" opacity="0.4" />
    <Circle cx="25" cy="25" r="15" fill="none" stroke={color} strokeWidth="2" opacity="0.6" />
    {/* Inner heart */}
    <Path
      d="M 25 18 
         C 25 15, 20 12, 16 16 
         C 12 20, 12 26, 18 32 
         L 25 38 
         L 32 32 
         C 38 26, 38 20, 34 16 
         C 30 12, 25 15, 25 18 Z"
      fill={color}
      stroke="#E91E63"
      strokeWidth="1"
    />
  </Svg>
);

// Category info with icons and colors
const CATEGORY_INFO = {
  brain: {
    name: 'Nootropics',
    displayName: 'Nootropics',
    description: 'Tap to view compounds',
    IconComponent: BrainIcon,
    color: '#E91E63',
    bgColor: '#FCE4EC',
  },
  hair: {
    name: 'Hair Growth',
    displayName: 'Hair Growth',
    description: 'Tap to view compounds',
    IconComponent: HairIcon,
    color: '#8B4513',
    bgColor: '#F5E6D3',
  },
  stomach: {
    name: 'Fat Loss',
    displayName: 'Fat Loss',
    description: 'Tap to view compounds',
    IconComponent: StomachIcon,
    color: '#F39C12',
    bgColor: '#FFF8E1',
  },
  muscle: {
    name: 'Muscle Building',
    displayName: 'Muscle',
    description: 'Tap to view compounds',
    IconComponent: BicepIcon,
    color: '#9B59B6',
    bgColor: '#F3E5F5',
  },
  heart: {
    name: 'Endurance & Longevity',
    displayName: 'Heart Health',
    description: 'Tap to view compounds',
    IconComponent: HeartIcon,
    color: '#E74C3C',
    bgColor: '#FFEBEE',
  },
  skin: {
    name: 'Skin Health',
    displayName: 'Skin Care',
    description: 'Tap to view compounds',
    IconComponent: SkinIcon,
    color: '#F39C12',
    bgColor: '#FFF8E1',
  },
  sexual: {
    name: 'Sexual Health',
    displayName: 'Sexual Health',
    description: 'Tap to view compounds',
    IconComponent: SexualHealthIcon,
    color: '#FF69B4',
    bgColor: '#FCE4EC',
  },
};

const BodyPartModal = ({ visible, bodyPart, onClose, onViewProducts }) => {
  const info = CATEGORY_INFO[bodyPart] || {
    name: 'Compounds',
    displayName: 'Compounds',
    description: 'Tap to view compounds',
    IconComponent: null,
    color: '#1abc9c',
    bgColor: '#E0F2F1',
  };

  const IconComponent = info.IconComponent;
  
  // Animation refs
  const scaleAnim = useRef(new Animated.Value(0.85)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const iconBounce = useRef(new Animated.Value(0.5)).current;
  const buttonSlide = useRef(new Animated.Value(30)).current;
  
  useEffect(() => {
    if (visible) {
      // Reset animations
      scaleAnim.setValue(0.85);
      fadeAnim.setValue(0);
      iconBounce.setValue(0.5);
      buttonSlide.setValue(30);
      
      // Play entrance animations
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 6,
          tension: 100,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
      
      // Icon bounce with delay
      setTimeout(() => {
        Animated.spring(iconBounce, {
          toValue: 1,
          friction: 4,
          tension: 150,
          useNativeDriver: true,
        }).start();
      }, 150);
      
      // Button slide up
      setTimeout(() => {
        Animated.spring(buttonSlide, {
          toValue: 0,
          friction: 6,
          useNativeDriver: true,
        }).start();
      }, 200);
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <Animated.View 
              style={[
                styles.modalContent,
                {
                  opacity: fadeAnim,
                  transform: [{ scale: scaleAnim }],
                }
              ]}
            >
              {/* Close Button */}
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>

              {/* Icon - Custom SVG body part icon */}
              <Animated.View 
                style={[
                  styles.iconContainer, 
                  { 
                    backgroundColor: info.bgColor,
                    transform: [{ scale: iconBounce }],
                  }
                ]}
              >
                {IconComponent ? (
                  <IconComponent size={55} color={info.color} />
                ) : (
                  <Ionicons name="flask" size={50} color={info.color} />
                )}
              </Animated.View>

              {/* Title */}
              <Text style={styles.title}>{info.displayName}</Text>
              <Text style={styles.description}>{info.description}</Text>

              {/* View Button */}
              <Animated.View style={{ transform: [{ translateY: buttonSlide }], width: '100%' }}>
                <TouchableOpacity
                  style={[styles.viewButton, { backgroundColor: '#1abc9c' }]}
                  onPress={() => {
                    onClose();
                    onViewProducts(bodyPart);
                  }}
                  activeOpacity={0.8}
                >
                  <Text style={styles.viewButtonText}>View {info.displayName}</Text>
                </TouchableOpacity>
              </Animated.View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    width: width * 0.85,
    alignItems: 'center',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 1,
    padding: 5,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  emojiIcon: {
    fontSize: 42,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#888',
    marginBottom: 25,
  },
  viewButton: {
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  viewButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default BodyPartModal;
