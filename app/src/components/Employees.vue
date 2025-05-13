<template>
  <div class="container">
    <h1>Сотрудники</h1>
    <div>
      <h2>Добавить сотрудника</h2>
      <input v-model="newEmployee.last_name" placeholder="Фамилия" />
      <input v-model="newEmployee.first_name" placeholder="Имя" />
      <input v-model="newEmployee.patronym" placeholder="Отчество" />
      <input
        v-model="newEmployee.birth_date"
        type="date"
        placeholder="Дата рождения"
      />
      <!-- Passport fields -->
      <input
        v-model="newEmployee.passport_series"
        placeholder="Серия паспорта"
      />
      <input
        v-model="newEmployee.passport_number"
        placeholder="Номер паспорта"
      />
      <input
        v-model="newEmployee.passport_date"
        type="date"
        placeholder="Дата выдачи паспорта"
      />
      <input
        v-model="newEmployee.passport_code"
        placeholder="Код подразделения"
      />
      <input
        v-model="newEmployee.passport_issued_by"
        placeholder="Кем выдан паспорт"
      />
      <!-- Registration fields -->
      <input
        v-model="newEmployee.reg_state"
        placeholder="Область регистрации"
      />
      <input v-model="newEmployee.reg_city" placeholder="Город регистрации" />
      <input v-model="newEmployee.reg_street" placeholder="Улица регистрации" />
      <input v-model="newEmployee.reg_house" placeholder="Дом регистрации" />
      <input
        v-model="newEmployee.reg_building"
        placeholder="Корпус регистрации"
      />
      <input
        v-model="newEmployee.reg_apartment"
        placeholder="Квартира регистрации"
      />
      <input
        v-model.number="newEmployee.scan"
        type="number"
        placeholder="Скан"
      />
      <button @click="addEmployee">Добавить</button>
    </div>

    <div>
      <h2>Список сотрудников</h2>
      <div v-for="employee in employees" :key="employee.id">
        <p>ID: {{ employee.id }}</p>
        <template v-if="editingEmployee && editingEmployee.id === employee.id">
          <input v-model="editingEmployee.last_name" placeholder="Фамилия" />
          <input v-model="editingEmployee.first_name" placeholder="Имя" />
          <input v-model="editingEmployee.patronym" placeholder="Отчество" />
          <input
            v-model="editingEmployee.birth_date"
            type="date"
            placeholder="Дата рождения"
          />
          <!-- Passport fields -->
          <input
            v-model="editingEmployee.passport_series"
            placeholder="Серия паспорта"
          />
          <input
            v-model="editingEmployee.passport_number"
            placeholder="Номер паспорта"
          />
          <input
            v-model="editingEmployee.passport_date"
            type="date"
            placeholder="Дата выдачи паспорта"
          />
          <input
            v-model="editingEmployee.passport_code"
            placeholder="Код подразделения"
          />
          <input
            v-model="editingEmployee.passport_issued_by"
            placeholder="Кем выдан паспорт"
          />
          <!-- Registration fields -->
          <input
            v-model="editingEmployee.reg_state"
            placeholder="Область регистрации"
          />
          <input
            v-model="editingEmployee.reg_city"
            placeholder="Город регистрации"
          />
          <input
            v-model="editingEmployee.reg_street"
            placeholder="Улица регистрации"
          />
          <input
            v-model="editingEmployee.reg_house"
            placeholder="Дом регистрации"
          />
          <input
            v-model="editingEmployee.reg_building"
            placeholder="Корпус регистрации"
          />
          <input
            v-model="editingEmployee.reg_apartment"
            placeholder="Квартира регистрации"
          />
          <input
            v-model.number="editingEmployee.scan"
            type="number"
            placeholder="Скан"
          />
          <button @click="updateEmployee">Сохранить</button>
          <button @click="cancelEdit">Отмена</button>
        </template>
        <template v-else>
          <p>Фамилия: {{ employee.last_name }}</p>
          <p>Имя: {{ employee.first_name }}</p>
          <p>Отчество: {{ employee.patronym }}</p>
          <p>Дата рождения: {{ employee.birth_date }}</p>
          <!-- Passport fields -->
          <p>Серия паспорта: {{ employee.passport_series }}</p>
          <p>Номер паспорта: {{ employee.passport_number }}</p>
          <p>Дата выдачи паспорта: {{ employee.passport_date }}</p>
          <p>Код подразделения: {{ employee.passport_code }}</p>
          <p>Кем выдан паспорт: {{ employee.passport_issued_by }}</p>
          <!-- Registration fields -->
          <p>Область регистрации: {{ employee.reg_state }}</p>
          <p>Город регистрации: {{ employee.reg_city }}</p>
          <p>Улица регистрации: {{ employee.reg_street }}</p>
          <p>Дом регистрации: {{ employee.reg_house }}</p>
          <p>Корпус регистрации: {{ employee.reg_building }}</p>
          <p>Квартира регистрации: {{ employee.reg_apartment }}</p>
          <p>Скан: {{ employee.scan }}</p>
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
        passport_date: '',
        passport_code: '',
        passport_issued_by: '',
        reg_state: '',
        reg_city: '',
        reg_street: '',
        reg_house: '',
        reg_building: '',
        reg_apartment: '',
        scan: '',
      },
      editingEmployee: null,
      loading: false,
    };
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
    async addEmployee() {
      if (!this.newEmployee.last_name || !this.newEmployee.first_name) {
        alert('Фамилия и имя обязательны!');
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
          passport_date: '',
          passport_code: '',
          passport_issued_by: '',
          reg_state: '',
          reg_city: '',
          reg_street: '',
          reg_house: '',
          reg_building: '',
          reg_apartment: '',
          scan: '',
        };
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
      if (!this.editingEmployee.last_name || !this.editingEmployee.first_name) {
        alert('Фамилия и имя обязательны!');
        return;
      }

      try {
        const updateData = {
          id: this.editingEmployee.id,
          last_name: this.editingEmployee.last_name,
          first_name: this.editingEmployee.first_name,
          patronym: this.editingEmployee.patronym,
          birth_date: this.editingEmployee.birth_date,
          passport_series: this.editingEmployee.passport_series,
          passport_number: this.editingEmployee.passport_number,
          passport_date: this.editingEmployee.passport_date,
          passport_code: this.editingEmployee.passport_code,
          passport_issued_by: this.editingEmployee.passport_issued_by,
          reg_state: this.editingEmployee.reg_state,
          reg_city: this.editingEmployee.reg_city,
          reg_street: this.editingEmployee.reg_street,
          reg_house: this.editingEmployee.reg_house,
          reg_building: this.editingEmployee.reg_building,
          reg_apartment: this.editingEmployee.reg_apartment,
          scan: this.editingEmployee.scan,
        };
        await this.$api.put(
          `/employees/${this.editingEmployee.id}`,
          updateData
        );
        this.editingEmployee = null;
        await this.fetchEmployees();
      } catch (error) {
        console.error('Ошибка при обновлении сотрудника:', error);
        alert(`Ошибка: ${error.response?.data?.message || error.message}`);
      }
    },
  },
};
</script>
