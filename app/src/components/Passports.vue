<template>
  <div class="container">
    <h1>Паспорта</h1>
    <div>
      <h2>Добавить паспорт</h2>
      <input v-model="newPassport.series" placeholder="Серия">
      <input v-model="newPassport.number" placeholder="Номер">
      <input v-model="newPassport.date" type="date" placeholder="Дата выдачи">
      <input v-model.number="newPassport.code" type="number" placeholder="Код подразделения">
      <input v-model="newPassport.issued_by" placeholder="Кем выдан">
      <button @click="addPassport">Добавить</button>
    </div>

    <div>
      <h2>Список паспортов</h2>
      <div v-for="passport in passports" :key="passport.id">
        <p>ID: {{ passport.id }}</p>
        <template v-if="editingPassport && editingPassport.id === passport.id">
          <input v-model="editingPassport.series" placeholder="Серия">
          <input v-model="editingPassport.number" placeholder="Номер">
          <input v-model="editingPassport.date" type="date" placeholder="Дата выдачи">
          <input v-model.number="editingPassport.code" type="number" placeholder="Код подразделения">
          <input v-model="editingPassport.issued_by" placeholder="Кем выдан">
          <button @click="updatePassport">Сохранить</button>
          <button @click="cancelEdit">Отмена</button>
        </template>
        <template v-else>
          <p>Серия: {{ passport.series }}</p>
          <p>Номер: {{ passport.number }}</p>
          <p>Дата выдачи: {{ passport.date }}</p>
          <p>Код подразделения: {{ passport.code }}</p>
          <p>Кем выдан: {{ passport.issued_by }}</p>
          <button @click="startEdit(passport)">Редактировать</button>
          <button @click="deletePassport(passport.id)">Удалить</button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      passports: [],
      newPassport: {
        series: '',
        number: '',
        date: '',
        code: '',
        issued_by: ''
      },
      editingPassport: null,
      loading: false
    }
  },
  async created() {
    await this.fetchPassports()
  },
  methods: {
    getNextId() {
      if (this.passports.length === 0) return 1
      const maxId = Math.max(...this.passports.map(pass => parseInt(pass.id)))
      return maxId + 1
    },
    async fetchPassports() {
      this.loading = true
      try {
        const response = await this.$api.get('/passports')
        this.passports = response.data
      } catch (error) {
        console.error('Ошибка при загрузке паспортов:', error)
      } finally {
        this.loading = false
      }
    },
    async addPassport() {
      if (!this.newPassport.series || !this.newPassport.number || !this.newPassport.date || 
          !this.newPassport.code || !this.newPassport.issued_by) {
        alert('Все поля обязательны!')
        return
      }

      try {
        const newPassportWithId = {
          ...this.newPassport,
          id: this.getNextId()
        }
        await this.$api.post('/passports', newPassportWithId)
        this.newPassport = {
          series: '',
          number: '',
          date: '',
          code: '',
          issued_by: ''
        }
        await this.fetchPassports()
      } catch (error) {
        console.error('Ошибка при добавлении паспорта:', error)
        alert(`Ошибка: ${error.response?.data?.message || error.message}`)
      }
    },
    async deletePassport(id) {
      if (!confirm('Вы уверены, что хотите удалить этот паспорт?')) return

      try {
        await this.$api.delete(`/passports/${id}`)
        await this.fetchPassports()
      } catch (error) {
        console.error('Ошибка при удалении паспорта:', error)
      }
    },
    startEdit(passport) {
      this.editingPassport = { ...passport }
    },
    cancelEdit() {
      this.editingPassport = null
    },
    async updatePassport() {
      if (!this.editingPassport.series || !this.editingPassport.number || !this.editingPassport.date || 
          !this.editingPassport.code || !this.editingPassport.issued_by) {
        alert('Все поля обязательны!')
        return
      }

      try {
        const updateData = {
          id: this.editingPassport.id,
          series: this.editingPassport.series,
          number: this.editingPassport.number,
          date: this.editingPassport.date,
          code: this.editingPassport.code,
          issued_by: this.editingPassport.issued_by
        }
        await this.$api.put(`/passports/${this.editingPassport.id}`, updateData)
        this.editingPassport = null
        await this.fetchPassports()
      } catch (error) {
        console.error('Ошибка при обновлении паспорта:', error)
        alert(`Ошибка: ${error.response?.data?.message || error.message}`)
      }
    }
  }
}
</script> 