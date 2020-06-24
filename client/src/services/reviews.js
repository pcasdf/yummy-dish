import api from './apiConfig';

export const getReviews = async (id) => {
  try {
    const response = await api.get(`/reviews/recipe/${id}`);
    console.log(response);
    return response.data;
  } catch (error) {}
};

export const getReview = async (id) => {
  try {
    const response = await api.get(`/reviews/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createReview = async (review) => {
  try {
    const response = await api.post('/reviews', review);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateReview = async (id, review) => {
  try {
    const response = await api.put(`/reviews/${id}`, review);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteReview = async (id) => {
  try {
    const response = await api.delete(`/reviews/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
