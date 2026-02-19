import React, { useState, useEffect, memo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { PRODUCTS, getProductsByCategory, getCategoryInfo } from '../data/products';
import { useCart } from '../context/CartContext';

const ProductItem = memo(({ item, navigation }) => (
  <TouchableOpacity
    style={styles.productCard}
    onPress={() => navigation.navigate('ProductDetail', { product: item })}
    activeOpacity={0.8}
  >
    <View style={styles.productInfo}>
      <View style={styles.productHeader}>
        <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
      </View>
      
      {item.casNumber && item.casNumber !== 'N/A' && (
        <Text style={styles.casNumber}>CAS: {item.casNumber}</Text>
      )}
      
      <Text style={styles.productDescription} numberOfLines={2}>
        {item.description}
      </Text>
      
      <View style={styles.viewRow}>
        <TouchableOpacity 
          style={styles.viewButton}
          onPress={() => navigation.navigate('ProductDetail', { product: item })}
        >
          <Text style={styles.viewButtonText}>Learn More</Text>
          <Ionicons name="chevron-forward" size={14} color="#1abc9c" />
        </TouchableOpacity>
      </View>
    </View>
  </TouchableOpacity>
));

const ShopScreen = ({ navigation, route }) => {
  const { category, subcategory } = route.params || {};
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart, cartItemCount } = useCart();
  const categoryInfo = category ? getCategoryInfo(category) : null;

  useEffect(() => {
    const filteredProducts = category 
      ? getProductsByCategory(category, subcategory)
      : PRODUCTS;
    setProducts(filteredProducts);
  }, [category, subcategory]);

  const handleSearch = (text) => {
    setSearchQuery(text);
    const baseProducts = category 
      ? getProductsByCategory(category, subcategory)
      : PRODUCTS;
    const filtered = baseProducts.filter(product =>
      product.name.toLowerCase().includes(text.toLowerCase()) ||
      product.description.toLowerCase().includes(text.toLowerCase()) ||
      (product.casNumber && product.casNumber.toLowerCase().includes(text.toLowerCase()))
    );
    setProducts(filtered);
  };

  const getSubcategoryName = () => {
    if (!subcategory || !categoryInfo?.subcategories) return null;
    return categoryInfo.subcategories[subcategory]?.name;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>
              {categoryInfo ? categoryInfo.name : 'All Products'}
            </Text>
            {getSubcategoryName() && (
              <Text style={styles.headerSubtitle}>{getSubcategoryName()}</Text>
            )}
          </View>
          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => navigation.navigate('CartTab')}
          >
            <Ionicons name="flask" size={22} color="#fff" />
            {cartItemCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartItemCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        
        {/* Search Bar */}
        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search compounds..."
            value={searchQuery}
            onChangeText={handleSearch}
            placeholderTextColor="#666"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => handleSearch('')}>
              <Ionicons name="close-circle" size={20} color="#666" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Results Count */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsCount}>
          {products.length} compounds
        </Text>
      </View>

      {/* Products List */}
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductItem item={item} navigation={navigation} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.productList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="flask-outline" size={60} color="#444" />
            <Text style={styles.emptyText}>No products found</Text>
            <Text style={styles.emptySubtext}>Try a different search term</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    padding: 20,
    paddingBottom: 15,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#1abc9c',
    marginTop: 4,
  },
  cartButton: {
    backgroundColor: '#1abc9c',
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#e74c3c',
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 48,
    borderWidth: 1,
    borderColor: '#333',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#fff',
  },
  resultsHeader: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  resultsCount: {
    fontSize: 13,
    color: '#1abc9c',
    fontWeight: '500',
  },
  productList: {
    paddingHorizontal: 15,
    paddingBottom: 100,
  },
  productCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: 16,
    marginBottom: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  productInfo: {
    padding: 16,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  productName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    flex: 1,
  },
  purityBadge: {
    backgroundColor: '#1abc9c',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 10,
  },
  purityText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '700',
  },
  casNumber: {
    fontSize: 12,
    color: '#888',
    marginBottom: 8,
    fontFamily: 'monospace',
  },
  productDescription: {
    fontSize: 14,
    color: '#aaa',
    lineHeight: 20,
    marginBottom: 8,
  },
  viewRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewButtonText: {
    fontSize: 14,
    color: '#1abc9c',
    fontWeight: '600',
    marginRight: 4,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 15,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#444',
    marginTop: 5,
  },
});

export default ShopScreen;
