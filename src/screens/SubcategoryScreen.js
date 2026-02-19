import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { getCategoryInfo, getProductsByCategory, getProductsBySubcategory } from '../data/products';

const SubcategoryScreen = ({ route, navigation }) => {
  const { category } = route.params;
  const categoryInfo = getCategoryInfo(category);

  if (!categoryInfo || !categoryInfo.subcategories) {
    navigation.navigate('Shop', { category });
    return null;
  }

  const handleSubcategoryPress = (subcategoryKey) => {
    navigation.navigate('Shop', { 
      category, 
      subcategory: subcategoryKey 
    });
  };

  const getProductCount = (subcategoryKey) => {
    const products = getProductsBySubcategory(category, subcategoryKey);
    return products.length;
  };

  const getTotalProducts = () => {
    const products = getProductsByCategory(category);
    return products.length;
  };

  const getCategoryVisual = () => {
    const visuals = {
      brain: { emoji: '🧠' },
      hair: { emoji: '💇' },
      fatLoss: { icon: 'fitness' },
      muscle: { emoji: '💪' },
      heart: { emoji: '❤️' },
      skin: { icon: 'sparkles' },
      sexual: { icon: 'heart-circle' },
    };
    return visuals[category] || { icon: 'flask' };
  };

  const categoryVisual = getCategoryVisual();

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            {categoryVisual.emoji ? (
              <Text style={styles.emojiIcon}>{categoryVisual.emoji}</Text>
            ) : (
              <Ionicons name={categoryVisual.icon} size={32} color="#1abc9c" />
            )}
          </View>
          <Text style={styles.title}>{categoryInfo.name}</Text>
          <Text style={styles.description}>{categoryInfo.description}</Text>
        </View>

        {/* Subcategories List */}
        <View style={styles.listContainer}>
          {Object.entries(categoryInfo.subcategories).map(([key, subcat]) => (
            <TouchableOpacity
              key={key}
              style={styles.subcategoryItem}
              onPress={() => handleSubcategoryPress(key)}
              activeOpacity={0.7}
            >
              <View style={styles.subcategoryContent}>
                <Text style={styles.subcategoryName}>{subcat.name}</Text>
                <Text style={styles.subcategoryDescription} numberOfLines={2}>
                  {subcat.description}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={22} color="#666" />
            </TouchableOpacity>
          ))}
        </View>
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
    paddingBottom: 30,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(26, 188, 156, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emojiIcon: {
    fontSize: 30,
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
    paddingHorizontal: 20,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 30,
  },
  subcategoryItem: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  subcategoryContent: {
    flex: 1,
    paddingRight: 10,
  },
  subcategoryName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  subcategoryDescription: {
    fontSize: 13,
    color: '#888',
    lineHeight: 18,
  },
});

export default SubcategoryScreen;
