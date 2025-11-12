import express from "express";
import cors from "cors";
import connection from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

// 🟢 Crear Alumno (POST)
app.post("/api/alumnos", (req, res) => {
  const { nombre, edad, curso } = req.body;
  const sql = "INSERT INTO alumnos (nombre, edad, curso) VALUES (?, ?, ?)";

  connection.query(sql, [nombre, edad, curso], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ mensaje: "Alumno agregado correctamente", id: results.insertId });
  });
});

// 🟡 Listar Alumnos (GET)
app.get("/api/alumnos", (req, res) => {
  connection.query("SELECT * FROM alumnos", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// 🔵 Actualizar Alumno (PUT)
app.put("/api/alumnos/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, edad, curso } = req.body;
  const sql = "UPDATE alumnos SET nombre = ?, edad = ?, curso = ? WHERE id = ?";

  connection.query(sql, [nombre, edad, curso, id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.affectedRows === 0)
      return res.status(404).json({ mensaje: "Alumno no encontrado" });

    res.json({ mensaje: "Alumno actualizado correctamente" });
  });
});

// 🔴 Eliminar Alumno (DELETE)
app.delete("/api/alumnos/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM alumnos WHERE id = ?";

  connection.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.affectedRows === 0)
      return res.status(404).json({ mensaje: "Alumno no encontrado" });

    res.json({ mensaje: "Alumno eliminado correctamente" });
  });
});

// 🧩 Configurar ruta frontend
app.use(express.static("public"));

// 🚀 Puerto del servidor
const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
);
