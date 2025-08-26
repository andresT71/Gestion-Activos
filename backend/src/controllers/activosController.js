const Activo = require('../models/Activo');
const database = require('../config/database');

// Inicialización diferida para evitar problemas
let activoModel = null;

const getModel = () => {
  if (!activoModel) {
    activoModel = new Activo(database.getDB());
  }
  return activoModel;
};

const activosController = {
  async crearActivo(req, res) {
    try {
      const { id, name, location, serial } = req.body;
      
      if (!id || !name) {
        return res.status(400).json({ error: 'ID y Nombre son requeridos' });
      }

      const model = getModel();
      const nuevoActivo = await model.crear({
        id,
        name,
        location: location || '',
        serial: serial || ''
      });

      res.status(201).json({
        message: '✅ Activo creado exitosamente',
        data: nuevoActivo
      });
    } catch (error) {
      console.error('Error crearActivo:', error);
      res.status(500).json({ error: '❌ Error interno del servidor' });
    }
  },

  async obtenerActivos(req, res) {
    try {
      const model = getModel();
      const activos = await model.obtenerTodos();
      res.json(activos);
    } catch (error) {
      console.error('Error obtenerActivos:', error);
      res.status(500).json({ error: '❌ Error al obtener activos' });
    }
  },

  async obtenerActivo(req, res) {
    try {
      const { id } = req.params;
      const model = getModel();
      const activo = await model.obtenerPorId(id);
      
      if (!activo) {
        return res.status(404).json({ error: '❌ Activo no encontrado' });
      }

      res.json(activo);
    } catch (error) {
      console.error('Error obtenerActivo:', error);
      res.status(500).json({ error: '❌ Error al obtener el activo' });
    }
  }
};

console.log('✅ activosController cargado');
module.exports = activosController;
