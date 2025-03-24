import { View, Text, SafeAreaView, TextInput, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'

const KulupSecme = () => {
  const navigation = useNavigation();
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await fetch('http://16.170.205.160/clubs');
        const data = await response.json();
        setClubs(data); // API'den gelen veriyi state'e kaydediyoruz
      } catch (error) {
        console.error(error);
      }
    };
    fetchClubs();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => {
        // Burada tıklama işlemi için yapılacaklar
        console.log(`Tıklanan kulüp: ${item.name}`);
        // İsterseniz başka bir sayfaya yönlendirme yapabilirsiniz
        // navigation.navigate('KulupDetay', { clubId: item.id });
      }}
    >
      <Image source={{ uri: item.logo_url }} style={styles.logo} />
      <Text style={styles.clubName}>{item.name}</Text>
    </TouchableOpacity>
  );

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

      <FlatList
        data={clubs}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2} // İki sütunlu görünüm
        contentContainerStyle={styles.listContainer}
      />

      <View style={styles.overlay}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Kapat</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default KulupSecme 