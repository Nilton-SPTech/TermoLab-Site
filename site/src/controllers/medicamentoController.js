var medicamentoModel = require("../models/medicamentoModel");

function listar_medicamento(req, res){

    medicamentoModel.listar_medicamento()
    .then(function (resultado){
        res.status(200).json(resultado);
    })
    .catch(function (erro){
        console.log(erro)
        console.log("Houve um erro ao buscar os medicamentos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function listar_medicamento_tela(req, res){

    medicamentoModel.listar_medicamento_tela()
    .then(function (resultado){
        res.status(200).json(resultado);
    })
    .catch(function (erro){
        console.log(erro)
        console.log("Houve um erro ao buscar os medicamentos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function listar_medicamento_metrica(req, res){
    var usuario = req.params.idUsuario

    medicamentoModel.listar_medicamento_metrica(usuario)
    .then(function (resultado){
        res.status(200).json(resultado);
    })
    .catch(function (erro){
        console.log(erro)
        console.log("Houve um erro ao buscar os medicamentos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function cadastro(req, res){
    var medicamento = req.body.medicamento
    var setor = req.body.setor
    var lote = req.body.lote
    var validade = req.body.validade
    var usuario = req.body.usuario
    var quantidade = req.body.quantidade

    medicamentoModel.cadastro(lote, setor, medicamento, validade, usuario, quantidade)
    .then(function (resultado){
        res.status(200).json(resultado);
    })
    .catch(function (erro){
        console.log(erro)
        console.log("Houve um erro ao buscar os medicamentos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function selectDadosSetor(req, res){
    var setor = req.params.idSetor

    medicamentoModel.selectDadosSetor(setor)
    .then(function (resultado){
        res.status(200).json(resultado);
    })
    .catch(function (erro){
        console.log(erro)
        console.log("Houve um erro ao buscar os medicamentos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function atualizarGrafico(req, res){
    var setor = req.params.idSetor

    medicamentoModel.atualizarGrafico(setor)
    .then(function (resultado){
        res.status(200).json(resultado);
    })
    .catch(function (erro){
        console.log(erro)
        console.log("Houve um erro ao buscar os medicamentos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function obterDadosDash(req, res){
    var setor = req.params.idSetor
    medicamentoModel.obterDadosDash(setor).then((resultado)=>res.status(200).json(resultado))
}

function quantidadeVacinas(req, res){
    var setor = req.body.idSetor
    var medicamento = req.body.idMedicamento
    
    medicamentoModel.quantidadeVacinas(setor, medicamento)
    .then(function(resultado){
        res.status(200).json(resultado)
    })
    .catch(function (erro){
        console.log(erro)
        console.log("Houve um erro ao buscar os medicamentos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function updateVacina(req, res){
    var setor = req.body.idSetor
    var medicamento = req.body.idMedicamento
    var quantidade = req.body.quantidadeBaixa


    medicamentoModel.updateVacina(setor, medicamento, quantidade)
        .then(function (resultado){
            res.status(200).json(resultado)
        })
}

module.exports = {
    listar_medicamento,
    listar_medicamento_tela,
    cadastro,
    listar_medicamento_metrica,
    selectDadosSetor,
    atualizarGrafico,
    obterDadosDash,
    quantidadeVacinas,
    updateVacina
}
