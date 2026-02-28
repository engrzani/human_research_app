import React, { useRef, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, Text, View, Platform, Animated, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BeakerIcon from './src/components/BeakerIcon';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import SubcategoryScreen from './src/screens/SubcategoryScreen';
import ShopScreen from './src/screens/ShopScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import CartScreen from './src/screens/CartScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import ResearchDisclaimerScreen from './src/screens/ResearchDisclaimerScreen';
import TermsScreen from './src/screens/TermsScreen';
import PrivacyScreen from './src/screens/PrivacyScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import DisclaimerScreen from './src/screens/DisclaimerScreen';
import SearchScreen from './src/screens/SearchScreen';
import CheckoutScreen from './src/screens/CheckoutScreen';
import OrderConfirmationScreen from './src/screens/OrderConfirmationScreen';
import LoginScreen from './src/screens/LoginScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
// New onboarding flow screens
import SplashScreen from './src/screens/SplashScreen';
import AgeGateScreen from './src/screens/AgeGateScreen';
import MedicalDisclaimerScreen from './src/screens/MedicalDisclaimerScreen';
import TermsPrivacyOnboardingScreen from './src/screens/TermsPrivacyOnboardingScreen';
import { CartProvider, useCart } from './src/context/CartContext';
import { AuthProvider, useAuth } from './src/context/AuthContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const SearchStack = createStackNavigator();
const CartStack = createStackNavigator();
const ProfileStack = createStackNavigator();

// Default header styling
const defaultHeaderOptions = {
  headerStyle: {
    backgroundColor: '#1a1a1a',
  },
  headerTintColor: '#1abc9c',
  headerTitleStyle: {
    fontWeight: 'bold',
    color: '#fff',
  },
};

// Home Tab Stack Navigator
function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={defaultHeaderOptions}>
      <HomeStack.Screen 
        name="HomeMain" 
        component={HomeScreen} 
        options={{ headerShown: false }}
      />
      <HomeStack.Screen 
        name="Subcategory" 
        component={SubcategoryScreen} 
        options={{ title: 'Select Category' }}
      />
      <HomeStack.Screen 
        name="Shop" 
        component={ShopScreen} 
        options={{ title: 'Research Compounds' }}
      />
      <HomeStack.Screen 
        name="ProductDetail" 
        component={ProductDetailScreen} 
        options={{ title: 'Compound Details' }}
      />
    </HomeStack.Navigator>
  );
}

// Search Tab Stack Navigator  
function SearchStackNavigator() {
  return (
    <SearchStack.Navigator screenOptions={defaultHeaderOptions}>
      <SearchStack.Screen 
        name="SearchMain" 
        component={SearchScreen} 
        options={{ headerShown: false }}
      />
      <SearchStack.Screen 
        name="ProductDetail" 
        component={ProductDetailScreen} 
        options={{ title: 'Compound Details' }}
      />
    </SearchStack.Navigator>
  );
}

// Cart Tab Stack Navigator
function CartStackNavigator() {
  return (
    <CartStack.Navigator screenOptions={defaultHeaderOptions}>
      <CartStack.Screen 
        name="CartMain" 
        component={CartScreen} 
        options={{ headerShown: false }}
      />
      <CartStack.Screen 
        name="ProductDetail" 
        component={ProductDetailScreen} 
        options={{ title: 'Compound Details' }}
      />
      <CartStack.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{ headerShown: false }}
      />
      <CartStack.Screen 
        name="ResearchDisclaimer" 
        component={ResearchDisclaimerScreen} 
        options={{ title: 'Research Disclaimer' }}
      />
      <CartStack.Screen 
        name="Terms" 
        component={TermsScreen} 
        options={{ title: 'Terms & Conditions' }}
      />
      <CartStack.Screen 
        name="Privacy" 
        component={PrivacyScreen} 
        options={{ title: 'Privacy Policy' }}
      />
      <CartStack.Screen 
        name="Checkout" 
        component={CheckoutScreen} 
        options={{ headerShown: false }}
      />
      <CartStack.Screen 
        name="OrderConfirmation" 
        component={OrderConfirmationScreen} 
        options={{ headerShown: false }}
      />
      <CartStack.Screen 
        name="Shop" 
        component={ShopScreen} 
        options={{ title: 'Research Compounds' }}
      />
    </CartStack.Navigator>
  );
}

// Profile Tab Stack Navigator
function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator screenOptions={defaultHeaderOptions}>
      <ProfileStack.Screen 
        name="ProfileMain" 
        component={ProfileScreen} 
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{ title: 'Settings' }}
      />
      <ProfileStack.Screen 
        name="ResearchDisclaimer" 
        component={ResearchDisclaimerScreen} 
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen 
        name="Terms" 
        component={TermsScreen} 
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen 
        name="Privacy" 
        component={PrivacyScreen} 
        options={{ headerShown: false }}
      />
    </ProfileStack.Navigator>
  );
}

// Custom Tab Bar Button to ensure better touch handling on Android
const TabBarButton = ({ children, onPress, accessibilityState }) => {
  const focused = accessibilityState.selected;
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
      }}
    >
      {children}
    </TouchableOpacity>
  );
};

// Animated Beaker Tab Button for Research List
const AnimatedBeakerTabButton = ({ onPress, accessibilityState }) => {
  const focused = accessibilityState.selected;
  const { cartItemCount } = useCart();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const popAnim = useRef(new Animated.Value(0)).current;
  const badgeScaleAnim = useRef(new Animated.Value(1)).current;
  const previousCountRef = useRef(cartItemCount);
  const fillLevel = Math.max(0.35, Math.min(0.95, 0.35 + cartItemCount * 0.06));

  useEffect(() => {
    const previousCount = previousCountRef.current;
    if (cartItemCount > previousCount) {
      Animated.parallel([
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.4,
            duration: 95,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 0.93,
            duration: 80,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1.16,
            duration: 70,
            useNativeDriver: true,
          }),
          Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 5,
            tension: 145,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(bounceAnim, {
            toValue: -10,
            duration: 85,
            useNativeDriver: true,
          }),
          Animated.timing(bounceAnim, {
            toValue: 3,
            duration: 65,
            useNativeDriver: true,
          }),
          Animated.spring(bounceAnim, {
            toValue: 0,
            friction: 5,
            tension: 135,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(shakeAnim, {
            toValue: 5,
            duration: 40,
            useNativeDriver: true,
          }),
          Animated.timing(shakeAnim, {
            toValue: -5,
            duration: 40,
            useNativeDriver: true,
          }),
          Animated.timing(shakeAnim, {
            toValue: 3,
            duration: 40,
            useNativeDriver: true,
          }),
          Animated.timing(shakeAnim, {
            toValue: 0,
            duration: 40,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(popAnim, {
            toValue: 1,
            duration: 120,
            useNativeDriver: true,
          }),
          Animated.timing(popAnim, {
            toValue: 0,
            duration: 160,
            useNativeDriver: true,
          }),
        ]),
        cartItemCount > 0
          ? Animated.sequence([
              Animated.timing(badgeScaleAnim, {
                toValue: 1.35,
                duration: 90,
                useNativeDriver: true,
              }),
              Animated.spring(badgeScaleAnim, {
                toValue: 1,
                friction: 5,
                tension: 160,
                useNativeDriver: true,
              }),
            ])
          : Animated.timing(badgeScaleAnim, {
              toValue: 1,
              duration: 0,
              useNativeDriver: true,
            }),
      ]).start();
    }

    previousCountRef.current = cartItemCount;
  }, [cartItemCount, scaleAnim, bounceAnim, shakeAnim, popAnim, badgeScaleAnim]);

  const handlePress = () => {
    // Scale bounce animation
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.3,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        tension: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Bounce up animation
    Animated.sequence([
      Animated.timing(bounceAnim, {
        toValue: -8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(bounceAnim, {
        toValue: 0,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();

    // Shake/wiggle animation (like liquid sloshing)
    Animated.sequence([
      Animated.timing(shakeAnim, {
        toValue: 3,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -3,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 2,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -2,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();

    onPress();
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
      }}
    >
      <View style={{ position: 'relative' }}>
        <Animated.View
          pointerEvents="none"
          style={{
            position: 'absolute',
            top: -4,
            left: -4,
            right: -4,
            bottom: -4,
            borderRadius: 20,
            borderWidth: 1.5,
            borderColor: '#1abc9c',
            opacity: popAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.45],
            }),
            transform: [{
              scale: popAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.8, 1.5],
              }),
            }],
          }}
        />
        <Animated.View style={{ 
          transform: [
            { scale: scaleAnim }, 
            { translateY: bounceAnim },
            { rotate: shakeAnim.interpolate({
              inputRange: [-5, -3, 0, 3, 5],
              outputRange: ['-7deg', '-5deg', '0deg', '5deg', '7deg'],
              extrapolate: 'clamp',
            })},
          ] 
        }}>
          <BeakerIcon 
            size={26} 
            fillLevel={fillLevel}
            liquidColor="#1abc9c"
          />
        </Animated.View>
        {cartItemCount > 0 && (
          <Animated.View
            style={{
              position: 'absolute',
              top: -5,
              right: -10,
              backgroundColor: '#e74c3c',
              borderRadius: 10,
              minWidth: 18,
              height: 18,
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 4,
              transform: [{ scale: badgeScaleAnim }],
            }}
          >
            <Text style={{
              color: '#fff',
              fontSize: 11,
              fontWeight: 'bold',
            }}>
              {cartItemCount}
            </Text>
          </Animated.View>
        )}
      </View>
      <Text style={{ 
        fontSize: 10, 
        fontWeight: '600', 
        marginTop: 2,
        color: focused ? '#1abc9c' : '#888'
      }}>
        Research List
      </Text>
    </TouchableOpacity>
  );
};

// Bottom Tab Navigator
function MainTabs() {
  const { cartItemCount } = useCart();
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          
          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'SearchTab') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'CartTab') {
            iconName = focused ? 'flask' : 'flask-outline';
          } else if (route.name === 'ProfileTab') {
            iconName = focused ? 'person' : 'person-outline';
          }
          
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarButton: (props) => <TabBarButton {...props} />,
        tabBarActiveTintColor: '#1abc9c',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: {
          height: Platform.OS === 'android' ? 70 : 65,
          paddingBottom: Platform.OS === 'android' ? 12 : 10,
          paddingTop: 8,
          backgroundColor: '#1a1a1a',
          borderTopWidth: 1,
          borderTopColor: '#333',
          elevation: 20,
          zIndex: 100,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
          marginTop: 2,
        },
        tabBarItemStyle: {
          paddingVertical: 5,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeStackNavigator} 
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen 
        name="SearchTab" 
        component={SearchStackNavigator} 
        options={{ tabBarLabel: 'Search' }}
      />
      <Tab.Screen 
        name="CartTab" 
        component={CartStackNavigator} 
        options={{ 
          tabBarLabel: 'Research List',
          tabBarButton: (props) => <AnimatedBeakerTabButton {...props} />,
        }}
      />
      <Tab.Screen 
        name="ProfileTab" 
        component={ProfileStackNavigator} 
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const checkAppState = async () => {
      try {
        // First check if user is authenticated
        const cachedUser = await AsyncStorage.getItem('user');
        if (cachedUser) {
          // User is logged in, go straight to app
          setInitialRoute('MainApp');
          return;
        }

        // User not authenticated, check onboarding progress
        const ageVerified = await AsyncStorage.getItem('@peptify_age_verified');
        if (!ageVerified) {
          // Haven't done age gate yet - start from beginning
          setInitialRoute('AgeGate');
          return;
        }

        // Age verified, check if terms/privacy were accepted
        const termsAccepted = await AsyncStorage.getItem('@peptify_terms_accepted');
        if (!termsAccepted) {
          // Age done but hasn't seen disclaimer & terms yet
          setInitialRoute('ResearchDisclaimerOnboarding');
          return;
        }

        // All onboarding done, go to login/signup
        setInitialRoute('Login');
      } catch (e) {
        console.error('App state check error:', e);
        setInitialRoute('AgeGate');
      }
    };
    checkAppState();
  }, []);

  if (initialRoute === null) {
    // Show loading while checking app state
    return (
      <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#1abc9c" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <CartProvider>
          <NavigationContainer>
            <Stack.Navigator 
              initialRouteName={initialRoute}
              screenOptions={{
                headerStyle: {
                  backgroundColor: '#1a1a1a',
                },
                headerTintColor: '#1abc9c',
                headerTitleStyle: {
                  fontWeight: 'bold',
                  color: '#fff',
                },
                gestureEnabled: true,
              }}
            >
              {/* Onboarding Flow: AgeGate → Disclaimer → TermsPrivacy → Splash → Login */}
              <Stack.Screen 
                name="AgeGate" 
                component={AgeGateScreen} 
                options={{ headerShown: false }}
              />
              <Stack.Screen 
                name="ResearchDisclaimerOnboarding" 
                component={MedicalDisclaimerScreen} 
                options={{ headerShown: false }}
              />
              <Stack.Screen 
                name="TermsPrivacyOnboarding" 
                component={TermsPrivacyOnboardingScreen} 
                options={{ headerShown: false }}
              />
              <Stack.Screen 
                name="Splash" 
                component={SplashScreen} 
                options={{ headerShown: false }}
              />
              <Stack.Screen 
                name="Login" 
                component={LoginScreen} 
                options={{ headerShown: false }}
              />
              <Stack.Screen 
                name="Disclaimer" 
                component={DisclaimerScreen} 
                options={{ headerShown: false }}
              />
              <Stack.Screen 
                name="Onboarding" 
                component={OnboardingScreen} 
                options={{ headerShown: false }}
              />
              <Stack.Screen 
                name="Terms" 
                component={TermsScreen} 
                options={{ title: 'Terms & Conditions' }}
              />
              <Stack.Screen 
                name="Privacy" 
                component={PrivacyScreen} 
                options={{ title: 'Privacy Policy' }}
              />
              <Stack.Screen 
                name="MainApp" 
                component={MainTabs} 
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </CartProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
