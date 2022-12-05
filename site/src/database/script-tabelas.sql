-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql - banco local - ambiente de desenvolvimento
*/

create database TermoLab;
use TermoLab;

create table cliente (
    idCliente int primary key auto_increment,
    nome varchar (45),
    email varchar (45),
    senha varchar (45),
    telefone char (13),
    celular char(13),
    cnpj char (18),

    logradouro varchar (100),
    complemento varchar (45),
    bairro varchar (45),
    cidade varchar (45),
    estado varchar (45),
    cep char (9),

    tipoUsuario varchar (45),
    fkMatriz int,
    foreign key (fkMatriz) references Cliente(idCliente)
);

create table setor (
    idSetor int,
    andar int,
    sala varchar (45),
    tempMediaSetor double,
    fkCliente int,
    foreign key (fkCliente) references Cliente(idCliente),
    primary key (idSetor, fkCliente)
);

create table sensor (
    idSensor int primary key auto_increment,
    numeroSerie int,
    fkSetor int,
    foreign key (fkSetor) references setor(idSetor)
);

create table metrica (
    idMetrica int primary key auto_increment,
    temperatura double,
    umidade double,
    dataHora datetime,
    fkSensor int,
    foreign key (fkSensor) references sensor (idSensor)
);

create table medicamento (
    idMedicamento int primary key auto_increment,
    categoria varchar (45),
    descricao varchar (45),
    tempMediaCongelado double,
    tempMediaDescongelado double
);

create table lote (
    fkSetor int,
    fkCliente int,
    fkMedicamento int,
    validade date,
    entradaMed date,
    saidaMed date,
    lote int,
    foreign key (fkSetor, fkCliente) references setor (idSetor, fkCliente),
    foreign key (fkMedicamento) references medicamento (idMedicamento),
    primary key (lote, fkSetor, fkCliente, fkMedicamento)
);

/* esta tabela deve estar de acordo com o que está em INSERT de sua API do arduino - dat-acqu-ino */

CREATE TABLE teste (
	idTeste INT PRIMARY KEY AUTO_INCREMENT, 
	nome VARCHAR(45), 
	senha VARCHAR(45)
); 

/*
comando para sql server - banco remoto - ambiente de produção
*/


/*
comandos para criar usuário em banco de dados azure, sqlserver,
com permissão de insert + update + delete + select
*/

CREATE USER [usuarioParaAPIWebDataViz_datawriter_datareader]
WITH PASSWORD = '#Gf_senhaParaAPIWebDataViz',
DEFAULT_SCHEMA = dbo;

EXEC sys.sp_addrolemember @rolename = N'db_datawriter',
@membername = N'usuarioParaAPIWebDataViz_datawriter_datareader';

EXEC sys.sp_addrolemember @rolename = N'db_datareader',
@membername = N'usuarioParaAPIWebDataViz_datawriter_datareader';




/*CADASTRANDO TODAS AS VACINAS*/
INSERT INTO medicamento VALUES 
    ('Termolabil','Coronavac', 5),
    ('Termolabil','Butanta', 5),
    ('Termolabil','Fiocruz', 5),
    ('Termolabil','Astrazeneca', 5),
    ('Termolabil','Jansen-cilang',5),
    ('Termolabil','Wyeth', 5),
    ('Termolabil','Pfizer', 5),
    ('Ultracongelamento','Wyeth', -75),
    ('Ultracongelamento','Pfizer', -75);

