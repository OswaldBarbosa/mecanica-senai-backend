/***************************************************************************************
* Objetivo: Controller para controlar aluno
* Data: 23/05/2023
* Autor: Vinícius Monteiro
* Versão: 1.0
***************************************************************************************/

var message = require('../controller/modulo/config.js')
var alunoDAO = require('../model/DAO/alunoDAO.js')

//Função que retorna a lista de todos os alunos existentes dentro de nosso banco de dados
const getAlunos = async function () {

    let dadosAlunoJSON = {}

    let dadosAluno = await alunoDAO.selectAllAlunos()

    if (dadosAluno) {
        dadosAlunoJSON.status = message.SUCCESS_REQUEST.status
        dadosAlunoJSON.message = message.SUCCESS_REQUEST.message
        dadosAlunoJSON.quantidade = dadosAluno.length
        dadosAlunoJSON.alunos = dadosAluno

        return dadosAlunoJSON

    } else {
        return message.ERROR_NOT_FOUND
    }
}

//Função que retorna um aluno específico pelo id
const getAlunoById = async function (idAluno) {

    let dadosAlunoJSON = {}

    if (idAluno == '' || idAluno == undefined || isNaN(idAluno)) {
        return message.ERROR_INVALID_ID
    } else {

        let dadosAluno = await alunoDAO.selectAlunoById(idAluno)

        if (dadosAluno) {

            dadosAlunoJSON.status = message.SUCCESS_REQUEST.status
            dadosAlunoJSON.message = message.SUCCESS_REQUEST.message
            dadosAlunoJSON.aluno = dadosAluno

            return dadosAlunoJSON

        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

//Função que retorna um aluno específico pelo nome
const getAlunoByName = async function (nomeAluno) {

    let dadosAlunoJSON = {}

    if (nomeAluno == '' || nomeAluno == undefined || !isNaN(nomeAluno)) {
        return message.ERROR_INVALID_NAME
    } else {

        let dadosAluno = await alunoDAO.selectAlunoByName(nomeAluno)

        if (dadosAluno) {

            dadosAlunoJSON.status = message.SUCCESS_REQUEST.status
            dadosAlunoJSON.message = message.SUCCESS_REQUEST.message
            dadosAlunoJSON.alunos = dadosAluno

            return dadosAlunoJSON

        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

const getAlunoByMatricula = async function (matriculaAluno) {

    let dadosAlunoJSON = {}

    if (matriculaAluno == '' || matriculaAluno == undefined || isNaN(matriculaAluno) || matriculaAluno.length > 8) {
        return message.ERROR_INVALID_MATRICULA
    } else {

        let dadosAluno = await alunoDAO.selectAlunoByMatricula(matriculaAluno)

        if (dadosAluno) {

            dadosAlunoJSON.status = message.SUCCESS_REQUEST.status
            dadosAlunoJSON.message = message.SUCCESS_REQUEST.message
            dadosAlunoJSON.aluno = dadosAluno

            return dadosAlunoJSON

        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

//Função que insere um novo aluno
const inserirAluno = async function (dadosAluno) {

    //Validação para tratar campos obrigatórios e quantidade de caracteres
    if (dadosAluno.nome == '' || dadosAluno.nome == undefined || dadosAluno.nome.length > 150 || !isNaN(dadosAluno.nome) ||
        dadosAluno.data_nascimento == '' || dadosAluno.data_nascimento == undefined || dadosAluno.data_nascimento.length > 10
    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else {

        let resultadoDadosAluno = await alunoDAO.insertAluno(dadosAluno)

        if (resultadoDadosAluno) {

            //chama a função que vai encontar o ID gerado após o insert
            let novoAluno = await alunoDAO.selectLastId()

            let dadosAlunoJSON = {}

            dadosAlunoJSON.status = message.SUCCESS_CREATE_ITEM.status
            dadosAlunoJSON.message = message.SUCCESS_CREATE_ITEM.message
            dadosAlunoJSON.aluno = novoAluno

            return dadosAlunoJSON

        } else {
            return message.ERROR_INTERNAL_SERVER
        }
    }

}

//Função que atualiza um aluno existente
const atualizarAluno = async function (dadosAluno, idAluno) {
    //Validação para tratar campos obrigatórios e quantidade de caracteres
    if (dadosAluno.nome == '' || dadosAluno.nome == undefined || dadosAluno.nome.length > 150 || !isNaN(dadosAluno.nome) ||
        dadosAluno.data_nascimento == '' || dadosAluno.data_nascimento == undefined || dadosAluno.data_nascimento.length > 10
    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else if (idAluno == '' || idAluno == undefined || isNaN(idAluno)) {
        return message.ERROR_INVALID_ID

    } else {
        dadosAluno.id = idAluno

        let statusAluno = await alunoDAO.selectAlunoById(id)

        if (statusId) {

            let dadosAlunoJSON = {}

            let resultaDadosProfessor = await alunoDAO.updateAluno(dadosAluno)

            if (resultadoDadosAluno) {
                dadosAlunoJSON.status = message.SUCCESS_UPDATE_ITEM.status
                dadosAlunoJSON.message = message.SUCCESS_UPDATE_ITEM.message
                dadosAlunoJSON.alunoAtualizado = statusAluno

                return dadosAlunoJSON
            } else {

                return message.ERROR_INTERNAL_SERVER
            }

        }
    }
}

//Função que deleta um aluno existente
const deletarAluno = async function (idAluno) {
    if (idAluno == undefined || idAluno == '' || isNaN(idAluno)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosAlunoJSON = {}


        let alunoDeletado = await alunoDAO.selectAlunoById(idAluno)
        let dadosAluno = await alunoDAO.deleteAluno(idAluno)

        dadosAlunoJSON.status(message.SUCCESS_DELETE_ITEM.status)
        dadosAlunoJSON.message(message.SUCCESS_DELETE_ITEM.message)
        dadosAlunoJSON.alunoDeletado = alunoDeletado

    }
}

module.exports = {
    inserirAluno,
    atualizarAluno,
    getAlunos,
    getAlunoById,
    getAlunoByMatricula,
    getAlunoByName,
    deletarAluno
}