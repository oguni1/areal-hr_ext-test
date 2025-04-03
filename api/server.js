const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'mydb',
  password: 'admin',
  port: 3306,
});

async function testConnection() {
  try {
    client.connect();
    console.log('Подключение к PostgreSQL установлено');

    const text = 'SELECT * FROM organizations;'

    const res = await client.query(text)
    console.log(res.rows[0]);

    client.end();
  } catch (err) {
    console.error('Ошибка подключения к PostgreSQL:', err);
  }
}

testConnection();