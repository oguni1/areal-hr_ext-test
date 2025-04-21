<template>
  <div class="container">
    <h1>Роли</h1>
    <div class="role-form">
      <h2>Добавить роль</h2>
      <input v-model.number="newRole.id" type="number" placeholder="ID роли">
      <input v-model="newRole.name" placeholder="Название роли">
      <button @click="addRole">Добавить</button>
    </div>

    <div class="role-list">
      <h2>Список ролей</h2>
        <div v-for="role in roles" :key="role.id" class="role-item">
            <p>ID: {{ role.id }}</p>
            <p>Название: {{ role.name }}</p>
            <button @click="deleteRole(role.id)">Удалить</button>
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
        id: '',
        name: ''
      },
      loading: false
    }
  },
  async created() {
    await this.fetchRoles()
  },
  methods: {
    async fetchRoles() {
      this.loading = true
      try {
        const response = await this.$api.get('/roles')
        this.roles = response.data
      } catch (error) {
        console.error('Ошибка при загрузке ролей:', error)
      } finally {
        this.loading = false
      }
    },
    async addRole() {
      if (!this.newRole.name) {
        alert('Название роли обязательно!')
        return
      }

      try {
        await this.$api.post('/roles', this.newRole)
        this.newRole = { id: '', name: '' }
        await this.fetchRoles()
      } catch (error) {
        console.error('Ошибка при добавлении роли:', error)
        alert(`Ошибка: ${error.response?.data?.message || error.message}`)
      }
    },
    async deleteRole(id) {
      if (!confirm('Вы уверены, что хотите удалить эту роль?')) return

      try {
        await this.$api.delete(`/roles/${id}`)
        await this.fetchRoles()
      } catch (error) {
        console.error('Ошибка при удалении роли:', error)
      }
    }
  }
}
</script>