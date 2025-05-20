<template>
  <div class="container">
    <h1>Файлы</h1>
    <div>
      <h2>Добавить файл</h2>
      <div class="form-group">
        <input 
          v-model="newFile.name" 
          placeholder="Название файла"
          @input="validateField('name', newFile.name)"
        />
        <span class="error" v-if="errors.name">{{ errors.name }}</span>
      </div>
      
      <div class="form-group">
        <input 
          v-model="newFile.path" 
          placeholder="Путь к файлу"
          @input="validateField('path', newFile.path)"
        />
        <span class="error" v-if="errors.path">{{ errors.path }}</span>
      </div>
      
      <div class="form-group">
        <select 
          v-model.number="newFile.employee_id"
          @change="validateField('employee_id', newFile.employee_id)"
        >
          <option value="">Выберите сотрудника</option>
          <option
            v-for="employee in employees"
            :key="employee.id"
            :value="employee.id"
          >
            {{ employee.last_name }} {{ employee.first_name }}
          </option>
        </select>
        <span class="error" v-if="errors.employee_id">{{ errors.employee_id }}</span>
      </div>
      
      <button @click="addFile" :disabled="!isFormValid">Добавить</button>
    </div>

    <div>
      <h2>Список файлов</h2>
      <div v-for="file in files" :key="file.id">
        <p>ID: {{ file.id }}</p>
        <template v-if="editingFile && editingFile.id === file.id">
          <div class="form-group">
            <input 
              v-model="editingFile.name" 
              placeholder="Название файла"
              @input="validateField('name', editingFile.name)"
            />
            <span class="error" v-if="errors.name">{{ errors.name }}</span>
          </div>
          
          <div class="form-group">
            <input 
              v-model="editingFile.path" 
              placeholder="Путь к файлу"
              @input="validateField('path', editingFile.path)"
            />
            <span class="error" v-if="errors.path">{{ errors.path }}</span>
          </div>
          
          <div class="form-group">
            <select 
              v-model.number="editingFile.employee_id"
              @change="validateField('employee_id', editingFile.employee_id)"
            >
              <option value="">Выберите сотрудника</option>
              <option
                v-for="employee in employees"
                :key="employee.id"
                :value="employee.id"
              >
                {{ employee.last_name }} {{ employee.first_name }}
              </option>
            </select>
            <span class="error" v-if="errors.employee_id">{{ errors.employee_id }}</span>
          </div>
          
          <button @click="updateFile" :disabled="!isFormValid">Сохранить</button>
          <button @click="cancelEdit">Отмена</button>
        </template>
        <template v-else>
          <p>Название: {{ file.name }}</p>
          <p>Путь: {{ file.path }}</p>
          <p>Сотрудник: {{ getEmployeeName(file.employee_id) }}</p>
          <button @click="startEdit(file)">Редактировать</button>
          <button @click="deleteFile(file.id)">Удалить</button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      files: [],
      employees: [],
      newFile: {
        name: '',
        path: '',
        employee_id: '',
      },
      editingFile: null,
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
    await this.fetchFiles();
    await this.fetchEmployees();
  },
  methods: {
    getNextId() {
      if (this.files.length === 0) return 1;
      const maxId = Math.max(...this.files.map((file) => parseInt(file.id)));
      return maxId + 1;
    },
    async fetchFiles() {
      this.loading = true;
      try {
        const response = await this.$api.get('/files');
        this.files = response.data;
      } catch (error) {
        console.error('Ошибка при загрузке файлов:', error);
      } finally {
        this.loading = false;
      }
    },
    async fetchEmployees() {
      try {
        const response = await this.$api.get('/employees');
        this.employees = response.data;
      } catch (error) {
        console.error('Ошибка при загрузке сотрудников:', error);
      }
    },
    getEmployeeName(employeeId) {
      const employee = this.employees.find((emp) => emp.id === employeeId);
      return employee
        ? `${employee.last_name} ${employee.first_name}`
        : 'Не указан';
    },
    validateField(field, value) {
      this.errors[field] = '';
      
      switch (field) {
        case 'name':
          if (!value) {
            this.errors[field] = 'Название файла обязательно';
          } else if (value.length < 2) {
            this.errors[field] = 'Минимальная длина 2 символа';
          } else if (value.length > 255) {
            this.errors[field] = 'Максимальная длина 255 символов';
          }
          break;
          
        case 'path':
          if (!value) {
            this.errors[field] = 'Путь к файлу обязателен';
          } else if (!/^[a-zA-Z0-9\/\\\-_\.]+$/.test(value)) {
            this.errors[field] = 'Некорректный путь к файлу';
          }
          break;
          
        case 'employee_id':
          if (!value) {
            this.errors[field] = 'Выберите сотрудника';
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
    
    async addFile() {
      if (!this.validateForm(this.newFile)) {
        return;
      }

      try {
        const newFileWithId = {
          ...this.newFile,
          id: this.getNextId(),
        };
        await this.$api.post('/files', newFileWithId);
        this.newFile = {
          name: '',
          path: '',
          employee_id: '',
        };
        this.errors = {};
        await this.fetchFiles();
      } catch (error) {
        console.error('Ошибка при добавлении файла:', error);
        alert(`Ошибка: ${error.response?.data?.message || error.message}`);
      }
    },
    async deleteFile(id) {
      if (!confirm('Вы уверены, что хотите удалить этот файл?')) return;

      try {
        await this.$api.delete(`/files/${id}`);
        await this.fetchFiles();
      } catch (error) {
        console.error('Ошибка при удалении файла:', error);
      }
    },
    startEdit(file) {
      this.editingFile = { ...file };
    },
    cancelEdit() {
      this.editingFile = null;
    },
    async updateFile() {
      if (!this.validateForm(this.editingFile)) {
        return;
      }

      try {
        const updateData = {
          id: this.editingFile.id,
          name: this.editingFile.name,
          path: this.editingFile.path,
          employee_id: this.editingFile.employee_id,
        };
        await this.$api.put(`/files/${this.editingFile.id}`, updateData);
        this.editingFile = null;
        this.errors = {};
        await this.fetchFiles();
      } catch (error) {
        console.error('Ошибка при обновлении файла:', error);
        alert(`Ошибка: ${error.response?.data?.message || error.message}`);
      }
    },
  },
};
</script>
