var express = require("express");
var router = express.Router();

var setorController = require("../controllers/setorController")

router.post("/cadastrar", function(req, res){
    setorController.cadastrar(req,res)
})

router.get("/listar/:id_usuario", function(req, res){
    setorController.listar(req,res)
})

router.get("/carregarSetores/:idUsuario", function (req, res){
    setorController.carregarSetores(req,res)
})


router.get("/total_setor/:id_usuario", function (req, res){
    setorController.total_setor(req, res)
})

router.post("/cadastrarSensor", function (req, res){
    setorController.cadastrarSensor(req, res)
})

router.get("/pegarNSerie", function (req, res){
    setorController.pegarNSerie(req, res)
})

router.post("/carregarSetoresDash2", function (req, res){
    setorController.carregarSetoresDash2(req, res)
})

router.get("/alertas/:idMedicamento", function (req, res){
    setorController.alertas(req, res)
})

router.get("/alertasDash/:idUsuario", function (req, res){
    setorController.alertasDash(req, res)
})

router.get("/manutencao/:idUsuario", function (req, res){
    setorController.manutencao(req, res)
})

router.get("/tipoMedicamento/:idUsuario", function (req, res){
    setorController.tipoMedicamento(req, res)
})

router.get("/capacidadeSetor/:idUsuario", function (req, res){
    setorController.capacidadeSetor(req, res)
})

router.post("/deleteSetor", function(req,res){
    setorController.deleteSetor(req, res)
})

module.exports = router