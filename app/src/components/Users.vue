<template>
  <div class="container">
    <h1>Пользователи</h1>
    <div>
      <h2>Добавить пользователя</h2>
      <div class="form-group">
        <input 
          v-model="newUser.surname" 
          placeholder="Фамилия"
          @input="validateField('surname', newUser.surname)"
        />
        <span class="error" v-if="errors.surname">{{ errors.surname }}</span>
      </div>
      
      <div class="form-group">
        <input 
          v-model="newUser.name" 
          placeholder="Имя"
          @input="validateField('name', newUser.name)"
        />
        <span class="error" v-if="errors.name">{{ errors.name }}</span>
      </div>
      
      <div class="form-group">
        <input 
          v-model="newUser.patronym" 
          placeholder="Отчество"
          @input="validateField('patronym', newUser.patronym)"
        />
        <span class="error" v-if="errors.patronym">{{ errors.patronym }}</span>
      </div>
      
      <div class="form-group">
        <input 
          v-model="newUser.login" 
          placeholder="Логин"
          @input="validateField('login', newUser.login)"
        />
        <span class="error" v-if="errors.login">{{ errors.login }}</span>
      </div>
      
      <div class="form-group">
        <input 
          v-model="newUser.password" 
          type="password"
          placeholder="Пароль"
          @input="validateField('password', newUser.password)"
        />
        <span class="error" v-if="errors.password">{{ errors.password }}</span>
      </div>
      
      <div class="form-group">
        <input 
          v-model="newUser.role" 
          placeholder="Роль"
          @input="validateField('role', newUser.role)"
        />
        <span class="error" v-if="errors.role">{{ errors.role }}</span>
      </div>
      
      <button @click="addUser" :disabled="!isFormValid">Добавить</button>
    </div>

    <div>
      <h2>Список пользователей</h2>
      <div v-for="user in users" :key="user.id">
        <p>ID: {{ user.id }}</p>
        <template v-if="editingUser && editingUser.id === user.id">
          <div class="form-group">
            <input 
              v-model="editingUser.surname" 
              placeholder="Фамилия"
              @input="validateField('surname', editingUser.surname)"
            />
            <span class="error" v-if="errors.surname">{{ errors.surname }}</span>
          </div>
          
          <div class="form-group">
            <input 
              v-model="editingUser.name" 
              placeholder="Имя"
              @input="validateField('name', editingUser.name)"
            />
            <span class="error" v-if="errors.name">{{ errors.name }}</span>
          </div>
          
          <div class="form-group">
            <input 
              v-model="editingUser.patronym" 
              placeholder="Отчество"
              @input="validateField('patronym', editingUser.patronym)"
            />
            <span class="error" v-if="errors.patronym">{{ errors.patronym }}</span>
          </div>
          
          <div class="form-group">
            <input 
              v-model="editingUser.login" 
              placeholder="Логин"
              @input="validateField('login', editingUser.login)"
            />
            <span class="error" v-if="errors.login">{{ errors.login }}</span>
          </div>
          
          <div class="form-group">
            <input
              v-model="editingUser.password"
              type="password"
              placeholder="Пароль (оставьте пустым, чтобы не менять)"
              @input="validateField('password', editingUser.password)"
            />
            <span class="error" v-if="errors.password">{{ errors.password }}</span>
          </div>
          
          <div class="form-group">
            <input 
              v-model="editingUser.role" 
              placeholder="Роль"
              @input="validateField('role', editingUser.role)"
            />
            <span class="error" v-if="errors.role">{{ errors.role }}</span>
          </div>
          
          <button @click="updateUser" :disabled="!isFormValid">Сохранить</button>
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
      errors: {},
    };
  },
  computed: {
    isFormValid() {
      return Object.keys(this.errors).length === 0;
    }
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
    validateField(field, value) {
      this.errors[field] = '';
      
      switch (field) {
        case 'surname':
        case 'name':
        case 'patronym':
          if (!value && field !== 'patronym') {
            this.errors[field] = 'Это поле обязательно';
          } else if (value && value.length < 2) {
            this.errors[field] = 'Минимальная длина 2 символа';
          } else if (value && !/^[А-Яа-яЁё\s-]+$/.test(value)) {
            this.errors[field] = 'Только русские буквы, пробелы и дефис';
          }
          break;
          
        case 'login':
          if (!value) {
            this.errors[field] = 'Логин обязателен';
          } else if (value.length < 3) {
            this.errors[field] = 'Минимальная длина логина 3 символа';
          } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            this.errors[field] = 'Только латинские буквы, цифры и подчеркивание';
          }
          break;
          
        case 'password':
          if (!value && !this.editingUser) {
            this.errors[field] = 'Пароль обязателен';
          } else if (value && value.length < 6) {
            this.errors[field] = 'Минимальная длина пароля 6 символов';
          }
          break;
          
        case 'role':
          if (!value) {
            this.errors[field] = 'Роль обязательна';
          }
          break;
      }
    },
    
    validateForm(form) {
      Object.keys(form).forEach(field => {
        this.validateField(field, form[field]);
      });
      return this.isFormValid;
    },
    
    async addUser() {
      if (!this.validateForm(this.newUser)) {
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
        this.errors = {};
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
      if (!this.validateForm(this.editingUser)) {
        return;
      }

      try {
        await this.$api.put(`/users/${this.editingUser.id}`, this.editingUser);
        this.editingUser = null;
        this.errors = {};
        await this.fetchUsers();
      } catch (error) {
        console.error('Ошибка при обновлении пользователя:', error);
        alert(`Ошибка: ${error.response?.data?.message || error.message}`);
      }
    },
  },
};
</script>
