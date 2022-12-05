function cadastrar(){
    var nomeVar = document.getElementById('input_nome')
    var senhaVar = document.getElementById('input_senha')


    // Enviando o valor da nova input
    fetch("/teste/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            nomeServer: nomeVar.value,
            senhaServer: senhaVar.value
        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {

            console.log("Cadastro realizado com sucesso! Redirecionando para tela de Login...");
            
        } else {
            throw ("Houve um erro ao tentar realizar o cadastro!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });

    return false;
}