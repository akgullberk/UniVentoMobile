import axios from 'axios';

const API_URL = 'http://16.170.205.160/api';

export const getEvents = async () => {
  try {
    const response = await axios.get(`${API_URL}/events`);
    return response.data;
  } catch (error) {
    console.error('Etkinlikler alınırken hata oluştu:', error);
    throw error;
  }
};

export const createEvent = async (eventData) => {
  try {
    const formData = new FormData();
    formData.append('name', eventData.name);
    formData.append('location', eventData.location);
    formData.append('date_time', eventData.date_time);
    formData.append('details', eventData.details);
    
    if (eventData.club_id) {
      formData.append('club_id', eventData.club_id);
    }

    if (eventData.image) {
      const imageUri = eventData.image.uri;
      const imageName = imageUri.split('/').pop();
      const match = /\.(\w+)$/.exec(imageName);
      const imageType = match ? `image/${match[1]}` : 'image/jpeg';
      
      formData.append('image', {
        uri: imageUri,
        name: imageName,
        type: imageType
      });
    }

    const response = await axios.post(`${API_URL}/events`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Etkinlik eklenirken hata oluştu:', error);
    throw error;
  }
};

// Kulüp başkanının katılım isteklerini görüntülemesi
export const getParticipationRequests = async (clubPresidentEmail) => {
  try {
    const response = await axios.get(`${API_URL}/events/participation-requests/${clubPresidentEmail}`);
    return response.data;
  } catch (error) {
    console.error('Katılım istekleri alınırken hata oluştu:', error);
    throw error;
  }
};

// Katılım isteğini onayla veya reddet
export const updateParticipationRequest = async (requestId, status) => {
  try {
    const response = await axios.put(`${API_URL}/events/participation-requests/${requestId}`, {
      status: status
    });
    return response.data;
  } catch (error) {
    console.error('Katılım isteği güncellenirken hata oluştu:', error);
    throw error;
  }
};

// Kulüp başkanının üyelik başvurularını görüntülemesi
export const getMembershipRequests = async (clubPresidentEmail) => {
  try {
    const response = await axios.get(`${API_URL}/clubs/membership-requests/${clubPresidentEmail}`);
    return response.data;
  } catch (error) {
    console.error('Üyelik başvuruları alınırken hata oluştu:', error);
    throw error;
  }
};

// Üyelik başvurusunu onayla veya reddet
export const updateMembershipRequest = async (requestId, status) => {
  try {
    const response = await axios.put(`${API_URL}/clubs/membership-requests/${requestId}`, {
      status: status
    });
    return response.data;
  } catch (error) {
    console.error('Üyelik başvurusu güncellenirken hata oluştu:', error);
    throw error;
  }
};

// Etkinliğe katılım isteği gönder
export const sendParticipationRequest = async (eventId, email) => {
  try {
    const formData = new FormData();
    formData.append('email', email);

    const response = await axios.post(
      `${API_URL}/events/${eventId}/participate`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Katılım isteği gönderilirken hata oluştu:', error);
    throw error;
  }
}; 