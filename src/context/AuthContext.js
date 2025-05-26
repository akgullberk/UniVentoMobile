import React, { createContext, useState, useContext, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState('user'); // 'user' veya 'president'

  const checkIfPresident = (email) => {
    // Burada kulüp başkanı bilgilerini kontrol ediyoruz
    return email === "berkpre@gmail.com";
  };

  useEffect(() => {
    try {
      const subscriber = auth().onAuthStateChanged(async (user) => {
        if (user) {
          // Kullanıcı oturum açmışsa, AsyncStorage'dan rolü kontrol et
          try {
            const savedRole = await AsyncStorage.getItem(`userRole_${user.email}`);
            if (savedRole) {
              setUserRole(savedRole);
            } else {
              // Eğer kayıtlı rol yoksa, e-postaya göre kontrol et
              const isPresident = checkIfPresident(user.email);
              const newRole = isPresident ? 'president' : 'user';
              await AsyncStorage.setItem(`userRole_${user.email}`, newRole);
              setUserRole(newRole);
            }
          } catch (error) {
            console.error('Rol kontrolü sırasında hata:', error);
          }
        } else {
          setUserRole('user');
        }
        setUser(user);
        setLoading(false);
      });

      return () => {
        subscriber();
        setError(null);
      };
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, []);

  const signIn = async (email, password) => {
    try {
      setLoading(true);
      const response = await auth().signInWithEmailAndPassword(email, password);
      
      // Kullanıcı rolünü belirle ve kaydet
      const isPresident = checkIfPresident(email);
      const role = isPresident ? 'president' : 'user';
      await AsyncStorage.setItem(`userRole_${email}`, role);
      setUserRole(role);
      
      setUser(response.user);
      return response.user;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email, password, name) => {
    try {
      setLoading(true);
      const response = await auth().createUserWithEmailAndPassword(email, password);
      await response.user.updateProfile({ displayName: name });
      
      // Yeni kayıt olan kullanıcılar her zaman normal kullanıcı olur
      await AsyncStorage.setItem(`userRole_${email}`, 'user');
      setUserRole('user');
      
      setUser(response.user);
      return response.user;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      if (user?.email) {
        await AsyncStorage.removeItem(`userRole_${user.email}`);
      }
      await auth().signOut();
      setUser(null);
      setUserRole('user');
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        error,
        userRole,
        signIn,
        signUp,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 