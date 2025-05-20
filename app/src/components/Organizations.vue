<template>
  <div class="container">
    <h1>Организации</h1>

    <div>
      <h2>Добавить организацию</h2>
      <div class="form-group">
        <input 
          v-model="newOrg.name" 
          placeholder="Название организации"
          @input="validateField('name', newOrg.name)"
        />
        <span class="error" v-if="errors.name">{{ errors.name }}</span>
      </div>
      
      <div class="form-group">
        <input 
          v-model="newOrg.comment" 
          placeholder="Комментарий"
          @input="validateField('comment', newOrg.comment)"
        />
        <span class="error" v-if="errors.comment">{{ errors.comment }}</span>
      </div>
      
      <button @click="addOrg" :disabled="!isFormValid">Добавить</button>
    </div>

    <div>
      <h2>Список организаций</h2>
      <div v-for="org in organizations" :key="org.id">
        <p>id: {{ org.id }}</p>
        <template v-if="editingOrg && editingOrg.id === org.id">
          <div class="form-group">
            <input 
              v-model="editingOrg.name" 
              placeholder="Название организации"
              @input="validateField('name', editingOrg.name)"
            />
            <span class="error" v-if="errors.name">{{ errors.name }}</span>
          </div>
          
          <div class="form-group">
            <input 
              v-model="editingOrg.comment" 
              placeholder="Комментарий"
              @input="validateField('comment', editingOrg.comment)"
            />
            <span class="error" v-if="errors.comment">{{ errors.comment }}</span>
          </div>
          
          <button @click="updateOrg" :disabled="!isFormValid">Сохранить</button>
          <button @click="cancelEdit">Отмена</button>
        </template>
        <template v-else>
          <p>Название: {{ org.name }}</p>
          <p>Комментарий: {{ org.comment || 'Нет комментария' }}</p>
          <button @click="startEdit(org)">Редактировать</button>
          <button @click="deleteOrg(org.id)">Удалить</button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Organizations',
  data() {
    return {
      organizations: [],
      newOrg: {
        name: '',
        comment: '',
      },
      editingOrg: null,
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
    await this.fetchOrgs();
  },
  methods: {
    getNextId() {
      if (this.organizations.length === 0) return 1;
      const maxId = Math.max(
        ...this.organizations.map((org) => parseInt(org.id))
      );
      return maxId + 1;
    },
    async fetchOrgs() {
      this.loading = true;
      try {
        const response = await this.$api.get('/organizations');
        this.organizations = response.data;
      } catch (error) {
        console.error('Ошибка при загрузке организаций:', error);
      } finally {
        this.loading = false;
      }
    },
    validateField(field, value) {
      this.errors[field] = '';
      
      switch (field) {
        case 'name':
          if (!value) {
            this.errors[field] = 'Название организации обязательно';
          } else if (value.length < 2) {
            this.errors[field] = 'Минимальная длина 2 символа';
          } else if (value.length > 255) {
            this.errors[field] = 'Максимальная длина 255 символов';
          }
          break;
          
        case 'comment':
          if (value && value.length > 1000) {
            this.errors[field] = 'Максимальная длина комментария 1000 символов';
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
    
    async addOrg() {
      if (!this.validateForm(this.newOrg)) {
        return;
      }

      try {
        const newOrgWithId = {
          ...this.newOrg,
          id: this.getNextId(),
        };
        await this.$api.post('/organizations', newOrgWithId);
        this.newOrg = { name: '', comment: '' };
        this.errors = {};
        await this.fetchOrgs();
      } catch (error) {
        console.error('Ошибка при добавлении организации:', error);
        alert(`Ошибка: ${error.response?.data?.message || error.message}`);
      }
    },
    async deleteOrg(id) {
      if (!confirm('Вы уверены, что хотите удалить эту организацию?')) return;

      try {
        await this.$api.delete(`/organizations/${id}`);
        await this.fetchOrgs();
      } catch (error) {
        console.error('Ошибка при удалении организации:', error);
      }
    },
    startEdit(org) {
      this.editingOrg = { ...org };
    },
    cancelEdit() {
      this.editingOrg = null;
    },
    async updateOrg() {
      if (!this.validateForm(this.editingOrg)) {
        return;
      }

      try {
        const updateData = {
          id: this.editingOrg.id,
          name: this.editingOrg.name,
          comment: this.editingOrg.comment,
        };
        await this.$api.put(`/organizations/${this.editingOrg.id}`, updateData);
        this.editingOrg = null;
        this.errors = {};
        await this.fetchOrgs();
      } catch (error) {
        console.error('Ошибка при обновлении организации:', error);
        alert(`Ошибка: ${error.response?.data?.message || error.message}`);
      }
    },
  },
};
</script>
