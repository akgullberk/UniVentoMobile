import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'

const KulupSecme = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput 
          style={styles.searchInput}
          placeholder="Kulüp ara"
          placeholderTextColor="#666"
        />
        <Icon name="search" size={28} color="#666" style={styles.searchIcon} />
      </View>

      <View style={styles.overlay}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Kapat</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default KulupSecme 