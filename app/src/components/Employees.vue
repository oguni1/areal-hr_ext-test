<template>
  <div class="container">
    <h1>Сотрудники</h1>
    <div>
      <h2>Добавить сотрудника</h2>
      <input v-model="newEmployee.last_name" placeholder="Фамилия">
      <input v-model="newEmployee.first_name" placeholder="Имя">
      <input v-model="newEmployee.patronym" placeholder="Отчество">
      <input v-model="newEmployee.birth_date" type="date" placeholder="Дата рождения">
      <input v-model.number="newEmployee.passport" type="number" placeholder="Паспорт">
      <input v-model.number="newEmployee.registration" type="number" placeholder="Регистрация">
      <input v-model.number="newEmployee.scan" type="number" placeholder="Скан">
      <button @click="addEmployee">Добавить</button>
    </div>

    <div>
      <h2>Список сотрудников</h2>
        <div v-for="employee in employees" :key="employee.id">
            <p>ID: {{ employee.id }}</p>
            <template v-if="editingEmployee && editingEmployee.id === employee.id">
              <input v-model="editingEmployee.last_name" placeholder="Фамилия">
              <input v-model="editingEmployee.first_name" placeholder="Имя">
              <input v-model="editingEmployee.patronym" placeholder="Отчество">
              <input v-model="editingEmployee.birth_date" type="date" placeholder="Дата рождения">
              <input v-model.number="editingEmployee.passport" type="number" placeholder="Паспорт">
              <input v-model.number="editingEmployee.registration" type="number" placeholder="Регистрация">
              <input v-model.number="editingEmployee.scan" type="number" placeholder="Скан">
              <button @click="updateEmployee">Сохранить</button>
              <button @click="cancelEdit">Отмена</button>
            </template>
            <template v-else>
              <p>Фамилия: {{ employee.last_name }}</p>
              <p>Имя: {{ employee.first_name }}</p>
              <p>Отчество: {{ employee.patronym }}</p>
              <p>Дата рождения: {{ employee.birth_date }}</p>
              <p>Паспорт: {{ employee.passport }}</p>
              <p>Регистрация: {{ employee.registration }}</p>
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
        passport: '',
        registration: '',
        scan: ''
      },
      editingEmployee: null,
      loading: false
    }
  },
  async created() {
    await this.fetchEmployees()
  },
  methods: {
    getNextId() {
      if (this.employees.length === 0) return 1
      const maxId = Math.max(...this.employees.map(emp => parseInt(emp.id)))
      return maxId + 1
    },
    async fetchEmployees() {
      this.loading = true
      try {
        const response = await this.$api.get('/employees')
        this.employees = response.data
      } catch (error) {
        console.error('Ошибка при загрузке сотрудников:', error)
      } finally {
        this.loading = false
      }
    },
    async addEmployee() {
      if (!this.newEmployee.last_name || !this.newEmployee.first_name) {
        alert('Фамилия и имя обязательны!')
        return
      }

      try {
        const newEmployeeWithId = {
          ...this.newEmployee,
          id: this.getNextId()
        }
        await this.$api.post('/employees', newEmployeeWithId)
        this.newEmployee = {
          last_name: '',
          first_name: '',
          patronym: '',
          birth_date: '',
          passport: '',
          registration: '',
          scan: ''
        }
        await this.fetchEmployees()
      } catch (error) {
        console.error('Ошибка при добавлении сотрудника:', error)
        alert(`Ошибка: ${error.response?.data?.message || error.message}`)
      }
    },
    async deleteEmployee(id) {
      if (!confirm('Вы уверены, что хотите удалить этого сотрудника?')) return

      try {
        await this.$api.delete(`/employees/${id}`)
        await this.fetchEmployees()
      } catch (error) {
        console.error('Ошибка при удалении сотрудника:', error)
      }
    },
    startEdit(employee) {
      this.editingEmployee = { ...employee }
    },
    cancelEdit() {
      this.editingEmployee = null
    },
    async updateEmployee() {
      if (!this.editingEmployee.last_name || !this.editingEmployee.first_name) {
        alert('Фамилия и имя обязательны!')
        return
      }

      try {
        const updateData = {
          id: this.editingEmployee.id,
          last_name: this.editingEmployee.last_name,
          first_name: this.editingEmployee.first_name,
          patronym: this.editingEmployee.patronym,
          birth_date: this.editingEmployee.birth_date,
          passport: this.editingEmployee.passport,
          registration: this.editingEmployee.registration,
          scan: this.editingEmployee.scan
        }
        await this.$api.put(`/employees/${this.editingEmployee.id}`, updateData)
        this.editingEmployee = null
        await this.fetchEmployees()
      } catch (error) {
        console.error('Ошибка при обновлении сотрудника:', error)
        alert(`Ошибка: ${error.response?.data?.message || error.message}`)
      }
    }
  }
}
</script> 