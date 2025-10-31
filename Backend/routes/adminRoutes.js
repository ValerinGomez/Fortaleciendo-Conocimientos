const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/', adminController.obtenerUsuarios);
router.put('/:id', adminController.editarUsuario);
router.delete('/:id', adminController.eliminarUsuario);

module.exports = router;


