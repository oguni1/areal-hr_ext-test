const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'testDB',
    password: 'admin',
    port: 5432,
});

const Organization = {
    async getAll() {
        const { rows } = await pool.query('SELECT * FROM organizations');
        return rows;
    },

    async getById(id) {
        const { rows } = await pool.query('SELECT * FROM organizations WHERE id = $1', [id]);
        return rows[0];
    },

    async create({id, name, comment }) {
        const { rows } = await pool.query(
            'INSERT INTO organizations (id, name, comment) VALUES ($1, $2, $3)',
            [id, name, comment]
        );
        return rows[0];
    },

    async update({id, name, comment }) {
        const { rows } = await pool.query(
            'UPDATE organizations SET name = $1, comment = $2 WHERE id = $3',
            [id, name, comment]
        );
        return rows[0];
    },

    async delete(id) {
        await pool.query('DELETE FROM organizations WHERE id = $1', [id]);
        return true;
    }
};

const Role = {
    async getAll() {
        const { rows } = await pool.query('SELECT * FROM roles');
        return rows;
    },

    async getById(id) {
        const { rows } = await pool.query('SELECT * FROM roles WHERE id = $1', [id]);
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
            'UPDATE roles SET name = $1 WHERE id = $2',
            [name, id]
        );
        return rows[0];
    },

    async delete(id) {
        await pool.query('DELETE FROM roles WHERE id = $1', [id]);
        return true;
    }
};


const Department = {
    async getAll() {
        const { rows } = await pool.query('SELECT * FROM departments');
        return rows;
    },

    async getById(id) {
        const { rows } = await pool.query('SELECT * FROM departments WHERE id = $1', [id]);
        return rows[0];
    },

    async create({id, organization_id, department_id, name, comment }) {
        const { rows } = await pool.query(
            'INSERT INTO departments (id, organization_id, department_id,  name, comment) VALUES ($1, $2, $3, $4, $5)',
            [id, organization_id, department_id, name, comment]
        );
        return rows[0];
    },

    async update({id, organization_id, department_id, name, comment }) {
        const { rows } = await pool.query(
            'UPDATE departments SET name = $1, comment = $2 WHERE id = $3',
            [id, organization_id, department_id, name, comment]
        );
        return rows[0];
    },

    async delete(id) {
        await pool.query('DELETE FROM departments WHERE id = $1', [id]);
        return true;
    }
};



module.exports = { Organization, Role, Department };