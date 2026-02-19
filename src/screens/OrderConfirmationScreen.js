import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { OrderService } from '../services/firebaseService';

const OrderConfirmationScreen = ({ route, navigation }) => {
  const { shippingData } = route.params;
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const [isAcknowledged, setIsAcknowledged] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePlaceOrder = async () => {
    if (!isAcknowledged) {
      Alert.alert('Acknowledgment Required', 'Please acknowledge that products are for laboratory research use only.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create order object
      const orderData = {
        userId: user?.uid || 'guest',
        userEmail: user?.email || shippingData.email,
        items: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          selectedSize: item.selectedSize || '50mg',
        })),
        shippingAddress: shippingData,
        acknowledgedResearchUse: true,
      };

      // Save order to Firebase
      const orderId = await OrderService.createOrder(orderData);
      
      // Clear cart
      clearCart();

      // Show success message with order ID
      Alert.alert(
        'Order Placed',
        `Your order ORD-${orderId || Date.now()} has been placed successfully. You can track it in your account.`,
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'CartMain' }],
              });
            },
          },
        ]
      );
    } catch (error) {
      console.error('Order submission error:', error);
      Alert.alert('Error', 'Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Confirm Order</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Order Confirmation Section */}
        <Text style={styles.sectionTitle}>Order Confirmation</Text>

        {/* Shipping To */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Shipping To</Text>
          <View style={styles.infoCard}>
            <Text style={styles.infoName}>{shippingData.fullName}</Text>
            <Text style={styles.infoText}>{shippingData.email}</Text>
            <Text style={styles.infoText}>
              {shippingData.city}, {shippingData.state} {shippingData.zipCode}
            </Text>
            <Text style={styles.infoText}>{shippingData.country}</Text>
          </View>
        </View>

        {/* Order Items */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Order Items</Text>
          <View style={styles.itemsCard}>
            {cartItems.map((item, index) => (
              <View key={item.id} style={[
                styles.itemRow,
                index < cartItems.length - 1 && styles.itemBorder
              ]}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemSize}>{item.selectedSize || '5mg'} × {item.quantity}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Acknowledgment */}
        <TouchableOpacity 
          style={styles.acknowledgmentCard}
          onPress={() => setIsAcknowledged(!isAcknowledged)}
          activeOpacity={0.8}
        >
          <View style={[styles.checkbox, isAcknowledged && styles.checkboxChecked]}>
            {isAcknowledged && <Ionicons name="checkmark" size={14} color="#fff" />}
          </View>
          <Text style={styles.acknowledgmentText}>
            I acknowledge products are for laboratory research use only.
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Place Order Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.placeOrderButton,
            (!isAcknowledged || isSubmitting) && styles.placeOrderButtonDisabled
          ]}
          onPress={handlePlaceOrder}
          disabled={!isAcknowledged || isSubmitting}
          activeOpacity={0.8}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Ionicons name="document-text-outline" size={20} color="#fff" />
              <Text style={styles.placeOrderText}>Place Order</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#fff',
  },
  backButton: {
    fontSize: 16,
    color: '#1abc9c',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#888',
    marginBottom: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 13,
    color: '#666',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  infoName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: '#888',
    lineHeight: 22,
  },
  itemsCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 10,
  },
  itemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 2,
  },
  itemSize: {
    fontSize: 13,
    color: '#888',
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 14,
    marginTop: 4,
    borderTopWidth: 1,
    borderTopColor: '#2a2a2a',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1abc9c',
  },
  acknowledgmentCard: {
    backgroundColor: 'rgba(26, 188, 156, 0.1)',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(26, 188, 156, 0.3)',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#1abc9c',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#1abc9c',
  },
  acknowledgmentText: {
    flex: 1,
    fontSize: 14,
    color: '#fff',
    lineHeight: 20,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#000000',
    borderTopWidth: 1,
    borderTopColor: '#2a2a2a',
  },
  placeOrderButton: {
    backgroundColor: '#1abc9c',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 10,
  },
  placeOrderButtonDisabled: {
    opacity: 0.5,
  },
  placeOrderText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
});

export default OrderConfirmationScreen;
