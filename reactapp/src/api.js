import axios from 'axios';

const API_BASE = 'https://8080-eabafdeaaedfdaeabecfcdcbcbcbccaa.premiumproject.examly.io/api/documents';

export const uploadDocument = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  return axios.post(`${API_BASE}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getDocuments = () => {
  return axios.get(`${API_BASE}/list`);
};