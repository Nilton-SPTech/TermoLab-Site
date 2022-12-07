var database = require("../database/config")


function listar_medicamento(){
    var instrucao = `
    SELECT * FROM medicamento;
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listar_medicamento_tela(){
    var instrucao = `
    select fkMedicamento, count(lote.fkGeladeira) 'contagem' from lote group by lote.fkMedicamento order by lote.fkMedicamento;
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listar_medicamento_metrica(usuario){
    var instrucao = `
    select  min(temperatura) 'minimo', max(temperatura) 'maximo', (max(temperatura) - min(temperatura)) 'amplitude'
    from lote left join geladeira on lote.fkGeladeira = idGeladeira left join sensor on idGeladeira = sensor.fkGeladeira
    join metrica on idSensor = fkSensor where lote.fkUsuario = ${usuario} and dataHora >= DATEADD(hour, -27, GETDATE()) group by lote.fkMedicamento order by lote.fkMedicamento;
    
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastro(lote, setor, medicamento, validade, usuario, quantidade){
    var instrucao = `
    insert into lote (idLote, fkGeladeira, fkUsuario, fkMedicamento, validade, entradaMed, quantidade) values
    (${lote}, ${setor}, ${usuario}, ${medicamento}, '${validade}', current_timestamp, ${quantidade});
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);

}

function selectDadosSetor(setor){
    var instrucao = `
    select top 7 temperatura, umidade, dataHora, format(dataHora, 'HH:mm:ss') as momento from metrica where fkSensor = ${setor} order by idMetrica desc;  
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizarGrafico(setor){
    var instrucao = `
    select top 1 temperatura, umidade, dataHora, format(dataHora, 'HH:mm:ss') as momento from metrica where fkSensor = ${setor} order by idMetrica desc;  
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function obterDadosDash(setor){
    var instrucao = `select top 7 temperatura, umidade, dataHora, format(dataHora, 'HH:mm:ss') as momento from metrica where fkSensor = ${setor} order by idMetrica desc;`;  
    return database.executar(instrucao);
}

function quantidadeVacinas(setor, medicamento){
    var instrucao = `SELECT quantidade FROM lote WHERE fkGeladeira = ${setor} AND fkMedicamento = ${medicamento}`
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function updateVacina(setor, medicamento, quantidade){
    var instrucao = `UPDATE lote SET quantidade = quantidade - ${quantidade}
                    WHERE fkGeladeira = ${setor} AND fkMedicamento = ${medicamento}`
                    
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
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