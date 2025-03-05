import {Text, View, SafeAreaView, TextInput } from 'react-native'
import React from 'react'
import styles from './styles'
import Icon from 'react-native-vector-icons/MaterialIcons'

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.menuIcon}>
          <View style={styles.menuLine} />
          <View style={styles.menuLine} />
          <View style={styles.menuLine} />
        </View>
        
        <View style={styles.centerContainer}>
          <Text style={styles.title}>UniVento</Text>
        </View>

        <Icon name="notifications" size={24} color="#fff" />

        <View style={styles.searchContainer}>
          <TextInput 
            style={styles.searchInput}
            placeholder="Etkinlik ara..."
            placeholderTextColor="#666"
          />
          <Icon name="search" size={28} color="#666" />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Home