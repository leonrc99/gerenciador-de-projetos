<script setup>
import ProjectsView from './views/ProjectsView.vue';
</script>


<template>
  <div class="app-container">
    <div id="nav">
        <router-link to="/">Home</router-link>
        <router-link to="/projects">Projetos</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>



<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f8f9fa;
  font-family: 'Inter', sans-serif;
}

#nav {
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 15px 0;
  background: #ffffff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin-top: 20px;
}

#nav a {
  color: #007bff;
  text-decoration: none;
  font-size: 16px;
  font-weight: 600;
  padding: 10px 15px;
  border-radius: 5px;
  transition: all 0.3s ease;
}

#nav a:hover {
  background: #007bff;
  color: white;
}

.router-view {
  width: 100%;
  max-width: 1200px;
  padding: 20px;
}
</style>
