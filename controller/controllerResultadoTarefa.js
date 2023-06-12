/***************************************************************************************
* Objetivo: Controller para controlar resultado tarefa
* Data: 23/05/2023
* Autor: Vinícius Monteiro
* Versão: 1.0
***************************************************************************************/

var resultadoTarefaDAO = require('../model/DAO/resultadoTarefaDAO.js')

var message = require('./modulo/config.js')

const getAllResultadoTarefa = async function () {

    let dadosResultadoTarefa = await resultadoTarefaDAO.selectAllResultadoTarefa()

    if (dadosResultadoTarefa) {

        let dadosResultadoTarefaJSON = {}

        dadosResultadoTarefaJSON.status = message.SUCCESS_REQUEST.status
        dadosResultadoTarefaJSON.message = message.SUCCESS_REQUEST.message
        dadosResultadoTarefaJSON.quantidade = dadosResultadoTarefa.length
        dadosResultadoTarefaJSON.resultadoTarefa = dadosResultadoTarefa

        return dadosResultadoTarefaJSON
    }
}

const getResultadoTarefaById = async function (idResultadoTarefa) {

    if (idResultadoTarefa == '' || idResultadoTarefa == undefined || isNaN(idResultadoTarefa)) {
        return message.ERROR_INVALID_ID
    } else {

        let dadosResultadoTarefa = await resultadoTarefaDAO.selectResultadoTarefaById(idResultadoTarefa)

        if (dadosResultadoTarefa) {

            let dadosResultadoTarefaJSON = {}

            dadosResultadoTarefaJSON.status = message.SUCCESS_REQUEST.status
            dadosResultadoTarefaJSON.message = message.SUCCESS_REQUEST.message
            dadosResultadoTarefaJSON.resultadoTarefa = dadosResultadoTarefa

            return dadosResultadoTarefaJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

const insertResultadoTarefa = async function (dadosResultadoTarefa) {

    if (dadosResultadoTarefa.obtido == '' || dadosResultadoTarefa.obtido == undefined || dadosResultadoTarefa.obtido.length > 45 || isNaN(dadosResultadoTarefa.obtido) ||
        dadosResultadoTarefa.resposta_aluno == '' || dadosResultadoTarefa.resposta_aluno == undefined || dadosResultadoTarefa.length > 45 || isNaN(dadosResultadoTarefa.resposta_aluno) ||
        dadosResultadoTarefa.id_matricula_tarefa_criterio == '' || dadosResultadoTarefa.id_matricula_tarefa_criterio == undefined || dadosResultadoTarefa.id_matricula_tarefa_criterio) {

        return message.ERROR_REQUIRED_FIELDS
    } else {

        let criarResultadoTarefa = await resultadoTarefaDAO.insertResultadoTarefa(dadosResultadoTarefa)

        if (criarResultadoTarefa) {

            let resultadoTarefaCriado = await resultadoTarefaDAO.selectLastId()

            if (resultadoTarefaCriado) {
                let dadosResultadoTarefaJSON = {}

                dadosResultadoTarefaJSON.status = message.SUCCESS_CREATE_ITEM.status
                dadosResultadoTarefaJSON.message = message.SUCCESS_CREATE_ITEM.message
                dadosResultadoTarefaJSON.resultadoTarefaCriado = resultadoTarefaCriado

                return dadosResultadoTarefaJSON
            }
        }
    }
}

const updateResultadoTarefa = async function(dadosResultadoTarefa, idResultadoTarefa){
    if (dadosResultadoTarefa.obtido == '' || dadosResultadoTarefa.obtido == undefined || dadosResultadoTarefa.obtido.length > 45 || isNaN(dadosResultadoTarefa.obtido) ||
        dadosResultadoTarefa.resposta_aluno == '' || dadosResultadoTarefa.resposta_aluno == undefined || dadosResultadoTarefa.length > 45 || isNaN(dadosResultadoTarefa.resposta_aluno) ||
        dadosResultadoTarefa.id_matricula_tarefa_criterio == '' || dadosResultadoTarefa.id_matricula_tarefa_criterio == undefined || dadosResultadoTarefa.id_matricula_tarefa_criterio) {

        return message.ERROR_REQUIRED_FIELDS
    } else if(idResultadoTarefa == '' || idResultadoTarefa == undefined || isNaN(idResultadoTarefa)){
        return message.ERROR_INVALID_ID
    }else{

        dadosResultadoTarefa.id = idResultadoTarefa
        let statusId = await resultadoTarefaDAO.selectResultadoTarefaById(idResultadoTarefa)

        if(statusId){

            let atualizarResultadoTarefa = await resultadoTarefaDAO.updateResultadoTarefa(dadosResultadoTarefa)

            if(atualizarResultadoTarefa){
                let dadosResultadoTarefaJSON = {}

                dadosResultadoTarefaJSON.status = message.SUCCESS_UPDATE_ITEM.status
                dadosResultadoTarefaJSON.message = message.SUCCESS_UPDATE_ITEM.message
                dadosResultadoTarefaJSON.resultadoTarefaAtualizado = statusId

                return dadosResultadoTarefaJSON
            }
        }
    }
}

const deleteResultadoTarefa = async function(idResultadoTarefa){

    if(idResultadoTarefa == '' || idResultadoTarefa == undefined || isNaN(idResultadoTarefa)){
        return message.ERROR_INVALID_ID
    }else{

        let resultadoTarefaDeletado = await resultadoTarefaDAO.selectResultadoTarefaById(idResultadoTarefa)

        if(resultadoTarefaDeletado){
            let deletarResultadoTarefa = await resultadoTarefaDAO.deleteResultadoTarefa(idResultadoTarefa)

            if(deletarResultadoTarefa){

                let dadosResultadoTarefaJSON = {}

                dadosResultadoTarefaJSON.status = message.SUCCESS_DELETE_ITEM.status
                dadosResultadoTarefaJSON.message = message.SUCCESS_DELETE_ITEM.message
                dadosResultadoTarefaJSON.resultadoTarefaDeletado = resultadoTarefaDeletado

                return dadosResultadoTarefaJSON
            }
        }
    }
}

module.exports = {
    getAllResultadoTarefa,
    getResultadoTarefaById,
    updateResultadoTarefa,
    insertResultadoTarefa,
    deleteResultadoTarefa
}