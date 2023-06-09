/***************************************************************************************
* Objetivo: Arquivo para fazer o controle dos dados de professores de nosso sistema
* Data: 23/05/2023
* Autor: André Luiz e Oswaldão zika
* Versão: 1.0
***************************************************************************************/

var periodoDAO = require('../model/DAO/periodoDAO.js')

var message = require('./modulo/config.js')

const getPeriodo = async function () {

    let dadosPeriodoJSON = {}

    let dadosPeriodo = await periodoDAO.selectAllPeriodos()

    if (dadosPeriodo) {

        dadosPeriodoJSON.status = message.SUCCESS_REQUEST.status
        dadosPeriodoJSON.message = message.SUCCESS_REQUEST.message
        dadosPeriodoJSON.quantidade = dadosPeriodo.length
        dadosPeriodoJSON.periodo = dadosPeriodo

        return dadosPeriodoJSON

    } else {
        return message.ERROR_NOT_FOUND
    }

}

const getPeriodoById = async function (idPeriodo) {

    if (idPeriodo == '' || idPeriodo == undefined || isNaN(idPeriodo)) {
        return message.ERROR_REQUIRED_FIELDS
    } else {

        let dadosPeriodo = await periodoDAO.selectPeriodoById(idPeriodo)

        if (dadosPeriodo) {

            let dadosPeriodoJSON = {}

            dadosPeriodoJSON.status = message.SUCCESS_REQUEST.status
            dadosPeriodoJSON.message = message.SUCCESS_REQUEST.message
            dadosPeriodoJSON.periodo = dadosPeriodo

            return dadosPeriodoJSON

        } else {
            return message.ERROR_NOT_FOUND
        }

    }

}

const getPeriodoByNome = async function (nomePeriodo) {

    if (nomePeriodo == '' || nomePeriodo == undefined || !isNaN(nomePeriodo)) {
        return message.ERROR_REQUIRED_FIELDS
    } else {

        let dadosPeriodo = await periodoDAO.selectPeriodoByNome(nomePeriodo)

        if (dadosPeriodo) {

            let dadosPeriodoJSON = {}

            dadosPeriodoJSON.status = message.SUCCESS_REQUEST.status
            dadosPeriodoJSON.message = message.SUCCESS_REQUEST.message
            dadosPeriodoJSON.periodo = dadosPeriodo

            return dadosPeriodoJSON

        } else {
            return message.ERROR_NOT_FOUND
        }

    }

}

const inserirPeriodo = async function (dadosPeriodo) {

    if (dadosPeriodo.nome == '' || dadosPeriodo.nome == undefined || !isNaN(dadosPeriodo.nome)) {

        return message.ERROR_REQUIRED_FIELDS

    } else {

        let resultadoDadosPeriodo = await periodoDAO.insertPeriodo(dadosPeriodo)

        if (resultadoDadosPeriodo) {

            let novoPeriodo = await periodoDAO.selectLastId()

            let dadosPeriodoJSON = {}

            dadosPeriodoJSON.status = message.SUCCESS_CREATE_ITEM.status
            dadosPeriodoJSON.message = message.SUCCESS_CREATE_ITEM.message
            dadosPeriodoJSON.periodo = novoPeriodo

            return dadosPeriodoJSON

        } else {
            return message.ERROR_NOT_FOUND
        }

    }

}

const atualizarPeriodo = async function (dadosPeriodo, idPeriodo) {

    if (dadosPeriodo.nome == '' || dadosPeriodo.nome == undefined || !isNaN(dadosPeriodo.nome)) {

        return message.ERROR_REQUIRED_FIELDS

    } else if (idPeriodo == '' || idPeriodo == undefined || isNaN(idPeriodo)) {

        return message.ERROR_INVALID_ID

    } else {

        dadosPeriodo.id = idPeriodo

        let statusId = await periodoDAO.selectPeriodoById(idPeriodo)

        if (statusId) {

            let resultadoDadosPeriodo = await periodoDAO.updatePeriodo(dadosPeriodo)

            if (resultadoDadosPeriodo) {

                let dadosPeriodoJSON = {}

                dadosPeriodoJSON.status = message.SUCCESS_UPDATE_ITEM.status
                dadosPeriodoJSON.message = message.SUCCESS_UPDATE_ITEM.message
                dadosPeriodoJSON.periodo = dadosPeriodo

                return dadosPeriodoJSON

            } else {
                return message.ERROR_NOT_FOUND
            }

        } else {
            return message.ERROR_ID_NOT_FOUND
        }

    }

}

const deletarPeriodo = async function (idPeriodo) {

    if (idPeriodo == '' || idPeriodo == undefined || isNaN(idPeriodo)) {

        return message.ERROR_INVALID_ID

    } else {

        let statusId = await periodoDAO.selectLastId(idPeriodo)

        if (statusId) {

            let dadosPeriodo = await periodoDAO.deletePeriodo(idPeriodo)

            if (dadosPeriodo) {
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
    getPeriodo,
    getPeriodoById,
    getPeriodoByNome,
    inserirPeriodo,
    atualizarPeriodo,
    deletarPeriodo
}