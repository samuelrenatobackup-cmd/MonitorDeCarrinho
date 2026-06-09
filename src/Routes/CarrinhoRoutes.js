const express = require("express");
const router = express.Router();
const carrinhoController = require("../controllers/carrinhoController");

// GET    /carrinhos                  → lista todos
// POST   /carrinhos                  → cria um novo
// GET    /carrinhos/:id              → busca um por ID
// GET    /carrinhos/:id/notebooks    → busca o carrinho + notebooks vinculados
// PUT    /carrinhos/:id              → atualiza um por ID
// DELETE /carrinhos/:id              → deleta um por ID

router.get("/",                    carrinhoController.listar);
router.post("/",                   carrinhoController.criar);
router.get("/:id",                 carrinhoController.buscarPorId);
router.get("/:id/notebooks",       carrinhoController.buscarNotebooks);
router.put("/:id",                 carrinhoController.atualizar);
router.delete("/:id",              carrinhoController.deletar);

module.exports = router;
