<template>
  <div class="container">
    <h1>История операций</h1>
    <div>
      <h2>Добавить запись</h2>
      <input v-model="newHistory.changed_by" type="number" placeholder="ID пользователя">
      <input v-model="newHistory.object_entity" placeholder="Сущность">
      <input v-model.number="newHistory.obj_entity_id" type="number" placeholder="ID сущности">
      <input v-model="newHistory.changed_fields" placeholder="Измененные поля">
      <input v-model="newHistory.type" placeholder="Тип операции">
      <button @click="addHistory">Добавить</button>
    </div>

    <div>
      <h2>Список операций</h2>
      <div v-for="history in histories" :key="history.id">
        <p>ID: {{ history.id }}</p>
        <template v-if="editingHistory && editingHistory.id === history.id">
          <input v-model.number="editingHistory.changed_by" type="number" placeholder="ID пользователя">
          <input v-model="editingHistory.object_entity" placeholder="Сущность">
          <input v-model.number="editingHistory.obj_entity_id" type="number" placeholder="ID сущности">
          <input v-model="editingHistory.changed_fields" placeholder="Измененные поля">
          <input v-model="editingHistory.type" placeholder="Тип операции">
          <button @click="updateHistory">Сохранить</button>
          <button @click="cancelEdit">Отмена</button>
        </template>
        <template v-else>
          <p>Пользователь: {{ history.changed_by }}</p>
          <p>Сущность: {{ history.object_entity }}</p>
          <p>ID сущности: {{ history.obj_entity_id }}</p>
          <p>Измененные поля: {{ history.changed_fields }}</p>
          <p>Тип операции: {{ history.type }}</p>
          <button @click="startEdit(history)">Редактировать</button>
          <button @click="deleteHistory(history.id)">Удалить</button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      histories: [],
      newHistory: {
        changed_by: null,
        object_entity: '',
        obj_entity_id: null,
        changed_fields: '',
        type: ''
      },
      editingHistory: null,
      loading: false
    }
  },
  async created() {
    await this.fetchHistories()
  },
  methods: {
    getNextId() {
      if (this.histories.length === 0) return 1
      const maxId = Math.max(...this.histories.map(h => parseInt(h.id)))
      return maxId + 1
    },
    async fetchHistories() {
      this.loading = true
      try {
        const response = await this.$api.get('/operation-history')
        this.histories = response.data
      } catch (error) {
        console.error('Ошибка при загрузке истории операций:', error)
      } finally {
        this.loading = false
      }
    },
    async addHistory() {
      if (!this.newHistory.changed_by || !this.newHistory.object_entity || 
          !this.newHistory.obj_entity_id || !this.newHistory.type) {
        alert('Все поля обязательны для заполнения!')
        return
      }

      try {
        const newHistoryWithId = {
          ...this.newHistory,
          id: this.getNextId()
        }
        await this.$api.post('/operation-history', newHistoryWithId)
        this.newHistory = {
          changed_by: null,
          object_entity: '',
          obj_entity_id: null,
          changed_fields: '',
          type: ''
        }
        await this.fetchHistories()
      } catch (error) {
        console.error('Ошибка при добавлении записи:', error)
        alert(`Ошибка: ${error.response?.data?.message || error.message}`)
      }
    },
    async deleteHistory(id) {
      if (!confirm('Вы уверены, что хотите удалить эту запись?')) return

      try {
        await this.$api.delete(`/operation-history/${id}`)
        await this.fetchHistories()
      } catch (error) {
        console.error('Ошибка при удалении записи:', error)
      }
    },
    startEdit(history) {
      this.editingHistory = { ...history }
    },
    cancelEdit() {
      this.editingHistory = null
    },
    async updateHistory() {
      if (!this.editingHistory.changed_by || !this.editingHistory.object_entity || 
          !this.editingHistory.obj_entity_id || !this.editingHistory.type) {
        alert('Все поля обязательны для заполнения!')
        return
      }

      try {
        const updateData = {
          id: this.editingHistory.id,
          changed_by: this.editingHistory.changed_by,
          object_entity: this.editingHistory.object_entity,
          obj_entity_id: this.editingHistory.obj_entity_id,
          changed_fields: this.editingHistory.changed_fields,
          type: this.editingHistory.type
        }
        await this.$api.put(`/operation-history/${this.editingHistory.id}`, updateData)
        this.editingHistory = null
        await this.fetchHistories()
      } catch (error) {
        console.error('Ошибка при обновлении записи:', error)
        alert(`Ошибка: ${error.response?.data?.message || error.message}`)
      }
    }
  }
}
</script> 