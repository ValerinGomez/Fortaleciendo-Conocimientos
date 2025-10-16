// controllers/guiasEstudiantesController.js
const pool = require('../db/pool');

// 📘 Obtener guías para los estudiantes
exports.obtenerGuias = async (req, res) => {
  console.log('aca4');
  
  const { grado, semestre, materia } = req.query;
  try {
    const result = await pool.query(
      `SELECT * FROM guias_estudiantes WHERE grado = $1 AND semestre = $2 AND materia = $3`,
      [grado, semestre, materia]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('❌ Error al obtener guías:', error.message);
    res.status(500).json({ error: 'Error al obtener las guías' });
  }
};

// 📗 Subir guía nueva
exports.subirGuia = async (req, res) => {
  console.log('aca3');

  const { grado, semestre, materia, titulo, descripcion, archivo_url } = req.body;
  try {
    await pool.query(
      `INSERT INTO guias_estudiantes (grado, semestre, materia, titulo, descripcion, archivo_url)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [grado, semestre, materia, titulo, descripcion, archivo_url]
    );
    res.status(201).json({ message: '✅ Guía subida correctamente' });
  } catch (error) {
    console.error('❌ Error al subir la guía:', error.message);
    res.status(500).json({ error: 'Error al subir la guía' });
  }
};
