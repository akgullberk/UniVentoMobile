import { View, Text, SafeAreaView, TextInput, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { launchImageLibrary } from 'react-native-image-picker';
import { createEvent } from '../../services/api';
import styles from './styles';
import { useAuth } from '../../context/AuthContext';

const CreateEvent = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [eventData, setEventData] = useState({
    name: '',
    location: '',
    date_time: '',
    details: '',
    club_id: user?.club_id,
    image: null
  });

  const pickImage = async () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 1000,
      maxWidth: 1000,
    };

    try {
      const result = await launchImageLibrary(options);
      
      if (result.didCancel) {
        console.log('Kullanıcı resim seçimini iptal etti');
      } else if (result.errorCode) {
        console.log('ImagePicker Error: ', result.errorMessage);
      } else if (result.assets && result.assets.length > 0) {
        setEventData(prev => ({
          ...prev,
          image: result.assets[0]
        }));
      }
    } catch (error) {
      console.log('Resim seçme hatası:', error);
      Alert.alert('Hata', 'Resim seçilirken bir hata oluştu.');
    }
  };

  const handleSubmit = async () => {
    if (!eventData.name || !eventData.location || !eventData.date_time || !eventData.details || !eventData.image) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun ve bir resim seçin.');
      return;
    }

    try {
      await createEvent(eventData);
      Alert.alert('Başarılı', 'Etkinlik başarıyla oluşturuldu', [
        { text: 'Tamam', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('Hata', 'Etkinlik oluşturulurken bir hata oluştu: ' + error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Yeni Etkinlik Oluştur</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Etkinlik Adı"
            value={eventData.name}
            onChangeText={(text) => setEventData(prev => ({ ...prev, name: text }))}
          />

          <TextInput
            style={styles.input}
            placeholder="Konum"
            value={eventData.location}
            onChangeText={(text) => setEventData(prev => ({ ...prev, location: text }))}
          />

          <TextInput
            style={styles.input}
            placeholder="Tarih ve Saat (GG/AA/YYYY SS:DD)"
            value={eventData.date_time}
            onChangeText={(text) => setEventData(prev => ({ ...prev, date_time: text }))}
          />

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Etkinlik Detayları"
            value={eventData.details}
            onChangeText={(text) => setEventData(prev => ({ ...prev, details: text }))}
            multiline
            numberOfLines={4}
          />

          <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
            <Icon name="add-photo-alternate" size={24} color="#88141c" />
            <Text style={styles.imageButtonText}>
              {eventData.image ? 'Resmi Değiştir' : 'Resim Seç'}
            </Text>
          </TouchableOpacity>

          {eventData.image && (
            <Image
              source={{ uri: eventData.image.uri }}
              style={styles.selectedImage}
            />
          )}

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Etkinlik Oluştur</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateEvent; 