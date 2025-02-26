import { defineStore } from 'pinia'
import { ProjectService } from '@/services/projects.service'

export const useProjectStore = defineStore('projects', {
  state: () => ({
    projects: [],
    loading: false
  }),

  actions: {
    async fetchProjects() {
      this.loading = true
      try {
        this.projects = await ProjectService.getAll()
      } finally {
        this.loading = false
      }
    },

    async createProject(projectData) {
      await ProjectService.create(projectData)
      await this.fetchProjects()
    }
  }
})