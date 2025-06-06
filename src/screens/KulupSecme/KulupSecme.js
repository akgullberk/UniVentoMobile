import { View, Text, SafeAreaView, TextInput, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../../context/AuthContext'

const KulupSecme = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [clubs, setClubs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredClubs, setFilteredClubs] = useState([]);

  const getLogoForClub = (clubName) => {
    switch (clubName) {
      case 'Adli Bilişim Öğrenci Topluluğu':
        return require('../../assets/abt.png');
      case 'Aklıllı Sistemler ve Milli Savunma Teknolojileri Öğrenci Topluluğu (ASİMSAV)':
        return require('../../assets/akıllı.jpeg');
      case 'Bilim ve Fen Öğrenci Topluluğu':
        return require('../../assets/bilim.jpg');
      case 'Google Developer Students Club':
        return require('../../assets/gdsc.png');
      case 'Yapay Zeka Görüntü İşleme ve İnovasyon Öğrenci Topluluğu':
        return require('../../assets/yazgı.png');
      case 'Huawei Geliştirici Öğrenciler Öğrenci Topluluğu':
        return require('../../assets/huawei.png');
    }
  };

  useEffect(() => {
    if (!user) {
      return;
    }

    const fetchClubs = async () => {
      try {
        const response = await fetch('http://16.170.205.160/clubs');
        const data = await response.json();
        setClubs(data);
        setFilteredClubs(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchClubs();
  }, [user]);

  // Arama işlevi
  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text.trim() === '') {
      setFilteredClubs(clubs);
    } else {
      const filtered = clubs.filter(club => 
        club.name.toLowerCase().includes(text.toLowerCase()) ||
        (club.category && club.category.toLowerCase().includes(text.toLowerCase())) ||
        (club.description && club.description.toLowerCase().includes(text.toLowerCase()))
      );
      setFilteredClubs(filtered);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => {
        navigation.navigate('KulupDetay', { club: item });
      }}
    >
      <Image source={getLogoForClub(item.name)} style={styles.logo} />
      <Text style={styles.clubName}>{item.name}</Text>
    </TouchableOpacity>
  );

  if (!user) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput 
          style={styles.searchInput}
          placeholder="Kulüp ara"
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <Icon name="search" size={28} color="#666" style={styles.searchIcon} />
      </View>

      <FlatList
        data={filteredClubs}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />

      <View style={styles.overlay}>
        <TouchableOpacity 
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.closeButtonText}>Kapat</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default KulupSecme 