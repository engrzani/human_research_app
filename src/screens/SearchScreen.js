import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Image,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { useCart } from '../context/CartContext';

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [sortBy, setSortBy] = useState('Name');
  const [showFilters, setShowFilters] = useState(false);
  const { addToCart } = useCart();

  // Categories for filter - matching all product categories
  const categories = [
    { id: 'All', name: 'All' },
    { id: 'brain', name: 'Nootropics' },
    { id: 'hair', name: 'Hair' },
    { id: 'fatLoss', name: 'Fat Loss' },
    { id: 'muscle', name: 'Muscle' },
    { id: 'heart', name: 'Endurance/Longevity' },
    { id: 'skin', name: 'Skin' },
    { id: 'sexual', name: 'Sexual Health' },
  ];

  // Get subcategories for selected category
  const subcategories = useMemo(() => {
    if (selectedCategory === 'All' || !CATEGORIES[selectedCategory]) {
      return [];
    }
    const subs = CATEGORIES[selectedCategory]?.subcategories || {};
    return Object.values(subs);
  }, [selectedCategory]);

  // Sort options
  const sortOptions = ['Name', 'Price ↑', 'Price ↓', 'Purity'];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...PRODUCTS];
    
    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    
    // Subcategory filter
    if (selectedSubcategory) {
      filtered = filtered.filter(p => p.subcategory === selectedSubcategory);
    }
    
    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) ||
        (p.description && p.description.toLowerCase().includes(query)) ||
        (p.casNumber && p.casNumber.toLowerCase().includes(query))
      );
    }

    // Sort
    switch (sortBy) {
      case 'Name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Price ↑':
        filtered.sort((a, b) => (a.sizes?.[0]?.price || a.price) - (b.sizes?.[0]?.price || b.price));
        break;
      case 'Price ↓':
        filtered.sort((a, b) => (b.sizes?.[0]?.price || b.price) - (a.sizes?.[0]?.price || a.price));
        break;
      case 'Purity':
        filtered.sort((a, b) => {
          const purityA = parseInt(a.purity) || 0;
          const purityB = parseInt(b.purity) || 0;
          return purityB - purityA;
        });
        break;
    }
    
    return filtered;
  }, [searchQuery, selectedCategory, selectedSubcategory, sortBy]);

  const handleAddToCart = (product) => {
    const productWithSize = {
      ...product,
      selectedSize: product.sizes?.[0]?.size || 'Standard',
      price: product.sizes?.[0]?.price || product.price,
    };
    addToCart(productWithSize);
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity 
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
      activeOpacity={0.8}
    >
      {/* Product Image */}
      <View style={styles.imageContainer}>
        {item.image ? (
          <Image 
            source={{ uri: item.image }} 
            style={styles.productImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholderImage}>
            <Ionicons name="flask" size={40} color="#1abc9c" />
          </View>
        )}
      </View>
      
      {/* Product Info */}
      <View style={styles.productInfo}>
        <View style={styles.productHeader}>
          <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
          {item.purity && (
            <View style={styles.purityBadge}>
              <Text style={styles.purityText}>{item.purity}</Text>
            </View>
          )}
        </View>
        
        {item.casNumber && item.casNumber !== 'N/A' && (
          <Text style={styles.casNumber}>CAS: {item.casNumber}</Text>
        )}
        
        <Text style={styles.productDescription} numberOfLines={2}>
          {item.description || item.whatItIs || 'Research compound for laboratory use.'}
        </Text>
        
        {item.sizes && item.sizes.length > 0 && (
          <Text style={styles.sizesText}>{item.sizes.length} sizes available</Text>
        )}
        
        <View style={styles.priceRow}>
          <View>
            <Text style={styles.fromText}>From</Text>
            <Text style={styles.productPrice}>
              ${item.sizes?.[0]?.price?.toFixed(2) || item.price?.toFixed(2) || '0.00'}
            </Text>
          </View>
          <TouchableOpacity 
            style={styles.viewButton}
            onPress={() => navigation.navigate('ProductDetail', { product: item })}
          >
            <Text style={styles.viewButtonText}>View</Text>
            <Ionicons name="chevron-forward" size={14} color="#1abc9c" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Search</Text>
        <Text style={styles.headerSubtitle}>Find research compounds</Text>
        
        {/* Search Bar */}
        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by compound name or CAS..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#666"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color="#666" />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Ionicons name="options" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Filter Panel */}
      {showFilters && (
        <View style={styles.filterPanel}>
          {/* Category */}
          <Text style={styles.filterLabel}>Category</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.filterScroll}
          >
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.filterChip,
                  selectedCategory === cat.id && styles.filterChipSelected
                ]}
                onPress={() => {
                  setSelectedCategory(cat.id);
                  setSelectedSubcategory(null);
                }}
              >
                <Text style={[
                  styles.filterChipText,
                  selectedCategory === cat.id && styles.filterChipTextSelected
                ]}>
                  {cat.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Subcategory - only show if category has subcategories */}
          {subcategories.length > 0 && (
            <>
              <Text style={styles.filterLabel}>Subcategory</Text>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                style={styles.filterScroll}
              >
                <TouchableOpacity
                  style={[
                    styles.filterChip,
                    !selectedSubcategory && styles.filterChipSelected
                  ]}
                  onPress={() => setSelectedSubcategory(null)}
                >
                  <Text style={[
                    styles.filterChipText,
                    !selectedSubcategory && styles.filterChipTextSelected
                  ]}>
                    All
                  </Text>
                </TouchableOpacity>
                {subcategories.map((sub) => (
                  <TouchableOpacity
                    key={sub.id}
                    style={[
                      styles.filterChip,
                      selectedSubcategory === sub.id && styles.filterChipSelected
                    ]}
                    onPress={() => setSelectedSubcategory(sub.id)}
                  >
                    <Text style={[
                      styles.filterChipText,
                      selectedSubcategory === sub.id && styles.filterChipTextSelected
                    ]}>
                      {sub.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </>
          )}
          
          {/* Sort By */}
          <Text style={styles.filterLabel}>Sort By</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.filterScroll}
          >
            {sortOptions.map((sort) => (
              <TouchableOpacity
                key={sort}
                style={[
                  styles.filterChip,
                  sortBy === sort && styles.filterChipSelected
                ]}
                onPress={() => setSortBy(sort)}
              >
                <Text style={[
                  styles.filterChipText,
                  sortBy === sort && styles.filterChipTextSelected
                ]}>
                  {sort}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Results Count */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsCount}>
          {filteredProducts.length} compounds
        </Text>
      </View>

      {/* Products List */}
      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.productList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={60} color="#444" />
            <Text style={styles.emptyText}>No compounds found</Text>
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
    backgroundColor: '#121212',
  },
  header: {
    padding: 20,
    paddingBottom: 15,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#1abc9c',
    marginBottom: 20,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  searchBox: {
    flex: 1,
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
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#1abc9c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterPanel: {
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  filterLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 10,
    marginTop: 5,
  },
  filterScroll: {
    marginBottom: 10,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#2a2a2a',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  filterChipSelected: {
    backgroundColor: '#1abc9c',
    borderColor: '#1abc9c',
  },
  filterChipText: {
    fontSize: 13,
    color: '#999',
    fontWeight: '500',
  },
  filterChipTextSelected: {
    color: '#fff',
  },
  resultsHeader: {
    paddingHorizontal: 20,
    paddingVertical: 12,
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
  imageContainer: {
    width: '100%',
    height: 180,
    backgroundColor: '#252525',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#252525',
    alignItems: 'center',
    justifyContent: 'center',
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
    marginBottom: 10,
    fontFamily: 'monospace',
  },
  productDescription: {
    fontSize: 14,
    color: '#aaa',
    lineHeight: 20,
    marginBottom: 10,
  },
  sizesText: {
    fontSize: 12,
    color: '#1abc9c',
    marginBottom: 12,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  fromText: {
    fontSize: 11,
    color: '#666',
  },
  productPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
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

export default SearchScreen;
