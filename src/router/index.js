import { createRouter, createWebHistory } from 'vue-router';
import ProjectsView from '../views/ProjectsView.vue';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:'/projects',
    name: 'Projetos',
    component: ProjectsView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;