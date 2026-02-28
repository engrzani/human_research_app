import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Linking,
  Modal,
  Animated,
  Easing,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';
import { useNavigation } from '@react-navigation/native';
import BeakerIcon from '../components/BeakerIcon';

// Animated cart item component
const AnimatedCartItem = ({ item, index, onRemove, onLearnMore, getCategoryLabel }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const delay = Math.min(index * 100, 300);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        delay,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 450,
        delay,
        useNativeDriver: true,
        easing: Easing.out(Easing.back(1.3)),
      }),
    ]).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      friction: 8,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  };



  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [
          { translateX: slideAnim },
          { scale: scaleAnim },
        ],
      }}
    >
      <TouchableOpacity
        style={styles.cartItem}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        {/* Remove button - top right corner */}
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => onRemove(item.id)}
          activeOpacity={0.7}
        >
          <Ionicons name="remove-circle" size={22} color="#ff7675" />
        </TouchableOpacity>

        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{item.name}</Text>
          {item.casNumber && item.casNumber !== 'N/A' && (
            <Text style={styles.casNumber}>CAS: {item.casNumber}</Text>
          )}
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{getCategoryLabel(item)}</Text>
          </View>
        </View>
        
        <TouchableOpacity
          style={styles.learnMoreButton}
          onPress={() => onLearnMore(item)}
          activeOpacity={0.7}
        >
          <Text style={styles.learnMoreText}>Learn More</Text>
          <Ionicons name="chevron-forward" size={16} color="#1abc9c" />
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
};

const CartScreen = () => {
  const navigation = useNavigation();
  const { cartItems, removeFromCart, removeOneFromCart, addToCart } = useCart();
  const [showExternalModal, setShowExternalModal] = useState(false);
  
  // Header animation
  const headerFade = useRef(new Animated.Value(0)).current;
  const headerSlide = useRef(new Animated.Value(-20)).current;
  
  useEffect(() => {
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
  }, []);

  const handleLearnMore = (item) => {
    navigation.navigate('ProductDetail', { product: item });
  };

  const handleOpenExternalSources = () => {
    setShowExternalModal(true);
  };

  const confirmOpenExternal = () => {
    setShowExternalModal(false);
    // Open external research sources
    Linking.openURL('https://pubmed.ncbi.nlm.nih.gov/');
  };

  const getCategoryLabel = (item) => {
    // Return a category label based on item properties
    if (item.category === 'fatLoss') return 'GLP-1 Analogue';
    if (item.category === 'muscle') return 'Research Peptide';
    if (item.category === 'brain') return 'Nootropic';
    if (item.category === 'heart') return 'Cardiovascular';
    if (item.category === 'skin') return 'Skin Peptide';
    if (item.category === 'sexual') return 'Hormone Peptide';
    if (item.category === 'hair') return 'Hair Peptide';
    return 'Research Only';
  };

  const renderCartItem = ({ item, index }) => (
    <AnimatedCartItem
      item={item}
      index={index}
      onRemove={removeFromCart}
      onLearnMore={handleLearnMore}
      getCategoryLabel={getCategoryLabel}
    />
  );

  const renderEmptyCart = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconContainer}>
        <BeakerIcon size={80} fillLevel={0.5} liquidColor="#1abc9c" />
      </View>
      <Text style={styles.emptyText}>Your research list is empty</Text>
      <Text style={styles.emptySubtext}>Save compounds to your research list to keep track of them.</Text>
      
      <TouchableOpacity
        style={styles.browseButton}
        onPress={() => navigation.getParent()?.navigate('HomeTab')}
        activeOpacity={0.8}
      >
        <Text style={styles.browseButtonText}>Explore Compounds</Text>
      </TouchableOpacity>
    </View>
  );

  const renderFooter = () => {
    if (cartItems.length === 0) return null;
    
    return (
      <View style={styles.footerContainer}>
        {/* Disclaimer */}
        <Text style={styles.disclaimerText}>
          External links are provided for general research reference only.
        </Text>
        
        {/* External Resources Section */}
        <View style={styles.externalSection}>
          <Text style={styles.externalTitle}>External Resources</Text>
          <Text style={styles.externalSubtitle}>
            Explore third-party research sources outside the app.
          </Text>
          
          <TouchableOpacity
            style={styles.externalButton}
            onPress={handleOpenExternalSources}
            activeOpacity={0.7}
          >
            <Text style={styles.externalButtonText}>Open external sources</Text>
            <Ionicons name="chevron-forward" size={16} color="#1abc9c" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Research List</Text>
        <TouchableOpacity 
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Ionicons name="settings-outline" size={22} color="#888" />
        </TouchableOpacity>
      </View>
      
      {cartItems.length === 0 ? (
        renderEmptyCart()
      ) : (
        <FlatList
          data={cartItems}
          renderItem={renderCartItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.cartList}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={renderFooter}
        />
      )}

      {/* External Link Interstitial Modal */}
      <Modal
        visible={showExternalModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowExternalModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Leaving the App</Text>
            <Text style={styles.modalBody}>
              You are about to open a third-party website outside this app.
            </Text>
            <Text style={styles.modalBody}>
              External sites are provided for general research and informational reference only and are not affiliated with or controlled by this app.
            </Text>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowExternalModal(false)}
                activeOpacity={0.7}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.openSafariButton}
                onPress={confirmOpenExternal}
                activeOpacity={0.7}
              >
                <Text style={styles.openSafariButtonText}>Open in Safari</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  settingsButton: {
    padding: 5,
  },
  cartList: {
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 20,
  },
  cartItem: {
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    padding: 15,
    paddingTop: 20,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#2a2a2a',
    position: 'relative',
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 10,
    padding: 2,
  },
  itemInfo: {
    flex: 1,
    marginRight: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  casNumber: {
    fontSize: 12,
    color: '#888',
    fontFamily: 'monospace',
    marginBottom: 8,
  },
  categoryBadge: {
    backgroundColor: '#2a2a2a',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  categoryText: {
    fontSize: 11,
    color: '#888',
  },
  quantityRow: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  qtyButton: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#2a2a2a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: {
    fontSize: 12,
    color: '#bbb',
    minWidth: 46,
    textAlign: 'center',
  },
  removeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginLeft: 6,
  },
  removeAllText: {
    fontSize: 12,
    color: '#ff7675',
    fontWeight: '500',
  },
  learnMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  learnMoreText: {
    fontSize: 14,
    color: '#1abc9c',
    fontWeight: '500',
  },
  footerContainer: {
    paddingTop: 20,
  },
  disclaimerText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 25,
    paddingHorizontal: 20,
  },
  externalSection: {
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  externalTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 6,
  },
  externalSubtitle: {
    fontSize: 12,
    color: '#888',
    marginBottom: 15,
    lineHeight: 18,
  },
  externalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  externalButtonText: {
    fontSize: 14,
    color: '#1abc9c',
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#1e1e1e',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 20,
  },
  browseButton: {
    backgroundColor: '#1abc9c',
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 10,
  },
  browseButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#1e1e1e',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 340,
    borderWidth: 1,
    borderColor: '#333',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalBody: {
    fontSize: 14,
    color: '#aaa',
    lineHeight: 22,
    marginBottom: 12,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#444',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#888',
    fontSize: 15,
    fontWeight: '600',
  },
  openSafariButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: '#1abc9c',
    alignItems: 'center',
  },
  openSafariButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});

export default CartScreen;
