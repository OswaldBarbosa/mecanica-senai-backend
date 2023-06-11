/***************************************************************************************
* Objetivo: Controller para controlar horario
* Data: 23/05/2023
* Autor: Vinícius Monteiro
* Versão: 1.0
***************************************************************************************/

var message = require('./modulo/config.js')

var horarioDAO = require('../model/DAO/horarioDAO.js')

const getAllHorarios = async function () {

    let dadosHorario = await horarioDAO.selectAllHorarios()

    if (dadosHorario) {

        let dadosHorarioJSON = {}

        dadosHorarioJSON.status = message.SUCCESS_REQUEST.status
        dadosHorarioJSON.message = message.SUCCESS_REQUEST.message
        dadosHorarioJSON.quantidade = dadosHorario.length
        dadosHorarioJSON.horarios = dadosHorario

        return dadosHorarioJSON

    } else {
        return message.ERROR_NOT_FOUND
    }
}

const getHorariosById = async function (idHorario) {

    if (idHorario == undefined || idHorario == '' || isNaN(idHorario)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosHorario = await horarioDAO.selectHorarioById(idHorario)

        console.log(dadosHorario);

        if (dadosHorario) {

            let dadosHorarioJSON = {}

            dadosHorarioJSON.status = message.SUCCESS_REQUEST.status
            dadosHorarioJSON.message = message.SUCCESS_REQUEST.message
            dadosHorarioJSON.horario = dadosHorario

            return dadosHorarioJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

const insertHorario = async function (dadosHorario) {

    if (dadosHorario.inicio == '' || dadosHorario.inicio == undefined ||
        dadosHorario.termino == '' || dadosHorario.termino == undefined ||
        dadosHorario.liquido == '' || dadosHorario.liquido == undefined ||
        dadosHorario.desconto == '' || dadosHorario.desconto == undefined ||
        dadosHorario.observacao == '' || dadosHorario.observacao == undefined || !isNaN(dadosHorario.observacao)) {

        return message.ERROR_REQUIRED_FIELDS
    } else {
        let criarHorario = await horarioDAO.insertHorario(dadosHorario)

        if (dadosHorario) {

            let horarioCriado = await horarioDAO.selectLastId()

            if (horarioCriado) {

                let dadosHorarioJSON = {}

                dadosHorarioJSON.status = message.SUCCESS_CREATE_ITEM.status
                dadosHorarioJSON.message = message.SUCCESS_CREATE_ITEM.message
                dadosHorarioJSON.horarioCriado = horarioCriado

                return dadosHorarioJSON
            } else {
                return message.ERROR_INTERNAL_SERVER
            }

        }
    }

}

const updateHorario = async function (dadosHorario, idHorario) {

    if (dadosHorario.inicio == '' || dadosHorario.inicio == undefined ||
        dadosHorario.termino == '' || dadosHorario.termino == undefined ||
        dadosHorario.liquido == '' || dadosHorario.liquido == undefined ||
        dadosHorario.desconto == '' || dadosHorario.desconto == undefined ||
        dadosHorario.observacao == '' || dadosHorario.observacao == undefined || !isNaN(dadosHorario.observacao)
    ) {

        return message.ERROR_REQUIRED_FIELDS

    } else if (idHorario == '' || idHorario == undefined || isNaN(idHorario)) {

        return message.ERROR_INVALID_ID

    } else {
     
         dadosHorario.id = idHorario
        let statusId = await horarioDAO.selectHorarioById(idHorario)

        if (statusId) {
            
            
            let atualizarHorario = await horarioDAO.updateHorario(dadosHorario)

            

            if (atualizarHorario) {
                let dadosHorarioJSON = {}

                dadosHorarioJSON.status = message.SUCCESS_UPDATE_ITEM.status
                dadosHorarioJSON.message = message.SUCCESS_UPDATE_ITEM.message
                dadosHorarioJSON.alunoAtualizado = dadosHorario

                return dadosHorarioJSON
            }
        }
    }
}

const deleteHorario = async function (idHoraio) {

    if (idHoraio == '' || idHoraio == undefined || isNaN(idHoraio)) {
        return message.ERROR_INVALID_ID
    } else {

        let horarioDeletado = await horarioDAO.selectHorarioById(idHoraio)
        if (horarioDeletado) {
            let dadosHorario = await horarioDAO.deleteHorario(idHoraio)

            if (dadosHorario) {
                let dadosHorarioJSON = {}

                dadosHorarioJSON.status = message.SUCCESS_DELETE_ITEM.status
                dadosHorarioJSON.message = message.SUCCESS_DELETE_ITEM.message
                dadosHorarioJSON.itemDeletado = horarioDeletado

                return dadosHorarioJSON
            }
        }
    }
}

module.exports = {

    getAllHorarios,
    getHorariosById,
    insertHorario,
    updateHorario,
    deleteHorario
}