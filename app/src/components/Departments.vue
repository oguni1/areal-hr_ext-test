<template>
  <div class="container">
    <h1>Роли</h1>
    <div>
      <h2>Добавить отдел</h2>
      <input v-model.number="newDepartment.id" type="number" placeholder="ID отдела">
      <input v-model.number="newDepartment.organization_id" type="number" placeholder="ID организации">
      <input v-model.number="newDepartment.department_id" type="number" placeholder="ID родительского отдела">
      <input v-model="newDepartment.name" placeholder="Название отдела">
      <input v-model="newDepartment.comment" placeholder="Название отдела">
      <button @click="addDepartment">Добавить</button>
    </div>

    <div>
      <h2>Список ролей</h2>
        <div v-for="department in departments" :key="department.id">
            <p>ID: {{ department.id }}</p>
            <p>Название: {{ department.name }}</p>
            <button @click="deleteDepartment(department.id)">Удалить</button>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      departments: [],
      newDepartment: {
        id: '',
        name: ''
      },
      loading: false
    }
  },
  async created() {
    await this.fetchDepartments()
  },
  methods: {
    async fetchDepartments() {
      this.loading = true
      try {
        const response = await this.$api.get('/departments')
        this.departments = response.data
      } catch (error) {
        console.error('Ошибка при загрузке ролей:', error)
      } finally {
        this.loading = false
      }
    },
    async addDepartment() {
      if (!this.newDepartment.name) {
        alert('Название роли обязательно!')
        return
      }

      try {
        await this.$api.post('/departments', this.newDepartment)
        this.newDepartment = { id: '', name: '' }
        await this.fetchDepartments()
      } catch (error) {
        console.error('Ошибка при добавлении роли:', error)
        alert(`Ошибка: ${error.response?.data?.message || error.message}`)
      }
    },
    async deleteDepartment(id) {
      if (!confirm('Вы уверены, что хотите удалить эту роль?')) return

      try {
        await this.$api.delete(`/departments/${id}`)
        await this.fetchDepartments()
      } catch (error) {
        console.error('Ошибка при удалении роли:', error)
      }
    }
  }
}
</script>