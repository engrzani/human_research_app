import React, { useState, useMemo, memo, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Animated,
  Easing,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { PRODUCTS, CATEGORIES } from '../data/products';

// Animated product card component
const ProductItem = memo(({ item, navigation, index }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Staggered entrance animation
    const delay = Math.min(index * 80, 400);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 350,
        delay,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        delay,
        useNativeDriver: true,
        easing: Easing.out(Easing.back(1.2)),
      }),
    ]).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      friction: 8,
      tension: 200,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      tension: 150,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [
          { translateY: slideAnim },
          { scale: scaleAnim },
        ],
      }}
    >
      <TouchableOpacity 
        style={styles.productCard}
        onPress={() => navigation.navigate('ProductDetail', { product: item })}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        {/* Product Info */}
        <View style={styles.productInfo}>
          <View style={styles.productHeader}>
            <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
          </View>
          
          {item.casNumber && item.casNumber !== 'N/A' && (
            <Text style={styles.casNumber}>CAS: {item.casNumber}</Text>
          )}
          
          <Text style={styles.productDescription} numberOfLines={2}>
            {item.description || item.whatItIs || 'Research compound for laboratory use.'}
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
    </Animated.View>
  );
});

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [sortBy, setSortBy] = useState('Name');
  const [showFilters, setShowFilters] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  // Categories for filter - matching all product categories
  const categories = [
    { id: 'All', name: ' All', emoji: '' },
    { id: 'brain', name: ' Nootropics', emoji: '' },
    { id: 'hair', name: ' Hair', emoji: '' },
    { id: 'fatLoss', name: ' Fat Loss', emoji: '' },
    { id: 'muscle', name: ' Muscle', emoji: '' },
    { id: 'heart', name: ' Longevity', emoji: '' },
    { id: 'skin', name: ' Skin', emoji: '' },
    { id: 'sexual', name: ' Sexual Health', emoji: '' },
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
  const sortOptions = ['Name'];

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
    }
    
    return filtered;
  }, [searchQuery, selectedCategory, selectedSubcategory, sortBy]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
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
            onPress={() => setShowCategories(!showCategories)}
          >
            <Ionicons name="options" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        {showCategories && (
          <>
            <Text style={styles.quickLabel}>Categories</Text>
            <View style={styles.categoryGrid}>
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  style={[
                    styles.categoryChip,
                    selectedCategory === cat.id && styles.categoryChipSelected
                  ]}
                  onPress={() => {
                    setSelectedCategory(cat.id);
                    setSelectedSubcategory(null);
                  }}
                  activeOpacity={0.8}
                >
                  <Text style={[
                    styles.categoryChipText,
                    selectedCategory === cat.id && styles.categoryChipTextSelected
                  ]}>
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}
      </View>

      {/* Filter Panel */}
      {showFilters && (
        <View style={styles.filterPanel}>
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
        renderItem={({ item, index }) => <ProductItem item={item} navigation={navigation} index={index} />}
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
    backgroundColor: '#000000',
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
  quickLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 16,
    marginBottom: 8,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    backgroundColor: '#2a2a2a',
    borderWidth: 1,
    borderColor: '#333',
  },
  categoryChipSelected: {
    backgroundColor: '#1abc9c',
    borderColor: '#1abc9c',
  },
  categoryChipText: {
    fontSize: 13,
    color: '#999',
    fontWeight: '500',
  },
  categoryChipTextSelected: {
    color: '#fff',
  },
  quickCategoryScroll: {
    marginHorizontal: -4,
  },
  quickCategoryContent: {
    paddingHorizontal: 4,
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
