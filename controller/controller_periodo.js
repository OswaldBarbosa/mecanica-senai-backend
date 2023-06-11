/***************************************************************************************
* Objetivo: Controller para controlar periodo
* Data: 23/05/2023
* Autor: Vinícius Monteiro
* Versão: 1.0
***************************************************************************************/

var message = require('./modulo/config.js')

var periodoDAO = require('../model/DAO/periodoDAO.js')

const getAllPeriodos = async function () {

    let dadosPeriodo = await periodoDAO.selectAllPeriodos()

    if (dadosPeriodo) {

        let dadosPeriodoJSON = {}

        dadosPeriodoJSON.status = message.SUCCESS_REQUEST.status
        dadosPeriodoJSON.message = message.SUCCESS_REQUEST.message
        dadosPeriodoJSON.quantidade = dadosPeriodo.length
        dadosPeriodoJSON.periodos = dadosPeriodo

        return dadosPeriodoJSON

    } else {

        return message.ERROR_NOT_FOUND
    }
}

const getPeriodoById = async function (idPeriodo) {

    if (idPeriodo == '' || idPeriodo == undefined || isNaN(idPeriodo)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosPeriodo = await periodoDAO.selectPeriodoById(idPeriodo)

        if (dadosPeriodo) {

            let dadosPeriodoJSON = {}

            dadosPeriodoJSON.status = message.SUCCESS_REQUEST.status
            dadosPeriodoJSON.message = message.SUCCESS_REQUEST.message
            dadosPeriodoJSON.peirodo = dadosPeriodo

            return dadosPeriodoJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

const getPeriodoByName = async function (nomePeriodo) {

    if (nomePeriodo == '' || nomePeriodo == undefined || !isNaN(nomePeriodo)) {
        return message.ERROR_INVALID_NAME
    } else {

        let dadosPeriodo = await periodoDAO.selectPeriodoByName(nomePeriodo)

        if (dadosPeriodo) {

            let dadosPeriodoJSON = {}

            dadosPeriodoJSON.status = message.SUCCESS_REQUEST.status
            dadosPeriodoJSON.message = message.SUCCESS_REQUEST.message
            dadosPeriodoJSON.quantidade = dadosPeriodo.length
            dadosPeriodoJSON.periodos = dadosPeriodo

            return dadosPeriodoJSON
        } else {

            return message.ERROR_NOT_FOUND
        }
    }

}

const insertPeriodo = async function (dadosPeriodo) {

    if (dadosPeriodo.nome == '' || dadosPeriodo.nome == undefined || !isNaN(dadosPeriodo)) {
        return message.ERROR_REQUIRED_FIELDS
    } else {

        let dadosPeriodo = await periodoDAO.insertPeriodo(dadosPeriodo)

        if (dadosPeriodo) {

            let periodoCriado = await periodoDAO.selectLastId()

            if (periodoCriado) {
                let dadosPeriodoJSON = {}

                dadosPeriodoJSON.status = message.SUCCESS_CREATE_ITEM.status
                dadosPeriodoJSON.message = message.SUCCESS_CREATE_ITEM.message
                dadosPeriodoJSON.periodoCriado = periodoCriado

                return dadosPeriodoJSON
            }
        } else {
            return message.ERROR_REQUIRED_FIELDS
        }


    }

}

const updatePeriodo = async function (dadosPeriodo, idPeriodo) {

    if (dadosPeriodo.nome == '' || dadosPeriodo.nome == undefined || !isNaN(dadosPeriodo)) {
        return message.ERROR_REQUIRED_FIELDS
    } else if (idPeriodo == '' || idPeriodo == undefined || isNaN(idPeriodo)) {

        return message.ERROR_INVALID_ID

    } else {
        dadosPeriodo.id = idPeriodo

        let periodoAtualizado = await periodoDAO.selectPeriodoById(idPeriodo)

        if (periodoAtualizado) {

            let atualizarPeriodo = await periodoDAO.updatePeriodo(dadosPeriodo)

            if (atualizarPeriodo) {

                let dadosPeriodoJSON = {}

                dadosPeriodoJSON.status = message.SUCCESS_UPDATE_ITEM.status
                dadosPeriodoJSON.message = message.SUCCESS_UPDATE_ITEM.message
                dadosPeriodoJSON.periodoAtualizado = periodoAtualizado

                return dadosPeriodoJSON
            }
        }
    }
}

const deletePeriodo = async function (idPeriodo) {

    if (idPeriodo == '' || idPeriodo == undefined || isNaN(idPeriodo)) {
        return message.ERROR_INVALID_ID
    } else {

        let periodoDeletado = await periodoDAO.selectPeriodoById(idPeriodo)

        if (periodoDeletado) {

            let dadosPeriodo = await periodoDAO.deletePeriodo(idPeriodo)

            if (dadosPeriodo) {

                let dadosPeriodoJSON = {}

                dadosPeriodoJSON.status = message.SUCCESS_DELETE_ITEM.status
                dadosPeriodoJSON.message = message.SUCCESS_DELETE_ITEM.message
                dadosPeriodoJSON.periodoDeletado = periodoDeletado

                return dadosPeriodoJSON
            }
        }
    }

}

module.exports = {

    getAllPeriodos,
    getPeriodoById,
    getPeriodoByName,
    insertPeriodo,
    updatePeriodo,
    deletePeriodo

}