/***************************************************************************************
* Objetivo: Arquivo para fazer o controle dos dados de professores de nosso sistema
* Data: 23/05/2023
* Autor: André Luiz e Oswaldão zika
* Versão: 1.0
***************************************************************************************/

var professorDAO = require('../model/DAO/professorDAO.js')

var message = require('../controller/modulo/config.js')

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
const getProfessorById = async function (idProfessor) {

    let dadosProfessorJSON = {}

    if (idProfessor == '' || idProfessor == undefined || isNaN(idProfessor)) {
        return message.ERROR_INVALID_ID
    } else {

        let dadosProfessor = await professorDAO.selectProfessoreById(idProfessor)

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

    if (nomeProfessor == '' || nomeProfessor == undefined || nomeProfessor == !isNaN(nomeProfessor)) {
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
    if (dadosProfessor.nome == ''               || dadosProfessor.nome == undefined             || dadosProfessor.nome.length > 150             || !isNaN(dadosProfessor.nome) ||
        dadosProfessor.data_nascimento == ''    || dadosProfessor.data_nascimento == undefined  || dadosProfessor.data_nascimento.length > 10   ||
        dadosProfessor.nif == ''                || dadosProfessor.nif == undefined              || dadosProfessor.nif.length > 10               || isNaN(dadosProfessor.nif) ||
        dadosProfessor.id_usuario == ''         || dadosProfessor.id_usuario == undefined       || isNaN(dadosProfessor.id_usuario)
    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else {

        //Envia os dados para a model inserir no banco de dados
        let resultadoDadosProfessor = await professorDAO.insertProfessor(dadosProfessor)

        //valida se o banco de dados inseriu corretamente os dados
        if (resultadoDadosProfessor) {

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

    //Validação para tratar campos obrigatórios e quantidade de caracteres
    if (dadosProfessor.nome == ''               || dadosProfessor.nome == undefined             || dadosProfessor.nome.length > 150 ||
        dadosProfessor.data_nascimento == ''    || dadosProfessor.data_nascimento == undefined  || dadosProfessor.data_nascimento.length > 10 ||
        dadosProfessor.nif == ''                || dadosProfessor.nif == undefined              || dadosProfessor.nif.length > 10 ||
        dadosProfessor.id_usuario == ''         || dadosProfessor.id_usuario == undefined       || isNaN(dadosProfessor.id_usuario)
    ) {

        return message.ERROR_REQUIRED_FIELDS //status code 400

    } else if (idProfessor == '' || idProfessor == undefined || isNaN(idProfessor)) {

        return message.ERROR_INVALID_ID //status code 400

    } else {

        //adiciona o ID do professor no json dos dadosAluno
        dadosProfessor.id = idProfessor

        let statusId = await professorDAO.selectProfessoreById(idProfessor)

        if (statusId) {

            //chama a função que vai atualizar o professor
            let resultadoDadosProfessor = await professorDAO.updateProfessor(dadosProfessor)

            if (resultadoDadosProfessor) {

                let dadosProfessorJSON = {}

                dadosProfessorJSON.status = message.SUCCESS_UPDATE_ITEM.status //200
                dadosProfessorJSON.message = message.SUCCESS_UPDATE_ITEM.message
                dadosProfessorJSON.professor = dadosProfessor
                
                return dadosProfessorJSON

            } else {
                return message.ERROR_INTERNAL_SERVER //500
            }

        } else {
            return message.ERROR_ID_NOT_FOUND //404
        }

    }

}

//Função que deleta um professor existente
const deletarProfessor = async function (idProfessor) {

    if (idProfessor == '' || idProfessor == undefined || isNaN(idProfessor)) {

        return message.ERROR_INVALID_ID

    } else {

        let statusId = await professorDAO.selectLastId(idProfessor)

        if (statusId) {

            let dadosProfessor = await professorDAO.deleteProfessor(idProfessor)

            if (dadosProfessor) {
                return message.SUCCESS_DELETE_ITEM
            } else {
                return message.ERROR_INTERNAL_SERVER
            }

        } else {
            return message.ERROR_ID_NOT_FOUND
        }

    }

}

module.exports = {
    getProfessores,
    getProfessorById,
    getProfessorByName,
    inserirProfessor,
    atualizarProfessor,
    deletarProfessor
}