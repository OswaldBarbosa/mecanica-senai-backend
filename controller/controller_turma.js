/***************************************************************************************
* Objetivo: Arquivo para fazer o controle dos dados de turmas de nosso sistema
* Data: 23/05/2023
* Autor: Oswaldo Barbosa, Vinicius Monteiro
* Versão: 1.0
***************************************************************************************/

var turmaDAO = require('../model/DAO/turmaDAO.js')

var message = require('./modulo/config.js')

const getTurmas = async function () {

    let dadosTurmaJSON = {}

    let dadosTurma = await turmaDAO.selectAllTurmas()

    if (dadosTurma) {

        dadosTurmaJSON.status = message.SUCCESS_REQUEST.status
        dadosTurmaJSON.message = message.SUCCESS_REQUEST.message
        dadosTurmaJSON.quantidade = dadosTurma.length
        dadosTurmaJSON.turma = dadosTurma

        return dadosTurmaJSON

    } else {
        return message.ERROR_NOT_FOUND
    }

}

const getTurmaById = async function (idTurma) {

    let dadosTurmaJSON = {}

    let dadosTurma = await turmaDAO.selectTurmasById(idTurma)

    if (dadosTurma) {

        dadosTurmaJSON.status = message.SUCCESS_REQUEST.status
        dadosTurmaJSON.message = message.SUCCESS_REQUEST.message
        dadosTurmaJSON.turma = dadosTurma

        return dadosTurmaJSON

    } else {
        return message.ERROR_NOT_FOUND
    }

}

const getTurmaBySigla = async function (siglaTurma) {

    let dadosTurmaJSON = {}

    let dadosTurma = await turmaDAO.selectTurmasBySigla(siglaTurma)

    if (dadosTurma) {

        dadosTurmaJSON.status = message.SUCCESS_REQUEST.status
        dadosTurmaJSON.message = message.SUCCESS_REQUEST.message
        dadosTurmaJSON.turma = dadosTurma

        return dadosTurmaJSON

    } else {
        return message.ERROR_NOT_FOUND
    }

}

const getTurmaByNome = async function (nomeTurma) {

    let dadosTurmaJSON = {}

    let dadosTurma = await turmaDAO.selectMatriculaByNome(nomeTurma)

    if (dadosTurma) {

        dadosTurmaJSON.status = message.SUCCESS_REQUEST.status
        dadosTurmaJSON.message = message.SUCCESS_REQUEST.message
        dadosTurmaJSON.turma = dadosTurma

        return dadosTurmaJSON

    } else {
        return message.ERROR_NOT_FOUND
    }

}

const inserirTurma = async function (dadosTurma) {

    if (dadosTurma.nome == ''                   || dadosTurma.nome == undefined                 || !isNaN(dadosTurma.nome)                  || dadosTurma.length > 60 ||
        dadosTurma.sigla == ''                  || dadosTurma.sigla == undefined                || !isNaN(dadosTurma.sigla)                 || dadosTurma.length > 20 ||
        dadosTurma.id_periodo == ''             || dadosTurma.id_periodo == undefined           || isNaN(dadosTurma.id_periodo)             ||
        dadosTurma.id_curso == ''               || dadosTurma.id_curso == undefined             || isNaN(dadosTurma.id_curso)               ||
        dadosTurma.id_professor_materia == ''   || dadosTurma.id_professor_materia == undefined || isNaN(dadosTurma.id_professor_materia)
    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else {

        let resultadoDadosTurma = await turmaDAO.insertTurma(dadosTurma)

        if (resultadoDadosTurma) {

            let novaTurma = await turmaDAO.selectLastId()

            let dadosTurmaJSON = {}

            dadosTurmaJSON.status = message.SUCCESS_CREATE_ITEM.status
            dadosTurmaJSON.message = message.SUCCESS_CREATE_ITEM.message
            dadosTurmaJSON.turma = novaTurma

            return dadosTurmaJSON

        } else {
            return message.ERROR_INTERNAL_SERVER
        }

    }

}

const atualizarTurma = async function (dadosTurma, idTurma) {

    if (dadosTurma.nome == ''                   || dadosTurma.nome == undefined                 || !isNaN(dadosTurma.nome)                  || dadosTurma.length > 60 ||
        dadosTurma.sigla == ''                  || dadosTurma.sigla == undefined                || !isNaN(dadosTurma.sigla)                 || dadosTurma.length > 20 ||
        dadosTurma.id_periodo == ''             || dadosTurma.id_periodo == undefined           || isNaN(dadosTurma.id_periodo)             ||
        dadosTurma.id_curso == ''               || dadosTurma.id_curso == undefined             || isNaN(dadosTurma.id_curso)               ||
        dadosTurma.id_professor_materia == ''   || dadosTurma.id_professor_materia == undefined || isNaN(dadosTurma.id_professor_materia)
    ) {

        return message.ERROR_REQUIRED_FIELDS

    } else if (idTurma == '' || idTurma == undefined || isNaN(idTurma)) {

        return message.ERROR_INVALID_ID

    } else {

        dadosTurma.id = idTurma

        let statusId = await turmaDAO.selectTurmasById(idTurma)

        if (statusId) {

            let resultadoDadosTurma = await turmaDAO.updateTurma(dadosTurma)

            if (resultadoDadosTurma) {

                let dadosTurmaJSON = {}

                dadosTurmaJSON.status = message.SUCCESS_UPDATE_ITEM.status
                dadosTurmaJSON.message = message.SUCCESS_UPDATE_ITEM.message
                dadosTurmaJSON.turma = dadosTurma

                return dadosTurmaJSON

            } else {
                return message.ERROR_INTERNAL_SERVER
            }

        } else {
            return message.ERROR_INVALID_ID
        }

    }

}

const deletarTurma = async function (idTurma) {

    if (idTurma == '' || idTurma == undefined || isNaN(idTurma)) {

        return message.ERROR_INVALID_ID

    } else {

        let statusId = await turmaDAO.selectTurmasById(idTurma)

        if (statusId) {

            let dadosTurma = await turmaDAO.deleteTurma(idTurma)

            if (dadosTurma) {

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
    getTurmas,
    getTurmaById,
    getTurmaBySigla,
    getTurmaByNome,
    inserirTurma,
    atualizarTurma,
    deletarTurma
}