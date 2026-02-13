import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';
import { useNavigation } from '@react-navigation/native';

const CartScreen = () => {
  const navigation = useNavigation();
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, isLoading } = useCart();

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      {/* Product Image */}
      <View style={styles.imageContainer}>
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.productImage} resizeMode="cover" />
        ) : (
          <View style={styles.placeholderImage}>
            <Ionicons name="flask" size={30} color="#1abc9c" />
          </View>
        )}
      </View>

      {/* Product Details */}
      <View style={styles.itemDetails}>
        <View style={styles.itemHeader}>
          <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => removeFromCart(item.id)}
          >
            <Ionicons name="trash" size={20} color="#e74c3c" />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.itemSize}>{item.selectedSize || '50mg'}</Text>
        <Text style={styles.itemPrice}>${item.price?.toFixed(2)}</Text>

        {/* Quantity Controls */}
        <View style={styles.quantityRow}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
          >
            <Text style={styles.quantityButtonText}>−</Text>
          </TouchableOpacity>
          
          <Text style={styles.quantityText}>{item.quantity}</Text>
          
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.id, item.quantity + 1)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderEmptyCart = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="cart-outline" size={80} color="#444" />
      <Text style={styles.emptyText}>Your cart is empty</Text>
      <Text style={styles.emptySubtext}>Add some compounds to get started</Text>
      <TouchableOpacity
        style={styles.shopButton}
        onPress={() => navigation.navigate('Shop', {})}
      >
        <Text style={styles.shopButtonText}>Browse Compounds</Text>
      </TouchableOpacity>
    </View>
  );

  const subtotal = getCartTotal();
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cart</Text>
      </View>
      
      {cartItems.length === 0 ? (
        renderEmptyCart()
      ) : (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.cartList}
            showsVerticalScrollIndicator={false}
          />

          {/* Order Summary */}
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal ({itemCount} items)</Text>
              <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping</Text>
              <Text style={styles.shippingText}>Calculated at checkout</Text>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${subtotal.toFixed(2)}</Text>
            </View>

            {/* Ready to checkout message */}
            <Text style={styles.checkoutMessage}>Ready to checkout?</Text>

            {/* Keep Shopping Button */}
            <TouchableOpacity
              style={styles.keepShoppingButton}
              onPress={() => navigation.navigate('Shop', {})}
              activeOpacity={0.8}
            >
              <Ionicons name="arrow-back" size={18} color="#fff" />
              <Text style={styles.keepShoppingText}>Keep shopping</Text>
            </TouchableOpacity>

            {/* Proceed to Checkout Button */}
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={() => navigation.navigate('Checkout')}
              activeOpacity={0.8}
            >
              <Ionicons name="card" size={20} color="#fff" />
              <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
  },
  cartList: {
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  cartItem: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 12,
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
  itemDetails: {
    flex: 1,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    flex: 1,
    marginRight: 10,
  },
  deleteButton: {
    padding: 4,
  },
  itemSize: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1abc9c',
    marginTop: 4,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityButton: {
    backgroundColor: '#333',
    width: 28,
    height: 28,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginHorizontal: 15,
    minWidth: 20,
    textAlign: 'center',
  },
  summaryContainer: {
    backgroundColor: '#1e1e1e',
    padding: 20,
    paddingBottom: 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 1,
    borderColor: '#333',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#888',
  },
  summaryValue: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },
  shippingText: {
    fontSize: 13,
    color: '#666',
    fontStyle: 'italic',
  },
  divider: {
    height: 1,
    backgroundColor: '#333',
    marginVertical: 12,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1abc9c',
  },
  checkoutMessage: {
    textAlign: 'center',
    fontSize: 13,
    color: '#666',
    marginBottom: 12,
  },
  keepShoppingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#444',
    marginBottom: 10,
    gap: 8,
  },
  keepShoppingText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
  checkoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1abc9c',
    paddingVertical: 16,
    borderRadius: 10,
    gap: 8,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#666',
    marginTop: 20,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#444',
    marginTop: 8,
    marginBottom: 30,
  },
  shopButton: {
    backgroundColor: '#1abc9c',
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 10,
  },
  shopButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CartScreen;
