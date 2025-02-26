import axios from 'axios'

const API_URL = 'http://localhost:8080/api/projects'

export const ProjectService = {
  async getAll() {
    const response = await axios.get(API_URL)
    return response.data
  },

  async getById(id) {
    const response = await axios.get(`${API_URL}/${id}`)
    return response.data
  },

  async create(project) {
    return axios.post(API_URL, project)
  },

  async update(id, project) {
    return axios.put(`${API_URL}/${id}`, project)
  }
}