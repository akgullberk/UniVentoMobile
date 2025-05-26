import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '../../context/AuthContext';
import styles from './styles';

const ProfileInfo = () => {
  const navigation = useNavigation();
  const { user } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profil Bilgileri</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.profileImageContainer}>
          <Icon name="account-circle" size={100} color="#88141c" />
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Ad Soyad</Text>
            <Text style={styles.infoValue}>{user?.displayName || 'Belirtilmemiş'}</Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>E-posta</Text>
            <Text style={styles.infoValue}>{user?.email || 'Belirtilmemiş'}</Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Üyelik Durumu</Text>
            <Text style={styles.infoValue}>{user?.role === 'president' ? 'Kulüp Başkanı' : 'Üye'}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileInfo; 