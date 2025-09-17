const pool = require('../db/pool');

const createTables = async (req, res) => {
  try {
    await pool.query(`
  


DROP TABLE IF EXISTS users CASCADE;
DROP TABLE usuarios;

CREATE TABLE IF NOT EXISTS usuarios (
id SERIAL PRIMARY KEY,
name VARCHAR(50) NOT NULL,
password TEXT NOT NULL,
role VARCHAR(20) NOT NULL CHECK (role IN ('estudiante', 'docente', 'administrador'))
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    password TEXT NOT NULL,
    user_role VARCHAR(20) NOT NULL CHECK (user_role IN ('estudiante', 'docente', 'administrador'))
);









    `);
    res.send('✅ Tablas creadas correctamente');
  } catch (error) {
    console.error('❌ Error al crear tablas:', error.message);
    res.status(500).send('❌ Error al crear las tablas ',error);
  }
};

module.exports = createTables;