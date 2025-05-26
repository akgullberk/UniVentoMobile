import {Text, View, SafeAreaView, TextInput, TouchableOpacity, FlatList, Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import BottomBar from '../../components/BottomBar/BottomBar'
import { useAuth } from '../../context/AuthContext'
import { getEvents } from '../../services/api'

const { width } = Dimensions.get('window');
const cardWidth = (width - 45) / 2; // 2 sütun için genişlik

const Home = () => {
  const navigation = useNavigation();
  const { user, signOut } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (error) {
      console.error('Etkinlikler yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEventPress = (event) => {
    navigation.navigate('EventDetail', { event });
  };

  const renderEventCard = ({ item }) => (
    <TouchableOpacity 
      style={[styles.eventCard, { width: cardWidth }]}
      onPress={() => handleEventPress(item)}
    >
      <Image
        source={item.image_url ? { uri: item.image_url } : require('../../assets/default-event.png')}
        style={styles.eventImage}
        resizeMode="cover"
      />
      <View style={styles.eventInfo}>
        <Text style={styles.eventName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.eventLocation} numberOfLines={1}>{item.location}</Text>
        <Text style={styles.eventDate}>{item.date_time}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleMenuPress = async () => {
    if (user) {
      try {
        await signOut();
      } catch (error) {
        console.error('Çıkış yapılırken hata:', error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity>
          <Icon name="menu" size={28} color="#fff" />
        </TouchableOpacity>
        
        <View style={styles.centerContainer}>
          <Text style={styles.title}>UniVento</Text>
        </View>

        {user && (
          <TouchableOpacity onPress={() => navigation.navigate('KulupSecme')}>
            <Icon name="groups" size={24} color="#fff" />
          </TouchableOpacity>
        )}

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
        {!user ? (
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>
              Hoş Geldiniz! Etkinlikleri görmek için lütfen giriş yapın.
            </Text>
          </View>
        ) : (
          <FlatList
            data={events}
            renderItem={renderEventCard}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            contentContainerStyle={styles.eventsList}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      <BottomBar />
    </SafeAreaView>
  )
}

export default Home