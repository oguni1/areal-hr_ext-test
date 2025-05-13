const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_DATABASE || 'testDB',
  password: process.env.DB_PASS || 'admin',
  port: process.env.DB_PORT || 5432,
});

async function runMigrations() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const migrationFiles = fs
      .readdirSync(path.join(__dirname))
      .filter((file) => file.endsWith('.sql'))
      .sort();

    for (const file of migrationFiles) {
      console.log(`Running migration: ${file}`);
      const sql = fs.readFileSync(path.join(__dirname, file), 'utf8');
      await client.query(sql);
      console.log(`Completed migration: ${file}`);
    }

    await client.query('COMMIT');
    console.log('All migrations completed successfully');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error running migrations:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

runMigrations().catch(console.error);
