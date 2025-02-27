import axios from 'axios';

const API_URL = 'http://localhost:8080/clientes';

export const ClientesService = {
  async getAll() {
    const response = await axios.get(API_URL);
    return response.data;
  },

  async create(cliente) {
    return axios.post(API_URL, cliente);
  },

  async update(id, cliente) {
    return axios.put(`${API_URL}/${id}`, cliente);
  },

  async delete(id) {
    return axios.delete(`${API_URL}/${id}`);
  }
};
