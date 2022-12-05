

var cnpj = document.getElementById('input_cnpj');


function mascara_cnpj(){

    var tamanho_cnpj = cnpj.value.length

    if(tamanho_cnpj == 2 || tamanho_cnpj == 6 || tamanho_cnpj == 15){
        cnpj.value += "."
    }

    if(tamanho_cnpj == 10){
        cnpj.value += "/"
    }
}


//VARIAVEIS QUE FALAM DIRETAMENTE COM OS INPUTS
var num_cep= document.getElementById('input_cep');
var logradouro = document.getElementById('input_logradouro'); 
var bairro = document.getElementById('input_bairro');

// FUNCTION DA MASCARÁ E PARA ESTABELECER OS VALORES DA API
function cep_mascara(){

    if(num_cep.value.length == 5){
        num_cep.value += "-"
    }

    if(num_cep.value.length == 9){
        pegar_endereco(num_cep.value)
    }

    if(num_cep != 9){
        logradouro.value = "";
        bairro.value = "";
    }
}

//FUNCTION QUE PUXA DIRETAMENTE O ENDEREÇO PELA URL DA API
function pegar_endereco(cep){

    //Cria um elemento javascript.
    var script = document.createElement('script');

    //Sincroniza com o callback.
    script.src = `https://viacep.com.br/ws/${cep}/json/?callback=callback_endereco`;

    //Insere script no documento e carrega o conteúdo.
    document.body.appendChild(script);

}

//FUNCTION PARA DISTRIBUIR OS VALORES QUE FORAM PUXADOS NA MOSTRAR_CEP
function callback_endereco(endereco){
    logradouro.value = (endereco.logradouro);
    bairro.value = (endereco.bairro);
}

// FUNCTION DA MASCÁRA DO CELULAR

var celular = document.getElementById('input_telefone_celular');
var telefone = document.getElementById('input_telefone_fixo');

function cel_mascara() {
    
    var tamanho_cel = celular.value.length

    if(tamanho_cel == 2) {
        celular.value += " "
    }

    if(tamanho_cel == 8){
        celular.value += "-"
    }

}

// FUNCTION DA MASCÁRA DO TELEFONE FIXO

function telFixo_mascara() {

    var tamanho_tel = telefone.value.length

    if(tamanho_tel == 2) {
        telefone.value += " "
    }

    if(tamanho_tel == 7){
        telefone.value += "-"
    }
}

function cel_mascaraCtt() {
    
    var tamanho_cel = inTel.value.length

    if(tamanho_cel == 2) {
        inTel.value += " "
    }

    if(tamanho_cel == 8){
        inTel.value += "-"
    }

}
