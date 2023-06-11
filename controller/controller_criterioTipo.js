/******************************************************
*  Objetivo: Controller para controlar periodo
*  Data: 23/05/2023
*  Autor: Vinícius Monteiro
*  Versão: 1.0
************************************************************/

var criterioTipoDAO = require('../model/DAO/criterioTipoDAO.js')

var messages = require('./modulo/config.js')

const getAllCriterioTipo = async function(){

    let dadosCriterioTipo = await criterioTipoDAO.selectAllCriterioTipo()

    if(dadosCriterioTipo){

        let dadosCriterioTipoJSON = {}

        dadosCriterioTipoJSON.status = messages.SUCCESS_REQUEST.status
        dadosCriterioTipoJSON.message = messages.SUCCESS_REQUEST.message
        dadosCriterioTipoJSON.quantidade = dadosCriterioTipo.length
        dadosCriterioTipoJSON.criteriosTipo = dadosCriterioTipo

        return dadosCriterioTipoJSON
    }else{
        return messages.ERROR_NOT_FOUND
    }
}

const getCriterioTipoById = async function(idCriterioTipo){

    if(idCriterioTipo == '' || idCriterioTipo == undefined || isNaN(idCriterioTipo)){
        return messages.ERROR_INVALID_ID
    } else {
        
        let dadosCriterioTipoJSON = {} 

    }
}