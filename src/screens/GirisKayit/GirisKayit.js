import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import styles from './styles'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import BottomBar from '../../components/BottomBar/BottomBar'
import { useAuth } from '../../context/AuthContext'

const GirisKayit = () => {
  const navigation = useNavigation();
  const { signIn, signUp, loading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
        return;
      }
      
      await signIn(email, password);
    } catch (error) {
      console.error(error);
      Alert.alert('Hata', 'Giriş yapılırken bir hata oluştu: ' + error.message);
    }
  };

  const handleRegister = async () => {
    try {
      if (!email || !password || !name || !confirmPassword) {
        Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
        return;
      }

      if (password !== confirmPassword) {
        Alert.alert('Hata', 'Şifreler eşleşmiyor.');
        return;
      }

      await signUp(email, password, name);
    } catch (error) {
      console.error(error);
      Alert.alert('Hata', 'Kayıt olurken bir hata oluştu: ' + error.message);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#88141c" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Icon name="menu" size={28} color="#fff" />
        
        <View style={styles.centerContainer}>
          <Text style={styles.title}>UniVento</Text>
        </View>

        <View style={styles.iconContainer}>
          <Icon name="notifications" size={24} color="#fff" />
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, isLogin && styles.activeTab]}
            onPress={() => setIsLogin(true)}
          >
            <Text style={[styles.tabText, isLogin && styles.activeTabText]}>Giriş Yap</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, !isLogin && styles.activeTab]}
            onPress={() => setIsLogin(false)}
          >
            <Text style={[styles.tabText, !isLogin && styles.activeTabText]}>Üye Ol</Text>
          </TouchableOpacity>
        </View>

        {isLogin ? (
          <View style={styles.formContainer}>
            <Text style={styles.inputLabel}>E-posta</Text>
            <TextInput 
              style={styles.input}
              placeholder="E-posta adresinizi giriniz"
              placeholderTextColor="#666"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Text style={styles.inputLabel}>Şifre</Text>
            <TextInput 
              style={styles.input}
              placeholder="Şifrenizi giriniz"
              placeholderTextColor="#666"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity 
              style={styles.button} 
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.formContainer}>
            <Text style={styles.inputLabel}>Ad Soyad</Text>
            <TextInput 
              style={styles.input}
              placeholder="Ad ve soyadınızı giriniz"
              placeholderTextColor="#666"
              value={name}
              onChangeText={setName}
            />
            <Text style={styles.inputLabel}>E-posta</Text>
            <TextInput 
              style={styles.input}
              placeholder="E-posta adresinizi giriniz"
              placeholderTextColor="#666"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Text style={styles.inputLabel}>Şifre</Text>
            <TextInput 
              style={styles.input}
              placeholder="Şifrenizi giriniz"
              placeholderTextColor="#666"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <Text style={styles.inputLabel}>Şifre Tekrar</Text>
            <TextInput 
              style={styles.input}
              placeholder="Şifrenizi tekrar giriniz"
              placeholderTextColor="#666"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity 
              style={styles.button} 
              onPress={handleRegister}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Kayıt Yapılıyor...' : 'Üye Ol'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <BottomBar />
    </SafeAreaView>
  )
}

export default GirisKayit 