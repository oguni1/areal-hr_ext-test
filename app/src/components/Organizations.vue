<template>
  <div class="container">
    <h1>Организации</h1>

    <div>
      <h2>Добавить организацию</h2>
      <input v-model="newOrg.name" placeholder="Название организации">
      <input v-model="newOrg.comment" placeholder="Комментарий">
      <button @click="addOrg">Добавить</button>
    </div>

    <div>
      <h2>Список организаций</h2>
        <div v-for="org in organizations" :key="org.id">
            <p>id: {{ org.id }}</p>
            <template v-if="editingOrg && editingOrg.id === org.id">
              <input v-model="editingOrg.name" placeholder="Название организации">
              <input v-model="editingOrg.comment" placeholder="Комментарий">
              <button @click="updateOrg">Сохранить</button>
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
        comment: ''
      },
      editingOrg: null,
      loading: false
    }
  },
  async created() {
    await this.fetchOrgs()
  },
  methods: {
    getNextId() {
      if (this.organizations.length === 0) return 1
      const maxId = Math.max(...this.organizations.map(org => parseInt(org.id)))
      return maxId + 1
    },
    async fetchOrgs() {
      this.loading = true
      try {
        const response = await this.$api.get('/organizations')
        this.organizations = response.data
      } catch (error) {
        console.error('Ошибка при загрузке организаций:', error)
      } finally {
        this.loading = false
      }
    },
    async addOrg() {
      if (!this.newOrg.name) {
        alert('Название организации обязательно!')
        return
      }

      try {
        const newOrgWithId = {
          ...this.newOrg,
          id: this.getNextId()
        }
        await this.$api.post('/organizations', newOrgWithId)
        this.newOrg = { name: '', comment: '' }
        await this.fetchOrgs()
      } catch (error) {
        console.error('Ошибка при добавлении организации:', error)
        alert(`Ошибка: ${error.response?.data?.message || error.message}`)
      }
    },
    async deleteOrg(id) {
      if (!confirm('Вы уверены, что хотите удалить эту организацию?')) return

      try {
        await this.$api.delete(`/organizations/${id}`)
        await this.fetchOrgs()
      } catch (error) {
        console.error('Ошибка при удалении организации:', error)
      }
    },
    startEdit(org) {
      this.editingOrg = { ...org }
    },
    cancelEdit() {
      this.editingOrg = null
    },
    async updateOrg() {
      if (!this.editingOrg.name) {
        alert('Название организации обязательно!')
        return
      }

      try {
        const updateData = {
          id: this.editingOrg.id,
          name: this.editingOrg.name,
          comment: this.editingOrg.comment
        }
        await this.$api.put(`/organizations/${this.editingOrg.id}`, updateData)
        this.editingOrg = null
        await this.fetchOrgs()
      } catch (error) {
        console.error('Ошибка при обновлении организации:', error)
        alert(`Ошибка: ${error.response?.data?.message || error.message}`)
      }
    }
  }
}
</script>