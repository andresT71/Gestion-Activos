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
            resolve({ id, name, location, serial, created_at: new Date().toISOString() });
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

  actualizar(id, activo) {
    return new Promise((resolve, reject) => {
      const { name, location, serial } = activo;
      
      this.db.run(
        `UPDATE activos SET name = ?, location = ?, serial = ? WHERE id = ?`,
        [name, location, serial, id],
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

  eliminar(id) {
    return new Promise((resolve, reject) => {
      this.db.run("DELETE FROM activos WHERE id = ?", [id], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ deleted: this.changes });
        }
      });
    });
  }
}

module.exports = Activo;
