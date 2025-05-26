import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Image, Alert } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { createEvent } from '../../services/api';

const Profil = () => {
  const { user, userRole, signOut } = useAuth();
  const navigation = useNavigation();
  const [showEventForm, setShowEventForm] = useState(false);
  const [eventData, setEventData] = useState({
    name: '',
    location: '',
    date_time: '',
    details: '',
    image: null
  });

  const handleSignOut = async () => {
    try {
      await signOut();
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('Çıkış yapılırken hata oluştu:', error);
    }
  };

  const pickImage = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 1000,
      maxWidth: 1000,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('Kullanıcı resim seçimini iptal etti');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        setEventData(prev => ({
          ...prev,
          image: response.assets[0]
        }));
      }
    });
  };

  const handleCreateEvent = async () => {
    try {
      if (!eventData.name || !eventData.location || !eventData.date_time || !eventData.details || !eventData.image) {
        Alert.alert('Hata', 'Lütfen tüm alanları doldurun ve bir resim seçin.');
        return;
      }

      const formData = new FormData();
      formData.append('name', eventData.name);
      formData.append('location', eventData.location);
      formData.append('date_time', eventData.date_time);
      formData.append('details', eventData.details);
      formData.append('club_id', user?.club_id || null);
      
      const imageUri = eventData.image.uri;
      const imageName = imageUri.split('/').pop();
      const match = /\.(\w+)$/.exec(imageName);
      const imageType = match ? `image/${match[1]}` : 'image/jpeg';
      
      formData.append('image', {
        uri: imageUri,
        name: imageName,
        type: imageType
      });

      await createEvent(formData);
      Alert.alert('Başarılı', 'Etkinlik başarıyla eklendi');
      setShowEventForm(false);
      setEventData({
        name: '',
        location: '',
        date_time: '',
        details: '',
        image: null
      });
    } catch (error) {
      Alert.alert('Hata', 'Etkinlik eklenirken bir hata oluştu: ' + error.message);
    }
  };

  const renderEventForm = () => (
    <View style={styles.eventFormContainer}>
      <Text style={styles.formTitle}>Yeni Etkinlik Ekle</Text>
      
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
        placeholder="Tarih ve Saat"
        value={eventData.date_time}
        onChangeText={(text) => setEventData(prev => ({ ...prev, date_time: text }))}
      />
      
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Detaylar"
        multiline
        numberOfLines={4}
        value={eventData.details}
        onChangeText={(text) => setEventData(prev => ({ ...prev, details: text }))}
      />
      
      <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
        <Icon name="add-photo-alternate" size={24} color="#fff" />
        <Text style={styles.imagePickerText}>
          {eventData.image ? 'Resmi Değiştir' : 'Resim Seç'}
        </Text>
      </TouchableOpacity>
      
      {eventData.image && (
        <Image
          source={{ uri: eventData.image.uri }}
          style={styles.selectedImage}
        />
      )}
      
      <View style={styles.formButtons}>
        <TouchableOpacity 
          style={[styles.formButton, styles.cancelButton]} 
          onPress={() => setShowEventForm(false)}
        >
          <Text style={styles.buttonText}>İptal</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.formButton, styles.submitButton]} 
          onPress={handleCreateEvent}
        >
          <Text style={styles.buttonText}>Etkinlik Ekle</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderPresidentMenu = () => (
    <View style={styles.menuContainer}>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('ProfileInfo')}>
        <Icon name="account-details" size={24} color="#333" />
        <Text style={styles.menuText}>Profil Bilgileri</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('KulupDuzenle')}>
        <Icon name="account-edit" size={24} color="#333" />
        <Text style={styles.menuText}>Kulüp Bilgilerini Düzenle</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('CreateEvent')}>
        <Icon name="calendar-plus" size={24} color="#333" />
        <Text style={styles.menuText}>Etkinlik Oluştur</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('UyeYonetimi')}>
        <Icon name="account-group" size={24} color="#333" />
        <Text style={styles.menuText}>Üye Yönetimi</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Etkinliklerim')}>
        <Icon name="event" size={24} color="#88141c" />
        <Text style={styles.menuItemText}>Etkinliklerim</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('MembershipRequests')}>
        <Icon name="group" size={24} color="#88141c" />
        <Text style={styles.menuItemText}>Üye Yönetimi</Text>
      </TouchableOpacity>
    </View>
  );

  const renderUserMenu = () => (
    <View style={styles.menuContainer}>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('ProfileInfo')}>
        <Icon name="account-details" size={24} color="#333" />
        <Text style={styles.menuText}>Profil Bilgileri</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('ProfilDuzenle')}>
        <Icon name="account-edit" size={24} color="#333" />
        <Text style={styles.menuText}>Profili Düzenle</Text>
      </TouchableOpacity>
      
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity 
          style={styles.iconContainer} 
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.centerContainer}>
          <Text style={styles.title}>Profil</Text>
        </View>
        <TouchableOpacity 
          style={styles.iconContainer} 
          onPress={handleSignOut}
        >
          <Icon name="logout" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.profileHeader}>
          <Icon name="account-circle" size={80} color="#88141c" />
          <Text style={styles.userName}>{user?.displayName || 'Kullanıcı'}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
          {userRole === 'president' && (
            <View style={styles.roleContainer}>
              <Icon name="shield-crown" size={16} color="#FFA000" />
              <Text style={styles.roleText}>Kulüp Başkanı</Text>
            </View>
          )}
        </View>

        {showEventForm ? renderEventForm() : (
          userRole === 'president' ? renderPresidentMenu() : renderUserMenu()
        )}
      </ScrollView>
    </View>
  );
};

export default Profil; 