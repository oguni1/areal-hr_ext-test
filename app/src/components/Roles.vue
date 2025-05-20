<template>
  <div class="container">
    <h1>Роли</h1>
    <div>
      <h2>Добавить роль</h2>
      <div class="form-group">
        <input 
          v-model="newRole.name" 
          placeholder="Название роли"
          @input="validateField('name', newRole.name)"
        />
        <span class="error" v-if="errors.name">{{ errors.name }}</span>
      </div>
      <button @click="addRole" :disabled="!isFormValid">Добавить</button>
    </div>

    <div>
      <h2>Список ролей</h2>
      <div v-for="role in roles" :key="role.id">
        <p>ID: {{ role.id }}</p>
        <template v-if="editingRole && editingRole.id === role.id">
          <div class="form-group">
            <input 
              v-model="editingRole.name" 
              placeholder="Название роли"
              @input="validateField('name', editingRole.name)"
            />
            <span class="error" v-if="errors.name">{{ errors.name }}</span>
          </div>
          <button @click="updateRole" :disabled="!isFormValid">Сохранить</button>
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
      errors: {},
    };
  },
  computed: {
    isFormValid() {
      return Object.keys(this.errors).length === 0;
    }
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
    validateField(field, value) {
      this.errors[field] = '';
      
      switch (field) {
        case 'name':
          if (!value) {
            this.errors[field] = 'Название роли обязательно';
          } else if (value.length < 2) {
            this.errors[field] = 'Минимальная длина 2 символа';
          } else if (value.length > 50) {
            this.errors[field] = 'Максимальная длина 50 символов';
          }
          break;
      }
    },
    
    validateForm(form) {
      Object.keys(form).forEach(field => {
        this.validateField(field, form[field]);
      });
      return this.isFormValid;
    },
    
    async addRole() {
      if (!this.validateForm(this.newRole)) {
        return;
      }

      try {
        const newRoleWithId = {
          ...this.newRole,
          id: this.getNextId(),
        };
        await this.$api.post('/roles', newRoleWithId);
        this.newRole = { name: '' };
        this.errors = {};
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
      if (!this.validateForm(this.editingRole)) {
        return;
      }

      try {
        const updateData = {
          id: this.editingRole.id,
          name: this.editingRole.name,
        };
        await this.$api.put(`/roles/${this.editingRole.id}`, updateData);
        this.editingRole = null;
        this.errors = {};
        await this.fetchRoles();
      } catch (error) {
        console.error('Ошибка при обновлении роли:', error);
        alert(`Ошибка: ${error.response?.data?.message || error.message}`);
      }
    },
  },
};
</script>
