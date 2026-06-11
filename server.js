require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./database/database");

const notebookRoutes = require("./src/routes/notebookRoutes");
const carrinhoRoutes = require("./src/routes/carrinhoRoutes");
const dadosRoutes = require("./src/routes/dadosRoutes");

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());

// BANCO
connectDB();

// ROTAS
app.use("/Notebooks", notebookRoutes);
app.use("/Carrinhos", carrinhoRoutes);

// TESTE
app.use("/api", dadosRoutes);

// TESTE
app.get("/", (req, res) => {
    res.json({ status: "API rodando com sucesso" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});