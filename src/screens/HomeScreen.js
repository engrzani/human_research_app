import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import InteractiveBodySVG from '../components/InteractiveBodySVG';
import { useCart } from '../context/CartContext';
import { getCategoryInfo } from '../data/products';
import { useNavigation } from '@react-navigation/native';

// Map body parts to product categories
const BODY_PART_TO_CATEGORY = {
  brain: 'brain',
  hair: 'hair',
  stomach: 'fatLoss',
  muscle: 'muscle',
  heart: 'heart',
  skin: 'skin',
  sexual: 'sexual',
};

const HomeScreen = () => {
  const navigation = useNavigation();
  const { cartItemCount } = useCart();

  const handleBodyPartPress = (bodyPart) => {
    // Map body part to category
    const category = BODY_PART_TO_CATEGORY[bodyPart] || bodyPart;
    const categoryInfo = getCategoryInfo(category);
    
    // If category has subcategories, navigate to subcategory screen
    if (categoryInfo && categoryInfo.subcategories) {
      navigation.navigate('Subcategory', { category: category });
    } else {
      // Otherwise go directly to shop
      navigation.navigate('Shop', { category: category });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Human Research</Text>
        <Text style={styles.subtitle}>Tap any body part to explore compounds</Text>
      </View>

      {/* Interactive Body Diagram */}
      <View style={styles.bodyContainer}>
        <InteractiveBodySVG onBodyPartPress={handleBodyPartPress} />
      </View>

      {/* Browse All Button */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.browseButton}
          onPress={() => navigation.navigate('Shop', {})}
          activeOpacity={0.8}
        >
          <Text style={styles.browseButtonText}>Browse All Compounds</Text>
        </TouchableOpacity>
      </View>
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
    paddingTop: 15,
    paddingBottom: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
  },
  bodyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    padding: 20,
    paddingBottom: 10,
  },
  browseButton: {
    backgroundColor: '#1abc9c',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#1abc9c',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  browseButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
});

export default HomeScreen;
