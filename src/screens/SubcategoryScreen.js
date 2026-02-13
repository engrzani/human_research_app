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

  const getIconForCategory = () => {
    const icons = {
      brain: 'brain',
      hair: 'leaf',
      fatLoss: 'fitness',
      muscle: 'barbell',
      heart: 'heart',
      skin: 'sparkles',
      sexual: 'heart-circle',
    };
    return icons[category] || 'flask';
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons name={getIconForCategory()} size={40} color="#1abc9c" />
          </View>
          <Text style={styles.title}>{categoryInfo.name}</Text>
          <Text style={styles.description}>{categoryInfo.description}</Text>
          <Text style={styles.productCount}>{getTotalProducts()} compounds available</Text>
        </View>

        {/* Subcategories */}
        <View style={styles.subcategoriesContainer}>
          <Text style={styles.sectionTitle}>Categories</Text>
          
          {Object.entries(categoryInfo.subcategories).map(([key, subcat]) => (
            <TouchableOpacity
              key={key}
              style={styles.subcategoryCard}
              onPress={() => handleSubcategoryPress(key)}
              activeOpacity={0.7}
            >
              <View style={styles.subcategoryContent}>
                <Text style={styles.subcategoryName}>{subcat.name}</Text>
                <Text style={styles.subcategoryDescription} numberOfLines={2}>
                  {subcat.description}
                </Text>
                <Text style={styles.subcategoryCount}>
                  {getProductCount(key)} compounds
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#1abc9c" />
            </TouchableOpacity>
          ))}

          {/* View All Button */}
          <TouchableOpacity
            style={styles.viewAllButton}
            onPress={() => navigation.navigate('Shop', { category })}
            activeOpacity={0.7}
          >
            <Text style={styles.viewAllText}>View All {categoryInfo.name}</Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    padding: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1a3a2e',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#999',
    lineHeight: 22,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  productCount: {
    fontSize: 13,
    color: '#1abc9c',
    marginTop: 12,
    fontWeight: '500',
  },
  subcategoriesContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#888',
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  subcategoryCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  subcategoryContent: {
    flex: 1,
  },
  subcategoryName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 6,
  },
  subcategoryDescription: {
    fontSize: 13,
    color: '#888',
    lineHeight: 19,
    marginBottom: 8,
  },
  subcategoryCount: {
    fontSize: 12,
    color: '#1abc9c',
    fontWeight: '500',
  },
  viewAllButton: {
    backgroundColor: '#1abc9c',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  viewAllText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginRight: 8,
  },
});

export default SubcategoryScreen;
