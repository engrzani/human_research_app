import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Animated,
  Easing,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';
import BeakerIcon from '../components/BeakerIcon';

const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const { addToCart, cartItems, removeFromCart } = useCart();
  const [isSaved, setIsSaved] = useState(false);
  
  // Animation refs
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const beakerAnim = useRef(new Animated.Value(1)).current;
  const beakerLiftAnim = useRef(new Animated.Value(0)).current;
  const beakerRotateAnim = useRef(new Animated.Value(0)).current;
  
  // Section entrance animations
  const headerFade = useRef(new Animated.Value(0)).current;
  const headerSlide = useRef(new Animated.Value(-20)).current;
  const section1Fade = useRef(new Animated.Value(0)).current;
  const section1Slide = useRef(new Animated.Value(30)).current;
  const section2Fade = useRef(new Animated.Value(0)).current;
  const section2Slide = useRef(new Animated.Value(30)).current;
  const section3Fade = useRef(new Animated.Value(0)).current;
  const section3Slide = useRef(new Animated.Value(30)).current;
  const buttonFade = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    setIsSaved(cartItems.some(item => item.id === product.id));
  }, [cartItems, product.id]);
  
  // Run entrance animations on mount
  useEffect(() => {
    // Header animation
    Animated.parallel([
      Animated.timing(headerFade, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(headerSlide, {
        toValue: 0,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
    
    // Staggered section animations
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(section1Fade, { toValue: 1, duration: 350, useNativeDriver: true }),
        Animated.spring(section1Slide, { toValue: 0, friction: 8, useNativeDriver: true }),
      ]).start();
    }, 100);
    
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(buttonFade, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.spring(buttonScale, { toValue: 1, friction: 6, useNativeDriver: true }),
      ]).start();
    }, 200);
    
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(section2Fade, { toValue: 1, duration: 350, useNativeDriver: true }),
        Animated.spring(section2Slide, { toValue: 0, friction: 8, useNativeDriver: true }),
      ]).start();
    }, 300);
    
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(section3Fade, { toValue: 1, duration: 350, useNativeDriver: true }),
        Animated.spring(section3Slide, { toValue: 0, friction: 8, useNativeDriver: true }),
      ]).start();
    }, 400);
  }, []);

  const triggerSaveAnimation = () => {
    // Scale bounce animation
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.16,
        duration: 95,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1.24,
        duration: 75,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.96,
        duration: 70,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 145,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.sequence([
      Animated.timing(beakerAnim, {
        toValue: 1.5,
        duration: 95,
        useNativeDriver: true,
      }),
      Animated.timing(beakerAnim, {
        toValue: 0.9,
        duration: 70,
        useNativeDriver: true,
      }),
      Animated.timing(beakerAnim, {
        toValue: 1.18,
        duration: 65,
        useNativeDriver: true,
      }),
      Animated.spring(beakerAnim, {
        toValue: 1,
        friction: 5,
        tension: 170,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.sequence([
      Animated.timing(beakerLiftAnim, {
        toValue: -4,
        duration: 95,
        useNativeDriver: true,
      }),
      Animated.spring(beakerLiftAnim, {
        toValue: 0,
        friction: 5,
        tension: 130,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.sequence([
      Animated.timing(beakerRotateAnim, {
        toValue: 1,
        duration: 45,
        useNativeDriver: true,
      }),
      Animated.timing(beakerRotateAnim, {
        toValue: -1,
        duration: 45,
        useNativeDriver: true,
      }),
      Animated.timing(beakerRotateAnim, {
        toValue: 0,
        duration: 45,
        useNativeDriver: true,
      }),
    ]).start();
    
    // Bounce animation for indicator
    Animated.sequence([
      Animated.timing(bounceAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.spring(bounceAnim, {
        toValue: 0,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleToggleSave = () => {
    if (isSaved) {
      removeFromCart(product.id);
      setIsSaved(false);
    } else {
      addToCart(product);
      setIsSaved(true);
      triggerSaveAnimation();
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Product Header */}
        <Animated.View 
          style={[
            styles.headerContainer,
            { 
              opacity: headerFade,
              transform: [{ translateY: headerSlide }],
            }
          ]}
        >
          <Text style={styles.productName}>{product.name}</Text>
          {product.casNumber && product.casNumber !== 'N/A' && (
            <Text style={styles.casNumber}>CAS: {product.casNumber}</Text>
          )}
        </Animated.View>

        {/* Research Disclaimer Banner */}
        <Animated.View 
          style={[
            styles.disclaimerBanner,
            {
              opacity: section1Fade,
              transform: [{ translateY: section1Slide }],
            }
          ]}
        >
          <Text style={styles.disclaimerText}>
            For laboratory research use only. Not for human or veterinary use.
          </Text>
        </Animated.View>

        {/* Research Description Title */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Research Description</Text>
        </View>

        {/* Save to Research List Button */}
        <Animated.View 
          style={{ 
            transform: [{ scale: scaleAnim }],
            opacity: buttonFade,
          }}
        >
          <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
            <TouchableOpacity 
              style={[styles.saveButton, isSaved && styles.saveButtonActive]}
              onPress={handleToggleSave}
              activeOpacity={0.7}
            >
              <Animated.View
                style={{
                  transform: [
                    { scale: beakerAnim },
                    { translateY: beakerLiftAnim },
                    {
                      rotate: beakerRotateAnim.interpolate({
                        inputRange: [-1, 0, 1],
                        outputRange: ['-8deg', '0deg', '8deg'],
                      }),
                    },
                  ],
                }}
              >
                <BeakerIcon
                  size={20}
                  fillLevel={isSaved ? 0.75 : 0.45}
                  liquidColor="#1abc9c"
                />
              </Animated.View>
              <Ionicons 
                name={isSaved ? "checkbox" : "square-outline"} 
                size={20} 
                color={isSaved ? "#1abc9c" : "#888"} 
              />
              <Text style={[styles.saveButtonText, isSaved && styles.saveButtonTextActive]}>
                Save to Research List
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>

        {/* Research Description Content */}
        <Animated.View 
          style={[
            styles.sectionContainer,
            {
              opacity: section2Fade,
              transform: [{ translateY: section2Slide }],
            }
          ]}
        >
          <Text style={styles.sectionSubtitle}>Research Description</Text>
          {product.researchDescription ? (
            <Text style={styles.sectionText}>{product.researchDescription}</Text>
          ) : product.whatItIs ? (
            <Text style={styles.sectionText}>{product.whatItIs}</Text>
          ) : (
            <Text style={styles.sectionText}>
              {product.name} is a naturally occurring compound that has been studied in experimental models for its interaction with various biological pathways. Research has examined its role in cellular processes within laboratory settings.
            </Text>
          )}
        </Animated.View>

        {/* Mechanism / Pathway */}
        <Animated.View 
          style={[
            styles.sectionContainer,
            {
              opacity: section3Fade,
              transform: [{ translateY: section3Slide }],
            }
          ]}
        >
          <Text style={styles.sectionSubtitle}>Mechanism / Pathway (Research Context)</Text>
          {product.mechanism && product.mechanism.length > 0 ? (
            product.mechanism.map((item, index) => (
              <View key={index} style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>{item}</Text>
              </View>
            ))
          ) : (
            <>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>Cellular signaling (experimental)</Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>Molecular pathway interaction</Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>Receptor binding studies</Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>In vitro research applications</Text>
              </View>
            </>
          )}
        </Animated.View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Saved Indicator at Bottom */}
      {isSaved && (
        <Animated.View 
          style={[
            styles.savedIndicator,
            {
              transform: [
                {
                  translateY: bounceAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -10],
                  }),
                },
              ],
            },
          ]}
        >
          <Ionicons name="checkmark-circle" size={18} color="#1abc9c" />
          <Text style={styles.savedIndicatorText}>Saved to Research List</Text>
        </Animated.View>
      )}
    </SafeAreaView>
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
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
  },
  productName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  casNumber: {
    fontSize: 13,
    color: '#888',
    fontFamily: 'monospace',
  },
  disclaimerBanner: {
    backgroundColor: '#1e1e1e',
    marginHorizontal: 20,
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#1abc9c',
  },
  disclaimerText: {
    fontSize: 12,
    color: '#aaa',
    lineHeight: 18,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1abc9c',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    marginHorizontal: 20,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 10,
  },
  saveButtonActive: {
    backgroundColor: 'rgba(26, 188, 156, 0.15)',
    borderWidth: 1,
    borderColor: '#1abc9c',
  },
  saveButtonText: {
    fontSize: 15,
    color: '#888',
    fontWeight: '500',
  },
  saveButtonTextActive: {
    color: '#1abc9c',
  },
  sectionContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1abc9c',
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 22,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bulletPoint: {
    fontSize: 14,
    color: '#1abc9c',
    marginRight: 10,
    marginTop: 0,
  },
  bulletText: {
    flex: 1,
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
  },
  bottomSpacer: {
    height: 80,
  },
  savedIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(26, 188, 156, 0.15)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: '#1abc9c',
  },
  savedIndicatorText: {
    fontSize: 14,
    color: '#1abc9c',
    fontWeight: '600',
  },
});

export default ProductDetailScreen;
