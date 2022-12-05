var express = require("express");
var router = express.Router();

var medicamentoControler = require("../controllers/medicamentoController")

router.get("/listar_medicamento", function(req,res){
    medicamentoControler.listar_medicamento(req,res); 
})

router.get("/listar_medicamento_tela", function(req,res){
    medicamentoControler.listar_medicamento_tela(req,res); 
})

router.get("/listar_medicamento_metrica/:idUsuario", function(req,res){
    medicamentoControler.listar_medicamento_metrica(req,res); 
})

router.post("/cadastro", function(req,res){
    medicamentoControler.cadastro(req,res); 
})

router.get("/selectDadosSetor/:idSetor", function(req,res){
    medicamentoControler.selectDadosSetor(req,res); 
})

router.get("/atualizarGrafico/:idSetor", function(req,res){
    medicamentoControler.atualizarGrafico(req,res); 
})

router.get("/obterDadosDash/:idSetor",(req,res)=>medicamentoControler.obterDadosDash(req,res))

router.post("/quantidadeVacinas", function(req, res) {
    medicamentoControler.quantidadeVacinas(req,res)
})

router.post("/updateVacina", function(req, res){
    medicamentoControler.updateVacina(req, res)
})

module.exports = router