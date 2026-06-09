require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./database/database");

const notebookRoutes = require("./src/Routes/NotebookRoutes");
const carrinhoRoutes = require("./src/Routes/CarrinhoRoutes");

const app = express();

//MIDDLEWARES
app.use(cors());                  
app.use(express.json());          

//  BANCO DE DADOS 
connectDB();

// ROTAS 
app.use("/Notebooks", notebookRoutes);
app.use("/Carrinhos", carrinhoRoutes);


app.get("/", (req, res) => {
    res.json({ status: "API rodando com sucesso" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
