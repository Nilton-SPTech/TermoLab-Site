 function tituloSetor() {
    fetch(`/setor/carregarNomeVacina/${sessionStorage.ID_MEDICAMENTO}`).then((resposta)=>{
        if(resposta.ok){
            resposta.json().then((resposta1)=>{
                nomeSetor.innerHTML=resposta1[0].descricao
            })
        }
    })
 }


function carregarSetoresDash2() {
    var idUsuario = sessionStorage.getItem('ID_USUARIO')
    var idMedicamento = sessionStorage.getItem('ID_MEDICAMENTO')

    fetch(`/setor/carregarSetoresDash2`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idUsuario,
            idMedicamento
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then((response) => {
                select_setor.innerHTML = ''
                for (var i = 0; i < response.length; i++) {
                    var atual = response[i]
                    select_setor.innerHTML += `
                    <option value="${atual.idGeladeira}">Geladeira na ${atual.sala}</option>
                    `
                }
                tituloSetor()
                selectDadosSetor()
            })
        }
    })
}

window.onload = function () {
    carregarSetoresDash2();
    alertas();
}



function selectDadosSetor() {
    var setor = select_setor.value

    sessionStorage.ID_SETOR = setor

    fetch(`/medicamento/selectDadosSetor/${setor}`).then((resposta) => {
        if (resposta.ok) {
            resposta.json().then((response) => exibirDadosSetor(response, setor))
            mostrar_vacina()
            buscar_sensor()
        }
    })

}

var myChart3

function excluirChart() {
    myChart3.destroy()
}

function exibirDadosSetor(dadosR, setor) {
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
    for (var i = 0; i < dadosR.length; i++) {
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
    if (myChart3 != null) {
        excluirChart()
    }

    myChart3 = new Chart(
        document.getElementById('myChart31'),
        config
    )

    setTimeout(() => atualizarGrafico(setor, dados, myChart3), 5000)
}

var proximaAtualizacao

function atualizarGrafico(setor, dados, myChart3) {

    fetch(`/medicamento/atualizarGrafico/${setor}`).then((resposta) => {
        if (resposta.ok) {
            resposta.json().then((response) => {
                var divAlerta = document.querySelector('.alertAtualizacao')

                if (response[0].momento == dados.labels[dados.labels.length - 1]) {
                    divAlerta.style.margin = "0 0"
                } else {
                    divAlerta.style.margin = "0 250px"
                    dados.labels.shift()
                    dados.labels.push(response[0].momento)
                    dados.datasets[0].data.shift()
                    dados.datasets[0].data.push(response[0].temperatura)

                    myChart3.update()
                }

                proximaAtualizacao = setTimeout(() => atualizarGrafico(setor, dados, myChart3), 5000)
            })
        }
    })

}

function alertas() {
    var medicamento = sessionStorage.ID_MEDICAMENTO
    var perigoMaxima = []
    var perigoMinima = []
    var maiorTemp = 0
    var menorTemp = 0
    var maiorUmi = 0
    var menorUmi = 0

    fetch(`/setor/alertas/${medicamento}`).then((resposta) => {
        if (resposta.ok) {
            resposta.json().then((response) => {
                console.log(response)
                for (var i = 0; i < response.length; i++) {
                    var atual = response[i]
                    if (atual.temperatura > -2) {
                        perigoMaxima.push(atual.temperatura)
                    } else if (atual.temperatura < -10) {
                        perigoMinima.push(atual.temperatura)
                    }

                    if (i == 0) {
                        menorTemp = atual.temperatura
                        maiorTemp = atual.temperatura
                    }
                    if (atual.temperatura > maiorTemp) {
                        maiorTemp = atual.temperatura
                    }
                    if (atual.temperatura < menorTemp) {
                        menorTemp = atual.temperatura
                    }

                    if (i == 0) {
                        menorUmi = atual.umidade
                        maiorUmi = atual.umidade
                    }
                    if (atual.umidade > maiorTemp) {
                        maiorUmi = atual.umidade
                    }
                    if (atual.umidade < menorTemp) {
                        menorUmi = atual.umidade
                    }
                }

                var amplitude = (maiorTemp - menorTemp).toFixed(2)
                if (perigoMinima.length >= 10) {
                    caixaMensagem.innerHTML += `
                    <div class="alertaV">
                        <b>Preocupante</b> <span>10/12/2022 - 08:14</span>
                        <p>Temperatura excedeu o limite minimo de preocupante pelo menos ${perigoMinima.length} vezes hoje!</p>
                    </div>
                    `
                } else if (perigoMinima.length >= 5) {
                    caixaMensagem.innerHTML += `
                    <div class="alerta">
                        <b>Preocupante</b> <span>10/12/2022 - 08:14</span>
                        <p>Temperatura excedeu o limite minimo de preocupante pelo menos ${perigoMinima.length} vezes hoje!</p>
                    </div>
                    `
                }
                if (perigoMaxima.length >= 10) {
                    caixaMensagem.innerHTML += `
                    <div class="alertaV">
                        <b>Preocupante</b> <span>10/12/2022 - 08:14</span>
                        <p>Temperatura excedeu o limite maximo de preocupante pelo menos ${perigoMaxima.length} vezes hoje!</p>
                    </div>
                    `
                } else if (perigoMaxima.length >= 5) {
                    caixaMensagem.innerHTML += `
                    <div class="alerta">
                        <b>Preocupante</b> <span>10/12/2022 - 08:14</span>
                        <p>Temperatura excedeu o limite maximo de preocupante pelo menos ${perigoMaxima.length} vezes hoje!</p>
                    </div>
                    `
                }
                if (amplitude > 10) {
                    caixaMensagem.innerHTML += `
                    <div class="alerta">
                        <b>Preocupante</b> <span>10/12/2022 - 08:14</span>
                        <p>Amplitude ultrapassou o limite de 10º, verificar funcionamento do sensor ou geladeira.</p>
                    </div>
                    `
                } else if (amplitude > 12) {
                    caixaMensagem.innerHTML += `
                    <div class="alertaV">
                        <b>Preocupante</b> <span>10/12/2022 - 08:14</span>
                        <p>Amplitude ultrapassou o limite 12º, verificar funcionamento do sensor ou geladeira.</p>
                    </div>
                    `
                }
                if (maiorUmi > 85) {
                    caixaMensagem.innerHTML += `
                    <div class="alerta">
                        <b>Preocupante</b> <span>10/12/2022 - 08:14</span>
                        <p>A umidade está fora dos parametros máximo de 85% (${maiorUmi}), requer manutenção.</p>
                    </div>
                    `
                } else if (maiorUmi > 90) {
                    caixaMensagem.innerHTML += `
                    <div class="alertaV ">
                        <b>Preocupante</b> <span>10/12/2022 - 08:14</span>
                        <p>A umidade está fora dos parametros máximo de 85% (${maiorUmi}), requer manutenção.</p>
                    </div>
                    `
                }
                if (menorUmi < 80) {
                    caixaMensagem.innerHTML += `
                    <div class="alerta">
                        <b>Preocupante</b> <span>10/12/2022 - 08:14</span>
                        <p>A umidade está fora dos parametros mínimo de 80% (${menorUmi}), requer manutenção.</p>
                    </div>
                    `
                } else if (menorUmi < 75) {
                    caixaMensagem.innerHTML += `
                    <div class="alertaV">
                        <b>Preocupante</b> <span>10/12/2022 - 08:14</span>
                        <p>A umidade está fora dos parametros mínimo de 80% (${menorUmi}), requer manutenção.</p>
                    </div>
                    `
                }

            })
        }
    })

}



mostrar_vacina()
var quantidadeVacina = 0
function mostrar_vacina() {
    var setor = sessionStorage.ID_SETOR
    var medicamento = sessionStorage.ID_MEDICAMENTO

    fetch("/medicamento/quantidadeVacinas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idSetor: setor,
            idMedicamento: medicamento
        })
    })
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then((resultado) => {
                    quantidadeVacina = resultado[0].quantidade
                    s_vacinas.innerHTML = quantidadeVacina
                })
            }
        })
    return quantidadeVacina
}


function darBaixa() {
    var quantidade = in_baixa.value
    var setor = sessionStorage.ID_SETOR
    var medicamento = sessionStorage.ID_MEDICAMENTO

    if (quantidade <= quantidadeVacina) {
        fetch("/medicamento/updateVacina", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idSetor: setor,
                idMedicamento: medicamento,
                quantidadeBaixa: quantidade
            })
        })
            .then(function (resposta) {
                if (resposta.ok) {
                    mostrar_vacina()
                    deletar_vacina()
                }
            })
    }
    else {
        alert("Você não pode dar baixa")
    }
}


function deletar_vacina() {
    var quantidade = mostrar_vacina()
    console.log(quantidade)

    if (quantidade <= 0) {
        var setor = sessionStorage.ID_SETOR
        var medicamento = sessionStorage.ID_MEDICAMENTO

        fetch("/setor/deleteSetor", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idSetor: setor,
                idMedicamento: medicamento,
            })
        })
            .then(function (resposta) {
                console.log(resposta)
                if (resposta.ok) {
                    window.location = "./dashboard2.html"
                }
            })

    }
}

var sensor
function buscar_sensor() {
    var setor = sessionStorage.ID_SETOR

    fetch(`/medidas/mostrarSensor/${setor}`)
        .then(function (resultado) {
            if (resultado.ok) {
                resultado.json().then(function (resposta) {
                    sensor = resposta[0].idSensor

                    /* setInterval(() => {
                        inserir_metricas()
                    }, 4000); */
                })
            }
        })
}



function inserir_metricas() {

    var temperatura = parseInt(7 + Math.random() * 11) * -1
    var chance = parseInt(Math.random() * 10)
    if (chance % 6 == 0) {
        temperatura = parseInt(4 + Math.random() * 6) * -1
    }

    fetch(`/medidas/inserir_metricas`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idSensor: sensor,
            temperatura
        })
    })
        .then(function (resultado) {
            if (resultado.ok) {
                console.log("Cadastrando")
            }
        })
}