/***************************************************************************************
* Objetivo: Arquivo para fazer o controle dos dados de materias de nosso sistema
* Data: 23/05/2023
* Autor: Oswaldo Barbosa, Vinicius Monteiro
* Versão: 1.0
***************************************************************************************/

var materiaDAO = require('../model/DAO/materiaDAO.js')

var message = require('./modulo/config.js')

//Função que retorna a lista de todas as materias
const getMaterias = async function () {

    let dadosMateriaJSON = {}

    let dadosMateria = await materiaDAO.selectAllMaterias()

    if (dadosMateria) {
        dadosMateriaJSON.status = message.SUCCESS_REQUEST.status
        dadosMateriaJSON.message = message.SUCCESS_REQUEST.message
        dadosMateriaJSON.quantidade = dadosMateria.length
        dadosMateriaJSON.materias = dadosMateria

        return dadosMateriaJSON
    } else {
        return message.ERROR_NOT_FOUND
    }
}


//Função que retorna a materia pelo Id
const getMateriaById = async function (idMateria) {
    if (idMateria == '' || idMateria == undefined || isNaN(idMateria)) {
        return message.ERROR_INVALID_ID
    } else {

        let dadosMateriaJSON = {}

        let dadosMateria = await materiaDAO.selectMateriaById(idMateria)

        if (dadosMateria) {
            dadosMateriaJSON.status = message.SUCCESS_REQUEST.status
            dadosMateriaJSON.message = message.SUCCESS_REQUEST.message
            dadosMateriaJSON.materia = dadosMateria

            return dadosMateriaJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

const getMateriaByName = async function (nomeMateria) {

    if (nomeMateria == undefined || nomeMateria == '' || !isNaN(nomeMateria) || nomeMateria.length > 45) {
        return message.ERROR_INVALID_NAME
    } else {
        let dadosMateriaJSON = {}

        let dadosMateria = await materiaDAO.selectMateriaByName(nomeMateria)


        if (dadosMateria) {
            dadosMateriaJSON.status = message.SUCCESS_REQUEST.status
            dadosMateriaJSON.message = message.SUCCESS_REQUEST.message
            dadosMateriaJSON.materias = dadosMateria

            return dadosMateriaJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

//Função que retorna a materia pela sigla
const getMateriaBySigla = async function (siglaMateria) {

    if (siglaMateria == '' || siglaMateria == undefined || siglaMateria.length > 20 || !isNaN(siglaMateria)) {
        return message.ERROR_INVALID_SIGLA
    } else {
        let dadosMateriaJSON = {}

        let dadosMateria = await materiaDAO.selectMateriaBySigla(siglaMateria)

        if (dadosMateria) {
            dadosMateriaJSON.status = message.SUCCESS_REQUEST.status
            dadosMateriaJSON.message = message.SUCCESS_REQUEST.message
            dadosMateriaJSON.materia = dadosMateria

            return dadosMateriaJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }

}


//Função que insere uma nova matéria
const inserirMateria = async function (dadosMateria) {



    if (dadosMateria.nome == '' || dadosMateria.nome == undefined || dadosMateria.nome.length > 45 || !isNaN(dadosMateria.nome) ||
        dadosMateria.sigla == '' || dadosMateria.sigla == undefined || dadosMateria.sigla.length > 20 || !isNaN(dadosMateria.sigla) ||
        dadosMateria.carga_horaria == '' || dadosMateria.carga_horaria == undefined || isNaN(dadosMateria.carga_horaria) ||
        dadosMateria.descricao == '' || dadosMateria.descricao == undefined || !isNaN(dadosMateria.descricao)
    ) {

        return message.ERROR_REQUIRED_FIELDS

    } else {

        let resultadoDadosMateria = await materiaDAO.insertMateria(dadosMateria)

        if (resultadoDadosMateria) {

            let materiaCriada = await materiaDAO.selectLastId()

            let dadosMateriaJSON = {}

            dadosMateriaJSON.status = message.SUCCESS_CREATE_ITEM.status
            dadosMateriaJSON.message = message.SUCCESS_CREATE_ITEM.message
            dadosMateriaJSON.materiaCriada = materiaCriada

            return dadosMateriaJSON

        } else {
            return message.ERROR_INTERNAL_SERVER
        }
    }
}

//Função que atualiza o aluno
const updateMateria = async function (dadosMateria, idMateria) {

    if (dadosMateria.nome == ''             || dadosMateria.nome == undefined           || dadosMateria.nome.length > 45        || !isNaN(dadosMateria.nome) ||
        dadosMateria.sigla == ''            || dadosMateria.sigla == undefined          || dadosMateria.sigla.length > 20       || !isNaN(dadosMateria.sigla) ||
        dadosMateria.carga_horaria == ''    || dadosMateria.carga_horaria == undefined  || isNaN(dadosMateria.carga_horaria)    ||
        dadosMateria.descricao == ''        || dadosMateria.descricao == undefined      || !isNaN(dadosMateria.descricao)) 
        {

        return message.ERROR_REQUIRED_FIELDS

    } else if (idMateria == '' || idMateria == undefined || isNaN(idMateria)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosMateriaJSON = {}

        let atualizarMateria = await materiaDAO.updateMateria(dadosMateria, idMateria)
        let materiaAtualizada = await materiaDAO.selectMateriaById(idMateria)

        if (atualizarMateria) {
            dadosMateriaJSON.status = message.SUCCESS_UPDATE_ITEM.status
            dadosMateriaJSON.message = message.SUCCESS_UPDATE_ITEM.message
            dadosMateriaJSON.materiaAtualizada = materiaAtualizada

            return dadosMateriaJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

//Função que deleta o aluno
const deleteMateria = async function (idMateria) {
    if (idMateria == '' || idMateria == undefined || isNaN(idMateria)) {
        return message.ERROR_INVALID_ID
    } else {



        materiaDeletada = await materiaDAO.selectMateriaById(idMateria)
        dadosMateria = await materiaDAO.deleteMateria(idMateria)

        if (dadosMateria) {

            dadosMateriaJSON = {}

            dadosMateriaJSON.status = message.SUCCESS_DELETE_ITEM.status
            dadosMateriaJSON.message = message.SUCCESS_DELETE_ITEM.message
            dadosMateriaJSON.materiaDeletada = materiaDeletada

            return dadosMateriaJSON
        }

    }
}

module.exports = {
    getMateriaById,
    getMateriaByName,
    getMateriaBySigla,
    getMaterias,
    inserirMateria,
    updateMateria,
    deleteMateria
}
