import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styles from './styles'
import { useNavigation } from '@react-navigation/native'

const BottomBar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.tabItem}
        onPress={() => navigation.navigate('Home')}
      >
        <Icon name="home" size={28} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.tabItem}
        onPress={() => navigation.navigate('KulupSecme')}
      >
        <Icon name="groups" size={28} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.tabItem}>
        <Icon name="event" size={28} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.tabItem}
        onPress={() => navigation.navigate('GirisKayit')}
      >
        <Icon name="person" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  )
}

export default BottomBar 