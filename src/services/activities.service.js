import axios from 'axios';

const API_URL = 'http://localhost:8080/atividades';

export const ActivityService = {
  async getAll() {
    const response = await axios.get(API_URL);
    return response.data;
  },

  async getById(id) {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  async create(activity) {
    return axios.post(API_URL, activity);
  },

  async update(id, activity) {
    return axios.put(`${API_URL}/${id}`, activity);
  },

  async delete(id) {
    return axios.delete(`${API_URL}/${id}`);
  }
};
