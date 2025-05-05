<template>
  <div class="container">
    <h1>Файлы</h1>
    <div>
      <h2>Добавить файл</h2>
      <input v-model="newFile.name" placeholder="Название файла">
      <input v-model="newFile.path" placeholder="Путь к файлу">
      <select v-model.number="newFile.employee_id">
        <option value="">Выберите сотрудника</option>
        <option v-for="employee in employees" :key="employee.id" :value="employee.id">
          {{ employee.last_name }} {{ employee.first_name }}
        </option>
      </select>
      <button @click="addFile">Добавить</button>
    </div>

    <div>
      <h2>Список файлов</h2>
      <div v-for="file in files" :key="file.id">
        <p>ID: {{ file.id }}</p>
        <template v-if="editingFile && editingFile.id === file.id">
          <input v-model="editingFile.name" placeholder="Название файла">
          <input v-model="editingFile.path" placeholder="Путь к файлу">
          <select v-model.number="editingFile.employee_id">
            <option value="">Выберите сотрудника</option>
            <option v-for="employee in employees" :key="employee.id" :value="employee.id">
              {{ employee.last_name }} {{ employee.first_name }}
            </option>
          </select>
          <button @click="updateFile">Сохранить</button>
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
        employee_id: ''
      },
      editingFile: null,
      loading: false
    }
  },
  async created() {
    await this.fetchFiles()
    await this.fetchEmployees()
  },
  methods: {
    getNextId() {
      if (this.files.length === 0) return 1
      const maxId = Math.max(...this.files.map(file => parseInt(file.id)))
      return maxId + 1
    },
    async fetchFiles() {
      this.loading = true
      try {
        const response = await this.$api.get('/files')
        this.files = response.data
      } catch (error) {
        console.error('Ошибка при загрузке файлов:', error)
      } finally {
        this.loading = false
      }
    },
    async fetchEmployees() {
      try {
        const response = await this.$api.get('/employees')
        this.employees = response.data
      } catch (error) {
        console.error('Ошибка при загрузке сотрудников:', error)
      }
    },
    getEmployeeName(employeeId) {
      const employee = this.employees.find(emp => emp.id === employeeId)
      return employee ? `${employee.last_name} ${employee.first_name}` : 'Не указан'
    },
    async addFile() {
      if (!this.newFile.name || !this.newFile.path || !this.newFile.employee_id) {
        alert('Все поля обязательны!')
        return
      }

      try {
        const newFileWithId = {
          ...this.newFile,
          id: this.getNextId()
        }
        await this.$api.post('/files', newFileWithId)
        this.newFile = {
          name: '',
          path: '',
          employee_id: ''
        }
        await this.fetchFiles()
      } catch (error) {
        console.error('Ошибка при добавлении файла:', error)
        alert(`Ошибка: ${error.response?.data?.message || error.message}`)
      }
    },
    async deleteFile(id) {
      if (!confirm('Вы уверены, что хотите удалить этот файл?')) return

      try {
        await this.$api.delete(`/files/${id}`)
        await this.fetchFiles()
      } catch (error) {
        console.error('Ошибка при удалении файла:', error)
      }
    },
    startEdit(file) {
      this.editingFile = { ...file }
    },
    cancelEdit() {
      this.editingFile = null
    },
    async updateFile() {
      if (!this.editingFile.name || !this.editingFile.path || !this.editingFile.employee_id) {
        alert('Все поля обязательны!')
        return
      }

      try {
        const updateData = {
          id: this.editingFile.id,
          name: this.editingFile.name,
          path: this.editingFile.path,
          employee_id: this.editingFile.employee_id
        }
        await this.$api.put(`/files/${this.editingFile.id}`, updateData)
        this.editingFile = null
        await this.fetchFiles()
      } catch (error) {
        console.error('Ошибка при обновлении файла:', error)
        alert(`Ошибка: ${error.response?.data?.message || error.message}`)
      }
    }
  }
}
</script> 