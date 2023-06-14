/***************************************************************************************
* Objetivo: Arquivo para fazer o controle dos dados de matriculas de nosso sistema
* Data: 23/05/2023
* Autor: Oswaldo Barbosa, Vinicius Monteiro
* Versão: 1.0
***************************************************************************************/

var matriculaDAO = require('../model/DAO/matriculaDAO.js')

var message = require('./modulo/config.js')

const getMatricula = async function () {

    let dadosMatriculaJSON = {}

    let dadosMatricula = await matriculaDAO.selectAllMatriculas()

    if (dadosMatricula) {

        dadosMatriculaJSON.status = message.SUCCESS_REQUEST.status
        dadosMatriculaJSON.message = message.SUCCESS_REQUEST.message
        dadosMatriculaJSON.quantidade = dadosMatricula.length
        dadosMatriculaJSON.matricula = dadosMatricula

        return dadosMatriculaJSON

    } else {
        return message.ERROR_NOT_FOUND
    }

}

const getMatriculaById = async function (idMatricula) {

    if (idMatricula == '' || idMatricula == undefined || isNaN(idMatricula)) {
        return message.ERROR_INVALID_ID
    } else {

        let dadosMatricula = await matriculaDAO.selectMatriculaById(idMatricula)

        if (dadosMatricula) {

            let dadosMatriculaJSON = {}

            dadosMatriculaJSON.status = message.SUCCESS_REQUEST.status
            dadosMatriculaJSON.message = message.SUCCESS_REQUEST.message
            dadosMatriculaJSON.matricula = dadosMatricula

            return dadosMatriculaJSON

        } else {
            return message.ERROR_NOT_FOUND
        }

    }

}

const getMatriculaByNumero = async function (numeroMatricula) {

    if (numeroMatricula == '' || numeroMatricula == undefined || isNaN(numeroMatricula) || numeroMatricula.length > 8) {
        return message.ERROR_INVALID_MATRICULA
    } else {

        let dadosMatricula = await matriculaDAO.selectMatriculaByNumero(numeroMatricula)

        if (dadosMatricula) {

            let dadosMatriculaJSON = {}

            dadosMatriculaJSON.status = message.SUCCESS_REQUEST.status
            dadosMatriculaJSON.message = message.SUCCESS_REQUEST.message
            dadosMatriculaJSON.matricula = dadosMatricula

            return dadosMatriculaJSON

        } else {
            return message.ERROR_NOT_FOUND
        }

    }

}

const inserirMatricula = async function (dadosMatricula) {

    if (dadosMatricula.numero == '' || dadosMatricula.numero == undefined || isNaN(dadosMatricula.numero) ||
        dadosMatricula.id_aluno == '' || dadosMatricula.id_aluno == undefined || isNaN(dadosMatricula.id_aluno) ||
        dadosMatricula.id_usuario == '' || dadosMatricula.id_usuario == undefined || isNaN(dadosMatricula.id_usuario)
    ) {

        return message.ERROR_REQUIRED_FIELDS

    } else {

        let resultadoDadosMatricula = await matriculaDAO.insertMatricula(dadosMatricula)

        if (resultadoDadosMatricula) {

            let novaMatricula = await matriculaDAO.selectLastId()

            let dadosMatriculaJSON = {}

            dadosMatriculaJSON.status = message.SUCCESS_CREATE_ITEM.status
            dadosMatriculaJSON.message = message.SUCCESS_CREATE_ITEM.message
            dadosMatriculaJSON.matricula = novaMatricula

            return dadosMatriculaJSON

        } else {
            return message.ERROR_INTERNAL_SERVER
        }

    }

}

const atualizarMatricula = async function (dadosMatricula, idMatricula) {

    if (dadosMatricula.numero == '' || dadosMatricula.numero == undefined || isNaN(dadosMatricula.numero) ||
        dadosMatricula.id_aluno == '' || dadosMatricula.id_aluno == undefined || isNaN(dadosMatricula.id_aluno) ||
        dadosMatricula.id_usuario == '' || dadosMatricula.id_usuario == undefined || isNaN(dadosMatricula.id_usuario)
    ) {

        return message.ERROR_REQUIRED_FIELDS

    } else if (idMatricula == '' || idMatricula == undefined || isNaN(idMatricula)) {

    } else {

        dadosMatricula.id = idMatricula

        let statusId = await matriculaDAO.selectMatriculaById(idMatricula)

        if (statusId) {

            let resultadoDadosMatricula = await matriculaDAO.updateMatricula(dadosMatricula)

            if (resultadoDadosMatricula) {

                let dadosMatriculaJSON = {}

                dadosMatriculaJSON.status = message.SUCCESS_UPDATE_ITEM.status
                dadosMatriculaJSON.message = message.SUCCESS_UPDATE_ITEM.message
                dadosMatriculaJSON.matricula = dadosMatricula

                return dadosMatriculaJSON

            } else {
                return message.ERROR_NOT_FOUND
            }

        } else {
            return message.ERROR_ID_NOT_FOUND
        }

    }

}

const deletarMatricula = async function (idMatricula) {

    if (idMatricula == '' || idMatricula == undefined || isNaN(idMatricula)) {

        return message.ERROR_INVALID_ID

    } else {

        let statusId = await matriculaDAO.selectMatriculaById(idMatricula)

        if (statusId) {

            let dadosMatricula = await matriculaDAO.deleteMatricula(idMatricula)

            if (dadosMatricula) {
                
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
    getMatricula,
    getMatriculaById,
    getMatriculaByNumero,
    inserirMatricula,
    atualizarMatricula,
    deletarMatricula
}