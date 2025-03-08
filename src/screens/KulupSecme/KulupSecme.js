import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import styles from './styles'

const KulupSecme = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Kulüp Seçme</Text>
      </View>
    </SafeAreaView>
  )
}

export default KulupSecme 