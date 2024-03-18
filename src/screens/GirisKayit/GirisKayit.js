import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import styles from './styles'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import BottomBar from '../../components/BottomBar/BottomBar'

const GirisKayit = () => {
  const navigation = useNavigation();
  const [isLogin, setIsLogin] = useState(true); // true: giriş, false: kayıt

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Icon name="menu" size={28} color="#fff" />
        
        <View style={styles.centerContainer}>
          <Text style={styles.title}>UniVento</Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('KulupSecme')}>
          <Icon name="notifications" size={24} color="#fff" />
        </TouchableOpacity>
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
            />
            <Text style={styles.inputLabel}>Şifre</Text>
            <TextInput 
              style={styles.input}
              placeholder="Şifrenizi giriniz"
              placeholderTextColor="#666"
              secureTextEntry
            />
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Giriş Yap</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.formContainer}>
            <Text style={styles.inputLabel}>Ad Soyad</Text>
            <TextInput 
              style={styles.input}
              placeholder="Ad ve soyadınızı giriniz"
              placeholderTextColor="#666"
            />
            <Text style={styles.inputLabel}>E-posta</Text>
            <TextInput 
              style={styles.input}
              placeholder="E-posta adresinizi giriniz"
              placeholderTextColor="#666"
            />
            <Text style={styles.inputLabel}>Şifre</Text>
            <TextInput 
              style={styles.input}
              placeholder="Şifrenizi giriniz"
              placeholderTextColor="#666"
              secureTextEntry
            />
            <Text style={styles.inputLabel}>Şifre Tekrar</Text>
            <TextInput 
              style={styles.input}
              placeholder="Şifrenizi tekrar giriniz"
              placeholderTextColor="#666"
              secureTextEntry
            />
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Üye Ol</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <BottomBar />
    </SafeAreaView>
  )
}

export default GirisKayit 