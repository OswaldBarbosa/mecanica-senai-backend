/***************************************************************************************
* Objetivo: Arquivo para fazer o controle dos dados de professores de nosso sistema
* Data: 23/05/2023
* Autor: André Luiz e Oswaldão zika
* Versão: 1.0
***************************************************************************************/

var messages = require('../controller/modulo/config.js')

//Função que insere um novo professor
const inserirProfessor = async function (dadosProfessor) {

    if (dadosProfessor.nome == '' || dadosProfessor.nome ==  undefined || dadosProfessor.nome.length > 100 ||
        dadosProfessor.data_nascimento == '' || dadosProfessor.data_nascimento == undefined || dadosProfessor.data_nascimento.length > 10 ||
        dadosProfessor.id_usuario == '' || dadosProfessor.
    ) {
        return messages.ERROR_REQUIRED_FIELDS
    }

}

//Função que atualiza um professor existente
const atualizarProfessor = async function (dadosProfessor, idProfessor) {

}

//Função que deleta um professor existente
const deletarProfessor = async function (idProfessor) {

}

//Função que retorna a lista de todos os professores existentes dentro de nosso banco de dados
const getProfessores = async function () {

}

//Função que retorna um professor específico pelo id
const getProfessorById = async function (id) {

}

//Função que retorna um professor específico pelo nome
const getProfessorByName = async function (nomeProfessor) {

}