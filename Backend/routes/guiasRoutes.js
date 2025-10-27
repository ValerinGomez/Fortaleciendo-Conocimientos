// // routes/guiasRoutes.js
// const express = require('express');
// const router = express.Router();
// const guiasController = require('../controllers/guiasController.js');

// // Subir una guía
// router.post('/', guiasController.createGuia);

// // Listar todas las guías
// router.get('/', guiasController.getAllGuias);

// // Buscar guías por filtros (grado, semestre, materia)
// router.post('/buscar', guiasController.buscarGuia);

// // Eliminar una guía por ID
// router.delete('/:id', guiasController.deleteGuia);

// module.exports = router;


// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const path = require("path");

// const { getGuias, uploadGuia, deleteGuia } = require("../controllers/guiasController");

// // Configuración de multer para guardar archivos en la carpeta "uploads"
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // nombre único
//   }
// });

// const upload = multer({ storage });

// // Rutas
// router.get("/", getGuias);
// router.post("/", upload.single("archivo"), uploadGuia);
// router.delete("/:id", deleteGuia);

// module.exports = router;

const express = require('express');
const multer = require('multer');
const pool = require('../db/pool');

const router = express.Router();

// Configuración de Multer para guardar los archivos en /uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // carpeta donde se guardarán las guías
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // nombre único
  }
});
const upload = multer({ storage });

// ==========================
// 📌 GET - Listar guías
// ==========================
router.get('/', async (req, res) => {
  console.log('aca6');
const { grado, semestre, materia } = req.query; // 👈 se obtienen desde la URL

  try {
    // Validar que los tres valores vengan en la consulta
    if (!grado || !semestre || !materia) {
      return res.status(400).json({ error: 'Faltan parámetros: grado, semestre o materia' });
    }

    // Hacer la consulta filtrada
    const result = await pool.query(
      `SELECT * FROM grados_semestre 
       WHERE grado = $1 AND semestre = $2 AND materias = $3
       ORDER BY id ASC`,
      [grado, semestre, materia]
    );

    // Si no hay resultados
    if (result.rows.length === 0) {
      return res.status(200).json([]);
    }

    // Enviar los resultados al frontend
    res.json(result.rows);

  } catch (error) {
    console.error('❌ Error al obtener guías:', error.message);
    res.status(500).json({ error: 'Error al obtener guías' });
  }
});

// ==========================
// 📌 POST - Subir guía
// ==========================
router.post('/', upload.single('archivo'), async (req, res) => {
  console.log('aca5');

  try {
    const { grado, semestre, materias } = req.body;
    const archivo = req.file ? `/uploads/${req.file.filename}` : null;

    if (!archivo) {
      return res.status(400).json({ error: 'No se subió ningún archivo' });
    }

    const result = await pool.query(
  'INSERT INTO grados_semestre (grado, semestre, materias, url_archivo) VALUES ($1, $2, $3, $4) RETURNING *',
  [grado, semestre, materias, archivo]
);


    res.json({ success: true, guia: result.rows[0] });
  } catch (error) {
    console.error('❌ Error al subir la guía:', error.message);
    res.status(500).json({ error: 'Error al subir la guía' });
  }
});

// ==========================
// 📌 DELETE - Eliminar guía
// ==========================
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM grados_semestre WHERE id = $1', [id]);
    res.json({ success: true, message: 'Guía eliminada correctamente' });
  } catch (error) {
    console.error('❌ Error al eliminar guía:', error.message);
    res.status(500).json({ error: 'Error al eliminar guía' });
  }
});

module.exports = router;





