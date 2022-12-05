var database = require("../database/config")

function cadastrar(andar, sala, temp, fk){

    var instrucao = `INSERT INTO geladeira VALUES 
        (${andar}, '${sala}', ${temp}, ${fk});
        
        select top 1 idGeladeira from geladeira order by idGeladeira desc;
        `

    console.log("Executando a instrução SQL: \n" + instrucao)
    return database.executar(instrucao); 
}

function cadastrarSensor(idGeladeira, numSerie, usuario){

    var instrucao = `
        insert into sensor values (${numSerie}, ${idGeladeira}, ${usuario});
        `

    console.log("Executando a instrução SQL: \n" + instrucao)
    return database.executar(instrucao); 
}

function carregarSetores(idUsuario){

    var instrucao = `
    select idGeladeira, sala, tempMediaSetor from geladeira where fkUsuario = ${idUsuario};
    `

    console.log("Executando a instrução SQL: \n" + instrucao)
    return database.executar(instrucao); 
}
    
function listar(id_usuario){
    var instrucao = `SELECT * FROM geladeira 
                    WHERE fkUsuario = ${id_usuario};`

    console.log("Executando a instrução SQL: \n", instrucao)
    return database.executar(instrucao)
}

function total_setor(id_usuario){

    var instrucao = `SELECT COUNT(idGeladeira) totalGeladeira FROM geladeira 
    WHERE fkUsuario = ${id_usuario};`

    console.log("Executando a instrução SQL: \n", instrucao)

    return database.executar(instrucao)
} 

function pegarNSerie(){

    var instrucao = `
    select top 1 numeroSerie from sensor order by numeroSerie desc;
    `

    console.log("Executando a instrução SQL: \n", instrucao)

    return database.executar(instrucao)
} 

function carregarSetoresDash2(idUsuario, idMedicamento){

    var instrucao = `
    select idGeladeira, sala, tempMediaSetor from geladeira join lote on idGeladeira = fkGeladeira
    where geladeira.fkUsuario = ${idUsuario} and fkMedicamento = ${idMedicamento} order by idGeladeira asc;
    `;

    console.log("Executando a instrução SQL: \n" + instrucao)
    return database.executar(instrucao); 
}

function alertas(medicamento){

    var instrucao = `
    select top 15 temperatura, umidade from metrica join sensor on idSensor = fkSensor join geladeira on idGeladeira = sensor.fkGeladeira join lote on idGeladeira = lote.fkGeladeira where fkMedicamento = ${medicamento};
    `;

    console.log("Executando a instrução SQL: \n" + instrucao)
    return database.executar(instrucao); 
}

function alertasDash(usuario){
    var instrucao = `
    select top 15 temperatura, umidade from metrica join sensor on idSensor = fkSensor join geladeira on idGeladeira = sensor.fkGeladeira join lote on idGeladeira = lote.fkGeladeira where lote.fkUsuario = ${usuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao)
    return database.executar(instrucao); 
}

function manutencao(usuario){
    var instrucao = `
    select count(temperatura) 'limiteMaximo', idSensor from metrica join sensor on idSensor = fkSensor where dataHora >= DATEADD(hour, -27, GETDATE()) and (temperatura > -1 or temperatura < -9) and fkUsuario = ${usuario} group by idSensor;
    `
    return database.executar(instrucao); 
}

function tipoMedicamento(usuario){
    var instrucao = `
    select categoria, count(categoria) 'contagem' from medicamento join lote on idMedicamento = fkMedicamento where fkUsuario = ${usuario} group by categoria order by categoria asc;
    `
    return database.executar(instrucao); 
}

function capacidadeSetor(usuario){
    var instrucao = `
    select count(quantidade) * 250 'capacidade', sum(quantidade) 'qtdAtual' from lote where fkUsuario = ${usuario};
    `
    return database.executar(instrucao); 
}

function deleteSetor(setor, medicamento){
    var instrucao = `DELETE FROM lote WHERE fkGeladeira = ${setor} AND fkMedicamento = ${medicamento}`
    return database.executar(instrucao); 
}

module.exports = {
    cadastrar,
    listar,
    total_setor,
    carregarSetores,
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