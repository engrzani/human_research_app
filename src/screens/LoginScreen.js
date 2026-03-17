import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, Rect, Circle, G } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../context/AuthContext';
import { AuthService } from '../services/firebaseService';

const LoginScreen = ({ navigation }) => {
  const { signIn, isAuthenticated, isLoading: authLoading } = useAuth();
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [isLogin, setIsLogin] = useState(false); // default to Sign Up
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProvider, setLoadingProvider] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const emailFormHeight = useState(new Animated.Value(0))[0];

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
  });
  const [errors, setErrors] = useState({});

  const navigateAfterAuth = async () => {
    // Disclaimers + beaker done, sign in complete → go to main app
    navigation.replace('MainApp');
  };

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      // Already authenticated → skip straight to main app
      navigateAfterAuth();
    }
  }, [isAuthenticated, authLoading, navigation]);

  const toggleEmailForm = () => {
    const toValue = showEmailForm ? 0 : 1;
    setShowEmailForm(!showEmailForm);
    Animated.timing(emailFormHeight, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!isLogin) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = 'Full name is required';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailSubmit = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    setLoadingProvider('email');
    try {
      let result;
      if (isLogin) {
        result = await AuthService.signIn(formData.email, formData.password);
      } else {
        result = await AuthService.signUp(formData.email, formData.password, formData.fullName);
      }
      if (result.success) {
        await signIn(result.user);
        await navigateAfterAuth();
      } else {
        Alert.alert('Error', result.error || 'Authentication failed');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
      setLoadingProvider(null);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setLoadingProvider('google');
    try {
      const result = await AuthService.signInWithGoogle();
      if (result.success) {
        await signIn(result.user);
        await navigateAfterAuth();
      } else {
        if (result.error !== 'cancelled') {
          Alert.alert('Error', result.error || 'Google sign-in failed');
        }
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Google sign-in failed');
    } finally {
      setIsLoading(false);
      setLoadingProvider(null);
    }
  };

  const handleAppleSignIn = async () => {
    setIsLoading(true);
    setLoadingProvider('apple');
    try {
      const result = await AuthService.signInWithApple();
      if (result.success) {
        await signIn(result.user);
        await navigateAfterAuth();
      } else {
        if (result.error !== 'cancelled') {
          Alert.alert('Error', result.error || 'Apple sign-in failed');
        }
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Apple sign-in failed');
    } finally {
      setIsLoading(false);
      setLoadingProvider(null);
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email.trim()) {
      Alert.alert('Enter Email', 'Please enter your email address to reset password');
      return;
    }
    setIsLoading(true);
    try {
      const result = await AuthService.resetPassword(formData.email);
      if (result.success) {
        Alert.alert('Email Sent', 'Check your email for password reset instructions');
      } else {
        Alert.alert('Error', result.error || 'Failed to send reset email');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Google "G" logo SVG
  const GoogleIcon = () => (
    <Svg width={20} height={20} viewBox="0 0 48 48">
      <Path d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" fill="#FFC107" />
      <Path d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" fill="#FF3D00" />
      <Path d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0124 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" fill="#4CAF50" />
      <Path d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 01-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" fill="#1976D2" />
    </Svg>
  );

  // Apple logo SVG
  const AppleIcon = () => (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="#fff">
      <Path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </Svg>
  );

  // Email icon SVG
  const EmailIcon = () => (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Rect x="2" y="4" width="20" height="16" rx="3" stroke="#fff" strokeWidth="1.8" />
      <Path d="M2 7l10 6 10-6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>PEPTFIED</Text>
            <Text style={styles.subtitle}>Sign in to save research data.</Text>
          </View>

          {/* Social Auth Buttons */}
          <View style={styles.authButtons}>
            {/* Google */}
            <TouchableOpacity
              style={styles.socialButton}
              onPress={handleGoogleSignIn}
              disabled={isLoading}
              activeOpacity={0.7}
            >
              {loadingProvider === 'google' ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <>
                  <GoogleIcon />
                  <Text style={styles.socialButtonText}>Continue with Google</Text>
                </>
              )}
            </TouchableOpacity>

            {/* Apple Sign In */}
            <TouchableOpacity
              style={[styles.socialButton, styles.appleButton]}
              onPress={handleAppleSignIn}
              disabled={isLoading}
              activeOpacity={0.7}
            >
              {loadingProvider === 'apple' ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <>
                  <AppleIcon />
                  <Text style={styles.socialButtonText}>Continue with Apple</Text>
                </>
              )}
            </TouchableOpacity>

            {/* Email */}
            <TouchableOpacity
              style={[styles.socialButton, styles.emailButton]}
              onPress={toggleEmailForm}
              disabled={isLoading && loadingProvider !== 'email'}
              activeOpacity={0.7}
            >
              <EmailIcon />
              <Text style={styles.socialButtonText}>Continue with Email</Text>
            </TouchableOpacity>
          </View>

          {/* Expandable Email Form */}
          {showEmailForm && (
            <View style={styles.emailForm}>
              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>
                  {isLogin ? 'Sign in with email' : 'Sign up with email'}
                </Text>
                <View style={styles.dividerLine} />
              </View>

              {!isLogin && (
                <View style={styles.inputGroup}>
                  <View style={[styles.inputContainer, errors.fullName && styles.inputError]}>
                    <Ionicons name="person-outline" size={18} color="#666" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Full name"
                      placeholderTextColor="#555"
                      value={formData.fullName}
                      onChangeText={(text) => updateField('fullName', text)}
                      autoCapitalize="words"
                    />
                  </View>
                  {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}
                </View>
              )}

              <View style={styles.inputGroup}>
                <View style={[styles.inputContainer, errors.email && styles.inputError]}>
                  <Ionicons name="mail-outline" size={18} color="#666" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#555"
                    value={formData.email}
                    onChangeText={(text) => updateField('email', text)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
              </View>

              <View style={styles.inputGroup}>
                <View style={[styles.inputContainer, errors.password && styles.inputError]}>
                  <Ionicons name="lock-closed-outline" size={18} color="#666" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#555"
                    value={formData.password}
                    onChangeText={(text) => updateField('password', text)}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeButton}>
                    <Ionicons
                      name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                      size={18}
                      color="#666"
                    />
                  </TouchableOpacity>
                </View>
                {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
              </View>

              {!isLogin && (
                <View style={styles.inputGroup}>
                  <View style={[styles.inputContainer, errors.confirmPassword && styles.inputError]}>
                    <Ionicons name="lock-closed-outline" size={18} color="#666" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Confirm password"
                      placeholderTextColor="#555"
                      value={formData.confirmPassword}
                      onChangeText={(text) => updateField('confirmPassword', text)}
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                    />
                  </View>
                  {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
                </View>
              )}

              {isLogin && (
                <TouchableOpacity style={styles.forgotButton} onPress={handleForgotPassword}>
                  <Text style={styles.forgotText}>Forgot Password?</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
                onPress={handleEmailSubmit}
                disabled={isLoading}
                activeOpacity={0.8}
              >
                {loadingProvider === 'email' ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.submitButtonText}>
                    {isLogin ? 'Sign In' : 'Create Account'}
                  </Text>
                )}
              </TouchableOpacity>

              {/* Toggle Login/Signup */}
              <View style={styles.toggleContainer}>
                <Text style={styles.toggleText}>
                  {isLogin ? "Don't have an account? " : 'Already have an account? '}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setIsLogin(!isLogin);
                    setErrors({});
                  }}
                >
                  <Text style={styles.toggleLink}>{isLogin ? 'Sign Up' : 'Sign In'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              By continuing, you agree to our Terms of Service and Privacy Policy
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 25,
    paddingTop: 60,
    paddingBottom: 30,
  },
  header: {
    alignItems: 'center',
    marginBottom: 50,
  },
  title: {
    fontSize: 34,
    fontWeight: '300',
    color: '#ffffff',
    letterSpacing: 10,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: '#888',
  },
  authButtons: {
    gap: 14,
    marginBottom: 10,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1e1e1e',
    borderRadius: 14,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#333',
    gap: 12,
  },
  appleButton: {
    backgroundColor: '#1e1e1e',
  },
  emailButton: {
    backgroundColor: '#1e1e1e',
  },
  socialButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  emailForm: {
    marginTop: 20,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#333',
  },
  dividerText: {
    color: '#888',
    fontSize: 13,
    marginHorizontal: 12,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
    paddingHorizontal: 14,
  },
  inputError: {
    borderColor: '#e74c3c',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: '#fff',
  },
  eyeButton: {
    padding: 5,
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
    marginTop: -8,
  },
  forgotText: {
    color: '#1abc9c',
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: '#1abc9c',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleText: {
    color: '#888',
    fontSize: 14,
  },
  toggleLink: {
    color: '#1abc9c',
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    marginTop: 'auto',
    paddingTop: 30,
    alignItems: 'center',
  },
  footerText: {
    color: '#666',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default LoginScreen;
