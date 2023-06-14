/******************************************************
*  Objetivo: Controller para controlar periodo
*  Data: 23/05/2023
*  Autor: Vinícius Monteiro
*  Versão: 1.0
************************************************************/

var criterioTipoDAO = require('../model/DAO/criterioTipoDAO.js')

var messages = require('./modulo/config.js')

const getAllCriterioTipo = async function () {

    let dadosCriterioTipo = await criterioTipoDAO.selectAllCriterioTipo()

    if (dadosCriterioTipo) {

        let dadosCriterioTipoJSON = {}

        dadosCriterioTipoJSON.status = messages.SUCCESS_REQUEST.status
        dadosCriterioTipoJSON.message = messages.SUCCESS_REQUEST.message
        dadosCriterioTipoJSON.quantidade = dadosCriterioTipo.length
        dadosCriterioTipoJSON.criterioTipo = dadosCriterioTipo

        return dadosCriterioTipoJSON
    } else {
        return messages.ERROR_NOT_FOUND
    }
}

const getCriterioTipoById = async function (idCriterioTipo) {

    if (idCriterioTipo == '' || idCriterioTipo == undefined || isNaN(idCriterioTipo)) {
        return messages.ERROR_INVALID_ID
    } else {

        let dadosCriterioTipo = await criterioTipoDAO.selectCriterioTipoById(idCriterioTipo)

        if (dadosCriterioTipo) {

            let dadosCriterioTipoJSON = {}

            dadosCriterioTipoJSON.status = messages.SUCCESS_REQUEST.status
            dadosCriterioTipoJSON.message = messages.SUCCESS_REQUEST.message
            dadosCriterioTipoJSON.criterioTipo = dadosCriterioTipo

            return dadosCriterioTipoJSON
        } else {
            return messages.ERROR_NOT_FOUND
        }

    }
}

const getCriterioTipoByName = async function (nomeCriterioTipo) {

    if (nomeCriterioTipo == '' || nomeCriterioTipo == undefined || !isNaN(nomeCriterioTipo)) {

        return messages.ERROR_INVALID_NAME
    } else {

        let dadosCriterioTipo = await criterioTipoDAO.selectCriterioTipoByName(nomeCriterioTipo)

        if (dadosCriterioTipo) {
            let dadosCriterioTipoJSON = {}

            dadosCriterioTipoJSON.status = messages.SUCCESS_REQUEST.status
            dadosCriterioTipoJSON.message = messages.SUCCESS_REQUEST.message
            dadosCriterioTipoJSON.criterioTipo = dadosCriterioTipo

            return dadosCriterioTipoJSON
        } else {
            return messages.ERROR_NOT_FOUND
        }
    }
}

const insertCriterioTipo = async function (dadosCriterioTipo) {

    if (dadosCriterioTipo.nome == '' || dadosCriterioTipo.nome == undefined || !isNaN(dadosCriterioTipo.nome)) {
        return messages.ERROR_REQUIRED_FIELDS
    } else {

        let inserirCriterioTipo = await criterioTipoDAO.insertCriterioTipo(dadosCriterioTipo)

        if (inserirCriterioTipo) {

            let criterioTipoCriado = await criterioTipoDAO.selectLastId()

            if (criterioTipoCriado) {


                let dadosCriterioTipoJSON = {}

                dadosCriterioTipoJSON.status = messages.SUCCESS_CREATE_ITEM.status
                dadosCriterioTipoJSON.message = messages; messages.SUCCESS_CREATE_ITEM.message
                dadosCriterioTipoJSON.criterioTipoCriado = criterioTipoCriado

                return dadosCriterioTipoJSON
            }
        }
    }
}

const updateCriterioTipo = async function(dadosCriterioTipo, idCriterioTipo){

    if(dadosCriterioTipo.nome == '' || dadosCriterioTipo.nome == undefined || !isNaN(dadosCriterioTipo.nome)){
        return messages.ERROR_REQUIRED_FIELDS
    }else if(idCriterioTipo == '' || idCriterioTipo == undefined || isNaN(idCriterioTipo)){
        return messages.ERROR_INVALID_ID
    }else{

        dadosCriterioTipo.id = idCriterioTipo

        let statusId = await criterioTipoDAO.selectCriterioTipoById(idCriterioTipo)

        if(statusId){

            let atualizarCriterioTipo = await criterioTipoDAO.updateCriterioTipo(dadosCriterioTipo)
            
            if(atualizarCriterioTipo){

                let dadosCriterioTipoJSON = {}

                dadosCriterioTipoJSON.status = messages.SUCCESS_UPDATE_ITEM.status
                dadosCriterioTipoJSON.message = messages.SUCCESS_UPDATE_ITEM.message
                dadosCriterioTipoJSON.criterioTipoAtualizado = statusId

                return dadosCriterioTipoJSON
            }
        }
    }

}

const deleteCriterioTipo = async function(idCriterioTipo){
    
        if(idCriterioTipo == '' || idCriterioTipo == undefined || isNaN(idCriterioTipo)){
            return messages.ERROR_INVALID_ID
        }else{

            let criterioTipoDeletado = await criterioTipoDAO.selectCriterioTipoById(idCriterioTipo)

            if(criterioTipoDeletado){

                let deletarCriterioTipo = await criterioTipoDAO.deleteCriterioTipo(idCriterioTipo)

                if(deletarCriterioTipo){

                    let dadosCriterioTipoJSON = {}

                    dadosCriterioTipoJSON.status = messages.SUCCESS_DELETE_ITEM.status
                    dadosCriterioTipoJSON.message = messages;messages.SUCCESS_DELETE_ITEM.message
                    dadosCriterioTipoJSON.criterioTipoDeletado = criterioTipoDeletado

                    return dadosCriterioTipoJSON
                }
            }
        }
}

module.exports = {

    getAllCriterioTipo,
    getCriterioTipoById,
    getCriterioTipoByName,
    insertCriterioTipo,
    updateCriterioTipo,
    deleteCriterioTipo

}