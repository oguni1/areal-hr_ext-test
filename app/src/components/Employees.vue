<template>
  <div class="container">
    <h1>Сотрудники</h1>
    <div>
      <h2>Добавить сотрудника</h2>
      <div class="form-group">
        <input 
          v-model="newEmployee.last_name" 
          placeholder="Фамилия"
          @input="validateField('last_name', newEmployee.last_name)"
        />
        <span class="error" v-if="errors.last_name">{{ errors.last_name }}</span>
      </div>
      
      <div class="form-group">
        <input 
          v-model="newEmployee.first_name" 
          placeholder="Имя"
          @input="validateField('first_name', newEmployee.first_name)"
        />
        <span class="error" v-if="errors.first_name">{{ errors.first_name }}</span>
      </div>
      
      <div class="form-group">
        <input 
          v-model="newEmployee.patronym" 
          placeholder="Отчество"
          @input="validateField('patronym', newEmployee.patronym)"
        />
        <span class="error" v-if="errors.patronym">{{ errors.patronym }}</span>
      </div>
      
      <div class="form-group">
        <input 
          type="date"
          v-model="newEmployee.birth_date" 
          placeholder="Дата рождения"
          @input="validateField('birth_date', newEmployee.birth_date)"
        />
        <span class="error" v-if="errors.birth_date">{{ errors.birth_date }}</span>
      </div>
      
      <div class="form-group">
        <input 
          v-model="newEmployee.passport_series" 
          placeholder="Серия паспорта"
          @input="validateField('passport_series', newEmployee.passport_series)"
        />
        <span class="error" v-if="errors.passport_series">{{ errors.passport_series }}</span>
      </div>
      
      <div class="form-group">
        <input 
          v-model="newEmployee.passport_number" 
          placeholder="Номер паспорта"
          @input="validateField('passport_number', newEmployee.passport_number)"
        />
        <span class="error" v-if="errors.passport_number">{{ errors.passport_number }}</span>
      </div>
      
      <div class="form-group">
        <input 
          v-model="newEmployee.passport_division_code" 
          placeholder="Код подразделения"
          @input="validateField('passport_division_code', newEmployee.passport_division_code)"
        />
        <span class="error" v-if="errors.passport_division_code">{{ errors.passport_division_code }}</span>
      </div>
      
      <div class="form-group">
        <input 
          type="date"
          v-model="newEmployee.passport_issue_date" 
          placeholder="Дата выдачи паспорта"
          @input="validateField('passport_issue_date', newEmployee.passport_issue_date)"
        />
        <span class="error" v-if="errors.passport_issue_date">{{ errors.passport_issue_date }}</span>
      </div>
      
      <div class="form-group">
        <input 
          v-model="newEmployee.passport_issued_by" 
          placeholder="Кем выдан паспорт"
          @input="validateField('passport_issued_by', newEmployee.passport_issued_by)"
        />
        <span class="error" v-if="errors.passport_issued_by">{{ errors.passport_issued_by }}</span>
      </div>
      
      <div class="form-group">
        <input 
          v-model="newEmployee.registration_address" 
          placeholder="Адрес регистрации"
          @input="validateField('registration_address', newEmployee.registration_address)"
        />
        <span class="error" v-if="errors.registration_address">{{ errors.registration_address }}</span>
      </div>
      
      <div class="form-group">
        <input 
          v-model="newEmployee.registration_house" 
          placeholder="Номер дома"
          @input="validateField('registration_house', newEmployee.registration_house)"
        />
        <span class="error" v-if="errors.registration_house">{{ errors.registration_house }}</span>
      </div>
      
      <div class="form-group">
        <input 
          v-model="newEmployee.registration_building" 
          placeholder="Номер корпуса"
          @input="validateField('registration_building', newEmployee.registration_building)"
        />
        <span class="error" v-if="errors.registration_building">{{ errors.registration_building }}</span>
      </div>
      
      <div class="form-group">
        <input 
          v-model="newEmployee.registration_apartment" 
          placeholder="Номер квартиры"
          @input="validateField('registration_apartment', newEmployee.registration_apartment)"
        />
        <span class="error" v-if="errors.registration_apartment">{{ errors.registration_apartment }}</span>
      </div>
      
      <button @click="addEmployee" :disabled="!isFormValid">Добавить</button>
    </div>

    <div>
      <h2>Список сотрудников</h2>
      <div v-for="employee in employees" :key="employee.id">
        <p>ID: {{ employee.id }}</p>
        <template v-if="editingEmployee && editingEmployee.id === employee.id">
          <div class="form-group">
            <input 
              v-model="editingEmployee.last_name" 
              placeholder="Фамилия"
              @input="validateField('last_name', editingEmployee.last_name)"
            />
            <span class="error" v-if="errors.last_name">{{ errors.last_name }}</span>
          </div>
          
          <div class="form-group">
            <input 
              v-model="editingEmployee.first_name" 
              placeholder="Имя"
              @input="validateField('first_name', editingEmployee.first_name)"
            />
            <span class="error" v-if="errors.first_name">{{ errors.first_name }}</span>
          </div>
          
          <div class="form-group">
            <input 
              v-model="editingEmployee.patronym" 
              placeholder="Отчество"
              @input="validateField('patronym', editingEmployee.patronym)"
            />
            <span class="error" v-if="errors.patronym">{{ errors.patronym }}</span>
          </div>
          
          <div class="form-group">
            <input 
              type="date"
              v-model="editingEmployee.birth_date" 
              placeholder="Дата рождения"
              @input="validateField('birth_date', editingEmployee.birth_date)"
            />
            <span class="error" v-if="errors.birth_date">{{ errors.birth_date }}</span>
          </div>
          
          <div class="form-group">
            <input 
              v-model="editingEmployee.passport_series" 
              placeholder="Серия паспорта"
              @input="validateField('passport_series', editingEmployee.passport_series)"
            />
            <span class="error" v-if="errors.passport_series">{{ errors.passport_series }}</span>
          </div>
          
          <div class="form-group">
            <input 
              v-model="editingEmployee.passport_number" 
              placeholder="Номер паспорта"
              @input="validateField('passport_number', editingEmployee.passport_number)"
            />
            <span class="error" v-if="errors.passport_number">{{ errors.passport_number }}</span>
          </div>
          
          <div class="form-group">
            <input 
              v-model="editingEmployee.passport_division_code" 
              placeholder="Код подразделения"
              @input="validateField('passport_division_code', editingEmployee.passport_division_code)"
            />
            <span class="error" v-if="errors.passport_division_code">{{ errors.passport_division_code }}</span>
          </div>
          
          <div class="form-group">
            <input 
              type="date"
              v-model="editingEmployee.passport_issue_date" 
              placeholder="Дата выдачи паспорта"
              @input="validateField('passport_issue_date', editingEmployee.passport_issue_date)"
            />
            <span class="error" v-if="errors.passport_issue_date">{{ errors.passport_issue_date }}</span>
          </div>
          
          <div class="form-group">
            <input 
              v-model="editingEmployee.passport_issued_by" 
              placeholder="Кем выдан паспорт"
              @input="validateField('passport_issued_by', editingEmployee.passport_issued_by)"
            />
            <span class="error" v-if="errors.passport_issued_by">{{ errors.passport_issued_by }}</span>
          </div>
          
          <div class="form-group">
            <input 
              v-model="editingEmployee.registration_address" 
              placeholder="Адрес регистрации"
              @input="validateField('registration_address', editingEmployee.registration_address)"
            />
            <span class="error" v-if="errors.registration_address">{{ errors.registration_address }}</span>
          </div>
          
          <div class="form-group">
            <input 
              v-model="editingEmployee.registration_house" 
              placeholder="Номер дома"
              @input="validateField('registration_house', editingEmployee.registration_house)"
            />
            <span class="error" v-if="errors.registration_house">{{ errors.registration_house }}</span>
          </div>
          
          <div class="form-group">
            <input 
              v-model="editingEmployee.registration_building" 
              placeholder="Номер корпуса"
              @input="validateField('registration_building', editingEmployee.registration_building)"
            />
            <span class="error" v-if="errors.registration_building">{{ errors.registration_building }}</span>
          </div>
          
          <div class="form-group">
            <input 
              v-model="editingEmployee.registration_apartment" 
              placeholder="Номер квартиры"
              @input="validateField('registration_apartment', editingEmployee.registration_apartment)"
            />
            <span class="error" v-if="errors.registration_apartment">{{ errors.registration_apartment }}</span>
          </div>
          
          <button @click="updateEmployee" :disabled="!isFormValid">Сохранить</button>
          <button @click="cancelEdit">Отмена</button>
        </template>
        <template v-else>
          <p>Фамилия: {{ employee.last_name }}</p>
          <p>Имя: {{ employee.first_name }}</p>
          <p>Отчество: {{ employee.patronym }}</p>
          <p>Дата рождения: {{ employee.birth_date }}</p>
          <p>Серия паспорта: {{ employee.passport_series }}</p>
          <p>Номер паспорта: {{ employee.passport_number }}</p>
          <p>Код подразделения: {{ employee.passport_division_code }}</p>
          <p>Дата выдачи паспорта: {{ employee.passport_issue_date }}</p>
          <p>Кем выдан паспорт: {{ employee.passport_issued_by }}</p>
          <p>Адрес регистрации: {{ employee.registration_address }}</p>
          <p>Номер дома: {{ employee.registration_house }}</p>
          <p>Номер корпуса: {{ employee.registration_building }}</p>
          <p>Номер квартиры: {{ employee.registration_apartment }}</p>
          <button @click="startEdit(employee)">Редактировать</button>
          <button @click="deleteEmployee(employee.id)">Удалить</button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      employees: [],
      newEmployee: {
        last_name: '',
        first_name: '',
        patronym: '',
        birth_date: '',
        passport_series: '',
        passport_number: '',
        passport_division_code: '',
        passport_issue_date: '',
        passport_issued_by: '',
        registration_address: '',
        registration_house: '',
        registration_building: '',
        registration_apartment: '',
      },
      editingEmployee: null,
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
    await this.fetchEmployees();
  },
  methods: {
    getNextId() {
      if (this.employees.length === 0) return 1;
      const maxId = Math.max(...this.employees.map((emp) => parseInt(emp.id)));
      return maxId + 1;
    },
    async fetchEmployees() {
      this.loading = true;
      try {
        const response = await this.$api.get('/employees');
        this.employees = response.data;
      } catch (error) {
        console.error('Ошибка при загрузке сотрудников:', error);
      } finally {
        this.loading = false;
      }
    },
    validateField(field, value) {
      this.errors[field] = '';
      
      switch (field) {
        case 'last_name':
        case 'first_name':
          if (!value) {
            this.errors[field] = 'Это поле обязательно';
          } else if (value.length < 2) {
            this.errors[field] = 'Минимальная длина 2 символа';
          } else if (!/^[А-Яа-яЁё\s-]+$/.test(value)) {
            this.errors[field] = 'Только русские буквы, пробелы и дефис';
          }
          break;
          
        case 'patronym':
          if (value && value.length < 2) {
            this.errors[field] = 'Минимальная длина 2 символа';
          } else if (value && !/^[А-Яа-яЁё\s-]+$/.test(value)) {
            this.errors[field] = 'Только русские буквы, пробелы и дефис';
          }
          break;
          
        case 'birth_date':
          if (!value) {
            this.errors[field] = 'Дата рождения обязательна';
          } else {
            const date = new Date(value);
            const today = new Date();
            if (date > today) {
              this.errors[field] = 'Дата рождения не может быть в будущем';
            }
          }
          break;
          
        case 'passport_series':
          if (!value) {
            this.errors[field] = 'Серия паспорта обязательна';
          } else if (!/^\d{4}$/.test(value)) {
            this.errors[field] = 'Серия должна состоять из 4 цифр';
          }
          break;
          
        case 'passport_number':
          if (!value) {
            this.errors[field] = 'Номер паспорта обязателен';
          } else if (!/^\d{6}$/.test(value)) {
            this.errors[field] = 'Номер должен состоять из 6 цифр';
          }
          break;
          
        case 'passport_division_code':
          if (!value) {
            this.errors[field] = 'Код подразделения обязателен';
          } else if (!/^\d{3}-\d{3}$/.test(value)) {
            this.errors[field] = 'Формат: XXX-XXX (где X - цифра)';
          }
          break;
          
        case 'passport_issue_date':
          if (!value) {
            this.errors[field] = 'Дата выдачи обязательна';
          } else {
            const date = new Date(value);
            const today = new Date();
            if (date > today) {
              this.errors[field] = 'Дата выдачи не может быть в будущем';
            }
          }
          break;
          
        case 'passport_issued_by':
          if (!value) {
            this.errors[field] = 'Кем выдан обязательно';
          } else if (value.length < 5) {
            this.errors[field] = 'Минимальная длина 5 символов';
          } else if (value.length > 255) {
            this.errors[field] = 'Максимальная длина 255 символов';
          }
          break;
          
        case 'registration_address':
          if (!value) {
            this.errors[field] = 'Адрес регистрации обязателен';
          } else if (value.length < 5) {
            this.errors[field] = 'Минимальная длина 5 символов';
          } else if (value.length > 255) {
            this.errors[field] = 'Максимальная длина 255 символов';
          }
          break;
          
        case 'registration_house':
          if (!value) {
            this.errors[field] = 'Номер дома обязателен';
          } else if (!/^\d+[а-яА-Я]?$/.test(value)) {
            this.errors[field] = 'Некорректный формат номера дома';
          }
          break;
          
        case 'registration_building':
          if (value && !/^\d+[а-яА-Я]?$/.test(value)) {
            this.errors[field] = 'Некорректный формат номера корпуса';
          }
          break;
          
        case 'registration_apartment':
          if (value && !/^\d+$/.test(value)) {
            this.errors[field] = 'Номер квартиры должен состоять из цифр';
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
    
    async addEmployee() {
      if (!this.validateForm(this.newEmployee)) {
        return;
      }

      try {
        const newEmployeeWithId = {
          ...this.newEmployee,
          id: this.getNextId(),
        };
        await this.$api.post('/employees', newEmployeeWithId);
        this.newEmployee = {
          last_name: '',
          first_name: '',
          patronym: '',
          birth_date: '',
          passport_series: '',
          passport_number: '',
          passport_division_code: '',
          passport_issue_date: '',
          passport_issued_by: '',
          registration_address: '',
          registration_house: '',
          registration_building: '',
          registration_apartment: '',
        };
        this.errors = {};
        await this.fetchEmployees();
      } catch (error) {
        console.error('Ошибка при добавлении сотрудника:', error);
        alert(`Ошибка: ${error.response?.data?.message || error.message}`);
      }
    },
    async deleteEmployee(id) {
      if (!confirm('Вы уверены, что хотите удалить этого сотрудника?')) return;

      try {
        await this.$api.delete(`/employees/${id}`);
        await this.fetchEmployees();
      } catch (error) {
        console.error('Ошибка при удалении сотрудника:', error);
      }
    },
    startEdit(employee) {
      this.editingEmployee = { ...employee };
    },
    cancelEdit() {
      this.editingEmployee = null;
    },
    async updateEmployee() {
      if (!this.validateForm(this.editingEmployee)) {
        return;
      }

      try {
        await this.$api.put(
          `/employees/${this.editingEmployee.id}`,
          this.editingEmployee
        );
        this.editingEmployee = null;
        this.errors = {};
        await this.fetchEmployees();
      } catch (error) {
        console.error('Ошибка при обновлении сотрудника:', error);
        alert(`Ошибка: ${error.response?.data?.message || error.message}`);
      }
    },
  },
};
</script>

<style scoped>
.form-group {
  margin-bottom: 1rem;
  position: relative;
}

.error {
  color: red;
  font-size: 0.8rem;
  position: absolute;
  bottom: -20px;
  left: 0;
}

input {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

input:invalid {
  border-color: red;
}

button {
  padding: 0.5rem 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 0.5rem;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

button:last-child {
  margin-right: 0;
}
</style>
