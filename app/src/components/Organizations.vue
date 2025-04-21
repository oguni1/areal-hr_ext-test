<template>
  <div class="container">
    <h1>Организации</h1>

    <div>
      <h2>Добавить организацию</h2>
      <input v-model="newOrg.id" placeholder="id организации">
      <input v-model="newOrg.name" placeholder="Название организации">
      <input v-model="newOrg.comment" placeholder="Комментарий">
      <button @click="addOrg">Добавить</button>
    </div>

    <div>
      <h2>Список организаций</h2>
        <div v-for="org in organizations" :key="org.id">
            <p>id: {{ org.id }}</p>
            <p>Название: {{ org.name }}</p>
            <p>Комментарий: {{ org.comment || 'Нет комментария' }}</p>
            <button @click="deleteOrg(org.id)">Удалить</button>
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
        id: '',
        name: '',
        comment: ''
      },
      loading: false
    }
  },
  async created() {
    await this.fetchOrgs()
  },
  methods: {
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
      if (!this.newOrg.name) return

      try {
        await this.$api.post('/organizations', this.newOrg)
        this.newOrg = {id:'', name: '', comment: '' }
        await this.fetchOrgs()
      } catch (error) {
        console.error('Ошибка:', error)
      }
    },
    async deleteOrg(id) {
      if (!confirm('Вы уверены?')) return

      try {
        await this.$api.delete(`/organizations/${id}`)
        await this.fetchOrgs()
      } catch (error) {
        console.error('Ошибка:', error)
      }
    }
  }
}
</script>