/***************************************************************************************
* Objetivo: Controller para controlar usuarioTipo
* Data: 23/05/2023
* Autor: Vinícius Monteiro
* Versão: 1.0
***************************************************************************************/

var usuarioTipoDAO = require('../model/DAO/usuarioTipoDAO.js')
var message = require('./modulo/config.js')

const getAllUsuarioTipo = async function () {

    let dadosUsuarioTipo = await usuarioTipoDAO.selectAllUsuarioTipo()

    if (dadosUsuarioTipo) {

        let dadosUsuarioTipoJSON = {}

        dadosUsuarioTipoJSON.status = message.SUCCESS_REQUEST.status
        dadosUsuarioTipoJSON.message = message.SUCCESS_REQUEST.message
        dadosUsuarioTipoJSON.quantidade = dadosUsuarioTipo.length
        dadosUsuarioTipoJSON.UsuariosTipo = dadosUsuarioTipo

        return dadosUsuarioTipoJSON

    } else {
        return message.ERROR_NOT_FOUND
    }
}

const getUsuarioTipoById = async function (idUsuarioTipo) {

    if (idUsuarioTipo == '' || idUsuarioTipo == undefined || isNaN(idUsuarioTipo)) {

        return message.ERROR_INVALID_ID
    } else {

        let dadosUsuarioTipo = await usuarioTipoDAO.selectUsuarioTipoById(idUsuarioTipo)

        if (dadosUsuarioTipo) {
            let dadosUsuarioTipoJSON = {}

            dadosUsuarioTipoJSON.status = message.SUCCESS_REQUEST.status
            dadosUsuarioTipoJSON.message = message.SUCCESS_REQUEST.message
            dadosUsuarioTipoJSON.usuarioTipo = dadosUsuarioTipo

            return dadosUsuarioTipoJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}


const getUsuarioTipoByName = async function (nameUsuarioTipo) {

    if (nameUsuarioTipo == '' || nameUsuarioTipo == undefined || !isNaN(nameUsuarioTipo)) {
        return message.ERROR_INVALID_NAME
    } else {

        let dadosUsuarioTipo = await usuarioTipoDAO.selectUsuarioTipoByName(nameUsuarioTipo)

        if (dadosUsuarioTipo) {

            let dadosUsuarioTipoJSON = {}

            dadosUsuarioTipoJSON.status = message.SUCCESS_REQUEST.status
            dadosUsuarioTipoJSON.message = message.SUCCESS_REQUEST.message
            dadosUsuarioTipoJSON.quantidade = dadosUsuarioTipo.length
            dadosUsuarioTipoJSON.usuarioTipo = dadosUsuarioTipo

            return dadosUsuarioTipoJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

const insertUsuarioTipo = async function (dadosUsuarioTipo) {

    if (dadosUsuarioTipo.nome == '' || dadosUsuarioTipo.nome == undefined || !isNaN(dadosUsuarioTipo)) {
        return message.ERROR_INVALID_NAME
    } else {

        let criarUsuarioTipo = await usuarioTipoDAO.insertUsuarioTipo(dadosUsuarioTipo)

        if (criarUsuarioTipo) {

            let usuarioTipoCriado = await usuarioTipoDAO.selectLastId()

            if (usuarioTipoCriado) {
                let dadosUsuarioTipoJSON = {}

                dadosUsuarioTipoJSON.status = message.SUCCESS_CREATE_ITEM.status
                dadosUsuarioTipoJSON.message = message.SUCCESS_CREATE_ITEM.message
                dadosUsuarioTipoJSON.usuarioTipoCriado = usuarioTipoCriado
            }
        } else {
            return message.ERROR_INTERNAL_SERVER
        }

    }

}

const updateUsuarioTipo = async function(dadosUsuarioTipo, idUsuarioTipo){
    
    
    if (dadosUsuarioTipo.nome == '' || dadosUsuarioTipo.nome == undefined || !isNaN(dadosUsuarioTipo)) {
        return message.ERROR_INVALID_NAME
    } else if(idUsuarioTipo == '' || idUsuarioTipo == undefined || isNaN(idUsuarioTipo)){

        return message.ERROR_INVALID_ID
    }else{

        let atualizarUsuarioTipo = await usuarioTipoDAO.updateUsuarioTipo(dadosUsuarioTipo)

        if(atualizarUsuarioTipo){

            let dadosAtualizados = await usuarioTipoDAO.selectUsuarioTipoById(idUsuarioTipo)

            if(dadosAtualizados){

                let dadosUsuarioTipoJSON = {}

                dadosUsuarioTipoJSON.status = message.SUCCESS_UPDATE_ITEM.status
                dadosUsuarioTipoJSON.message = message.SUCCESS_UPDATE_ITEM.message
                dadosUsuarioTipoJSON.usuarioTipo = dadosAtualizados

                return dadosUsuarioTipoJSON
            }
        }
    }
}

const deleteUsuarioTipo = async function(idUsuarioTipo) {

    if(idUsuarioTipo == '' || idUsuarioTipo == undefined || isNaN(idUsuarioTipo)){

        return message.ERROR_INVALID_ID
    }else{

        let usuarioTipoDeletado = await usuarioTipoDAO.selectUsuarioTipoById(idUsuarioTipo)

        if(usuarioTipoDeletado){

            let excluirUsuarioTipo = await usuarioTipoDAO.deleteUsuarioTipo(idUsuarioTipo)

            if(excluirUsuarioTipo){

                let dadosUsuarioTipoJSON = {}

                dadosUsuarioTipoJSON.status = message.SUCCESS_DELETE_ITEM.status
                dadosUsuarioTipoJSON.message = message.SUCCESS_DELETE_ITEM.message
                dadosUsuarioTipoJSON.usuarioTipoDeletado = usuarioTipoDeletado

                return dadosUsuarioTipoJSON
            }
        }
    }
}

module.exports = {

    getAllUsuarioTipo,
    getUsuarioTipoById,
    getUsuarioTipoByName,
    insertUsuarioTipo,
    updateUsuarioTipo,
    deleteUsuarioTipo
}