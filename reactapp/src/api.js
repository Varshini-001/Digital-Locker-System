import axios from 'axios';

const API_BASE = 'https://8080-eabafdeaaedfdaeabecfcdcbcbcbccaa.premiumproject.examly.io/api/documents';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const uploadDocument = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  return axios.post(`${API_BASE}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      ...getAuthHeaders(),
    },
  });
};

export const getDocuments = () => {
  return axios.get(`${API_BASE}/list`, {
    headers: getAuthHeaders(),
  });
};

export const viewDocument = (id) => {
  return axios.get(`${API_BASE}/view/${id}`, {
    headers: getAuthHeaders(),
    responseType: 'blob',
  });
};

export const deleteDocument = (id) => {
  return axios.delete(`${API_BASE}/delete/${id}`, {
    headers: getAuthHeaders(),
  });
};