var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas/:idSetor", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/buscarMedidasEmTempoReal/:idSetor", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})

router.get("/mostrarSensor/:idSetor", function(req, res){
    medidaController.mostrarSensor(req, res)
})

router.post("/inserir_metricas", function(req, res){
    medidaController.inserirMetricas(req, res)
})
module.exports = router;