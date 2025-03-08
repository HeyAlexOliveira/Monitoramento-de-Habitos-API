const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const habitosRoutes = require("./routes/habitos");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use("/habitos", habitosRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
