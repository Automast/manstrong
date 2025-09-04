import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api', // The proxy in package.json will handle this
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- App Services ---

export const getApps = (query = '') => {
  return apiClient.get(`/apps?q=${query}`);
};

export const getAppById = (id) => {
  return apiClient.get(`/apps/${id}`);
};

export const getTrendingApps = () => {
    return apiClient.get('/apps/trending');
};

export const createApp = (appData) => {
  return apiClient.post('/apps', appData);
};

export const updateApp = (id, appData) => {
  return apiClient.put(`/apps/${id}`, appData);
};

export const deleteApp = (id) => {
  return apiClient.delete(`/apps/${id}`);
};

// --- Review Services ---

export const submitReview = (appId, reviewData) => {
    return apiClient.post(`/reviews/${appId}`, reviewData);
};

export const getPendingReviews = () => {
    return apiClient.get('/reviews/pending');
};

export const approveReview = (reviewId) => {
    return apiClient.put(`/reviews/approve/${reviewId}`);
};

export const deleteReview = (reviewId) => {
    return apiClient.delete(`/reviews/${reviewId}`);
};

const api = {
    getApps,
    getAppById,
    getTrendingApps,
    createApp,
    updateApp,
    deleteApp,
    submitReview,
    getPendingReviews,
    approveReview,
    deleteReview
};

export default api;
