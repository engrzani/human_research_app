import React, { useState, useRef, useEffect, useCallback } from 'react';
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
} from 'react-native';
import { useCart } from '../context/CartContext';
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

// Full body images with highlight (replace body_figma.png when label tapped)
const BODY_FULL_IMAGES = {
  stomach: require('../../assets/body_full_stomach.png'),
  sexual: require('../../assets/body_full_sexual.png'),
  brain: require('../../assets/body_full_brain.png'),
  muscle: require('../../assets/body_full_muscle.png'),
  heart: require('../../assets/body_full_heart.png'),
  hair: require('../../assets/body_full_hair.png'),
  skin: require('../../assets/body_full_skin.png'),
};

// Figma group overlay images (contain highlight + info card)
const BODY_OVERLAY_IMAGES = {
  brain: require('../../assets/body_brain.png'),
  hair: require('../../assets/body_hair.png'),
  muscle: require('../../assets/body_muscle.png'),
  heart: require('../../assets/Group 101.png'),
  skin: require('../../assets/group74.png'),
  stomach: require('../../assets/body_stomach.png'),
  sexual: require('../../assets/body_sexual.png'),
};

// Label order matching Figma Group 87 left-to-right
const LABELS = [
  { key: 'brain', label: 'Nootropics' },
  { key: 'hair', label: 'Hair' },
  { key: 'muscle', label: 'Muscle' },
  { key: 'heart', label: 'Heart' },
  { key: 'skin', label: 'Skin' },
  { key: 'stomach', label: 'Fat Loss' },
  { key: 'sexual', label: 'Sexual Health' },
];

const HomeScreen = () => {
  const navigation = useNavigation();
  const { cartItemCount } = useCart();
  const [selectedBodyPart, setSelectedBodyPart] = useState(null);

  // Overlay fade animation
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  // Body image crossfade for smooth transitions
  const bodyFadeAnim = useRef(new Animated.Value(1)).current;
  // Selected label glow animation
  const labelGlowAnim = useRef(new Animated.Value(0)).current;

  // Label pop-hint animations (one per label)
  const labelAnims = useRef(LABELS.map(() => new Animated.Value(1))).current;

  // On mount: play a continuous staggered pulse on each label to hint interactivity
  useEffect(() => {
    const loopAnims = LABELS.map((_, i) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(i * 180),
          Animated.timing(labelAnims[i], {
            toValue: 1.15,
            duration: 500,
            easing: Easing.out(Easing.back(2)),
            useNativeDriver: true,
          }),
          Animated.timing(labelAnims[i], {
            toValue: 1,
            duration: 500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.delay(2500),
        ])
      );
    });
    const timeout = setTimeout(() => {
      loopAnims.forEach(a => a.start());
    }, 600);
    return () => {
      clearTimeout(timeout);
      loopAnims.forEach(a => a.stop());
    };
  }, []);

  // Animate overlay + body crossfade when a body part is selected
  useEffect(() => {
    if (selectedBodyPart) {
      overlayOpacity.setValue(0);
      bodyFadeAnim.setValue(0.7);
      Animated.parallel([
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 350,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(bodyFadeAnim, {
          toValue: 1,
          duration: 250,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(labelGlowAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(labelGlowAnim, {
            toValue: 0.6,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    } else {
      labelGlowAnim.setValue(0);
    }
  }, [selectedBodyPart]);

  const handleLabelPress = useCallback((bodyPart) => {
    if (selectedBodyPart === bodyPart) {
      // Deselect: fade out overlay + body, then clear state
      Animated.parallel([
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(bodyFadeAnim, {
          toValue: 0.7,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        bodyFadeAnim.setValue(1);
        setSelectedBodyPart(null);
      });
      return;
    }
    if (selectedBodyPart) {
      // Switching body parts: quick crossfade out, swap, then fade in
      Animated.parallel([
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(bodyFadeAnim, {
          toValue: 0.7,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start(() => setSelectedBodyPart(bodyPart));
    } else {
      // First selection
      setSelectedBodyPart(bodyPart);
    }
  }, [selectedBodyPart, overlayOpacity, bodyFadeAnim]);

  const handleOverlayPress = () => {
    if (!selectedBodyPart) return;
    const category = BODY_PART_TO_CATEGORY[selectedBodyPart] || selectedBodyPart;
    // Always go to SubcategoryScreen first — it will auto-redirect to Shop
    // for categories with only one subcategory (hair, fatLoss, sexual)
    navigation.navigate('Subcategory', { category });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Body Image */}
      <View style={styles.bodyContainer}>
        <View style={styles.imageWrapper}>
          <Animated.Image
            source={
              selectedBodyPart && BODY_FULL_IMAGES[selectedBodyPart]
                ? BODY_FULL_IMAGES[selectedBodyPart]
                : require('../../assets/body_figma.png')
            }
            style={[styles.bodyImage, { opacity: bodyFadeAnim }]}
            resizeMode="contain"
          />

          {/* Figma group overlay — shows highlight + card */}
          {selectedBodyPart && BODY_OVERLAY_IMAGES[selectedBodyPart] && (
            <TouchableOpacity
              style={styles.overlayContainer}
              onPress={handleOverlayPress}
              activeOpacity={0.9}
            >
              <Animated.View style={[styles.overlayInner, { opacity: overlayOpacity }]}>
                <Image
                  source={BODY_OVERLAY_IMAGES[selectedBodyPart]}
                  style={styles.overlayImage}
                  resizeMode="stretch"
                />
                <View style={styles.tapExploreRow}>
                  <Text style={styles.tapExploreText}>Tap to explore compounds.</Text>
                  <Text style={styles.tapExploreChevron}>›</Text>
                </View>
              </Animated.View>
            </TouchableOpacity>
          )}
        </View>

        {/* Label row — Figma Group 87 image with invisible tap overlays */}
        <View style={styles.labelRow}>
          <Image
            source={require('../../assets/labels_row.png')}
            style={styles.labelRowImage}
            resizeMode="stretch"
          />
          <View style={styles.labelTapOverlay}>
            {LABELS.map((label, index) => {
              const isSelected = selectedBodyPart === label.key;
              return (
                <Animated.View
                  key={`label-${label.key}`}
                  style={[
                    styles.labelTapArea,
                    { transform: [{ scale: isSelected ? 1.15 : labelAnims[index] }] },
                  ]}
                >
                  <TouchableOpacity
                    style={[
                      styles.labelTapButton,
                      isSelected && styles.labelTapButtonSelected,
                    ]}
                    onPress={() => handleLabelPress(label.key)}
                    activeOpacity={0.7}
                  >
                    {isSelected && (
                      <Animated.View
                        style={[
                          styles.labelSelectedGlow,
                          { opacity: labelGlowAnim },
                        ]}
                      />
                    )}
                  </TouchableOpacity>
                </Animated.View>
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  bodyContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 50 : (StatusBar.currentHeight || 24),
    overflow: 'hidden',
  },
  imageWrapper: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  bodyImage: {
    width: screenWidth * 0.92,
    height: screenHeight * 0.65,
    maxHeight: screenHeight * 0.65,
  },
  overlayContainer: {
    position: 'absolute',
    bottom: '5%',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  overlayInner: {
    width: screenWidth,
    aspectRatio: 1152 / 541,
  },
  overlayImage: {
    width: '100%',
    height: '100%',
  },
  tapExploreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  tapExploreText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '400',
    letterSpacing: 0.5,
  },
  tapExploreChevron: {
    color: '#FFFFFF',
    fontSize: 26,
    marginLeft: 4,
    marginTop: -2,
  },
  labelRow: {
    position: 'relative',
    width: screenWidth,
    aspectRatio: 1183 / 245,
    backgroundColor: 'rgba(0,0,0,0.85)',
  },
  labelRowImage: {
    width: '100%',
    height: '100%',
  },
  labelTapOverlay: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 2,
  },
  labelTapArea: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelTapButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelTapButtonSelected: {
    backgroundColor: 'rgba(26, 188, 156, 0.35)',
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: '#1abc9c',
  },
  labelSelectedGlow: {
    position: 'absolute',
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(26, 188, 156, 0.15)',
  },
});

export default HomeScreen;
