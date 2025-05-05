<template>
  <div class="container">
    <h1>Адреса регистраций</h1>
    <div>
      <h2>Добавить регистрацию</h2>
      <input v-model="newRegistration.state" placeholder="Область">
      <input v-model="newRegistration.city" placeholder="Город">
      <input v-model="newRegistration.street" placeholder="Улица">
      <input v-model.number="newRegistration.house" type="number" placeholder="Дом">
      <input v-model.number="newRegistration.building" type="number" placeholder="Корпус">
      <input v-model.number="newRegistration.apartment" type="number" placeholder="Квартира">
      <button @click="addRegistration">Добавить</button>
    </div>

    <div>
      <h2>Список адресов</h2>
      <div v-for="registration in registrations" :key="registration.id">
        <p>ID: {{ registration.id }}</p>
        <template v-if="editingRegistration && editingRegistration.id === registration.id">
          <input v-model="editingRegistration.state" placeholder="Область">
          <input v-model="editingRegistration.city" placeholder="Город">
          <input v-model="editingRegistration.street" placeholder="Улица">
          <input v-model.number="editingRegistration.house" type="number" placeholder="Дом">
          <input v-model.number="editingRegistration.building" type="number" placeholder="Корпус">
          <input v-model.number="editingRegistration.apartment" type="number" placeholder="Квартира">
          <button @click="updateRegistration">Сохранить</button>
          <button @click="cancelEdit">Отмена</button>
        </template>
        <template v-else>
          <p>Область: {{ registration.state }}</p>
          <p>Город: {{ registration.city }}</p>
          <p>Улица: {{ registration.street }}</p>
          <p>Дом: {{ registration.house }}</p>
          <p>Корпус: {{ registration.building }}</p>
          <p>Квартира: {{ registration.apartment }}</p>
          <button @click="startEdit(registration)">Редактировать</button>
          <button @click="deleteRegistration(registration.id)">Удалить</button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      registrations: [],
      newRegistration: {
        state: '',
        city: '',
        street: '',
        house: null,
        building: null,
        apartment: null
      },
      editingRegistration: null,
      loading: false
    }
  },
  async created() {
    await this.fetchRegistrations()
  },
  methods: {
    getNextId() {
      if (this.registrations.length === 0) return 1
      const maxId = Math.max(...this.registrations.map(reg => parseInt(reg.id)))
      return maxId + 1
    },
    async fetchRegistrations() {
      this.loading = true
      try {
        const response = await this.$api.get('/registrations')
        this.registrations = response.data
      } catch (error) {
        console.error('Ошибка при загрузке регистраций:', error)
      } finally {
        this.loading = false
      }
    },
    async addRegistration() {
      if (!this.newRegistration.state || !this.newRegistration.city || !this.newRegistration.street || 
          !this.newRegistration.house) {
        alert('Область, город, улица и дом обязательны!')
        return
      }

      try {
        const newRegistrationWithId = {
          ...this.newRegistration,
          id: this.getNextId()
        }
        await this.$api.post('/registrations', newRegistrationWithId)
        this.newRegistration = {
          state: '',
          city: '',
          street: '',
          house: null,
          building: null,
          apartment: null
        }
        await this.fetchRegistrations()
      } catch (error) {
        console.error('Ошибка при добавлении регистрации:', error)
        alert(`Ошибка: ${error.response?.data?.message || error.message}`)
      }
    },
    async deleteRegistration(id) {
      if (!confirm('Вы уверены, что хотите удалить эту регистрацию?')) return

      try {
        await this.$api.delete(`/registrations/${id}`)
        await this.fetchRegistrations()
      } catch (error) {
        console.error('Ошибка при удалении регистрации:', error)
      }
    },
    startEdit(registration) {
      this.editingRegistration = { ...registration }
    },
    cancelEdit() {
      this.editingRegistration = null
    },
    async updateRegistration() {
      if (!this.editingRegistration.state || !this.editingRegistration.city || 
          !this.editingRegistration.street || !this.editingRegistration.house) {
        alert('Область, город, улица и дом обязательны!')
        return
      }

      try {
        const updateData = {
          id: this.editingRegistration.id,
          state: this.editingRegistration.state,
          city: this.editingRegistration.city,
          street: this.editingRegistration.street,
          house: this.editingRegistration.house,
          building: this.editingRegistration.building,
          apartment: this.editingRegistration.apartment
        }
        await this.$api.put(`/registrations/${this.editingRegistration.id}`, updateData)
        this.editingRegistration = null
        await this.fetchRegistrations()
      } catch (error) {
        console.error('Ошибка при обновлении регистрации:', error)
        alert(`Ошибка: ${error.response?.data?.message || error.message}`)
      }
    }
  }
}
</script>
