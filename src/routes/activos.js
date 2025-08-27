const express = require('express');
const router = express.Router();
const activosController = require('../controllers/activosController');

// POST /api/activos - Crear nuevo activo
router.post('/', activosController.crearActivo);

// GET /api/activos - Obtener todos los activos
router.get('/', activosController.obtenerActivos);

// GET /api/activos/:id - Obtener activo por ID
router.get('/:id', activosController.obtenerActivo);

// PUT /api/activos/:id - Actualizar activo
router.put('/:id', activosController.actualizarActivo);

// DELETE /api/activos/:id - Eliminar activo
router.delete('/:id', activosController.eliminarActivo);

console.log('✅ Rutas de activos definidas correctamente');
module.exports = router;
