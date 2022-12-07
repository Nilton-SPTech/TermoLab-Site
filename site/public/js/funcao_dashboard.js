var usuario = sessionStorage.ID_USUARIO

// function titulo_setor(idSetor){
//     nome_do_setor.innerHTML = `Geladeira na ${idSetor}`
// }

function carregarSetores(){
    var idUsuario = sessionStorage.getItem('ID_USUARIO')
    var setor = document.querySelector('#selSetor')
    var setorGrafico = document.querySelector('#select_setor')

    fetch(`/setor/carregarSetores/${idUsuario}`).then(function(resposta){
        if(resposta.ok){
            resposta.json().then((response)=>{
                for(var i = 0; i < response.length; i++){
                    var atual = response[i]
                    setor.innerHTML += `
                    <option value="${atual.idGeladeira}">Geladeira na ${atual.sala}</option>
                    `
                    setorGrafico.innerHTML += `
                    <option value="${atual.idGeladeira}">Geladeira na ${atual.sala}</option>
                    `
                }
                obterDadosDash()
                // titulo_setor(response[0].sala)
                graficoPizza(response.length)
                alertas()
            })
        }
    })
}

carregarSetores()

function cadastrarMedicamento(){
    var medicamento = selVacina.value
    var setor = selSetor.value
    var lote = inLote.value
    var validade = inData.value
    var quantidade = inQtd.value

    fetch("/medicamento/cadastro", {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            medicamento,
            setor,
            lote,
            validade,
            usuario,
            quantidade
        })
    }).then(function(resposta){
        if(resposta.ok){
           alert('Medicamento cadastrado com sucesso')
           inLote.value = ''
           inData.value = ''

           listar_tela_medicamentos(listaMedicamento)
        }
    })
}

window.onload = listar_medicamento()
var listaMedicamento 

function listar_medicamento(){
    fetch("/medicamento/listar_medicamento",  {cache: 'no-store', method: "GET"}).then(function(response){
        if(response.ok){
            response.json().then(function (resposta){
                // console.log(`Dados recebidos: ${JSON.stringify(resposta)}`)
                listar_select(resposta)
                // listar_medicamento_tela(resposta)
                listaMedicamento = resposta
                listar_tela_medicamentos(resposta)
            })
        }
        else{
            console.log("Nenhum dado encontrado ou erro na API")
        }
    })
    .catch(function(error){
        console.error(`Erro na obtenção dos dados p/ tabelas: ${error.message}`)
    })
}


var sel_vacina = document.getElementById("selVacina")
function listar_select(resposta){
    var setorGrafico = document.querySelector('#select_setor')
    
    for(var i = 0; i < resposta.length; i++){
        sel_vacina.innerHTML += `<option value="${resposta[i].idMedicamento}">${resposta[i].descricao}</option>`
    
    }
}

var container = document.getElementById("div_container_medicamento")

async function listar_tela_medicamentos(id){
    var usuario = sessionStorage.ID_USUARIO
    var medicamento = []
    var contagem = []

    await fetch("/medicamento/listar_medicamento_tela",  {cache: 'no-store', method: "GET"}).then(function(response){
        if(response.ok){
            response.json().then(function (resposta){          
                for(var i = 0; i < resposta.length; i++){
                    medicamento.push({
                        fkMedicamento : resposta[i].fkMedicamento,
                        contagem: resposta[i].contagem
                    })
                }
                console.log(medicamento)
            })
        }
        else{
            console.log("Nenhum dado encontrado ou erro na API")
        }
    })
    .catch(function(error){
        console.error(`Erro na obtenção dos dados p/ tabelas: ${error.message}`)
    })

    await fetch(`/medicamento/listar_medicamento_metrica/${usuario}`).then(function(resposta2){
        if(resposta2.ok){
            resposta2.json().then((response2)=>{
                for(var i = 0; i < response2.length; i++){
                    contagem.push({
                        minimo: response2[i].minimo,
                        maximo: response2[i].maximo,
                        amplitude: response2[i].amplitude
                    })
                }
                console.log(contagem)

                var div_vacina = ""
                for(var i = 0; i < contagem.length; i++){
                    div_vacina += `
                    <div class="div_vacina" onclick="ir_dashboard(${medicamento[i].fkMedicamento})">
                        <div class="div_nome_vacina" >
                            <span>${id[i].descricao}</span>
                        </div>
                        <div class="div_marcadores">
                            <div class="div_forma_marcador div_marcador_setor">
                                <span class="s_titulo">Total de setores</span>
                                <span>${medicamento[i].contagem}</span>
                            </div>
                            <div class="div_forma_marcador div_marcador_max">
                                <span class="s_titulo">Temperatura máxima</span>
                                <span>${contagem[i].maximo}</span>
                            </div>
                            <div class="div_forma_marcador div_amplitute">
                                <span class="s_titulo">Amplitude</span>
                                <span>${contagem[i].amplitude}</span>
                            </div>
                            <div class="div_forma_marcador div_marcador_min">
                                <span class="s_titulo">Temperatura Miníma</span>
                                <span>${contagem[i].minimo}</span>
                            </div>
                        </div>
                    </div>`     
                } 
            container.innerHTML = div_vacina

            mudarCores(contagem, medicamento)

            })
        }
    })

}

function mudarCores(contagem, medicamento){
    var corTempMax = document.querySelectorAll('.div_marcador_max')
    var corTempMin = document.querySelectorAll('.div_marcador_min')
    var corAmplitude = document.querySelectorAll('.div_amplitute')

    for(var i = 0; i < contagem.length; i++){
        var max = contagem[i].maximo
        if(max > -8 && max < -2){
            corTempMax[i].style.background = "#0e3363"
        }else if((max > -11 && max <= -8) || (max > -1 && max < 0)){
            corTempMax[i].style.background = "#e6903a"
        }else{
            corTempMax[i].style.background = "rgb(240, 59, 59)"
        }

        var min = contagem[i].minimo
        if(min > -8 && min < -2){
            corTempMin[i].style.background = "#0e3363"
        }else if((min > -11 && min <= -8) || (min > -1 && min < 0)){
            corTempMin[i].style.background = "#e6903a"
        }else{
            corTempMin[i].style.background = "rgb(240, 59, 59)"
        }

        var amp = contagem[i].amplitude
        if(amp > 0 && amp <= 6){
            corAmplitude[i].style.background = "#0e3363"
        }else if(amp <= 10){
            corAmplitude[i].style.background = "#e6903a"
        }else{
            corAmplitude[i].style.background = "rgb(240, 59, 59)"
        }
    }
}



function ir_dashboard(id){
    sessionStorage.ID_MEDICAMENTO = id


    window.location ="../dashboard/dashboard2.html"
}




// CADASTRAR O SETOR 
function cadastrar_setor(){
 
    var andar = document.getElementById('inAndar').value
    var sala = document.getElementById('inSala').value
    var temp = document.getElementById('inTemp').value
    var idUsuario = sessionStorage.ID_USUARIO

    fetch("/setor/cadastrar", {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            andarServer: andar,
            salaServer: sala,
            tempServer: temp,
            idUsuarioServer: idUsuario
        })
    })
    .then(function (resposta){
        console.log("Resposta: ", resposta); 

        if(resposta.ok){
            console.log("Cadastro realizado com sucesso")
            alert('Setor cadastrado com sucesso!')
            inAndar.value = ''
            inSala.value = ''
            inTemp.value = ''
            carregarSetores()

            resposta.json().then(function(response){
                cadastrarSensor(response)

            })
        }
        else{
            throw("Houce um erro ao tentar realizar o cadastro")
        }
    })
    .catch(function (resposta){
        console.log(`#ERRO: ${resposta}`)
    })
}
var numSerie = 0

 async function cadastrarSensor(geladeira){
   

    await fetch("/setor/pegarNSerie").then(function(resposta2){
        if(resposta2.ok){
            resposta2.json().then((response2)=>{
                console.log(response2)
                numSerie = Number(response2[0].numeroSerie) + 1
                console.log(numSerie)
            })
        }
    })

    var nserie = numSerie
    await fetch("/setor/cadastrarSensor", {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id : geladeira[0].idGeladeira,
            numSerie : nserie,
            usuario
        })
    }).then(function(resposta){
        if(resposta.ok){
            console.log('cadastrou sensor')
        }
    })
}

const s_total = document.getElementById("s_total")
function totalSetor(){
    var id_usuario = sessionStorage.ID_USUARIO

    fetch(`/setor/total_setor/${id_usuario}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        } 
    }). 
    then(function (resposta){
        if(resposta.ok){
            resposta.json().then(function (response){
                s_total.innerHTML = response[0].totalGeladeira
            })
        }
        else{
            console.log("Nenhum dado encontrado")
        }
    })   
    .catch(function (erro){
        console.error(`Eoo na opbtenção dos dados: ${erro.message}`)
    })
}

totalSetor()

function obterDadosDash(){
    var setor = select_setor.value
    fetch(`/medicamento/obterDadosDash/${setor}`).then((resposta)=>resposta.json().then((response)=>exibirDados(response, setor)))
}

var myChart3

function excluirChart(){
    myChart3.destroy()
}

function exibirDados(dadosR, setor){
    var labels = []
    var dados = {
        labels,
        datasets: [
        {
            label: 'Temperatura',
            data: [],
            fill: false,
            borderColor: '#174580',
            tension: 0.1
        }]
    }
    for(var i = 0; i < dadosR.length; i++){
        var atual = dadosR[dadosR.length - (i + 1)]
        labels.push(atual.momento)
        dados.datasets[0].data.push(atual.temperatura)
    }
    const config = {
        type: 'line', 
        data: dados,
        options: {
            scales: {
                y: {
                    min: -20,
                    max: 10
                }
            }
        }
    }
    if(myChart3 != null){
        excluirChart()
    }
    myChart3 = new Chart(
        document.getElementById('myChart3'),
        config
    )
    setTimeout(()=>atualizarGrafico(setor, dados, myChart3),5000)
}

var proximaAtualizacao

function atualizarGrafico(setor, dados, myChart3){
    fetch(`/medicamento/atualizarGrafico/${setor}`).then((resposta)=>{
        if(resposta.ok){
            resposta.json().then((response)=>{
                if(response[0].momento == dados.labels[dados.labels.length - 1]){

                }else{
                    dados.labels.shift()
                    dados.labels.push(response[0].momento)
                    dados.datasets[0].data.shift()
                    dados.datasets[0].data.push(response[0].temperatura)
                    myChart3.update()
                }
                proximaAtualizacao = setTimeout(()=>atualizarGrafico(setor, dados, myChart3), 5000)
            })
        }
    })
}

function alertas(){
    var usuario = sessionStorage.ID_USUARIO
    var maiorTemp = 0
    var menorTemp = 0
    var perigoMaxima = []
    var perigoMinima = []

    fetch(`/setor/alertasDash/${usuario}`).then((resposta)=>{
        if(resposta.ok){
            resposta.json().then((response)=>{
                var min = document.querySelector('.s_minima')
                var max = document.querySelector('.s_maxima')
                var amp = document.querySelector('.s_amplitude')

                for(var i = 0; i < response.length; i++){
                    var atual = response[i]
                    if(atual.temperatura > -2){
                        perigoMaxima.push(atual.temperatura)
                    }else if(atual.temperatura < -10){
                        perigoMinima.push(atual.temperatura)
                    }

                    if(i == 0){
                        menorTemp = atual.temperatura
                        maiorTemp = atual.temperatura
                    }
                    if(atual.temperatura > maiorTemp){
                        maiorTemp = atual.temperatura
                    }
                    if(atual.temperatura < menorTemp){
                        menorTemp = atual.temperatura
                    }

                    if(i == 0){
                        menorUmi = atual.umidade
                        maiorUmi = atual.umidade
                    }
                    if(atual.umidade > maiorTemp){
                        maiorUmi = atual.umidade
                    }
                    if(atual.umidade < menorTemp){
                        menorUmi = atual.umidade
                    }
                }
                
               
                var amplitude = Number((maiorTemp - menorTemp).toFixed(2))
                min.innerHTML = menorTemp
                max.innerHTML = maiorTemp
                amp.innerHTML = amplitude

                var maiorTempPositivo = maiorTemp * -1

                if(menorTemp >= (-8) && menorTemp <= (-2)){
                    div_marcador_min.style.background = "#0e3363"    
                }else if((menorTemp >= (-11) && menorTemp <= (-9)) || (menorTemp >= (-1) && menorTemp <= 0)){
                    div_marcador_min.style.background = "#e6903a"    
                }else{
                    div_marcador_min.style.background = "rgb(240, 59, 59)"
                }

                console.log(maiorTempPositivo)
                if(maiorTempPositivo < 8 && maiorTempPositivo > 2){
                    div_marcador_max.style.background = "#0e3363"
                }else if((maiorTempPositivo < 11 && maiorTempPositivo > 9) || (maiorTempPositivo < 1 && maiorTempPositivo > 0)){
                    div_marcador_max.style.background = "#e6903a"    
                }else{
                    div_marcador_max.style.background = "rgb(240, 59, 59)"
                }

                if(amplitude > 0 && amplitude <= 6){
                    div_amplitute.style.background = "#0e3363" 
                }else if(amplitude <= 10){
                    div_amplitute.style.background = "#e6903a"
                }else{
                    div_amplitute.style.background = "rgb(240, 59, 59)"
                }
                
            })
        }
    })
}

function graficoPizza(totalSetor){
    var usuario = sessionStorage.ID_USUARIO
    var setorDefeito = []

    fetch(`/setor/manutencao/${usuario}`).then((resposta)=>{
        if(resposta.ok){
            resposta.json().then((response)=>{

                for(var i = 0; i < response.length; i++){
                    if(response[i].limiteMaximo >= 5){
                        setorDefeito.push(response[i].idSensor)
                    }
                }

                var setorIdeal = totalSetor - setorDefeito.length

                const color = [
                    '#e6903a',
                    '#2866b8'
                ]
            
                var labels = [
                    'Requer Manutenção',
                    'Não Requer',
                ]
            
                var data = {
                    labels: labels,
                    datasets: [{
                        label: 'Requer',
                        backgroundColor: color,
                        borderColor: 'rgb(255, 255, 255)',
                        data: [setorDefeito.length, setorIdeal],
                    }
                    ]
                }
            
                var config = {
                    type: 'pie',
                    data: data,
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'bottom',
                            },
                            title: {
                                display: false,
                            }
                        }
                    }
                }
                
                var myChart = new Chart(
                    document.getElementById('myChart'),
                    config
                ); 
            })
        }
    })

    fetch(`/setor/tipoMedicamento/${usuario}`).then((resposta2)=>{
        if(resposta2.ok){
            resposta2.json().then((response2)=>{
                var term = {nome: 'Termolabil', qtd: 0}
                var ultr = {nome: 'Ultracongelada', qtd: 0}

                if(response2[0].categoria == 'Termolabil'){
                    term.qtd = response2[0].contagem
                }else if(response2[0].categoria == 'Ultracongelamento'){
                    ultr.qtd = response2[0].contagem
                }
                if(response2.length == 2){
                    ultr.qtd = response2[1].contagem
                }
                
                const color = [
                    '#e6903a',
                    '#2866b8'
                ];

                const labels1 = [
                    'Temperatura Média -70',
                    'Temperatura Média -5',
                ]
            
                const data1 = {
                    labels: labels1,
                    datasets: [{
                        backgroundColor: color,
                        borderColor: 'rgb(255, 255, 255)',
                        data: [ultr.qtd, term.qtd],
                    }]
                }
            
                const config1 = {
                    type: 'pie',
                    data: data1,
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'bottom',
                            },
                            title: {
                                display: false,
                            }
                        }
                    },
            
                }

                const myChart1 = new Chart(
                    document.getElementById('myChart1'),
                    config1
                )
            })
        }
    })
    fetch(`/setor/capacidadeSetor/${usuario}`).then((resposta3)=>{
        if(resposta3.ok){
            resposta3.json().then((response3)=>{

                const color = [
                    '#e6903a',
                    '#2866b8'
                ]

                const labels2 = [
                    'Medicamentos',
                    'Capacidade Total',
                ]
            
                const data2 = {
                    labels: labels2,
                    datasets: [{
                        label: 'My First dataset',
                        backgroundColor: color,
                        borderColor: 'rgb(255, 255, 255)',
                        data: [response3[0].qtdAtual, response3[0].capacidade],
                    }]
                }
            
                const config2 = {
                    type: 'pie',
                    data: data2,
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'bottom',
                            },
                            title: {
                                display: false,
                            }
                        }
                    }
                }

                const myChart2 = new Chart(
                    document.getElementById('myChart2'),
                    config2
                )
            })
        }
    })
}