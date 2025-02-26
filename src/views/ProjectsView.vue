<script setup>
import { onMounted, ref } from 'vue';
import { ProjectService } from '../services/projects.service';

const projetos = ref([])

const fetchProjetos = async () => {
  projetos.value = await ProjectService.getAll()
}



onMounted(fetchProjetos)
</script>

<template>
  <div class="tabela-projetos">
    <table class="projetos">
      <thead>
        <tr>
          <th>ID</th>
          <th>Status</th>
          <th>Data de Início</th>
          <th>Data Final</th>
          <th>Ativo</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="projeto in projetos" :key="projeto.id" class="linha-tabela">
          <td>{{ projeto.id }}</td>
          <td>{{ projeto.status }}</td>
          <td>{{ projeto.dataInicio }}</td>
          <td>{{ projeto.dataFim }}</td>
          <td>{{ projeto.ativo }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.tabela-projetos {
  width: 100%;
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
}

.projetos {
  width: 100%;
  border-collapse: collapse;
  font-family: 'Inter', sans-serif;
}

.projetos thead {
  background: #007bff;
  color: #ffffff;
}

.projetos th, .projetos td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.projetos tbody tr:hover {
  background: #f1f1f1;
  transition: background 0.3s ease;
}

.linha-tabela td {
  font-size: 14px;
  color: #333;
}

.linha-tabela button {
  background: #007bff;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.linha-tabela button:hover {
  background: #0056b3;
}

/* Responsividade */
@media (max-width: 768px) {
  .projetos th, .projetos td {
    padding: 10px;
    font-size: 13px;
  }
}
</style>

