const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root", 
  password: "teamstudy2024",
  database: "monitoramento_habitos",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Conectado ao banco de dados!");
});

router.get("/", (req, res) => {
  db.query("SELECT * FROM habitos", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM habitos WHERE id = ?", [id], (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});


router.get("/nome/:nome", (req, res) => {
  const nome = req.params.nome;
  db.query("SELECT * FROM habitos WHERE habito LIKE ?", [`%${nome}%`], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});


router.post("/", (req, res) => {
  const { habito, meta, frequencia } = req.body;
  const novoHabito = { habito, meta, frequencia };
  db.query("INSERT INTO habitos SET ?", novoHabito, (err, results) => {
    if (err) throw err;
    res.json({ id: results.insertId, ...novoHabito });
  });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { habito, meta, frequencia } = req.body;
  db.query(
    "UPDATE habitos SET habito = ?, meta = ?, frequencia = ? WHERE id = ?",
    [habito, meta, frequencia, id],
    (err, results) => {
      if (err) throw err;
      res.json({ id, habito, meta, frequencia });
    }
  );
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM habitos WHERE id = ?", [id], (err) => {
    if (err) throw err;
    res.json({ message: "Hábito deletado com sucesso!" });
  });
});

module.exports = router;
