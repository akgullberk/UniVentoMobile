import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import BottomBar from '../../components/BottomBar/BottomBar'
import styles from './styles'
import { useAuth } from '../../context/AuthContext'
import { sendParticipationRequest } from '../../services/api'

const EventDetail = ({ route }) => {
  const { event } = route.params;
  const navigation = useNavigation();
  const { user } = useAuth();

  const handleParticipate = async () => {
    try {
      await sendParticipationRequest(event.id, user.email);
      Alert.alert(
        '✨ Harika!',
        'Etkinliğe katılım isteğiniz başarıyla gönderildi!\n\nKulüp başkanının onayından sonra etkinliğe katılabileceksiniz.',
        [
          { text: 'Tamam', style: 'default' }
        ]
      );
    } catch (error) {
      const errorMessage = error.response?.data?.detail || 'Bir hata oluştu. Lütfen tekrar deneyin.';
      Alert.alert('Hata', errorMessage);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Etkinlik Detayları</Text>
      </View>

      <View style={styles.mainContainer}>
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
          </View>
        </ScrollView>

        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.participateButton} onPress={handleParticipate}>
            <Icon name="group-add" size={24} color="#fff" />
            <Text style={styles.participateButtonText}>Etkinliğe Katıl</Text>
          </TouchableOpacity>
          <BottomBar />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EventDetail; 