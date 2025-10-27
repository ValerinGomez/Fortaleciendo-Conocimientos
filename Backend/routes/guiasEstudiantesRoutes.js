const express = require('express');
const router = express.Router();
const guiasEstudiantesController = require('../controllers/guiasEstudiantesController');

// Obtener guías según grado, semestre y materia
router.get('/', guiasEstudiantesController.obtenerGuias);

module.exports = router;





    