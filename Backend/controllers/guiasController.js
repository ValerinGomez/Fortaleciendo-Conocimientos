const pool = require("../db"); // tu conexión a la BD
const path = require("path");
const fs = require("fs");

// Obtener todas las guías
const getGuias = async (req, res) => {
  console.log('aca1');

  try {
    const result = await pool.query("SELECT * FROM guias_semestre ORDER BY id ASC");
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener guías:", error);
    res.status(500).json({ error: "Error al obtener guías" });
  }
};

// Subir una guía
const uploadGuia = async (req, res) => {

  console.log('aca2');
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No se subió ningún archivo" });
    }
    const { grado, semestre, materia } = req.body;
    const nombreArchivo = req.file.originalname;
    const rutaArchivo = req.file.path;

    const result = await pool.query(
      "INSERT INTO guias_semestre (nombre, ruta, grado, semestre, materia) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [nombreArchivo, rutaArchivo, grado, semestre, materia]
    );

    res.status(201).json({ message: "Guía subida correctamente", guia: result.rows[0] });
  } catch (error) {
    console.error("Error al subir guía:", error);
    res.status(500).json({ error: "Error al subir guía" });
  }
};

// Eliminar una guía
const deleteGuia = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar la guía primero
    const guia = await pool.query("SELECT * FROM guias_semestre WHERE id = $1", [id]);
    if (guia.rows.length === 0) {
      return res.status(404).json({ error: "Guía no encontrada" });
    }

    // Eliminar el archivo del servidor (opcional)
    const rutaArchivo = guia.rows[0].ruta;
    if (fs.existsSync(rutaArchivo)) {
      fs.unlinkSync(rutaArchivo);
    }

    // Eliminar de la base de datos
    await pool.query("DELETE FROM guias_semestre WHERE id = $1", [id]);

    res.json({ message: "Guía eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar guía:", error);
    res.status(500).json({ error: "Error al eliminar guía" });
  }
};

module.exports = {
  getGuias,
  uploadGuia,
  deleteGuia
};


