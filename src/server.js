const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const database = require('./config/database');

// Importar rutas
const activosRoutes = require('./routes/activos');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Rutas
app.use('/api/activos', activosRoutes);

// Ruta de salud
app.get('/health', (req, res) => {
  res.json({ 
    status: '✅ OK', 
    message: 'Servidor de gestión de activos funcionando',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Ruta de prueba
app.get('/api/test', (req, res) => {
  res.json({ message: '✅ Ruta de prueba funciona correctamente' });
});

// Ruta principal
app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenido a la API de Gestión de Activos',
    endpoints: {
      health: '/health',
      activos: '/api/activos',
      test: '/api/test'
    }
  });
});

// Manejo de errores 404
app.use('*', (req, res) => {
  res.status(404).json({ error: '❌ Ruta no encontrada' });
});

// Manejo de errores global
app.use((error, req, res, next) => {
  console.error('❌ Error:', error);
  res.status(500).json({ error: '❌ Error interno del servidor' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor de gestión de activos corriendo en http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔧 API Activos: http://localhost:${PORT}/api/activos`);
});

// Manejo de cierre graceful
process.on('SIGINT', () => {
  console.log('\n🛑 Cerrando servidor...');
  database.close();
  process.exit(0);
});
