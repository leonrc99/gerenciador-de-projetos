<template>
    <div class="container">
      <h1>Bem-vindo à Gestão de Projetos</h1>
      
      <div class="cards-container">
        <router-link to="/" class="card">
          <h2>Home</h2>
        </router-link>
  
        <router-link to="/projects" class="card">
          <h2>Projetos</h2>
        </router-link>
  
        <router-link to="/clients" class="card">
          <h2>Clientes</h2>
        </router-link>
  
        <router-link to="/activities" class="card">
          <h2>Atividades</h2>
        </router-link>
      </div>
    </div>
  </template>

<style scoped>
.container {
  text-align: center;
  padding: 40px 20px;
  font-family: 'Inter', sans-serif;
}

h1 {
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-bottom: 30px;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.card {
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  text-decoration: none;
  color: #333;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.card img {
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
}

.card h2 {
  font-size: 18px;
  margin-bottom: 10px;
  color: #007bff;
}

.card p {
  font-size: 14px;
  color: #555;
}

@media (max-width: 600px) {
  .cards-container {
    grid-template-columns: 1fr;
  }
}
</style>
