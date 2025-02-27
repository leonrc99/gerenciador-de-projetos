import { createRouter, createWebHistory } from 'vue-router';
import ProjectsView from '../views/ProjectsView.vue';
import Home from '../views/Home.vue';
import ClientsView from '../views/ClientsView.vue';
import ActivitiesView from '../views/ActivitiesView.vue';

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
  },
  {
    path:'/clients',
    name: 'Clientes',
    component: ClientsView
  },
  {
    path:'/activities',
    name: 'Atividades',
    component: ActivitiesView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;