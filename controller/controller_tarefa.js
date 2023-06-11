/***************************************************************************************
* Objetivo: Arquivo para fazer o controle dos dados de tarefas de nosso sistema
* Data: 23/05/2023
* Autor: Oswaldo Barbosa, Vinicius Monteiro
* Versão: 1.0
***************************************************************************************/

var tarefaDAO = require('../model/DAO/tarefaDAO.js')

var message = require('./modulo/config.js')

const getTarefas = async function () {

    let dadosTarefaJSON = {}

    let dadosTarefa = await tarefaDAO.selectAllTarefas()

    if (dadosTarefa) {

        dadosTarefaJSON.status = message.SUCCESS_REQUEST.status
        dadosTarefaJSON.message = message.SUCCESS_REQUEST.message
        dadosTarefaJSON.quantidade = dadosTarefa.length
        dadosTarefaJSON.tarefa = dadosTarefa

        return dadosTarefaJSON

    } else {
        return message.ERROR_NOT_FOUND
    }

}

const getTarefaById = async function (idTarefa) {

    let dadosTarefaJSON = {}

    let dadosTarefa = await tarefaDAO.selectTarefaById(idTarefa)

    if (dadosTarefa) {

        dadosTarefaJSON.status = message.SUCCESS_REQUEST.status
        dadosTarefaJSON.message = message.SUCCESS_REQUEST.message
        dadosTarefaJSON.tarefa = dadosTarefa

        return dadosTarefaJSON

    } else {
        return message.ERROR_NOT_FOUND
    }

}

const getTarefaByNumero = async function (numeroTarefa) {

    let dadosTarefaJSON = {}

    let dadosTarefa = await tarefaDAO.selectTarefaByNumero(numeroTarefa)

    if (dadosTarefa) {

        dadosTarefaJSON.status = message.SUCCESS_REQUEST.status
        dadosTarefaJSON.message = message.SUCCESS_REQUEST.message
        dadosTarefaJSON.tarefa = dadosTarefa

        return dadosTarefaJSON

    } else {
        return message.ERROR_NOT_FOUND
    }

}

const getTarefaByNome = async function (nomeTarefa) {

    let dadosTarefaJSON = {}

    let dadosTarefa = await tarefaDAO.selectTarefaByNome(nomeTarefa)

    if (dadosTarefa) {

        dadosTarefaJSON.status = message.SUCCESS_REQUEST.status
        dadosTarefaJSON.message = message.SUCCESS_REQUEST.message
        dadosTarefaJSON.tarefa = dadosTarefa

        return dadosTarefaJSON

    } else {
        return message.ERROR_NOT_FOUND
    }

}

const inserirTarefa = async function (dadosTarefa) {

    if (dadosTarefa.nome == ''                   || dadosTarefa.nome == undefined                 || !isNaN(dadosTarefa.nome)   || dadosTarefa.nome.length > 150 ||
        dadosTarefa.numero == ''                 || dadosTarefa.numero == undefined               || isNaN(dadosTarefa.numero)  || 
        dadosTarefa.tempo_previsto == ''         || dadosTarefa.tempo_previsto == undefined       ||
        dadosTarefa.id_horario == ''             || dadosTarefa.id_horario == undefined           || isNaN(dadosTarefa.id_horario)            
    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else {

        let resultadoDadosTarefa = await tarefaDAO.insertTarefa(dadosTarefa)

        if (resultadoDadosTarefa) {

            let novaTarefa = await tarefaDAO.selectLastId()

            let dadosTarefaJSON = {}

            dadosTarefaJSON.status = message.SUCCESS_CREATE_ITEM.status
            dadosTarefaJSON.message = message.SUCCESS_CREATE_ITEM.message
            dadosTarefaJSON.tarefa = novaTarefa

            return dadosTarefaJSON

        } else {
            return message.ERROR_INTERNAL_SERVER
        }

    }

}

const atualizarTarefa = async function (dadosTarefa, idTarefa) {

    if (dadosTarefa.nome == ''                   || dadosTarefa.nome == undefined                 || !isNaN(dadosTarefa.nome)   || dadosTarefa.length > 150 ||
        dadosTarefa.numero == ''                 || dadosTarefa.numero == undefined               || isNaN(dadosTarefa.numero)  || 
        dadosTarefa.tempo_previsto == ''         || dadosTarefa.tempo_previsto == undefined       ||
        dadosTarefa.id_horario == ''             || dadosTarefa.id_horario == undefined           || isNaN(dadosTarefa.id_horario)  
    ) {

        return message.ERROR_REQUIRED_FIELDS

    } else if (idTarefa == '' || idTarefa == undefined || isNaN(idTarefa)) {

        return message.ERROR_INVALID_ID

    } else {

        dadosTarefa.id = idTarefa

        let statusId = await tarefaDAO.selectLastId(idTarefa)

        if (statusId) {

            let resultadoDadosTarefa = await tarefaDAO.updateTarefa(dadosTarefa)

            if (resultadoDadosTarefa) {

                let dadosTarefaJSON = {}

                dadosTarefaJSON.status = message.SUCCESS_UPDATE_ITEM.status
                dadosTarefaJSON.message = message.SUCCESS_UPDATE_ITEM.message
                dadosTarefaJSON.tarefa = dadosTarefa

                return dadosTarefaJSON

            } else {
                return message.ERROR_INTERNAL_SERVER
            }

        } else {
            return message.ERROR_INVALID_ID
        }

    }

}

const deletarTarefa = async function (idTarefa) {

    if (idTarefa == '' || idTarefa == undefined || isNaN(idTarefa)) {

        return message.ERROR_INVALID_ID

    } else {

        let statusId = await tarefaDAO.selectTarefaById(idTarefa)

        if (statusId) {

            let dadosTarefa = await tarefaDAO.deleteTarefa(idTarefa)

            if (dadosTarefa) {

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
    getTarefas,
    getTarefaById,
    getTarefaByNumero,
    getTarefaByNome,
    inserirTarefa,
    atualizarTarefa,
    deletarTarefa
}