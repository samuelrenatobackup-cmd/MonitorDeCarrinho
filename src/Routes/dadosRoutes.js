const express = require("express");
const router = express.Router();
const dadosController = require('../controllers/dadosController');

// recebe dados do celular
router.post("/dados", dadosController.receberDados);

// ver dados
router.get("/dados", dadosController.verDados);

module.exports = router;