<template>
  <div class="container">
    <h1>Отделы</h1>
    <div>
      <h2>Добавить отдел</h2>
      <div class="form-group">
        <select 
          v-model.number="newDepartment.organization_id"
          @change="validateField('organization_id', newDepartment.organization_id)"
        >
          <option value="">Выберите организацию</option>
          <option v-for="org in organizations" :key="org.id" :value="org.id">
            {{ org.name }}
          </option>
        </select>
        <span class="error" v-if="errors.organization_id">{{ errors.organization_id }}</span>
      </div>
      
      <div class="form-group">
        <select 
          v-model.number="newDepartment.department_id"
          @change="validateField('department_id', newDepartment.department_id)"
        >
          <option value="">Выберите родительский отдел</option>
          <option v-for="dept in departments" :key="dept.id" :value="dept.id">
            {{ dept.name }}
          </option>
        </select>
        <span class="error" v-if="errors.department_id">{{ errors.department_id }}</span>
      </div>
      
      <div class="form-group">
        <input 
          v-model="newDepartment.name" 
          placeholder="Название отдела"
          @input="validateField('name', newDepartment.name)"
        />
        <span class="error" v-if="errors.name">{{ errors.name }}</span>
      </div>
      
      <div class="form-group">
        <input 
          v-model="newDepartment.comment" 
          placeholder="Комментарий"
          @input="validateField('comment', newDepartment.comment)"
        />
        <span class="error" v-if="errors.comment">{{ errors.comment }}</span>
      </div>
      
      <button @click="addDepartment" :disabled="!isFormValid">Добавить</button>
    </div>

    <div>
      <h2>Список отделов</h2>
      <div v-for="department in departments" :key="department.id">
        <p>ID: {{ department.id }}</p>
        <template
          v-if="editingDepartment && editingDepartment.id === department.id"
        >
          <div class="form-group">
            <select 
              v-model.number="editingDepartment.organization_id"
              @change="validateField('organization_id', editingDepartment.organization_id)"
            >
              <option value="">Выберите организацию</option>
              <option v-for="org in organizations" :key="org.id" :value="org.id">
                {{ org.name }}
              </option>
            </select>
            <span class="error" v-if="errors.organization_id">{{ errors.organization_id }}</span>
          </div>
          
          <div class="form-group">
            <select 
              v-model.number="editingDepartment.department_id"
              @change="validateField('department_id', editingDepartment.department_id)"
            >
              <option value="">Выберите родительский отдел</option>
              <option v-for="dept in departments" :key="dept.id" :value="dept.id">
                {{ dept.name }}
              </option>
            </select>
            <span class="error" v-if="errors.department_id">{{ errors.department_id }}</span>
          </div>
          
          <div class="form-group">
            <input
              v-model="editingDepartment.name"
              placeholder="Название отдела"
              @input="validateField('name', editingDepartment.name)"
            />
            <span class="error" v-if="errors.name">{{ errors.name }}</span>
          </div>
          
          <div class="form-group">
            <input
              v-model="editingDepartment.comment"
              placeholder="Комментарий"
              @input="validateField('comment', editingDepartment.comment)"
            />
            <span class="error" v-if="errors.comment">{{ errors.comment }}</span>
          </div>
          
          <button @click="updateDepartment" :disabled="!isFormValid">Сохранить</button>
          <button @click="cancelEdit">Отмена</button>
        </template>
        <template v-else>
          <p>
            Организация: {{ getOrganizationName(department.organization_id) }}
          </p>
          <p>
            Родительский отдел:
            {{ getDepartmentName(department.department_id) }}
          </p>
          <p>Название: {{ department.name }}</p>
          <p>Комментарий: {{ department.comment || 'Нет комментария' }}</p>
          <button @click="startEdit(department)">Редактировать</button>
          <button @click="deleteDepartment(department.id)">Удалить</button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      departments: [],
      organizations: [],
      newDepartment: {
        organization_id: '',
        department_id: '',
        name: '',
        comment: '',
      },
      editingDepartment: null,
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
    await this.fetchDepartments();
    await this.fetchOrganizations();
  },
  methods: {
    getNextId() {
      if (this.departments.length === 0) return 1;
      const maxId = Math.max(
        ...this.departments.map((dept) => parseInt(dept.id))
      );
      return maxId + 1;
    },
    async fetchDepartments() {
      this.loading = true;
      try {
        const response = await this.$api.get('/departments');
        this.departments = response.data;
      } catch (error) {
        console.error('Ошибка при загрузке отделов:', error);
      } finally {
        this.loading = false;
      }
    },
    async fetchOrganizations() {
      try {
        const response = await this.$api.get('/organizations');
        this.organizations = response.data;
      } catch (error) {
        console.error('Ошибка при загрузке организаций:', error);
      }
    },
    getOrganizationName(orgId) {
      const org = this.organizations.find((o) => o.id === orgId);
      return org ? org.name : 'Не указана';
    },
    getDepartmentName(deptId) {
      const dept = this.departments.find((d) => d.id === deptId);
      return dept ? dept.name : 'Не указан';
    },
    validateField(field, value) {
      this.errors[field] = '';
      
      switch (field) {
        case 'name':
          if (!value) {
            this.errors[field] = 'Название отдела обязательно';
          } else if (value.length < 2) {
            this.errors[field] = 'Минимальная длина 2 символа';
          } else if (value.length > 255) {
            this.errors[field] = 'Максимальная длина 255 символов';
          }
          break;
          
        case 'organization_id':
          if (!value) {
            this.errors[field] = 'Выберите организацию';
          }
          break;
          
        case 'department_id':
          if (value === this.editingDepartment?.id || value === this.newDepartment?.id) {
            this.errors[field] = 'Отдел не может быть родительским для самого себя';
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
    
    async addDepartment() {
      if (!this.validateForm(this.newDepartment)) {
        return;
      }

      try {
        const newDepartmentWithId = {
          ...this.newDepartment,
          id: this.getNextId(),
        };
        await this.$api.post('/departments', newDepartmentWithId);
        this.newDepartment = {
          organization_id: '',
          department_id: '',
          name: '',
          comment: '',
        };
        this.errors = {};
        await this.fetchDepartments();
      } catch (error) {
        console.error('Ошибка при добавлении отдела:', error);
        alert(`Ошибка: ${error.response?.data?.message || error.message}`);
      }
    },
    async deleteDepartment(id) {
      if (!confirm('Вы уверены, что хотите удалить этот отдел?')) return;

      try {
        await this.$api.delete(`/departments/${id}`);
        await this.fetchDepartments();
      } catch (error) {
        console.error('Ошибка при удалении отдела:', error);
      }
    },
    startEdit(department) {
      this.editingDepartment = { ...department };
    },
    cancelEdit() {
      this.editingDepartment = null;
    },
    async updateDepartment() {
      if (!this.validateForm(this.editingDepartment)) {
        return;
      }

      try {
        await this.$api.put(
          `/departments/${this.editingDepartment.id}`,
          this.editingDepartment
        );
        this.editingDepartment = null;
        this.errors = {};
        await this.fetchDepartments();
      } catch (error) {
        console.error('Ошибка при обновлении отдела:', error);
        alert(`Ошибка: ${error.response?.data?.message || error.message}`);
      }
    },
  },
};
</script>
