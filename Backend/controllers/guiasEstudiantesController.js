const pool = require('../db/pool');

// 📘 Obtener guías disponibles según grado, semestre y materia
exports.obtenerGuias = async (req, res) => {
  const { grado, semestre, materia } = req.query;

  try {
    const result = await pool.query(
      `SELECT id, grado, semestre, materias AS materia, fecha_publicacion, estado, url_archivo
       FROM grados_semestre
       WHERE grado = $1 AND semestre = $2 AND materias = $3 AND url_archivo IS NOT NULL`,
      [grado, semestre, materia]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('❌ Error al obtener guías:', error.message);
    res.status(500).json({ error: 'Error al obtener guías desde grados_semestre' });
  }
};


