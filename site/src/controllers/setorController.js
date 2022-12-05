var setorModel = require("../models/setorModel");

function cadastrar(req, res){

    var andar = req.body.andarServer; 
    var sala = req.body.salaServer; 
    var temp = req.body.tempServer
    var fk = req.body.idUsuarioServer; 

    setorModel.cadastrar(andar, sala, temp, fk)
        .then(
            function (resultado){
                res.json(resultado);
            }
        ).catch(
            function (erro){
                console.log(erro);
                console.log("\nHouve um erro ao realizar o cadastrar! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage)
            }
        )
}

function cadastrarSensor(req, res){

    var idGeladeira = req.body.id; 
    var numSerie = req.body.numSerie; 
    var usuario = req.body.usuario;

    setorModel.cadastrarSensor(idGeladeira, numSerie, usuario)
        .then(
            function (resultado){
                res.json(resultado);
            }
        ).catch(
            function (erro){
                console.log(erro);
                console.log("\nHouve um erro ao realizar o cadastrar! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage)
            }
        )
}

function pegarNSerie(req, res){
     
    setorModel.pegarNSerie()
        .then(
            function (resultado){
                res.json(resultado);
            }
        ).catch(
            function (erro){
                console.log(erro);
                console.log("\nHouve um erro ao realizar o cadastrar! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage)
            }
        )
}

function listar(req, res){
    var id_usuario = req.params.id_usuario 

    setorModel.listar(id_usuario)
        .then(function (resultado){
            res.json(resultado)
        })
        .catch(function (erro){
            console.log(erro)
            console.log("\nHouve um erro ao realizar a consulta", erro.sqlMessage)
            res.status(500).json(erro.sqlMessage)
        })
}


function total_setor(req, res){
    var id_usuario = req.params.id_usuario

    setorModel.total_setor(id_usuario)
        .then(function (resultado){
            res.json(resultado)
        })
        .catch(function (erro){
            console.log(erro)
            console.log("\nHouve um erro ao realizar a consulta", erro.sqlMessage)
            res.status(500).json(erro.sqlMessage)
        })
}

function carregarSetores(req, res){
    var idUsuario = req.params.idUsuario

    setorModel.carregarSetores(idUsuario)
        .then(
            function (resultado){
                res.json(resultado);
            }
        ).catch(
            function (erro){
                console.log(erro);
                console.log("\nHouve um erro ao realizar o cadastrar! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage)
            }
        )

}

function carregarSetoresDash2(req, res){
    var idUsuario = req.body.idUsuario
    var idMedicamento = req.body.idMedicamento

    setorModel.carregarSetoresDash2(idUsuario, idMedicamento)
        .then(
            function (resultado){
                res.json(resultado);
            }
        ).catch(
            function (erro){
                console.log(erro);
                console.log("\nHouve um erro ao realizar o cadastrar! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage)
            }
        )

}

function alertas(req, res){
    var medicamento = req.params.idMedicamento

    setorModel.alertas(medicamento)
        .then(
            function (resultado){
                res.json(resultado);
            }
        ).catch(
            function (erro){
                console.log(erro);
                console.log("\nHouve um erro ao realizar o cadastrar! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage)
            }
        )

}

function alertasDash(req, res){
    var usuario = req.params.idUsuario

    setorModel.alertasDash(usuario)
        .then(
            function (resultado){
                res.json(resultado);
            }
        ).catch(
            function (erro){
                console.log(erro);
                console.log("\nHouve um erro ao realizar o cadastrar! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage)
            }
        )

}

function manutencao(req, res){
    var usuario = req.params.idUsuario
    setorModel.manutencao(usuario).then((resultado)=>res.json(resultado)
        ).catch((erro)=>{
                console.log(erro);
                console.log("\nHouve um erro ao realizar o cadastrar! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage)
            }
        )
}

function tipoMedicamento(req, res){
    var usuario = req.params.idUsuario
    setorModel.tipoMedicamento(usuario).then((resultado)=>res.json(resultado)
        ).catch((erro)=>{
                console.log(erro);
                console.log("\nHouve um erro ao realizar o cadastrar! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage)
            }
        )
}

function capacidadeSetor(req, res){
    var usuario = req.params.idUsuario
    setorModel.capacidadeSetor(usuario).then((resultado)=>res.json(resultado)
        ).catch((erro)=>{
                console.log(erro);
                console.log("\nHouve um erro ao realizar o cadastrar! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage)
            }
        )
}


function deleteSetor(req, res){
    var setor = req.body.idSetor
    var medicamento = req.body.idMedicamento
    
    setorModel.deleteSetor(setor, medicamento)
        .then(function (resultado){
            res.json(resultado)
        })
}

module.exports = {
    cadastrar,
    carregarSetores,
    listar,
    total_setor,
    cadastrarSensor,
    pegarNSerie,
    carregarSetoresDash2,
    alertas,
    alertasDash,
    manutencao,
    tipoMedicamento,
    capacidadeSetor,
    deleteSetor
}