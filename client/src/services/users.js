import api from './apiConfig';

export const getUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {}
};

export const getUser = async (id) => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signinUser = async (user, prevToken) => {
  try {
    if (user) {
      const auth = await api.post(`/auth`, user);
      const token = auth.data.token;

      localStorage.setItem('jwt-token', JSON.stringify(token));

      const response = await api.get(`/auth`, {
        headers: {
          'jwt-token': token
        }
      });

      return response.data;
    } else {
      const response = await api.get(`/auth`, {
        headers: {
          'jwt-token': prevToken
        }
      });

      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const createUser = async (user) => {
  try {
    await api.post('/users', user);
    const response = await signinUser(user);
    console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (id, user) => {
  try {
    const response = await api.put(`/users/${id}`, user);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
