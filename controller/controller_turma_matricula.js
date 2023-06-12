/***************************************************************************************
* Objetivo: Arquivo para fazer o controle dos dados de turma_matricula de nosso sistema
* Data: 23/05/2023
* Autor: Oswaldo Barbosa, Vinicius Monteiro
* Versão: 1.0
***************************************************************************************/

var turmaMatriculaDAO = require('../model/DAO/turmaMatriculaDAO.js')

var message = require('./modulo/config.js')

const getTurmaMatricula = async function () {

    let dadosTurmaMatriculaJSON = {}

    let dadosTurmaMatricula = await turmaMatriculaDAO.selectAllTurmaMatricula()

    if (dadosTurmaMatricula) {

        dadosTurmaMatriculaJSON.status = message.SUCCESS_REQUEST.status
        dadosTurmaMatriculaJSON.message = message.SUCCESS_REQUEST.message
        dadosTurmaMatriculaJSON.turma_matricula = dadosTurmaMatricula

        return dadosTurmaMatriculaJSON

    } else {
        return message.ERROR_INTERNAL_SERVER
    }

}

const getTurmaMatriculaById = async function (idTurmamatricula) {

    let dadosTurmaMatriculaJSON = {}

    if (idTurmamatricula == '' || idTurmamatricula == undefined || isNaN(idTurmamatricula)) {
        return message.ERROR_INVALID_ID
    } else {

        let dadosTurmaMatricula = await turmaMatriculaDAO.selectTurmaMatriculaById(idTurmamatricula)

        if (dadosTurmaMatricula) {

            dadosTurmaMatriculaJSON.status = message.SUCCESS_REQUEST.status
            dadosTurmaMatriculaJSON.message = message.SUCCESS_REQUEST.message
            dadosTurmaMatriculaJSON.turma_matricula = dadosTurmaMatricula

            return dadosTurmaMatriculaJSON

        } else {
            return message.ERROR_INTERNAL_SERVER
        }
    }

}

const inserirTurmaMatricula = async function (dadosTurmaMatricula) {

    if (dadosTurmaMatricula.id_turma == '' || dadosTurmaMatricula.id_turma == undefined || isNaN(dadosTurmaMatricula.id_turma) ||
        dadosTurmaMatricula.id_matricula == '' || dadosTurmaMatricula.id_matricula == undefined || isNaN(dadosTurmaMatricula.id_matricula)
    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else {

        let resultadoDadosTurmaMatricula = await turmaMatriculaDAO.insertTurmaMatricula()

        if (resultadoDadosTurmaMatricula) {

            let dadosTurmaMatriculaJSON = {}

            dadosTurmaMatricula.status = message.SUCCESS_CREATE_ITEM.status
            dadosTurmaMatricula.message = message.SUCCESS_CREATE_ITEM.message
            dadosTurmaMatricula.turma_matricula = dadosTurmaMatricula

            return dadosTurmaMatriculaJSON

        } else {
            return message.ERROR_INTERNAL_SERVER
        }

    }
}

const atualizarTurmaMatricula = async function (dadosTurmaMatricula, idTurmaMatricula) {

    if (dadosTurmaMatricula.id_turma == '' || dadosTurmaMatricula.id_turma == undefined || isNaN(dadosTurmaMatricula.id_turma) ||
        dadosTurmaMatricula.id_matricula == '' || dadosTurmaMatricula.id_matricula == undefined || isNaN(dadosTurmaMatricula.id_matricula)
    ) {

        return message.ERROR_REQUIRED_FIELDS

    } else if (idTurmaMatricula == '' || idTurmaMatricula == undefined || isNaN(idTurmaMatricula)) {

        return message.ERROR_INVALID_ID

    } else {

        dadosTurmaMatricula.id = idTurmaMatricula

        let statusId = await turmaMatriculaDAO.selectTurmaMatriculaById(idTurmaMatricula)

        if (statusId) {

            let resultadoDadosTurmaMatricula = await turmaMatriculaDAO.updateTurmaMatricula(dadosTurmaMatricula)

            if (resultadoDadosTurmaMatricula) {

                let dadosTurmaMatriculaJSON = {}

                dadosTurmaMatriculaJSON.status = message.SUCCESS_UPDATE_ITEM.status
                dadosTurmaMatriculaJSON.message = message.SUCCESS_UPDATE_ITEM.message
                dadosTurmaMatricula.turma_matricula = dadosTurmaMatricula

                return dadosTurmaMatricula

            } else {
                return message.ERROR_INTERNAL_SERVER
            }

        } else {
            return message.ERROR_ID_NOT_FOUND
        }

    }
}

const deletarTurmaMatricula = async function (idTurmaMatricula) {

    if (idTurmaMatricula == '' || idTurmaMatricula == undefined || isNaN(idTurmaMatricula)) {

        return message.ERROR_INVALID_ID

    } else {

        let statusId = await turmaMatriculaDAO.selectTurmaMatriculaById(idTurmaMatricula)

        if (statusId) {

            let resultadoDadosTurmaMatricula = await turmaMatriculaDAO.deleteTurmaMatricula(idTurmaMatricula)

            if (resultadoDadosTurmaMatricula) {

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
    getTurmaMatricula,
    getTurmaMatriculaById,
    inserirTurmaMatricula,
    atualizarTurmaMatricula,
    deletarTurmaMatricula
}