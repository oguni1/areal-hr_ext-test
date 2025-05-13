<template>
  <div class="container">
    <h1>Отделы</h1>
    <div>
      <h2>Добавить отдел</h2>
      <select v-model.number="newDepartment.organization_id">
        <option value="">Выберите организацию</option>
        <option v-for="org in organizations" :key="org.id" :value="org.id">
          {{ org.name }}
        </option>
      </select>
      <select v-model.number="newDepartment.department_id">
        <option value="">Выберите родительский отдел</option>
        <option v-for="dept in departments" :key="dept.id" :value="dept.id">
          {{ dept.name }}
        </option>
      </select>
      <input v-model="newDepartment.name" placeholder="Название отдела" />
      <input v-model="newDepartment.comment" placeholder="Комментарий" />
      <button @click="addDepartment">Добавить</button>
    </div>

    <div>
      <h2>Список отделов</h2>
      <div v-for="department in departments" :key="department.id">
        <p>ID: {{ department.id }}</p>
        <template
          v-if="editingDepartment && editingDepartment.id === department.id"
        >
          <select v-model.number="editingDepartment.organization_id">
            <option value="">Выберите организацию</option>
            <option v-for="org in organizations" :key="org.id" :value="org.id">
              {{ org.name }}
            </option>
          </select>
          <select v-model.number="editingDepartment.department_id">
            <option value="">Выберите родительский отдел</option>
            <option v-for="dept in departments" :key="dept.id" :value="dept.id">
              {{ dept.name }}
            </option>
          </select>
          <input
            v-model="editingDepartment.name"
            placeholder="Название отдела"
          />
          <input
            v-model="editingDepartment.comment"
            placeholder="Комментарий"
          />
          <button @click="updateDepartment">Сохранить</button>
          <button @click="cancelEdit">Отмена</button>
        </template>
        <template v-else>
          <p>
            Организация: {{ getOrganizationName(department.organization_id) }}
          </p>
          <p>
            Родительский отдел:
            {{ getDepartmentName(department.department_id) }}
          </p>
          <p>Название: {{ department.name }}</p>
          <p>Комментарий: {{ department.comment || 'Нет комментария' }}</p>
          <button @click="startEdit(department)">Редактировать</button>
          <button @click="deleteDepartment(department.id)">Удалить</button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      departments: [],
      organizations: [],
      newDepartment: {
        organization_id: '',
        department_id: '',
        name: '',
        comment: '',
      },
      editingDepartment: null,
      loading: false,
    };
  },
  async created() {
    await this.fetchDepartments();
    await this.fetchOrganizations();
  },
  methods: {
    getNextId() {
      if (this.departments.length === 0) return 1;
      const maxId = Math.max(
        ...this.departments.map((dept) => parseInt(dept.id))
      );
      return maxId + 1;
    },
    async fetchDepartments() {
      this.loading = true;
      try {
        const response = await this.$api.get('/departments');
        this.departments = response.data;
      } catch (error) {
        console.error('Ошибка при загрузке отделов:', error);
      } finally {
        this.loading = false;
      }
    },
    async fetchOrganizations() {
      try {
        const response = await this.$api.get('/organizations');
        this.organizations = response.data;
      } catch (error) {
        console.error('Ошибка при загрузке организаций:', error);
      }
    },
    getOrganizationName(orgId) {
      const org = this.organizations.find((o) => o.id === orgId);
      return org ? org.name : 'Не указана';
    },
    getDepartmentName(deptId) {
      const dept = this.departments.find((d) => d.id === deptId);
      return dept ? dept.name : 'Не указан';
    },
    async addDepartment() {
      if (!this.newDepartment.name || !this.newDepartment.organization_id) {
        alert('Название отдела и организация обязательны!');
        return;
      }

      try {
        const newDepartmentWithId = {
          ...this.newDepartment,
          id: this.getNextId(),
        };
        await this.$api.post('/departments', newDepartmentWithId);
        this.newDepartment = {
          organization_id: '',
          department_id: '',
          name: '',
          comment: '',
        };
        await this.fetchDepartments();
      } catch (error) {
        console.error('Ошибка при добавлении отдела:', error);
        alert(`Ошибка: ${error.response?.data?.message || error.message}`);
      }
    },
    async deleteDepartment(id) {
      if (!confirm('Вы уверены, что хотите удалить этот отдел?')) return;

      try {
        await this.$api.delete(`/departments/${id}`);
        await this.fetchDepartments();
      } catch (error) {
        console.error('Ошибка при удалении отдела:', error);
      }
    },
    startEdit(department) {
      this.editingDepartment = { ...department };
    },
    cancelEdit() {
      this.editingDepartment = null;
    },
    async updateDepartment() {
      if (
        !this.editingDepartment.name ||
        !this.editingDepartment.organization_id
      ) {
        alert('Название отдела и организация обязательны!');
        return;
      }

      try {
        await this.$api.put(
          `/departments/${this.editingDepartment.id}`,
          this.editingDepartment
        );
        this.editingDepartment = null;
        await this.fetchDepartments();
      } catch (error) {
        console.error('Ошибка при обновлении отдела:', error);
        alert(`Ошибка: ${error.response?.data?.message || error.message}`);
      }
    },
  },
};
</script>
