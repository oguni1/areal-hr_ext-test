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
            [name, comment, id]
        );
        return rows[0];
    },

    async delete(id) {
        await pool.query('DELETE FROM organizations WHERE id = $1', [id]);
        return true;
    }
};


module.exports = { Organization };