/***************************************************************************************
* Objetivo: Arquivo para fazer o controle dos dados de cursos de nosso sistema
* Data: 23/05/2023
* Autor: Oswaldo Barbosa, Vinicius Monteiro
* Versão: 1.0
***************************************************************************************/

var cursoDAO = require('../model/DAO/cursoDAO.js')

var message = require('./modulo/config.js')

const getCursos = async function () {
    let dadosCursoJSON = {}

    let dadosCurso = await cursoDAO.selectAllCursos()

    if (dadosCurso) {

        dadosCursoJSON.status = message.SUCCESS_REQUEST.status
        dadosCursoJSON.message = message.SUCCESS_REQUEST.message
        dadosCursoJSON.quantidade = dadosCurso.length
        dadosCursoJSON.cursos = dadosCurso

        return dadosCursoJSON
    } else {
        return message.ERROR_NOT_FOUND
    }

}

const getCursosById = async function (id) {



    if (id == '' || id == undefined || isNaN(id)) {

        return message.ERROR_ID_NOT_FOUND

    } else {

        let dadosCursoJSON = {}

        let dadosCurso = await cursoDAO.selectCursoById(id)

        if (dadosCurso) {
            dadosCursoJSON.status = message.SUCCESS_REQUEST.status
            dadosCursoJSON.message = message.SUCCESS_REQUEST.message
            dadosCursoJSON.curso = dadosCurso

            return dadosCursoJSON

        }


    }

}

const getCursosByName = async function (nomeCurso) {


    if (nomeCurso == '' || nomeCurso == undefined || !isNaN(nomeCurso)) {

        return message.ERROR_INVALID_NAME

    } else {

        let dadosCurso = await cursoDAO.selectCursoByName(nomeCurso)

        if (dadosCurso) {

            let dadosCursoJSON = {}

            dadosCursoJSON.status = message.SUCCESS_REQUEST.status
            dadosCursoJSON.message = message.SUCCESS_REQUEST.message
            dadosCursoJSON.quantidade = dadosCurso.length
            dadosCursoJSON.aluno = dadosCurso

            return dadosCursoJSON

        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

const inserirCurso = async function (dadosCurso) {

    if (dadosCurso.nome == '' || dadosCurso.nome == undefined || dadosCurso.nome.length > 70 || !isNaN(dadosCurso.nome) ||
        dadosCurso.sigla == '' || dadosCurso.sigla == undefined || dadosCurso.sigla.length > 20 || !isNaN(dadosCurso.sigla) ||
        dadosCurso.carga_horaria == '' || dadosCurso.carga_horaria == undefined || isNaN(dadosCurso.carga_horaria) ||
        dadosCurso.descricao == '' || dadosCurso.descricao == undefined || !isNaN(dadosCurso.descricao)) {

        return message.ERROR_INVALID_NAME
    } else {

        let resultadoCurso = await cursoDAO.insertCurso(dadosCurso)
        let novoCurso = await cursoDAO.selectLastId()

        if (resultadoCurso) {

            let dadosCursoJSON = {}

            dadosCursoJSON.status = message.SUCCESS_CREATE_ITEM.status
            dadosCursoJSON.message = message.SUCCESS_CREATE_ITEM.message
            dadosCursoJSON.cursoInserido = novoCurso

            return dadosCursoJSON
        } else {
            return message.ERROR_INTERNAL_SERVER
        }
    }
}

const updateCurso = async function (dadosCurso, idCurso) {

    if (dadosCurso.nome == '' || dadosCurso.nome == undefined || dadosCurso.nome.length > 70 || !isNaN(dadosCurso.nome) ||
        dadosCurso.sigla == '' || dadosCurso.sigla == undefined || dadosCurso.sigla.length > 20 || !isNaN(dadosCurso.sigla) ||
        dadosCurso.carga_horaria == '' || dadosCurso.carga_horaria == undefined || isNaN(dadosCurso.carga_horaria) ||
        dadosCurso.descricao == '' || dadosCurso.descricao == undefined || !isNaN(dadosCurso.descricao)
    ) {

        return message.ERROR_REQUIRED_FIELDS

    } else if (idCurso == '' || idCurso == undefined || isNaN(idCurso)) {

        return message.ERROR_INVALID_ID

    } else {

        dadosCurso.id = idCurso

        let statusId = await cursoDAO.selectCursoById(idCurso)

        if (statusId) {

            let resultadoDadosCurso = await cursoDAO.updateCurso(dadosCurso)

            if (resultadoDadosCurso) {

                let dadosCursoJSON = {}

                dadosCursoJSON.status = message.SUCCESS_UPDATE_ITEM.status
                dadosCursoJSON.message = message.SUCCESS_UPDATE_ITEM.message
                dadosCursoJSON.curso = dadosCurso

                return dadosCursoJSON

            } else {
                return message.error.ERROR_INTERNAL_SERVER
            }

        }else{
            return message.ERROR_INVALID_ID
        }
        
    }

}

const deletarCurso = async function (id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {

        let statusId = await cursoDAO.selectCursoById(id)

        if (statusId) {

            let resultadoDadosCurso = await cursoDAO.deleteCurso(id)


            if (resultadoDadosCurso) {
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
    getCursos,
    getCursosById,
    getCursosByName,
    deletarCurso,
    updateCurso,
    inserirCurso
}