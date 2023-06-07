/***************************************************************************************
* Objetivo: Arquivo para fazer o controle dos dados de professores de nosso sistema
* Data: 23/05/2023
* Autor: André Luiz e Oswaldão zika
* Versão: 1.0
***************************************************************************************/

var message = require('../controller/modulo/config.js')

var professorDAO = require('../model/DAO/professorDAO')

//Função que retorna a lista de todos os professores existentes dentro de nosso banco de dados
const getProfessores = async function () {

    let dadosProfessorJSON = {}

    let dadosProfessor = await professorDAO.selectAllProfessores()

    if (dadosProfessor) {
        dadosProfessorJSON.status = message.SUCCESS_REQUEST.status
        dadosProfessorJSON.message = message.SUCCESS_REQUEST.message
        dadosProfessorJSON.quantidade = dadosProfessor.length
        dadosProfessorJSON.professores = dadosProfessor
        return dadosProfessorJSON
    } else {
        return message.ERROR_NOT_FOUND
    }

}

//Função que retorna um professor específico pelo id
const getProfessorById = async function (id) {

    let dadosProfessorJSON = {}

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {

        let dadosProfessor = await professorDAO.selectProfessoreById(id)
        
        if (dadosProfessor) {
            dadosProfessorJSON.status = message.SUCCESS_REQUEST.status
            dadosProfessorJSON.message = message.SUCCESS_REQUEST.message
            dadosProfessorJSON.professor = dadosProfessor
            return dadosProfessorJSON
        } else {
            return message.ERROR_NOT_FOUND
        }

    }

}

//Função que retorna um professor específico pelo nome
const getProfessorByName = async function (nomeProfessor) {

    let dadosProfessorJSON = {}

    if(nomeProfessor == '' || nomeProfessor == undefined || nomeProfessor == !isNaN(nomeProfessor)) {
        return message.ERROR_INVALID_NAME
    } else {

        let dadosProfessor = await professorDAO.selectProfessoreByName(nomeProfessor)

        if (dadosProfessor) {
            dadosProfessorJSON.status = message.SUCCESS_REQUEST.status
            dadosProfessorJSON.message = message.SUCCESS_REQUEST.message
            dadosProfessorJSON.professor = dadosProfessor
            return dadosProfessorJSON
        } else {    
            return message.ERROR_NOT_FOUND
        }

    }

}

//Função que insere um novo professor
const inserirProfessor = async function (dadosProfessor) {

    //Validação para tratar campos obrigatórios e quantidade de caracteres
    if (dadosProfessor.nome == '' || dadosProfessor.nome == undefined || dadosProfessor.nome.length > 150 ||
        dadosProfessor.data_nascimento == '' || dadosProfessor.data_nascimento == undefined || dadosProfessor.data_nascimento.length > 10 ||
        dadosProfessor.id_usuario == '' || dadosProfessor.id_usuario == undefined || isNaN(dadosProfessor.id_usuario)
    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else {

        //Envia os dados para a model inserir no banco de dados
        let resultaDadosProfessor = await professorDAO.insertProfessor(dadosProfessor)

        //valida se o banco de dados inseriu corretamente os dados
        if (resultaDadosProfessor) {

            //chama a função que vai encontar o ID gerado após o insert
            let novoProfessor = await professorDAO.selectLastId()
            
            let dadosProfessorJSON = {}

            dadosProfessorJSON.status = message.SUCCESS_CREATE_ITEM.status
            dadosProfessorJSON.message = message.SUCCESS_CREATE_ITEM.message
            dadosProfessorJSON.professor = novoProfessor

            return dadosProfessorJSON

        } else {
            return message.ERROR_INTERNAL_SERVER
        }

    }

}

//Função que atualiza um professor existente
const atualizarProfessor = async function (dadosProfessor, idProfessor) {

    if (dadosProfessor.nome == '' || dadosProfessor.nome == undefined || dadosProfessor.nome.length > 150 ||
        dadosProfessor.data_nascimento == '' || dadosProfessor.data_nascimento == undefined || dadosProfessor.data_nascimento.length > 10 ||
        dadosProfessor.id_usuario == '' || dadosProfessor.id_usuario == undefined || isNaN(dadosProfessor.id_usuario)
    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else if (idProfessor == '' || idProfessor == undefined || isNaN(idProfessor)) {
        
        return message.ERROR_INVALID_ID

    } else {

        dadosProfessor.id = idProfessor

        let statusId = await professorDAO.selectProfessoreById()

        if (statusId) {

            let dadosProfessorJSON = {}

            dadosProfessor.status = message.SUCCESS_UPDATE_ITEM.status
            dadosProfessor.message = message.SUCCESS_UPDATE_ITEM.message
            dadosProfessor.message = message.SUCCESS_UPDATE_ITEM.message

        }

    }

}

//Função que deleta um professor existente
const deletarProfessor = async function (idProfessor) {

}

module.exports = {
    getProfessores,
    getProfessorById,
    getProfessorByName,
    inserirProfessor
}