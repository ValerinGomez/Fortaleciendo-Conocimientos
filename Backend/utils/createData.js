// const pool = require('../db/pool');

// const createData = async (req, res) => {
//   try {
//     await pool.query(`
        

        
//         INSERT INTO cursos (nombre) VALUES ('10A');
// INSERT INTO cursos (nombre) VALUES ('11B');



// INSERT INTO users (name, password, role)
// VALUES ('Coordinador', 'admin123', 'administrador');




// INSERT INTO users (name, password, role)
// VALUES ('Juan Pérez', 'profejuan', 'docente'); 
// INSERT INTO users (name, password, role)
// VALUES ('María López', 'profemaria', 'docente'); 


// INSERT INTO users (name, password, role, curso_id)
// VALUES ('Ana Gómez', 'ana123', 'estudiante', 1); 
// INSERT INTO users (name, password, role, curso_id)
// VALUES ('Carlos Ruiz', 'carlos123', 'estudiante', 1); 
// INSERT INTO users (name, password, role, curso_id)
// VALUES ('Laura Torres', 'laura123', 'estudiante', 2); 


// INSERT INTO materias (nombre, descripcion, docente_id)
// VALUES ('Matemáticas', 'Álgebra y geometría', 2);

// INSERT INTO materias (nombre, descripcion, docente_id)
// VALUES ('Español', 'Literatura y gramática', 3); 



// INSERT INTO cursos_materias (curso_id, materia_id) VALUES (1, 1); 
// INSERT INTO cursos_materias (curso_id, materia_id) VALUES (1, 2); 
// INSERT INTO cursos_materias (curso_id, materia_id) VALUES (2, 2); 

// -
// INSERT INTO semestres (nombre, fecha_inicio, fecha_fin)
// VALUES ('1', '2025-01-15', '2025-06-15');

// INSERT INTO semestres (nombre, fecha_inicio, fecha_fin)
// VALUES ('2', '2025-07-15', '2025-12-15');


// INSERT INTO guias (titulo, descripcion, archivo_url, materia_id, curso_id, semestre_id)
// VALUES ('Guía Álgebra Básica', 'Ejercicios de ecuaciones de primer grado',
//         '/archivos/guias/algebra1.pdf', 1, 1, 1);

// INSERT INTO guias (titulo, descripcion, archivo_url, materia_id, curso_id, semestre_id)
// VALUES ('Guía Análisis de Cuentos', 'Lectura y análisis de textos narrativos',
//         '/archivos/guias/cuentos.pdf', 2, 1, 1);

// INSERT INTO guias (titulo, descripcion, archivo_url, materia_id, curso_id, semestre_id)
// VALUES ('Guía Ensayos Literarios', 'Cómo escribir un ensayo literario',
//         '/archivos/guias/ensayos.pdf', 2, 2, 2);

//             `); ['asd', 'passsa@asd.asd', hashedPassword, false];
//     res.send('✅ data crada correctamente');
//   } catch (error) {
//     console.error('❌ Error al crear tablasxx:', error.message);
//     res.status(500).send('❌ Error al crear las tablasz',error.message);
//   }
// };

// module.exports = insertData;

const pool = require('../db/pool'); 
const bcrypt = require('bcrypt');
const createData = async (req, res) => {
  console.log(await pool.query(
            "SELECT * FROM usuarios",
        ));
  
   
    try {
        // Hashear la contraseña (puedes cambiar '123' por la contraseña real)
        const hashedPassword = await bcrypt.hash('741852', 10);
        // Insertar datos en la tabla usuarios
        await pool.query(
            "INSERT INTO usuarios (name, password, user_role) VALUES ($1, $2, $3)",
            ['Sofia Nuñez', hashedPassword, 'docente']
        );
          console.log(await pool.query(
            "SELECT * FROM usuarios",
        ));
        res.send('☑ Data creada correctamente');
    } catch (error) {
        console.error('✗ Error al crear los datos:', error.message);
        res.status(500).send('✗ Error al crear los datos: ' + error.message);
    }
};
module.exports = createData;


// const pool = require('../db/pool'); // Asegúrate que esta ruta es correcta

// const createData = async (req, res) => {
//   try {
//     // Mostrar el contenido actual de la tabla
//     const datosPrevios = await pool.query("SELECT * FROM grados_semestre");
//     console.log('Antes de insertar:', datosPrevios.rows);

//     // Datos estáticos por ahora (puedes cambiarlos o extraerlos de req.body)
//     const grado = 'GRADO 6°';
//     const semestre = 'SEMESTRE 1';
//     const materias = 'QUÍMICA';
//     const URL = 'https://example.com/materias.pdf';

//     // Insertar los datos
//     const insert = await pool.query(
//       "INSERT INTO grados_semestre (grado, semestre, materias, url_archivo) VALUES ($1, $2, $3, $4) RETURNING *",
//       [grado, semestre, materias, URL]
//     );

//     // Mostrar el contenido actualizado de la tabla
//     const datosNuevos = await pool.query("SELECT * FROM grados_semestre");
//     console.log('Después de insertar:', datosNuevos.rows);

//     // Confirmar
//     res.send('☑ Data creada correctamente');
//   } catch (error) {
//     console.error('✗ Error al crear los datos:', error.message);
//     res.status(500).send('✗ Error al crear los datos: ' + error.message);
//   }
// };

// module.exports = createData;