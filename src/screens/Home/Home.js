import {Text, View, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import BottomBar from '../../components/BottomBar/BottomBar'

const Home = () => {
  const navigation = useNavigation();

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

        <View style={styles.searchContainer}>
          <TextInput 
            style={styles.searchInput}
            placeholder="Etkinlik ara..."
            placeholderTextColor="#666"
          />
          <Icon name="search" size={28} color="#666" />
        </View>
      </View>

      <View style={styles.content}>
      </View>

      <BottomBar />
    </SafeAreaView>
  )
}

export default Home