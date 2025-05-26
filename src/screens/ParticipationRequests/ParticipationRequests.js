import { View, Text, SafeAreaView, TouchableOpacity, FlatList, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '../../context/AuthContext';
import { getParticipationRequests, updateParticipationRequest } from '../../services/api';
import styles from './styles';

const ParticipationRequests = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const data = await getParticipationRequests(user.email);
      setRequests(data);
    } catch (error) {
      console.error('Katılım istekleri yüklenirken hata:', error);
      Alert.alert('Hata', 'Katılım istekleri yüklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleRequestAction = async (requestId, status) => {
    try {
      setLoading(true);
      await updateParticipationRequest(requestId, status);
      
      // İşlem başarılı olduğunda
      Alert.alert(
        'Başarılı',
        status === 'approved' 
          ? 'Katılım isteği başarıyla onaylandı.'
          : 'Katılım isteği başarıyla reddedildi.'
      );
      
      // Listeyi güncelle
      await fetchRequests();
    } catch (error) {
      console.error('İstek işlenirken hata:', error);
      
      // Hata mesajını kullanıcıya göster
      Alert.alert(
        'Hata',
        error.response?.data?.detail || 
        'İşlem sırasında bir hata oluştu. Lütfen tekrar deneyin.'
      );
    } finally {
      setLoading(false);
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'approved':
        return 'Kabul Edildi';
      case 'rejected':
        return 'Reddedildi';
      case 'pending':
      default:
        return 'Beklemede';
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'approved':
        return { color: '#4CAF50', fontWeight: 'bold' };
      case 'rejected':
        return { color: '#f44336', fontWeight: 'bold' };
      case 'pending':
      default:
        return { color: '#FFA000', fontWeight: 'bold' };
    }
  };

  const renderRequestItem = ({ item }) => (
    <View style={styles.requestCard}>
      <View style={styles.requestInfo}>
        <Text style={styles.eventName}>{item.event_name}</Text>
        <Text style={styles.userEmail}>{item.email}</Text>
        <View style={styles.statusContainer}>
          <Text style={styles.requestDate}>
            {new Date(item.created_at).toLocaleDateString('tr-TR')}
          </Text>
          <Text style={[styles.statusText, getStatusStyle(item.status)]}>
            {getStatusText(item.status)}
          </Text>
        </View>
      </View>
      
      {item.status === 'pending' && (
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, styles.approveButton]}
            onPress={() => handleRequestAction(item.id, 'approved')}
          >
            <Icon name="check" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>Onayla</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.actionButton, styles.rejectButton]}
            onPress={() => handleRequestAction(item.id, 'rejected')}
          >
            <Icon name="close" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>Reddet</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Katılım İstekleri</Text>
      </View>

      <FlatList
        data={requests}
        renderItem={renderRequestItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.requestsList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          !loading && (
            <View style={styles.emptyContainer}>
              <Icon name="inbox" size={64} color="#88141c" />
              <Text style={styles.emptyText}>Henüz katılım isteği bulunmuyor</Text>
            </View>
          )
        }
      />
    </SafeAreaView>
  );
};

export default ParticipationRequests; 