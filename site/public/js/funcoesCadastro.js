

function validarCampos(nome, senha, cnpj, cep, logradouro, bairro, complemento, email, celular, telefone){

    var validacao = nome == "" || senha == "" || cnpj == "" || cep == "" || logradouro == "" || bairro == "" || complemento == "" || email == "" || celular == "" || telefone == ""

    if(validacao){
        return false
    }
    else{
        return true
    }
}