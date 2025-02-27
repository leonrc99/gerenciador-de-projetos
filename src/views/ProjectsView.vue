<script setup>
import { onMounted, ref } from 'vue';
import { ProjectService } from '../services/projects.service';

// Estado dos projetos e do formulário
const projetos = ref([]);
const projetoSelecionado = ref(null);
const projetoNovo = ref({ status: '', dataInicio: '', dataFim: '', ativo: false });

// Buscar projetos ao montar o componente
const fetchProjetos = async () => {
  try {
    projetos.value = await ProjectService.getAll();
  } catch (error) {
    console.error('Erro ao buscar projetos:', error);
  }
};

onMounted(fetchProjetos);

// Criar novo projeto
const adicionarProjeto = async () => {
  if (!projetoNovo.value.status || !projetoNovo.value.dataInicio || !projetoNovo.value.dataFim) {
    alert('Preencha todos os campos!');
    return;
  }

  try {
    await ProjectService.create(projetoNovo.value);
    projetoNovo.value = { status: '', dataInicio: '', dataFim: '', ativo: false };
    fetchProjetos();
  } catch (error) {
    console.error('Erro ao adicionar projeto:', error);
  }
};

// Selecionar projeto para edição
const selecionarProjeto = (projeto) => {
  projetoSelecionado.value = { ...projeto };
};

// Atualizar projeto
const atualizarProjeto = async () => {
  if (!projetoSelecionado.value || !projetoSelecionado.value.id) return;

  try {
    await ProjectService.update(projetoSelecionado.value.id, projetoSelecionado.value);
    projetoSelecionado.value = null;
    fetchProjetos();
  } catch (error) {
    console.error('Erro ao atualizar projeto:', error);
  }
};

// Deletar projeto
const excluirProjeto = async (id) => {
  if (confirm('Tem certeza que deseja excluir este projeto?')) {
    try {
      await ProjectService.delete(id);
      fetchProjetos();
    } catch (error) {
      console.error('Erro ao excluir projeto:', error);
    }
  }
};
</script>

<template>
  <div class="projetos-container">
    <h1>Gerenciamento de Projetos</h1>

    <!-- Formulário para adicionar novo projeto -->
    <div class="form-container">
      <h2>Adicionar Novo Projeto</h2>
      <input v-model="projetoNovo.status" type="text" placeholder="Status" />
      <input v-model="projetoNovo.dataInicio" type="date" />
      <input v-model="projetoNovo.dataFim" type="date" />
      <label>
        <input v-model="projetoNovo.ativo" type="checkbox" />
        Ativo
      </label>
      <button @click="adicionarProjeto">Adicionar</button>
    </div>

    <!-- Tabela de projetos -->
    <table class="projetos">
      <thead>
        <tr>
          <th>ID</th>
          <th>Status</th>
          <th>Data de Início</th>
          <th>Data Final</th>
          <th>Ativo</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="projeto in projetos" :key="projeto.id">
          <td>{{ projeto.id }}</td>
          <td>{{ projeto.status }}</td>
          <td>{{ projeto.dataInicio }}</td>
          <td>{{ projeto.dataFim }}</td>
          <td>{{ projeto.ativo ? 'Sim' : 'Não' }}</td>
          <td>
            <button @click="selecionarProjeto(projeto)">✏️ Editar</button>
            <button @click="excluirProjeto(projeto.id)">❌ Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Formulário de edição -->
    <div v-if="projetoSelecionado" class="form-container">
      <h2>Editar Projeto</h2>
      <input v-model="projetoSelecionado.status" type="text" placeholder="Status" />
      <input v-model="projetoSelecionado.dataInicio" type="date" />
      <input v-model="projetoSelecionado.dataFim" type="date" />
      <label>
        <input v-model="projetoSelecionado.ativo" type="checkbox" />
        Ativo
      </label>
      <button @click="atualizarProjeto()">Atualizar</button>
      <button @click="projetoSelecionado = null" class="cancelar">Cancelar</button>
    </div>
  </div>
</template>

<style scoped>
.projetos-container {
  width: 100%;
  max-width: 900px;
  margin: 40px auto;
  text-align: center;
  font-family: 'Inter', sans-serif;
}

h1, h2 {
  color: #333;
}

.form-container {
  background: #ffffff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

input, button, label {
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  font-size: 16px;
}

button {
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
}

button:hover {
  background: #0056b3;
}

button.cancelar {
  background: #dc3545;
}

.projetos {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.projetos thead {
  background: #007bff;
  color: white;
}

.projetos th, .projetos td {
  padding: 12px;
  border-bottom: 1px solid #ddd;
}

.projetos td button {
  margin-right: 5px;
}
</style>
