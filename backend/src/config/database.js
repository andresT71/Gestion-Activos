const sqlite3 = require('sqlite3').verbose();

class Database {
  constructor() {
    this.db = new sqlite3.Database('./activos.db', (err) => {
      if (err) {
        console.error('Error al conectar con la base de datos:', err);
      } else {
        console.log('✅ Conectado a SQLite');
        this.initDatabase();
      }
    });
  }

  initDatabase() {
    this.db.run(`
      CREATE TABLE IF NOT EXISTS activos (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        location TEXT,
        serial TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) {
        console.error('❌ Error al crear tabla:', err);
      } else {
        console.log('✅ Tabla "activos" verificada');
      }
    });
  }

  getDB() {
    return this.db;
  }

  close() {
    this.db.close();
  }
}

module.exports = new Database();
