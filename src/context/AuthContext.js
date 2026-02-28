import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../config/firebase';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let unsubscribe = () => {};
    
    const initAuth = async () => {
      try {
        // Check for cached user
        const cachedUser = await AsyncStorage.getItem('user');
        if (cachedUser) {
          const parsedUser = JSON.parse(cachedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
        }

        // Listen for Firebase auth state changes
        if (auth) {
          unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
              // Only auto-login if user was already cached in AsyncStorage
              // This prevents Firebase persistence from bypassing onboarding
              const cached = await AsyncStorage.getItem('user');
              if (cached) {
                const userData = {
                  uid: firebaseUser.uid,
                  email: firebaseUser.email,
                  displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0],
                };
                setUser(userData);
                setIsAuthenticated(true);
                await AsyncStorage.setItem('user', JSON.stringify(userData));
              }
            } else {
              // Firebase says no user
              const cached = await AsyncStorage.getItem('user');
              if (!cached) {
                setUser(null);
                setIsAuthenticated(false);
              }
            }
            setIsLoading(false);
          });
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Auth init error:', error);
        setIsLoading(false);
      }
    };

    initAuth();
    return () => unsubscribe();
  }, []);

  const signIn = async (userData) => {
    try {
      setUser(userData);
      setIsAuthenticated(true);
      await AsyncStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  const signOut = async () => {
    try {
      if (auth) {
        await firebaseSignOut(auth);
      }
      await AsyncStorage.removeItem('user');
      // Don't remove age verification - user shouldn't have to re-verify age
      // await AsyncStorage.removeItem('@peptify_age_verified');
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const updateUser = async (userData) => {
    try {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Update user error:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        signIn,
        signOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
