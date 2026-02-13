import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';

const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(
    product.sizes ? product.sizes[0] : { size: 'Standard', price: product.price }
  );

  const handleAddToCart = () => {
    const productWithSize = {
      ...product,
      selectedSize: selectedSize.size,
      price: selectedSize.price,
    };
    addToCart(productWithSize);
    Alert.alert(
      'Added to Cart',
      `${product.name} (${selectedSize.size}) added to your research list.`,
      [{ text: 'Continue Shopping', onPress: () => navigation.goBack() }]
    );
  };

  const handleOpenPDF = () => {
    if (product.pdfLink) {
      Linking.openURL(product.pdfLink);
    } else {
      Alert.alert('PDF Not Available', 'Research documentation is not yet available for this product.');
    }
  };

  const sizes = product.sizes || [{ size: 'Standard', price: product.price }];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          {product.image ? (
            <Image 
              source={{ uri: product.image }} 
              style={styles.productImage}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.placeholderImage}>
              <Ionicons name="flask" size={80} color="#1abc9c" />
            </View>
          )}
        </View>

        {/* Product Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.productName}>{product.name}</Text>
          
          <View style={styles.badgeRow}>
            {product.casNumber && product.casNumber !== 'N/A' && (
              <View style={styles.casBadge}>
                <Text style={styles.casLabel}>CAS</Text>
                <Text style={styles.casNumber}>{product.casNumber}</Text>
              </View>
            )}
            
            {product.purity && (
              <View style={styles.purityBadge}>
                <Text style={styles.purityText}>{product.purity} Purity</Text>
              </View>
            )}
            
            {product.inStock && (
              <View style={styles.stockBadge}>
                <Ionicons name="checkmark-circle" size={14} color="#27ae60" />
                <Text style={styles.stockText}>In Stock</Text>
              </View>
            )}
          </View>
        </View>

        {/* Size Selector */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Select Size</Text>
          <View style={styles.sizeContainer}>
            {sizes.map((sizeOption, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.sizeButton,
                  selectedSize.size === sizeOption.size && styles.sizeButtonSelected
                ]}
                onPress={() => setSelectedSize(sizeOption)}
              >
                <Text style={[
                  styles.sizeText,
                  selectedSize.size === sizeOption.size && styles.sizeTextSelected
                ]}>
                  {sizeOption.size}
                </Text>
                <Text style={[
                  styles.sizePriceText,
                  selectedSize.size === sizeOption.size && styles.sizePriceTextSelected
                ]}>
                  ${sizeOption.price.toFixed(2)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Add to Cart Button */}
        <TouchableOpacity 
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <Ionicons name="cart" size={22} color="#fff" />
          <Text style={styles.addToCartButtonText}>Add to Cart - ${selectedSize.price.toFixed(2)}</Text>
        </TouchableOpacity>

        {/* Research Warning Banner */}
        <View style={styles.warningBanner}>
          <Ionicons name="warning" size={20} color="#856404" />
          <Text style={styles.warningText}>
            For research purposes only. Not for human consumption.
          </Text>
        </View>

        {/* What It Is */}
        {product.whatItIs && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>What It Is</Text>
            <Text style={styles.sectionText}>{product.whatItIs}</Text>
          </View>
        )}

        {/* Research Associations */}
        {product.researchAssociations && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Research Associations</Text>
            <Text style={styles.sectionText}>{product.researchAssociations}</Text>
          </View>
        )}

        {/* Research Description */}
        {product.researchDescription && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Research Description</Text>
            <Text style={styles.sectionText}>{product.researchDescription}</Text>
          </View>
        )}

        {/* Mechanism / Pathway */}
        {product.mechanism && product.mechanism.length > 0 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Mechanism / Pathway</Text>
            {product.mechanism.map((item, index) => (
              <View key={index} style={styles.mechanismItem}>
                <View style={styles.bulletPoint} />
                <Text style={styles.mechanismText}>{item}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Research Context */}
        {product.researchContext && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Research Context</Text>
            <Text style={styles.sectionText}>{product.researchContext}</Text>
          </View>
        )}

        {/* PDF Link */}
        <TouchableOpacity style={styles.pdfButton} onPress={handleOpenPDF}>
          <Ionicons name="document-text" size={20} color="#1abc9c" />
          <Text style={styles.pdfButtonText}>View Research Documentation (PDF)</Text>
          <Ionicons name="chevron-forward" size={20} color="#1abc9c" />
        </TouchableOpacity>

        {/* Rating */}
        {product.rating && (
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingLabel}>Customer Rating</Text>
            <View style={styles.ratingStars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Ionicons 
                  key={star}
                  name={star <= Math.floor(product.rating) ? "star" : (star - 0.5 <= product.rating ? "star-half" : "star-outline")} 
                  size={20} 
                  color="#f39c12" 
                />
              ))}
              <Text style={styles.ratingValue}>{product.rating.toFixed(1)}</Text>
            </View>
          </View>
        )}

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: 250,
    backgroundColor: '#fff',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  headerContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 10,
  },
  casBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f4f8',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  casLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1abc9c',
    marginRight: 4,
  },
  casNumber: {
    fontSize: 12,
    color: '#2c3e50',
    fontFamily: 'monospace',
  },
  purityBadge: {
    backgroundColor: '#1abc9c',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  purityText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  stockBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f8f0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  stockText: {
    fontSize: 12,
    color: '#27ae60',
    marginLeft: 4,
    fontWeight: '600',
  },
  sectionContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  sizeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  sizeButton: {
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minWidth: 100,
    alignItems: 'center',
  },
  sizeButtonSelected: {
    borderColor: '#1abc9c',
    backgroundColor: '#e8f8f5',
  },
  sizeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
  sizeTextSelected: {
    color: '#1abc9c',
  },
  sizePriceText: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  sizePriceTextSelected: {
    color: '#1abc9c',
  },
  addToCartButton: {
    backgroundColor: '#1abc9c',
    marginHorizontal: 16,
    marginTop: 16,
    paddingVertical: 16,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    shadowColor: '#1abc9c',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  warningBanner: {
    backgroundColor: '#fff3cd',
    marginHorizontal: 16,
    marginTop: 12,
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: '#ffc107',
  },
  warningText: {
    flex: 1,
    fontSize: 12,
    color: '#856404',
    fontWeight: '500',
  },
  mechanismItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bulletPoint: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#1abc9c',
    marginRight: 12,
    marginTop: 6,
  },
  mechanismText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  pdfButton: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 8,
    padding: 16,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1abc9c',
  },
  pdfButtonText: {
    flex: 1,
    fontSize: 14,
    color: '#1abc9c',
    fontWeight: '600',
    marginLeft: 10,
  },
  ratingContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 8,
    padding: 16,
    borderRadius: 10,
  },
  ratingLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  ratingStars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginLeft: 8,
  },
  bottomSpacer: {
    height: 30,
  },
});

export default ProductDetailScreen;
