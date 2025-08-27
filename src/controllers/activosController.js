const Activo = require('../models/Activo');
const database = require('../config/database');

const activoModel = new Activo(database.getDB());

const activosController = {
  async crearActivo(req, res) {
    try {
      const { id, name, location, serial } = req.body;
      
      if (!id || !name) {
        return res.status(400).json({ error: '❌ ID y Nombre son campos requeridos' });
      }

      const nuevoActivo = await activoModel.crear({
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
      if (error.message.includes('UNIQUE constraint failed')) {
        res.status(400).json({ error: '❌ El ID del activo ya existe' });
      } else {
        console.error('Error crearActivo:', error);
        res.status(500).json({ error: '❌ Error interno del servidor' });
      }
    }
  },

  async obtenerActivos(req, res) {
    try {
      const activos = await activoModel.obtenerTodos();
      res.json(activos);
    } catch (error) {
      console.error('Error obtenerActivos:', error);
      res.status(500).json({ error: '❌ Error al obtener activos' });
    }
  },

  async obtenerActivo(req, res) {
    try {
      const { id } = req.params;
      const activo = await activoModel.obtenerPorId(id);
      
      if (!activo) {
        return res.status(404).json({ error: '❌ Activo no encontrado' });
      }

      res.json(activo);
    } catch (error) {
      console.error('Error obtenerActivo:', error);
      res.status(500).json({ error: '❌ Error al obtener el activo' });
    }
  },

  async actualizarActivo(req, res) {
    try {
      const { id } = req.params;
      const { name, location, serial } = req.body;

      if (!name) {
        return res.status(400).json({ error: '❌ Nombre es requerido' });
      }

      const activoActualizado = await activoModel.actualizar(id, {
        name,
        location: location || '',
        serial: serial || ''
      });

      res.json({
        message: '✅ Activo actualizado exitosamente',
        data: activoActualizado
      });
    } catch (error) {
      console.error('Error actualizarActivo:', error);
      res.status(500).json({ error: '❌ Error al actualizar el activo' });
    }
  },

  async eliminarActivo(req, res) {
    try {
      const { id } = req.params;
      const resultado = await activoModel.eliminar(id);

      if (resultado.deleted === 0) {
        return res.status(404).json({ error: '❌ Activo no encontrado' });
      }

      res.json({ message: '✅ Activo eliminado exitosamente' });
    } catch (error) {
      console.error('Error eliminarActivo:', error);
      res.status(500).json({ error: '❌ Error al eliminar el activo' });
    }
  }
};

console.log('✅ activosController cargado correctamente');
module.exports = activosController;
