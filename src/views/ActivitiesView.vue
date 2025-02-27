<script setup>
import { onMounted, ref } from 'vue';
import { ActivityService } from '../services/activities.service';
import { ClientesService } from '../services/clientes.service';
import { ProjectService } from '../services/projects.service';

const atividades = ref([]);
const novaAtividade = ref({
  atividade: '',
  idCliente: null,
  idProjeto: null
});
const editando = ref(false);
const atividadeSelecionada = ref(null);
const clientes = ref([])
const projetos = ref([])

const fetchData = async () => {
  atividades.value = await ActivityService.getAll();
  clientes.value = await ClientesService.getAll();
  projetos.value = await ProjectService.getAll();
};

const criarAtividade = async () => {
  if (!novaAtividade.value.atividade || !novaAtividade.value.idCliente || !novaAtividade.value.idProjeto) {
    alert('Todos os campos são obrigatórios.');
    return;
  }
  await ActivityService.create(novaAtividade.value);
  novaAtividade.value = { atividade: '', idCliente: null, idProjeto: null };
  fetchData();
};

const iniciarEdicao = (atividade) => {
  editando.value = true;
  atividadeSelecionada.value = { ...atividade };
};

const atualizarAtividade = async () => {
  if (!atividadeSelecionada.value.atividade || !atividadeSelecionada.value.idCliente || !atividadeSelecionada.value.idProjeto) {
    alert('Todos os campos são obrigatórios.');
    return;
  }
  await ActivityService.update(atividadeSelecionada.value.id, atividadeSelecionada.value);
  atividadeSelecionada.value = null;
  editando.value = false;
  fetchData();
};

const deletarAtividade = async (id) => {
  if (confirm('Tem certeza que deseja excluir esta atividade?')) {
    await ActivityService.delete(id);
    fetchData();
  }
};

onMounted(fetchData);
</script>

<template>
  <div class="container">
    <h1>Gestão de Atividades</h1>

    <div class="form-container">
      <input type="text" v-model="novaAtividade.atividade" placeholder="Atividade">
      
      <!-- Dropdown para Clientes -->
      <select v-model="novaAtividade.idCliente">
        <option disabled value="">Selecione um Cliente</option>
        <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">
          {{ cliente.nome }}
        </option>
      </select>

      <!-- Dropdown para Projetos -->
      <select v-model="novaAtividade.idProjeto">
        <option disabled value="">Selecione um Projeto</option>
        <option v-for="projeto in projetos" :key="projeto.id" :value="projeto.id">
          {{ projeto.nome }}
        </option>
      </select>

      <button @click="criarAtividade">Criar Atividade</button>
    </div>

    <div v-if="editando" class="edit-container">
      <h3>Editar Atividade</h3>
      <input type="text" v-model="atividadeSelecionada.atividade">
      
      <!-- Dropdown para Clientes (Edição) -->
      <select v-model="atividadeSelecionada.idCliente">
        <option disabled value="">Selecione um Cliente</option>
        <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">
          {{ cliente.nome }}
        </option>
      </select>

      <!-- Dropdown para Projetos (Edição) -->
      <select v-model="atividadeSelecionada.idProjeto">
        <option disabled value="">Selecione um Projeto</option>
        <option v-for="projeto in projetos" :key="projeto.id" :value="projeto.id">
          {{ projeto.nome }}
        </option>
      </select>

      <button @click="atualizarAtividade">Salvar</button>
      <button @click="editando = false">Cancelar</button>
    </div>

    <table class="tabela-atividades">
      <thead>
        <tr>
          <th>ID</th>
          <th>Atividade</th>
          <th>ID Cliente</th>
          <th>ID Projeto</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="atividade in atividades" :key="atividade.id">
          <td>{{ atividade.id }}</td>
          <td>{{ atividade.atividade }}</td>
          <td>{{ atividade.idCliente }}</td>
          <td>{{ atividade.idProjeto }}</td>
          <td>
            <button @click="iniciarEdicao(atividade)">✏️ Editar</button>
            <button @click="deletarAtividade(atividade.id)">🗑️ Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1 {
  color: #333;
  margin-bottom: 20px;
}

.form-container,
.edit-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

input,
select {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  width: 100%;
  max-width: 300px;
}

select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: white;
  background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none"%3E%3Cpath d="M5 7l5 5 5-5" stroke="%23333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"%3E%3C/path%3E%3C/svg%3E');
  background-repeat: no-repeat;
  background-position: right 10px center;
}

button {
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
  width: 100%;
  max-width: 300px;
}

button:hover {
  background: #0056b3;
}

.tabela-atividades {
  width: 100%;
  border-collapse: collapse;
}

.tabela-atividades th,
.tabela-atividades td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.tabela-atividades th {
  background: #007bff;
  color: white;
}

.tabela-atividades tbody tr:hover {
  background: #f1f1f1;
}

button {
  margin: 5px;
}
</style>
