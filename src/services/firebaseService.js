import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc,
  query,
  where,
  setDoc,
  getDoc 
} from 'firebase/firestore';
import { db } from '../config/firebase';

// Helper to check if Firebase is initialized
const isFirebaseReady = () => {
  if (!db) {
    console.warn('Firebase Firestore is not initialized. Operations will be skipped.');
    return false;
  }
  return true;
};

// Products Service
export const ProductService = {
  // Get all products
  async getAllProducts() {
    if (!isFirebaseReady()) return [];
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting products:', error);
      return [];
    }
  },

  // Get products by category
  async getProductsByCategory(category) {
    if (!isFirebaseReady()) return [];
    try {
      const q = query(
        collection(db, 'products'), 
        where('category', '==', category)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting products by category:', error);
      return [];
    }
  },

  // Add new product (Admin function)
  async addProduct(productData) {
    if (!isFirebaseReady()) return null;
    try {
      const docRef = await addDoc(collection(db, 'products'), productData);
      return docRef.id;
    } catch (error) {
      console.error('Error adding product:', error);
      return null;
    }
  },

  // Update product (Admin function)
  async updateProduct(productId, productData) {
    if (!isFirebaseReady()) return;
    try {
      const productRef = doc(db, 'products', productId);
      await updateDoc(productRef, productData);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  },

  // Delete product (Admin function)
  async deleteProduct(productId) {
    if (!isFirebaseReady()) return;
    try {
      await deleteDoc(doc(db, 'products', productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  }
};

// Orders Service
export const OrderService = {
  // Create new order
  async createOrder(orderData) {
    if (!isFirebaseReady()) return null;
    try {
      const docRef = await addDoc(collection(db, 'orders'), {
        ...orderData,
        createdAt: new Date().toISOString(),
        status: 'pending'
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating order:', error);
      return null;
    }
  },

  // Get user orders
  async getUserOrders(userId) {
    if (!isFirebaseReady()) return [];
    try {
      const q = query(
        collection(db, 'orders'),
        where('userId', '==', userId)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting user orders:', error);
      return [];
    }
  },

  // Update order status
  async updateOrderStatus(orderId, status) {
    if (!isFirebaseReady()) return;
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, { status });
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  }
};
// Cart Service
export const CartService = {
  // Get user cart
  async getUserCart(userId) {
    if (!isFirebaseReady()) return [];
    try {
      const cartRef = doc(db, 'carts', userId);
      const cartDoc = await getDoc(cartRef);
      
      if (cartDoc.exists()) {
        return cartDoc.data().items || [];
      }
      return [];
    } catch (error) {
      console.error('Error getting user cart:', error);
      return [];
    }
  },

  // Save entire cart for user
  async saveUserCart(userId, cartItems) {
    if (!isFirebaseReady()) return;
    try {
      const cartRef = doc(db, 'carts', userId);
      await setDoc(cartRef, {
        items: cartItems,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error saving user cart:', error);
    }
  },

  // Add item to cart
  async addToCart(userId, product) {
    if (!isFirebaseReady()) return [];
    try {
      const cartRef = doc(db, 'carts', userId);
      const cartDoc = await getDoc(cartRef);
      
      let cartItems = [];
      if (cartDoc.exists()) {
        cartItems = cartDoc.data().items || [];
      }

      // Check if product already exists
      const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Update quantity
        cartItems[existingItemIndex].quantity += 1;
      } else {
        // Add new item
        cartItems.push({ ...product, quantity: 1 });
      }

      await setDoc(cartRef, {
        items: cartItems,
        updatedAt: new Date().toISOString()
      });

      return cartItems;
    } catch (error) {
      console.error('Error adding to cart:', error);
      return [];
    }
  },

  // Remove item from cart
  async removeFromCart(userId, productId) {
    if (!isFirebaseReady()) return [];
    try {
      const cartRef = doc(db, 'carts', userId);
      const cartDoc = await getDoc(cartRef);
      
      if (cartDoc.exists()) {
        let cartItems = cartDoc.data().items || [];
        cartItems = cartItems.filter(item => item.id !== productId);

        await setDoc(cartRef, {
          items: cartItems,
          updatedAt: new Date().toISOString()
        });

        return cartItems;
      }
      return [];
    } catch (error) {
      console.error('Error removing from cart:', error);
      return [];
    }
  },

  // Update item quantity
  async updateCartItemQuantity(userId, productId, quantity) {
    if (!isFirebaseReady()) return [];
    try {
      const cartRef = doc(db, 'carts', userId);
      const cartDoc = await getDoc(cartRef);
      
      if (cartDoc.exists()) {
        let cartItems = cartDoc.data().items || [];
        
        if (quantity <= 0) {
          // Remove item if quantity is 0 or less
          cartItems = cartItems.filter(item => item.id !== productId);
        } else {
          // Update quantity
          const itemIndex = cartItems.findIndex(item => item.id === productId);
          if (itemIndex >= 0) {
            cartItems[itemIndex].quantity = quantity;
          }
        }

        await setDoc(cartRef, {
          items: cartItems,
          updatedAt: new Date().toISOString()
        });

        return cartItems;
      }
      return [];
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
      return [];
    }
  },

  // Clear cart
  async clearCart(userId) {
    if (!isFirebaseReady()) return;
    try {
      const cartRef = doc(db, 'carts', userId);
      await setDoc(cartRef, {
        items: [],
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  }
};