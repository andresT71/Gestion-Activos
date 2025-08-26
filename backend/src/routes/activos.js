const express = require('express');
const router = express.Router();
const activosController = require('../controllers/activosController');

// ✅ RUTAS CORRECTAS - Usar / (slash simple)
router.post('/', activosController.crearActivo);
router.get('/', activosController.obtenerActivos);
router.get('/:id', activosController.obtenerActivo);

console.log('✅ Rutas de activos definidas');
module.exports = router;
