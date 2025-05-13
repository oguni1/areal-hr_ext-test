<template>
  <div class="container">
    <h1>Пользователи</h1>
    <div>
      <h2>Добавить пользователя</h2>
      <input v-model="newUser.surname" placeholder="Фамилия" />
      <input v-model="newUser.name" placeholder="Имя" />
      <input v-model="newUser.patronym" placeholder="Отчество" />
      <input v-model="newUser.login" placeholder="Логин" />
      <input v-model="newUser.password" type="text" placeholder="Пароль" />
      <input v-model="newUser.role" placeholder="Роль" />
      <button @click="addUser">Добавить</button>
    </div>

    <div>
      <h2>Список пользователей</h2>
      <div v-for="user in users" :key="user.id">
        <p>ID: {{ user.id }}</p>
        <template v-if="editingUser && editingUser.id === user.id">
          <input v-model="editingUser.surname" placeholder="Фамилия" />
          <input v-model="editingUser.name" placeholder="Имя" />
          <input v-model="editingUser.patronym" placeholder="Отчество" />
          <input v-model="editingUser.login" placeholder="Логин" />
          <input
            v-model="editingUser.password"
            type="text"
            placeholder="Пароль"
          />
          <input v-model="editingUser.role" placeholder="Роль" />
          <button @click="updateUser">Сохранить</button>
          <button @click="cancelEdit">Отмена</button>
        </template>
        <template v-else>
          <p>Фамилия: {{ user.surname }}</p>
          <p>Имя: {{ user.name }}</p>
          <p>Отчество: {{ user.patronym }}</p>
          <p>Логин: {{ user.login }}</p>
          <p>Роль: {{ user.role }}</p>
          <button @click="startEdit(user)">Редактировать</button>
          <button @click="deleteUser(user.id)">Удалить</button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      newUser: {
        surname: '',
        name: '',
        patronym: '',
        login: '',
        password: '',
        role: '',
      },
      editingUser: null,
      loading: false,
    };
  },
  async created() {
    await this.fetchUsers();
  },
  methods: {
    getNextId() {
      if (this.users.length === 0) return 1;
      const maxId = Math.max(...this.users.map((user) => parseInt(user.id)));
      return maxId + 1;
    },
    async fetchUsers() {
      this.loading = true;
      try {
        const response = await this.$api.get('/users');
        this.users = response.data;
      } catch (error) {
        console.error('Ошибка при загрузке пользователей:', error);
      } finally {
        this.loading = false;
      }
    },
    async addUser() {
      if (
        !this.newUser.surname ||
        !this.newUser.name ||
        !this.newUser.login ||
        !this.newUser.password ||
        !this.newUser.role
      ) {
        alert('Все поля обязательны!');
        return;
      }

      try {
        const newUserWithId = {
          ...this.newUser,
          id: this.getNextId(),
        };
        await this.$api.post('/users', newUserWithId);
        this.newUser = {
          surname: '',
          name: '',
          patronym: '',
          login: '',
          password: '',
          role: '',
        };
        await this.fetchUsers();
      } catch (error) {
        console.error('Ошибка при добавлении пользователя:', error);
        alert(`Ошибка: ${error.response?.data?.message || error.message}`);
      }
    },
    async deleteUser(id) {
      if (!confirm('Вы уверены, что хотите удалить этого пользователя?'))
        return;

      try {
        await this.$api.delete(`/users/${id}`);
        await this.fetchUsers();
      } catch (error) {
        console.error('Ошибка при удалении пользователя:', error);
      }
    },
    startEdit(user) {
      this.editingUser = { ...user };
      this.editingUser.password = ''; // Clear password for security
    },
    cancelEdit() {
      this.editingUser = null;
    },
    async updateUser() {
      if (
        !this.editingUser.surname ||
        !this.editingUser.name ||
        !this.editingUser.login ||
        !this.editingUser.role
      ) {
        alert('Все поля обязательны!');
        return;
      }

      try {
        await this.$api.put(`/users/${this.editingUser.id}`, this.editingUser);
        this.editingUser = null;
        await this.fetchUsers();
      } catch (error) {
        console.error('Ошибка при обновлении пользователя:', error);
        alert(`Ошибка: ${error.response?.data?.message || error.message}`);
      }
    },
  },
};
</script>
