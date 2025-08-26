class Activo {
  constructor(db) {
    this.db = db;
  }

  crear(activo) {
    return new Promise((resolve, reject) => {
      const { id, name, location, serial } = activo;
      
      this.db.run(
        `INSERT INTO activos (id, name, location, serial) VALUES (?, ?, ?, ?)`,
        [id, name, location, serial],
        function(err) {
          if (err) {
            reject(err);
          } else {
            resolve({ id, name, location, serial });
          }
        }
      );
    });
  }

  obtenerTodos() {
    return new Promise((resolve, reject) => {
      this.db.all("SELECT * FROM activos ORDER BY created_at DESC", [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  obtenerPorId(id) {
    return new Promise((resolve, reject) => {
      this.db.get("SELECT * FROM activos WHERE id = ?", [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }
}

module.exports = Activo;
