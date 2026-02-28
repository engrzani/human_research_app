import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
  Image,
  Dimensions,
  Animated,
  Easing,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import BodyPartModal from '../components/BodyPartModal';
import { useCart } from '../context/CartContext';
import { getCategoryInfo } from '../data/products';
import { useNavigation } from '@react-navigation/native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Map body parts to product categories
const BODY_PART_TO_CATEGORY = {
  brain: 'brain',
  hair: 'hair',
  stomach: 'fatLoss',
  muscle: 'muscle',
  heart: 'heart',
  skin: 'skin',
  sexual: 'sexual',
};

const HomeScreen = () => {
  const navigation = useNavigation();
  const { cartItemCount } = useCart();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBodyPart, setSelectedBodyPart] = useState(null);

  // Animation refs for each body part
  const brainAnim = useRef(new Animated.Value(1)).current;
  const hairAnim = useRef(new Animated.Value(1)).current;
  const stomachAnim = useRef(new Animated.Value(1)).current;
  const muscleAnim = useRef(new Animated.Value(1)).current;
  const heartAnim = useRef(new Animated.Value(1)).current;
  const skinGlowAnim = useRef(new Animated.Value(0.3)).current;
  const skinPulseAnim = useRef(new Animated.Value(1)).current;
  const sexualGlowAnim = useRef(new Animated.Value(0.3)).current;
  const sexualPulseAnim = useRef(new Animated.Value(1)).current;
  
  // Active animation states
  const [activeAnimations, setActiveAnimations] = useState({});

  // Persistent glow animations for bicep and pelvic spots
  const bicepGlowAnim = useRef(new Animated.Value(0.4)).current;
  const pelvicGlowAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const bicepLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(bicepGlowAnim, { toValue: 1, duration: 1200, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(bicepGlowAnim, { toValue: 0.4, duration: 1200, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    );
    const pelvicLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pelvicGlowAnim, { toValue: 1, duration: 1200, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(pelvicGlowAnim, { toValue: 0.4, duration: 1200, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    );
    bicepLoop.start();
    pelvicLoop.start();
    return () => { bicepLoop.stop(); pelvicLoop.stop(); };
  }, []);

  // Image dimensions - calculate aspect ratio for proper fit
  // Use contain to prevent stretching/cropping
  const imageWidth = screenWidth;
  const imageHeight = screenHeight;

  // Animation functions
  const playBrainPop = () => {
    setActiveAnimations(prev => ({ ...prev, brain: true }));
    Animated.sequence([
      Animated.timing(brainAnim, {
        toValue: 1.4,
        duration: 150,
        easing: Easing.out(Easing.back(2)),
        useNativeDriver: true,
      }),
      Animated.timing(brainAnim, {
        toValue: 1,
        duration: 200,
        easing: Easing.bounce,
        useNativeDriver: true,
      }),
    ]).start(() => setActiveAnimations(prev => ({ ...prev, brain: false })));
  };

  const playHairPop = () => {
    setActiveAnimations(prev => ({ ...prev, hair: true }));
    Animated.sequence([
      Animated.timing(hairAnim, {
        toValue: 1.3,
        duration: 120,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(hairAnim, {
        toValue: 1,
        duration: 180,
        easing: Easing.bounce,
        useNativeDriver: true,
      }),
    ]).start(() => setActiveAnimations(prev => ({ ...prev, hair: false })));
  };

  const playStomachPop = () => {
    setActiveAnimations(prev => ({ ...prev, stomach: true }));
    Animated.sequence([
      Animated.timing(stomachAnim, {
        toValue: 1.35,
        duration: 150,
        easing: Easing.out(Easing.back(2)),
        useNativeDriver: true,
      }),
      Animated.timing(stomachAnim, {
        toValue: 1,
        duration: 200,
        easing: Easing.bounce,
        useNativeDriver: true,
      }),
    ]).start(() => setActiveAnimations(prev => ({ ...prev, stomach: false })));
  };

  const playMuscleFlex = () => {
    setActiveAnimations(prev => ({ ...prev, muscle: true }));
    Animated.sequence([
      Animated.timing(muscleAnim, {
        toValue: 1.25,
        duration: 200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(muscleAnim, {
        toValue: 1.15,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(muscleAnim, {
        toValue: 1.3,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(muscleAnim, {
        toValue: 1,
        duration: 250,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start(() => setActiveAnimations(prev => ({ ...prev, muscle: false })));
  };

  const playHeartBeat = () => {
    setActiveAnimations(prev => ({ ...prev, heart: true }));
    Animated.sequence([
      Animated.timing(heartAnim, {
        toValue: 1.3,
        duration: 100,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(heartAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(heartAnim, {
        toValue: 1.25,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(heartAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.delay(100),
      Animated.timing(heartAnim, {
        toValue: 1.3,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(heartAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(heartAnim, {
        toValue: 1.25,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(heartAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => setActiveAnimations(prev => ({ ...prev, heart: false })));
  };

  const playSkinGlow = () => {
    setActiveAnimations(prev => ({ ...prev, skin: true }));
    Animated.parallel([
      Animated.sequence([
        Animated.timing(skinGlowAnim, {
          toValue: 1,
          duration: 300,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(skinGlowAnim, {
          toValue: 0.5,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(skinGlowAnim, {
          toValue: 0.9,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(skinGlowAnim, {
          toValue: 0.3,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.timing(skinPulseAnim, {
          toValue: 1.5,
          duration: 400,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(skinPulseAnim, {
          toValue: 1.2,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(skinPulseAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => setActiveAnimations(prev => ({ ...prev, skin: false })));
  };

  const playSexualGlow = () => {
    setActiveAnimations(prev => ({ ...prev, sexual: true }));
    Animated.parallel([
      Animated.sequence([
        Animated.timing(sexualGlowAnim, {
          toValue: 1,
          duration: 250,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(sexualGlowAnim, {
          toValue: 0.6,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(sexualGlowAnim, {
          toValue: 0.9,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(sexualGlowAnim, {
          toValue: 0.3,
          duration: 250,
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.timing(sexualPulseAnim, {
          toValue: 1.4,
          duration: 350,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(sexualPulseAnim, {
          toValue: 1,
          duration: 450,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => setActiveAnimations(prev => ({ ...prev, sexual: false })));
  };

  const handleBodyPartPress = (bodyPart) => {
    // Play animation based on body part
    /* Animation removed as per request - instant navigation
    switch (bodyPart) {
      case 'brain':
        playBrainPop();
        break;
      case 'hair':
        playHairPop();
        break;
      case 'stomach':
        playStomachPop();
        break;
      case 'muscle':
        playMuscleFlex();
        break;
      case 'heart':
        playHeartBeat();
        break;
      case 'skin':
        playSkinGlow();
        break;
      case 'sexual':
        playSexualGlow();
        break;
    }
    */
    
    setSelectedBodyPart(bodyPart);
    setModalVisible(true);
  };


  // Touchable area component
  const TouchArea = ({ part, style }) => (
    <TouchableOpacity
      style={[styles.touchArea, style]}
      onPress={() => handleBodyPartPress(part)}
      activeOpacity={0.6}
    />
  );

  const handleViewProducts = (bodyPart) => {
    // Map body part to category
    const category = BODY_PART_TO_CATEGORY[bodyPart] || bodyPart;
    const categoryInfo = getCategoryInfo(category);
    
    // If category has subcategories, navigate to subcategory screen
    if (categoryInfo && categoryInfo.subcategories) {
      navigation.navigate('Subcategory', { category: category });
    } else {
      // Otherwise go directly to shop
      navigation.navigate('Shop', { category: category });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Interactive Body Image (Background) */}
      <View style={styles.bodyContainer}>
        <View style={styles.imageWrapper}>
            {/* Full Body Image - body.jpeg (Background with labeled organs) */}
            <Image
              source={require('../../body.jpeg')}
            style={styles.bodyImage}
            resizeMode="cover"
          />
          
          {/* Touchable Areas - positioned relative to image */}
          {/* Hair area - top of head only */}
          <TouchArea 
            part="hair" 
            style={{
              top: '2%',
              left: '33%',
              width: '34%',
              height: '5%',
            }} 
          />

          {/* Brain/Head area (Nootropics) - below hair, on the face/forehead */}
          <TouchArea 
            part="brain" 
            style={{
              top: '7%',
              left: '33%',
              width: '34%',
              height: '8%',
            }} 
          />
          
          {/* Heart/Chest area - moved up to align with actual heart position */}
          <TouchArea 
            part="heart" 
            style={{
              top: '21%',
              left: '40%',
              width: '20%',
              height: '7%',
            }} 
          />
          
          {/* Stomach/Gut area */}
          <TouchArea 
            part="stomach" 
            style={{
              top: '28%',
              left: '35%',
              width: '30%',
              height: '12%',
            }} 
          />
          
          {/* Left Muscle/Arm area */}
          <TouchArea 
            part="muscle" 
            style={{
              top: '16%',
              left: '8%',
              width: '26%',
              height: '22%',
            }} 
          />
          
          {/* Right Muscle/Arm area */}
          <TouchArea 
            part="muscle" 
            style={{
              top: '16%',
              left: '66%',
              width: '26%',
              height: '22%',
            }} 
          />
          
          {/* Sexual/Pelvic area */}
          <TouchArea 
            part="sexual" 
            style={{
              top: '40%',
              left: '38%',
              width: '24%',
              height: '10%',
            }} 
          />
          
          {/* Skin - Legs area */}
          <TouchArea 
            part="skin" 
            style={{
              top: '50%',
              left: '22%',
              width: '56%',
              height: '30%',
            }} 
          />

          {/* === IMAGE LABELS TOUCH AREAS === */}
          {/* Labels from left to right: Stomach, Heart, Gen, Muscle, Sexual, Neurotropics */}
          
          {/* Stomach Label (1st from left) */}
          <TouchableOpacity
            style={[styles.touchArea, { top: '80%', left: '0%', width: '14%', height: '10%' }]}
            onPress={() => handleBodyPartPress('stomach')}
            activeOpacity={0.6}
          />

          {/* Heart Label (2nd from left) */}
          <TouchableOpacity
            style={[styles.touchArea, { top: '80%', left: '14%', width: '14%', height: '10%' }]}
            onPress={() => handleBodyPartPress('heart')}
            activeOpacity={0.6}
          />

          {/* Hair Label (3rd from left - center left) */}
          <TouchableOpacity
            style={[styles.touchArea, { top: '80%', left: '28%', width: '14%', height: '10%' }]}
            onPress={() => handleBodyPartPress('hair')}
            activeOpacity={0.6}
          />

          {/* Skin Label (4th from left) */}
          <TouchableOpacity
            style={[styles.touchArea, { top: '80%', left: '42%', width: '14%', height: '10%' }]}
            onPress={() => handleBodyPartPress('skin')}
            activeOpacity={0.6}
          />

          {/* Muscle Label (5th from left) */}
          <TouchableOpacity
            style={[styles.touchArea, { top: '80%', left: '56%', width: '14%', height: '10%' }]}
            onPress={() => handleBodyPartPress('muscle')}
            activeOpacity={0.6}
          />

          {/* Sexual Health Label (6th from left) */}
          <TouchableOpacity
            style={[styles.touchArea, { top: '80%', left: '70%', width: '14%', height: '10%' }]}
            onPress={() => handleBodyPartPress('sexual')}
            activeOpacity={0.6}
          />

          {/* Nootropics/Brain Label (7th - far right) */}
          <TouchableOpacity
            style={[styles.touchArea, { top: '80%', left: '84%', width: '16%', height: '10%' }]}
            onPress={() => handleBodyPartPress('brain')}
            activeOpacity={0.6}
          />
        </View>
      </View>

      {/* Header Overlay - Removed as per request */}
      
      {/* Body Part Modal */}
      <BodyPartModal
        visible={modalVisible}
        bodyPart={selectedBodyPart}
        onClose={() => setModalVisible(false)}
        onViewProducts={handleViewProducts}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 10,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 5,
    alignItems: 'center',
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#888',
  },
  bodyContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  imageWrapper: {
    flex: 1,
    position: 'relative',
    zIndex: 10,
    backgroundColor: 'transparent',
  },
  bodyImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  touchArea: {
    position: 'absolute',
    zIndex: 20,
    // Debug mode - uncomment to see touch areas
    // backgroundColor: 'rgba(26, 188, 156, 0.25)',
    // borderWidth: 1,
    // borderColor: '#1abc9c',
    // borderRadius: 8,
  },
  glowSpot: {
    position: 'absolute',
    zIndex: 25,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  glowSpotOuter: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: 14,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 8,
  },
  glowSpotCore: {
    width: 10,
    height: 10,
    borderRadius: 5,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 6,
    elevation: 6,
  },
  categoryLabelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 20,
  },
  categoryLabel: {
    alignItems: 'center',
    width: 72,
  },
  categoryCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    marginBottom: 6,
  },
  categoryLabelText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 14,
  },
  // Animation overlay styles
  animationOverlay: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 15,
    pointerEvents: 'none',
  },
  brainGlow: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    backgroundColor: '#E74C3C',
    shadowColor: '#E74C3C',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 10,
  },
  hairGlow: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    backgroundColor: '#8B4513',
    shadowColor: '#D4A574',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 10,
  },
  stomachGlow: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
    backgroundColor: '#27AE60',
    shadowColor: '#27AE60',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 10,
  },
  muscleGlow: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    backgroundColor: '#9B59B6',
    shadowColor: '#9B59B6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 18,
    elevation: 10,
  },
  heartGlowEffect: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    backgroundColor: '#E74C3C',
    shadowColor: '#E74C3C',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 10,
  },
  skinGlowOuter: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    backgroundColor: 'rgba(255, 215, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 15,
  },
  skinGlowInner: {
    width: '50%',
    height: '50%',
    borderRadius: 50,
    backgroundColor: '#FFD700',
    shadowColor: '#FFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 15,
  },
  sexualGlowOuter: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    backgroundColor: 'rgba(255, 105, 180, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF69B4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 25,
    elevation: 15,
  },
  sexualGlowInner: {
    width: '40%',
    height: '60%',
    borderRadius: 50,
    backgroundColor: '#FF69B4',
    shadowColor: '#FFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
});

export default HomeScreen;
