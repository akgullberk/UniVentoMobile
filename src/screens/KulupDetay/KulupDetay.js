import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../../context/AuthContext'

const KulupDetay = ({ route }) => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const { club } = route.params;
  const [clubDetails, setClubDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [joinStatus, setJoinStatus] = useState('');

  useEffect(() => {
    const fetchClubDetails = async () => {
      try {
        const response = await fetch('http://16.170.205.160/clubs');
        const clubs = await response.json();
        const selectedClub = clubs.find(c => c._id === club._id);
        
        if (!selectedClub) {
          throw new Error('Kulüp bulunamadı');
        }
        
        setClubDetails(selectedClub);
        setLoading(false);
      } catch (error) {
        console.error('Veri alınırken hata:', error);
        setError('Kulüp bilgileri yüklenirken bir hata oluştu');
        setLoading(false);
      }
    };

    fetchClubDetails();
  }, [club._id]);

  const handleJoinClub = async () => {
    if (!user) {
      navigation.navigate('GirisKayit');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('email', user.email);

      const response = await fetch(`http://16.170.205.160/api/clubs/${club._id}/join`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: formData
      });

      const data = await response.json();

      if (data.status_code === 200) {
        setJoinStatus('success');
        Alert.alert('Başarılı', 'Üyelik başvurunuz başarıyla alındı!');
      } else if (data.status_code === 400) {
        setJoinStatus('already');
        Alert.alert('Uyarı', 'Bu kulübe zaten üyelik başvurunuz bulunmakta.');
      } else {
        setJoinStatus('error');
        Alert.alert('Hata', 'Üyelik başvurusu sırasında bir hata oluştu.');
      }
    } catch (error) {
      console.error('Üyelik başvurusu sırasında hata:', error);
      setJoinStatus('error');
      Alert.alert('Hata', 'Üyelik başvurusu sırasında bir hata oluştu.');
    }
  };

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
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Kulüp Detayı</Text>
        </View>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Yükleniyor...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Kulüp Detayı</Text>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!clubDetails) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Kulüp Detayı</Text>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Kulüp bulunamadı</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Kulüp Detayı</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.clubHeader}>
          <Image 
            source={getLogoForClub(clubDetails.name)} 
            style={styles.clubLogo}
          />
          <Text style={styles.clubName}>{clubDetails.name}</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Kulüp Bilgileri</Text>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>E-posta:</Text>
            <Text style={styles.infoValue}>{clubDetails.email || 'Belirtilmemiş'}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Website:</Text>
            <Text style={styles.infoValue}>{clubDetails.website || 'Belirtilmemiş'}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Danışman:</Text>
            <Text style={styles.infoValue}>{clubDetails.advisor || 'Belirtilmemiş'}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Başkan:</Text>
            <Text style={styles.infoValue}>{clubDetails.president || 'Belirtilmemiş'}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Kategori:</Text>
            <Text style={styles.infoValue}>{clubDetails.category || 'Belirtilmemiş'}</Text>
          </View>
        </View>

        {user && (
          <TouchableOpacity 
            style={[
              styles.joinButton,
              joinStatus === 'already' && styles.joinButtonDisabled
            ]}
            onPress={handleJoinClub}
            disabled={joinStatus === 'already'}
          >
            <Text style={styles.joinButtonText}>Kulübe Üye Ol</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default KulupDetay 