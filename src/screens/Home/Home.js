import {Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import styles from './styles'

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.menuIcon}>
          <View style={styles.menuLine} />
          <View style={styles.menuLine} />
          <View style={styles.menuLine} />
        </View>
        <Text style={styles.title}>UniVento</Text>
      </View>
    </SafeAreaView>
  )
}

export default Home