<script setup>
import ProjectsView from './views/ProjectsView.vue';
</script>


<template>
  <div class="app-container">
    <ProjectsView />
  </div>
</template>



<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #000;
  background-color: #fff;
}
</style>