const express = require("express");
const router = express.Router();
const celularController = require('../controllers/celularController');

// recebe dados do celular
router.post("/dados", celularController.receberDados);

// ver dados
router.get("/dados", celularController.verDados);

module.exports = router;