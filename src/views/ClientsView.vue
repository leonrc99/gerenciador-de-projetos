<script setup>
import { onMounted, ref } from 'vue';
import { ClientesService } from '../services/clientes.service';

// Estado dos clientes e do formulário
const clientes = ref([]);
const clienteSelecionado = ref(null);
const clienteNovo = ref({
  nome: '',
  cpf: '',
  email: '',
  telefone: '',
  endereco: {
    logradouro: '',
    bairro: '',
    cep: '',
    numero: '',
    complemento: '',
    cidade: '',
    uf: ''
  }
});

// Buscar clientes ao montar o componente
const fetchClientes = async () => {
  try {
    clientes.value = await ClientesService.getAll();
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
  }
};

onMounted(fetchClientes);

// Criar novo cliente
const adicionarCliente = async () => {
  try {
    await ClientesService.create(clienteNovo.value);
    clienteNovo.value = {
      nome: '',
      cpf: '',
      email: '',
      telefone: '',
      endereco: { logradouro: '', bairro: '', cep: '', numero: '', complemento: '', cidade: '', uf: '' }
    };
    fetchClientes();
  } catch (error) {
    console.error('Erro ao adicionar cliente:', error);
  }
};

// Selecionar cliente para edição
const selecionarCliente = (cliente) => {
  clienteSelecionado.value = { ...cliente };
};

// Atualizar cliente
const atualizarCliente = async () => {
  if (!clienteSelecionado.value || !clienteSelecionado.value.id) return;

  try {
    await ClientesService.update(clienteSelecionado.value.id, clienteSelecionado.value);
    clienteSelecionado.value = null;
    fetchClientes();
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
  }
};

// Deletar cliente
const excluirCliente = async (id) => {
  if (confirm('Tem certeza que deseja excluir este cliente?')) {
    try {
      await ClientesService.delete(id);
      fetchClientes();
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
    }
  }
};
</script>

<template>
  <div class="clientes-container">
    <h1>Gerenciamento de Clientes</h1>

    <!-- Formulário para adicionar novo cliente -->
    <div class="form-container">
      <h2>Adicionar Novo Cliente</h2>
      <input v-model="clienteNovo.nome" type="text" placeholder="Nome" required />
      <input v-model="clienteNovo.cpf" type="text" placeholder="CPF" required />
      <input v-model="clienteNovo.email" type="email" placeholder="Email" required />
      <input v-model="clienteNovo.telefone" type="text" placeholder="Telefone" required />

      <h3>Endereço</h3>
      <input v-model="clienteNovo.endereco.logradouro" type="text" placeholder="Logradouro" />
      <input v-model="clienteNovo.endereco.bairro" type="text" placeholder="Bairro" />
      <input v-model="clienteNovo.endereco.cep" type="text" placeholder="CEP" />
      <input v-model="clienteNovo.endereco.numero" type="text" placeholder="Número" />
      <input v-model="clienteNovo.endereco.complemento" type="text" placeholder="Complemento" />
      <input v-model="clienteNovo.endereco.cidade" type="text" placeholder="Cidade" />
      <input v-model="clienteNovo.endereco.uf" type="text" placeholder="UF" />

      <button @click="adicionarCliente">Adicionar</button>
    </div>

    <!-- Tabela de clientes -->
    <table class="clientes">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>CPF</th>
          <th>Email</th>
          <th>Telefone</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cliente in clientes" :key="cliente.id">
          <td>{{ cliente.id }}</td>
          <td>{{ cliente.nome }}</td>
          <td>{{ cliente.cpf }}</td>
          <td>{{ cliente.email }}</td>
          <td>{{ cliente.telefone }}</td>
          <td>
            <button @click="selecionarCliente(cliente)">✏️ Editar</button>
            <button @click="excluirCliente(cliente.id)">❌ Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Formulário de edição -->
    <div v-if="clienteSelecionado" class="form-container">
      <h2>Editar Cliente</h2>
      <input v-model="clienteSelecionado.nome" type="text" placeholder="Nome" />
      <input v-model="clienteSelecionado.cpf" type="text" placeholder="CPF" />
      <input v-model="clienteSelecionado.email" type="email" placeholder="Email" />
      <input v-model="clienteSelecionado.telefone" type="text" placeholder="Telefone" />

      <h3>Endereço</h3>
      <input v-model="clienteSelecionado.endereco.logradouro" type="text" placeholder="Logradouro" />
      <input v-model="clienteSelecionado.endereco.bairro" type="text" placeholder="Bairro" />
      <input v-model="clienteSelecionado.endereco.cep" type="text" placeholder="CEP" />
      <input v-model="clienteSelecionado.endereco.numero" type="text" placeholder="Número" />
      <input v-model="clienteSelecionado.endereco.complemento" type="text" placeholder="Complemento" />
      <input v-model="clienteSelecionado.endereco.cidade" type="text" placeholder="Cidade" />
      <input v-model="clienteSelecionado.endereco.uf" type="text" placeholder="UF" />

      <button @click="atualizarCliente">Atualizar</button>
      <button @click="clienteSelecionado = null" class="cancelar">Cancelar</button>
    </div>
  </div>
</template>

<style scoped>
.clientes-container {
  width: 100%;
  max-width: 900px;
  margin: 40px auto;
  text-align: center;
  font-family: 'Inter', sans-serif;
}

h1, h2, h3 {
  color: #333;
}

.form-container {
  background: #ffffff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

input, button {
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

.clientes {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.clientes thead {
  background: #007bff;
  color: white;
}

.clientes th, .clientes td {
  padding: 12px;
  border-bottom: 1px solid #ddd;
}

.clientes td button {
  margin-right: 5px;
}
</style>
