// const pool = require('../db/pool');

// const createTables = async (req, res) => {
//   try {
//  console.log("Iniciando creación de tablas...");
// // DROP TABLE IF EXISTS users CASCADE;
//     await pool.query(`
  




// CREATE TABLE IF NOT EXISTS usuarios (
// id SERIAL PRIMARY KEY,
// name VARCHAR(50) NOT NULL,
// password TEXT NOT NULL,
// user_role VARCHAR(20) NOT NULL CHECK (user_role IN ('estudiante', 'docente', 'administrador'))
// );



// CREATE TABLE IF NOT EXISTS  grados_semestre (
//  id SERIAL PRIMARY KEY ,
//  grado VARCHAR(100) NOT NULL,
//  materias VARCHAR (100) NOT NULL,
//  semestre VARCHAR(100) NOT NULL,
//   fecha_publicacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//   estado VARCHAR(50) DEFAULT 'PENDIENTE POR CARGAR',
//   url_archivo VARCHAR(100)
// );


//     `);
//     res.send('✅ Tablas creadas correctamente');
//   } catch (error) {
//     console.error('❌ Error al crear tablas:', error.message);
//     res.status(500).send('❌ Error al crear las tablas ',error);
//   }
// };

// module.exports = createTables;


const pool = require('../db/pool');

const createTables = async (req, res) => {
  try {
    console.log("Iniciando creación de tablas...");

    const query = `
      CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        password TEXT NOT NULL,
        user_role VARCHAR(20) NOT NULL CHECK (user_role IN ('estudiante', 'docente', 'administrador'))
      );

      CREATE TABLE IF NOT EXISTS grados_semestre (
        id SERIAL PRIMARY KEY,
        grado VARCHAR(100) NOT NULL,
        materias VARCHAR(100) NOT NULL,
        semestre VARCHAR(100) NOT NULL,
        fecha_publicacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        estado VARCHAR(50) DEFAULT 'PENDIENTE POR CARGAR',
        url_archivo VARCHAR(100)
      );

   DROP TABLE IF EXISTS guias_estudiantes;


CREATE TABLE guias_estudiantes (
    id SERIAL PRIMARY KEY,                    
    grado VARCHAR(20) NOT NULL,               
    semestre VARCHAR(10) NOT NULL,            
    materia VARCHAR(100) NOT NULL,            
    titulo VARCHAR(255) NOT NULL,             
    descripcion TEXT,                         
    archivo_url TEXT NOT NULL,                
    fecha_subida TIMESTAMP DEFAULT CURRENT_TIMESTAMP  
);
    `;

    await pool.query(query);

    console.log("✅ Tablas creadas correctamente");
    res.send("Tablas creadas correctamente");
  } catch (error) {
    console.error("❌ Error al crear tablas:", error.message);
    res.send("Error al crear las tablas");
  }
};

module.exports = createTables;
