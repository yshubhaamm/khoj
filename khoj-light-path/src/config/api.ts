// API Configuration for Khoj AI Backend
export const API_CONFIG = {
  BASE_URL: 'http://localhost:8000', // Configure this for your backend
  ENDPOINTS: {
    FACE_SEARCH: '/face/search',
    AGE_PROGRESS: '/age/age_progress',
    CONTACT: '/contact'
  }
};

export const getApiUrl = (endpoint: string) => `${API_CONFIG.BASE_URL}${endpoint}`;