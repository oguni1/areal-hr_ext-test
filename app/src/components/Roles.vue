<template>
  <div class="container">
    <h1>Роли</h1>
    <div>
      <h2>Добавить роль</h2>
      <input v-model="newRole.name" placeholder="Название роли" />
      <button @click="addRole">Добавить</button>
    </div>

    <div>
      <h2>Список ролей</h2>
      <div v-for="role in roles" :key="role.id">
        <p>ID: {{ role.id }}</p>
        <template v-if="editingRole && editingRole.id === role.id">
          <input v-model="editingRole.name" placeholder="Название роли" />
          <button @click="updateRole">Сохранить</button>
          <button @click="cancelEdit">Отмена</button>
        </template>
        <template v-else>
          <p>Название: {{ role.name }}</p>
          <button @click="startEdit(role)">Редактировать</button>
          <button @click="deleteRole(role.id)">Удалить</button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roles: [],
      newRole: {
        name: '',
      },
      editingRole: null,
      loading: false,
    };
  },
  async created() {
    await this.fetchRoles();
  },
  methods: {
    getNextId() {
      if (this.roles.length === 0) return 1;
      const maxId = Math.max(...this.roles.map((role) => parseInt(role.id)));
      return maxId + 1;
    },
    async fetchRoles() {
      this.loading = true;
      try {
        const response = await this.$api.get('/roles');
        this.roles = response.data;
      } catch (error) {
        console.error('Ошибка при загрузке ролей:', error);
      } finally {
        this.loading = false;
      }
    },
    async addRole() {
      if (!this.newRole.name) {
        alert('Название роли обязательно!');
        return;
      }

      try {
        const newRoleWithId = {
          ...this.newRole,
          id: this.getNextId(),
        };
        await this.$api.post('/roles', newRoleWithId);
        this.newRole = { name: '' };
        await this.fetchRoles();
      } catch (error) {
        console.error('Ошибка при добавлении роли:', error);
        alert(`Ошибка: ${error.response?.data?.message || error.message}`);
      }
    },
    async deleteRole(id) {
      if (!confirm('Вы уверены, что хотите удалить эту роль?')) return;

      try {
        await this.$api.delete(`/roles/${id}`);
        await this.fetchRoles();
      } catch (error) {
        console.error('Ошибка при удалении роли:', error);
      }
    },
    startEdit(role) {
      this.editingRole = { ...role };
    },
    cancelEdit() {
      this.editingRole = null;
    },
    async updateRole() {
      if (!this.editingRole.name) {
        alert('Название роли обязательно!');
        return;
      }

      try {
        const updateData = {
          id: this.editingRole.id,
          name: this.editingRole.name,
        };
        await this.$api.put(`/roles/${this.editingRole.id}`, updateData);
        this.editingRole = null;
        await this.fetchRoles();
      } catch (error) {
        console.error('Ошибка при обновлении роли:', error);
        alert(`Ошибка: ${error.response?.data?.message || error.message}`);
      }
    },
  },
};
</script>
