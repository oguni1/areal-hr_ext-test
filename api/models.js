const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_DATABASE || 'testDB',
  password: process.env.DB_PASS || 'admin',
  port: process.env.DB_PORT || 5432,
});

const Organization = {
  async getAll() {
    const { rows } = await pool.query('SELECT * FROM organizations');
    return rows;
  },

  async getById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM organizations WHERE id = $1',
      [id]
    );
    return rows[0];
  },

  async create({ id, name, comment }) {
    const { rows } = await pool.query(
      'INSERT INTO organizations (id, name, comment) VALUES ($1, $2, $3)',
      [id, name, comment]
    );
    return rows[0];
  },

  async update({ id, name, comment }) {
    const { rows } = await pool.query(
      'UPDATE organizations SET name = $1, comment = $2 WHERE id = $3 RETURNING *',
      [name, comment, id]
    );
    return rows[0];
  },

  async delete(id) {
    await pool.query('DELETE FROM organizations WHERE id = $1', [id]);
    return true;
  },
};

const Role = {
  async getAll() {
    const { rows } = await pool.query('SELECT * FROM roles');
    return rows;
  },

  async getById(id) {
    const { rows } = await pool.query('SELECT * FROM roles WHERE id = $1', [
      id,
    ]);
    return rows[0];
  },

  async create({ id, name }) {
    const { rows } = await pool.query(
      'INSERT INTO roles (id, name) VALUES ($1, $2)',
      [id, name]
    );
    return rows[0];
  },

  async update({ id, name }) {
    const { rows } = await pool.query(
      'UPDATE roles SET name = $1 WHERE id = $2 RETURNING *',
      [name, id]
    );
    return rows[0];
  },

  async delete(id) {
    await pool.query('DELETE FROM roles WHERE id = $1', [id]);
    return true;
  },
};

const Department = {
  async getAll() {
    const { rows } = await pool.query('SELECT * FROM departments');
    return rows;
  },

  async getById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM departments WHERE id = $1',
      [id]
    );
    return rows[0];
  },

  async create({ id, organization_id, department_id, name, comment }) {
    const { rows } = await pool.query(
      'INSERT INTO departments (id, organization_id, department_id,  name, comment) VALUES ($1, $2, $3, $4, $5)',
      [id, organization_id, department_id, name, comment]
    );
    return rows[0];
  },

  async update({ id, organization_id, department_id, name, comment }) {
    const { rows } = await pool.query(
      'UPDATE departments SET organization_id = $1, department_id = $2, name = $3, comment = $4 WHERE id = $5 RETURNING *',
      [organization_id, department_id, name, comment, id]
    );
    return rows[0];
  },

  async delete(id) {
    await pool.query('DELETE FROM departments WHERE id = $1', [id]);
    return true;
  },
};

const Employee = {
  async getAll() {
    const { rows } = await pool.query('SELECT * FROM employees ORDER BY id');
    return rows;
  },

  async getById(id) {
    const { rows } = await pool.query('SELECT * FROM employees WHERE id = $1', [
      id,
    ]);
    return rows[0];
  },

  async create(employee) {
    const { rows } = await pool.query(
      `INSERT INTO employees (id, last_name, first_name, patronym, birth_date, passport, registration, scan)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
             RETURNING *`,
      [
        employee.id,
        employee.last_name,
        employee.first_name,
        employee.patronym,
        employee.birth_date,
        employee.passport,
        employee.registration,
        employee.scan,
      ]
    );
    return rows[0];
  },

  async update(id, employee) {
    const { rows } = await pool.query(
      `UPDATE employees 
             SET last_name = $2, first_name = $3, patronym = $4, birth_date = $5, 
                 passport = $6, registration = $7, scan = $8
             WHERE id = $1
             RETURNING *`,
      [
        id,
        employee.last_name,
        employee.first_name,
        employee.patronym,
        employee.birth_date,
        employee.passport,
        employee.registration,
        employee.scan,
      ]
    );
    return rows[0];
  },

  async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM employees WHERE id = $1 RETURNING *',
      [id]
    );
    return rows[0];
  },
};

const File = {
  async getAll() {
    const { rows } = await pool.query('SELECT * FROM files ORDER BY id');
    return rows;
  },

  async getById(id) {
    const { rows } = await pool.query('SELECT * FROM files WHERE id = $1', [
      id,
    ]);
    return rows[0];
  },

  async create(file) {
    const { rows } = await pool.query(
      `INSERT INTO files (id, name, path, employee_id)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
      [file.id, file.name, file.path, file.employee_id]
    );
    return rows[0];
  },

  async update(id, file) {
    const { rows } = await pool.query(
      `UPDATE files 
             SET name = $2, path = $3, employee_id = $4
             WHERE id = $1
             RETURNING *`,
      [id, file.name, file.path, file.employee_id]
    );
    return rows[0];
  },

  async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM files WHERE id = $1 RETURNING *',
      [id]
    );
    return rows[0];
  },
};

const Passport = {
  async getAll() {
    const { rows } = await pool.query('SELECT * FROM passports ORDER BY id');
    return rows;
  },

  async getById(id) {
    const { rows } = await pool.query('SELECT * FROM passports WHERE id = $1', [
      id,
    ]);
    return rows[0];
  },

  async create(passport) {
    const { rows } = await pool.query(
      `INSERT INTO passports (id, series, number, date, code, issued_by)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING *`,
      [
        passport.id,
        passport.series,
        passport.number,
        passport.date,
        passport.code,
        passport.issued_by,
      ]
    );
    return rows[0];
  },

  async update(id, passport) {
    const { rows } = await pool.query(
      `UPDATE passports 
             SET series = $2, number = $3, date = $4, code = $5, issued_by = $6
             WHERE id = $1
             RETURNING *`,
      [
        id,
        passport.series,
        passport.number,
        passport.date,
        passport.code,
        passport.issued_by,
      ]
    );
    return rows[0];
  },

  async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM passports WHERE id = $1 RETURNING *',
      [id]
    );
    return rows[0];
  },
};

const Registration = {
  async getAll() {
    const { rows } = await pool.query(
      'SELECT * FROM registrations ORDER BY id'
    );
    return rows;
  },

  async getById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM registrations WHERE id = $1',
      [id]
    );
    return rows[0];
  },

  async create(registration) {
    const { rows } = await pool.query(
      `INSERT INTO registrations (id, state, city, street, house, building, apartment)
             VALUES ($1, $2, $3, $4, $5, $6, $7)
             RETURNING *`,
      [
        registration.id,
        registration.state,
        registration.city,
        registration.street,
        registration.house,
        registration.building,
        registration.apartment,
      ]
    );
    return rows[0];
  },

  async update(id, registration) {
    const { rows } = await pool.query(
      `UPDATE registrations 
             SET state = $2, city = $3, street = $4, house = $5, building = $6, apartment = $7
             WHERE id = $1
             RETURNING *`,
      [
        id,
        registration.state,
        registration.city,
        registration.street,
        registration.house,
        registration.building,
        registration.apartment,
      ]
    );
    return rows[0];
  },

  async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM registrations WHERE id = $1 RETURNING *',
      [id]
    );
    return rows[0];
  },
};

const OperationHistory = {
  getAll: async () => {
    const { rows } = await pool.query(
      'SELECT * FROM operation_history ORDER BY id DESC'
    );
    return rows;
  },
  getById: async (id) => {
    const { rows } = await pool.query(
      'SELECT * FROM operation_history WHERE id = $1',
      [id]
    );
    return rows[0];
  },
  create: async (data) => {
    const { rows } = await pool.query(
      'INSERT INTO operation_history (changed_by, object_entity, obj_entity_id, changed_fields, type) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [
        data.changed_by,
        data.object_entity,
        data.obj_entity_id,
        data.changed_fields,
        data.type,
      ]
    );
    return rows[0];
  },
  update: async (id, data) => {
    const { rows } = await pool.query(
      'UPDATE operation_history SET changed_by = $1, object_entity = $2, obj_entity_id = $3, changed_fields = $4, type = $5 WHERE id = $6 RETURNING *',
      [
        data.changed_by,
        data.object_entity,
        data.obj_entity_id,
        data.changed_fields,
        data.type,
        id,
      ]
    );
    return rows[0];
  },
  delete: async (id) => {
    const { rows } = await pool.query(
      'DELETE FROM operation_history WHERE id = $1 RETURNING *',
      [id]
    );
    return rows[0];
  },
};

class Users {
  async getAll() {
    const { rows } = await pool.query('SELECT * FROM users ORDER BY id');
    return rows;
  }

  async getById(id) {
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [
      id,
    ]);
    return rows[0];
  }

  async create(user) {
    const { rows } = await pool.query(
      'INSERT INTO users (surname, name, patronym, login, password, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [
        user.surname,
        user.name,
        user.patronym,
        user.login,
        user.password,
        user.role,
      ]
    );
    return rows[0];
  }

  async update(id, user) {
    const { rows } = await pool.query(
      'UPDATE users SET surname = $1, name = $2, patronym = $3, login = $4, password = $5, role = $6 WHERE id = $7 RETURNING *',
      [
        user.surname,
        user.name,
        user.patronym,
        user.login,
        user.password,
        user.role,
        id,
      ]
    );
    return rows[0];
  }

  async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM users WHERE id = $1 RETURNING *',
      [id]
    );
    return rows[0];
  }
}

module.exports = {
  Organization,
  Role,
  Department,
  Employee,
  File,
  Passport,
  Registration,
  OperationHistory,
  Users,
};
