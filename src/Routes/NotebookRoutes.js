const express = require("express");
const router = express.Router();
const notebookController = require("../controllers/notebookController");

// GET    /notebooks          → lista todos
// POST   /notebooks          → cria um novo
// GET    /notebooks/:id      → busca um por ID
// PUT    /notebooks/:id      → atualiza um por ID
// DELETE /notebooks/:id      → deleta um por ID

router.get("/",          notebookController.listar);
router.post("/",         notebookController.criar);
router.get("/:id",       notebookController.buscarPorId);
router.put("/:id",       notebookController.atualizar);
router.delete("/:id",    notebookController.deletar);

module.exports = router;
