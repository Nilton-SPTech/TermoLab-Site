var express = require("express");
var router = express.Router();

var testeController = require("../controllers/testeController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    testeController.cadastrar(req, res);
})

module.exports = router; 
