import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import BottomBar from '../../components/BottomBar/BottomBar'
import styles from './styles'

const EventDetail = ({ route }) => {
  const { event } = route.params;
  const navigation = useNavigation();

  const handleJoinEvent = () => {
    // Burada etkinliğe katılma işlemleri yapılabilir
    alert('Etkinliğe katılım talebiniz alındı!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Etkinlik Detayları</Text>
      </View>

      <ScrollView style={styles.content}>
        <Image
          source={event.image_url ? { uri: event.image_url } : require('../../assets/default-event.png')}
          style={styles.eventImage}
          resizeMode="cover"
        />

        <View style={styles.eventInfo}>
          <Text style={styles.eventName}>{event.name}</Text>
          
          <View style={styles.infoRow}>
            <Icon name="location-on" size={20} color="#88141c" />
            <Text style={styles.eventLocation}>{event.location}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Icon name="event" size={20} color="#88141c" />
            <Text style={styles.eventDate}>{event.date_time}</Text>
          </View>

          {event.details && (
            <View style={styles.detailsContainer}>
              <Text style={styles.detailsTitle}>Detaylar</Text>
              <Text style={styles.eventDetails}>{event.details}</Text>
            </View>
          )}

          <TouchableOpacity style={styles.joinButton} onPress={handleJoinEvent}>
            <Text style={styles.joinButtonText}>Etkinliğe Katıl</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomBar />
    </SafeAreaView>
  );
};

export default EventDetail; 