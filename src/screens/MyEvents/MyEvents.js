import { View, Text, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '../../context/AuthContext';
import { getEvents } from '../../services/api';
import styles from './styles';

const MyEvents = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await getEvents();
      // Şimdilik tüm etkinlikleri gösteriyoruz, backend'de filtreleme yapılacak
      setEvents(data);
    } catch (error) {
      console.error('Etkinlikler yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderEventCard = ({ item }) => (
    <View style={styles.eventCard}>
      <Image
        source={item.image_url ? { uri: item.image_url } : require('../../assets/default-event.png')}
        style={styles.eventImage}
        resizeMode="cover"
      />
      <View style={styles.eventInfo}>
        <Text style={styles.eventName}>{item.name}</Text>
        <View style={styles.eventDetails}>
          <View style={styles.detailRow}>
            <Icon name="location-on" size={16} color="#88141c" />
            <Text style={styles.detailText}>{item.location}</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="event" size={16} color="#88141c" />
            <Text style={styles.detailText}>{item.date_time}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Etkinliklerim</Text>
        <TouchableOpacity 
          style={styles.requestButton} 
          onPress={() => navigation.navigate('ParticipationRequests')}
        >
          <Icon name="people" size={24} color="#fff" />
          <Text style={styles.requestButtonText}>Katılım İstekleri</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={events}
        renderItem={renderEventCard}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.eventsList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          !loading && (
            <View style={styles.emptyContainer}>
              <Icon name="event-busy" size={64} color="#88141c" />
              <Text style={styles.emptyText}>Henüz etkinlik bulunmuyor</Text>
            </View>
          )
        }
      />
    </SafeAreaView>
  );
};

export default MyEvents; 