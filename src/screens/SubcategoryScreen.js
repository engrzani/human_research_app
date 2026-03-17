import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Animated,
  Easing,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { getCategoryInfo, getProductsBySubcategory } from '../data/products';

const CATEGORY_IMAGES = {
  brain: require('../../assets/Group 93.png'),
  hair: require('../../assets/Group 94.png'),
  muscle: require('../../assets/Group 95.png'),
  heart: require('../../assets/Group 96.png'),
  skin: require('../../assets/Group 97.png'),
  fatLoss: require('../../assets/Group 98.png'),
  sexual: require('../../assets/Group 99.png'),
};

const SubcategoryScreen = ({ route, navigation }) => {
  const { category } = route.params;
  const categoryInfo = getCategoryInfo(category);

  // If no subcategories, go straight to Shop
  useEffect(() => {
    if (!categoryInfo || !categoryInfo.subcategories) {
      navigation.replace('Shop', { category });
    }
  }, [categoryInfo]);

  const subcategoryKeys = categoryInfo?.subcategories
    ? Object.keys(categoryInfo.subcategories)
    : [];

  // Staggered card entrance animations
  const cardAnims = useRef(subcategoryKeys.map(() => new Animated.Value(0))).current;
  const cardSlides = useRef(subcategoryKeys.map(() => new Animated.Value(30))).current;

  useEffect(() => {
    if (subcategoryKeys.length > 0) {
      const animations = subcategoryKeys.map((_, i) =>
        Animated.parallel([
          Animated.timing(cardAnims[i], {
            toValue: 1,
            duration: 350,
            delay: i * 100,
            useNativeDriver: true,
            easing: Easing.out(Easing.ease),
          }),
          Animated.timing(cardSlides[i], {
            toValue: 0,
            duration: 400,
            delay: i * 100,
            useNativeDriver: true,
            easing: Easing.out(Easing.back(1.2)),
          }),
        ])
      );
      Animated.stagger(50, animations).start();
    }
  }, []);

  const handleSubcategoryPress = (subcategoryKey) => {
    navigation.navigate('Shop', {
      category,
      subcategory: subcategoryKey,
    });
  };

  const getProductCount = (subcategoryKey) => {
    return getProductsBySubcategory(category, subcategoryKey).length;
  };

  const categoryImage = CATEGORY_IMAGES[category];

  const getSubcategoryIcon = (key) => {
    const icons = {
      // Brain
      focusLearning: 'bulb-outline',
      moodStress: 'happy-outline',
      neuroprotection: 'shield-checkmark-outline',
      // Muscle
      growthHormone: 'trending-up-outline',
      recovery: 'medkit-outline',
      directGrowth: 'barbell-outline',
      // Heart
      endurance: 'flash-outline',
      longevity: 'time-outline',
      // Skin
      skinHealth: 'sparkles-outline',
      tanning: 'sunny-outline',
      // Hair
      hairGrowth: 'leaf-outline',
      // Fat Loss
      metabolic: 'flame-outline',
      // Sexual
      sexualHealth: 'heart-outline',
    };
    return icons[key] || 'flask-outline';
  };

  if (!categoryInfo || subcategoryKeys.length === 0) {
    return null;
  }



  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            {categoryImage ? (
              <Image source={categoryImage} style={styles.categoryImage} resizeMode="contain" />
            ) : (
              <Ionicons name="flask" size={32} color="#1abc9c" />
            )}
          </View>
          <Text style={styles.title}>{categoryInfo.name}</Text>
          <Text style={styles.description}>{categoryInfo.description}</Text>
        </View>

        {/* Subcategory Cards */}
        <View style={styles.cardsContainer}>
          <Text style={styles.sectionLabel}>Select a Category</Text>

          {subcategoryKeys.map((key, index) => {
            const subcat = categoryInfo.subcategories[key];
            const count = getProductCount(key);
            const icon = getSubcategoryIcon(key);

            return (
              <Animated.View
                key={key}
                style={{
                  opacity: cardAnims[index] || 1,
                  transform: [{ translateY: cardSlides[index] || 0 }],
                }}
              >
                <TouchableOpacity
                  style={styles.subcategoryCard}
                  onPress={() => handleSubcategoryPress(key)}
                  activeOpacity={0.7}
                >
                  <View style={styles.cardIconContainer}>
                    <Ionicons name={icon} size={24} color="#1abc9c" />
                  </View>
                  <View style={styles.cardContent}>
                    <View style={styles.cardTitleRow}>
                      <Text style={styles.cardTitle}>{subcat.name}</Text>
                      <View style={styles.countBadge}>
                        <Text style={styles.countText}>{count}</Text>
                      </View>
                    </View>
                    <Text style={styles.cardDescription} numberOfLines={2}>
                      {subcat.description}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={22} color="#555" />
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
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
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(26, 188, 156, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  categoryImage: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#888',
    lineHeight: 20,
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  cardsContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#555',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 14,
    paddingHorizontal: 4,
  },
  subcategoryCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  cardIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(26, 188, 156, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  cardContent: {
    flex: 1,
    paddingRight: 8,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
    flex: 1,
  },
  countBadge: {
    backgroundColor: 'rgba(26, 188, 156, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 8,
  },
  countText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1abc9c',
  },
  cardDescription: {
    fontSize: 13,
    color: '#888',
    lineHeight: 18,
  },
});

export default SubcategoryScreen;
