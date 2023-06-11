/***************************************************************************************
* Objetivo: Controller para controlar avaliação
* Data: 23/05/2023
* Autor: Vinícius Monteiro
* Versão: 1.0
***************************************************************************************/

var message = require('./modulo/config.js')
var avaliacaoDAO = require('../model/DAO/avaliacaoDAO.js')

const getAllAvaliacao = async function () {

    let dadosAvaliacao = await avaliacaoDAO.selectAllAvaliacoes()

    if (dadosAvaliacao) {

        let dadosAvaliacaoJSON = {}

        dadosAvaliacaoJSON.status = message.SUCCESS_REQUEST.status
        dadosAvaliacaoJSON.message = message.SUCCESS_REQUEST.message
        dadosAvaliacaoJSON.quantidade = dadosAvaliacao.length
        dadosAvaliacaoJSON.avaliacoes = dadosAvaliacao

        return dadosAvaliacaoJSON
    }
}

const getAvaliacaoById = async function (idAvaliacao) {

    if (idAvaliacao == '' || idAvaliacao == undefined || isNaN(idAvaliacao)) {
        return message.ERROR_INVALID_ID
    } else {

        let dadosAvaliacao = await avaliacaoDAO.selectAvaliacaoById(idAvaliacao)

        if (dadosAvaliacao) {
            let dadosAvaliacaoJSON = {}

            dadosAvaliacaoJSON.status = message.SUCCESS_REQUEST.status
            dadosAvaliacaoJSON.message = message.SUCCESS_REQUEST.message
            dadosAvaliacaoJSON.avaliacao = dadosAvaliacao

            return dadosAvaliacaoJSON
        }
    }
}

const insertAvaliacao = async function (dadosAvaliacao) {

    if (dadosAvaliacao.resposta_professor == '' || dadosAvaliacao.resposta_professor == undefined || !isNaN(dadosAvaliacao.resposta_professor) ||
        dadosAvaliacao.id_resultado_tarefa == '' || dadosAvaliacao.id_resultado_tarefa == undefined || isNaN(dadosAvaliacao.id_resultado_tarefa)) {

        return message.ERROR_REQUIRED_FIELDS
    } else {

        let inserirAvaliacao = await avaliacaoDAO.insertAvaliacao(dadosAvaliacao)

        if (inserirAvaliacao) {

            let newAvaliacao = await avaliacaoDAO.selectLastId()

            if (newAvaliacao) {

                let dadosAvaliacaoJSON = {}
                dadosAvaliacaoJSON.status = message.SUCCESS_CREATE_ITEM.status
                dadosAvaliacaoJSON.message = message.SUCCESS_CREATE_ITEM.message
                dadosAvaliacaoJSON.avaliacaoCriada = newAvaliacao

                return dadosAvaliacaoJSON
            }
        }
    }
}

const updateAvaliacao = async function (dadosAvaliacao, idAvaliacao) {

    if (dadosAvaliacao.resposta_professor == '' || dadosAvaliacao.resposta_professor == undefined || !isNaN(dadosAvaliacao.resposta_professor) ||
        dadosAvaliacao.id_resultado_tarefa == '' || dadosAvaliacao.id_resultado_tarefa == undefined || isNaN(dadosAvaliacao.id_resultado_tarefa)) {

        return message.ERROR_REQUIRED_FIELDS
    } else if (idAvaliacao == '' || idAvaliacao == undefined || isNaN(idAvaliacao)) {

        return message.ERROR_INVALID_ID

    } else {

        dadosAvaliacao.id = idAvaliacao

        let statusId = await avaliacaoDAO.selectAvaliacaoById(idAvaliacao)

        if (statusId) {

            let atualizarAvaliacao = await avaliacaoDAO.updateAvaliacao(dadosAvaliacao)

            if (atualizarAvaliacao) {

                let dadosAvaliacaoJSON = {}

                dadosAvaliacaoJSON.status = message.SUCCESS_UPDATE_ITEM.status
                dadosAvaliacaoJSON.message = message.SUCCESS_UPDATE_ITEM.message
                dadosAvaliacaoJSON.avaliacaoAtualizada = statusId

                return dadosAvaliacaoJSON
            }
        }
    }
}

const deleteAvaliacao = async function (idAvaliacao) {

    if (idAvaliacao == '' || idAvaliacao == undefined || isNaN(idAvaliacao)) {
        return message.ERROR_INVALID_ID
    } else {
        let avaliacaoDeletada = await avaliacaoDAO.selectAvaliacaoById(idAvaliacao)

        if (avaliacaoDeletada) {

            let deletarAvaliacao = await avaliacaoDAO.deleteAvaliacao(idAvaliacao)

            if (deletarAvaliacao) {

                let dadosAvaliacaoJSON = {}

                dadosAvaliacaoJSON.status = message.SUCCESS_DELETE_ITEM.status
                dadosAvaliacaoJSON.message = message.SUCCESS_DELETE_ITEM.message
                dadosAvaliacaoJSON.avalaicaoDeletada = avaliacaoDeletada

                return dadosAvaliacaoJSON
            }
        }
    }
}

module.exports = {
    getAllAvaliacao,
    getAvaliacaoById,
    insertAvaliacao,
    updateAvaliacao,
    deleteAvaliacao
}