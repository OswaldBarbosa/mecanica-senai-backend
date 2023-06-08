/***************************************************************************************
* Objetivo: Controller para controlar materia
* Data: 23/05/2023
* Autor: Vinícius Monteiro
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

    if (nomeMateria == undefined || nomeMateria == '' || isNaN(nomeMateria) || nomeMateria.length > 45) {
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
const inserirMatricula = async function (dadosMateria, idMateria) {

    if (dadosMateria.nome == '' || dadosMateria.nome == undefined || dadosMateria.nome.length > 45 || !isNaN(dadosMateria.nome) ||
        dadosMateria.sigla == '' || dadosMateria.sigla == undefined || dadosMateria.sigla.length > 20 || !isNaN(dadosMateria.sigla) ||
        dadosMateria.carga_horaria == '' || dadosMateria.carga_horaria == undefined || isNaN(dadosMateria.carga_horaria) ||
        dadosMateria.descricao == '' || dadosMateria.descricao == undefined || !isNaN(dadosMateria.descricao)) {

        return message.ERROR_REQUIRED_FIELDS

    } else if (idMateria == '' || idMateria == undefined || isNaN(idMateria)) {

        return message.ERROR_INVALID_ID

    } else {
        let dadosMateriaJSON = {}

        let dadosMateria = await materiaDAO.insertMateria(dadosMateria)
        let materiaCriada = await materiaDAO.selectLastId(idMateria)

        if (dadosMateria) {
            dadosMateriaJSON.status = message.SUCCESS_CREATE_ITEM.status
            dadosMateriaJSON.message = message.SUCCESS_CREATE_ITEM.message
            dadosMateriaJSON.materiaCriada = materiaCriada

            return dadosMateriaJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

//Função que atualiza o aluno
const updateMateria = async function (dadosMateria, idMateria) {

    if (dadosMateria.nome == '' || dadosMateria.nome == undefined || dadosMateria.nome.length > 45 || !isNaN(dadosMateria.nome) ||
        dadosMateria.sigla == '' || dadosMateria.sigla == undefined || dadosMateria.sigla.length > 20 || !isNaN(dadosMateria.sigla) ||
        dadosMateria.carga_horaria == '' || dadosMateria.carga_horaria == undefined || isNaN(dadosMateria.carga_horaria) ||
        dadosMateria.descricao == '' || dadosMateria.descricao == undefined || !isNaN(dadosMateria.descricao)) {

        return message.ERROR_REQUIRED_FIELDS

    } else if(idMateria == '' || idMateria == undefined || isNaN(idMateria)){
        return message.ERROR_INVALID_ID
    }else{
        let dadosMateriaJSON = {}

        let dadosMateria = await materiaDAO.updateMateria(dadosMateriaJSON)
        let materiaAtualizada = await materiaDAO.selectMateriaById(idMateria)

        if(dadosMateria){
            dadosMateriaJSON.status = message.SUCCESS_UPDATE_ITEM.status
            dadosMateriaJSON.message = message.SUCCESS_UPDATE_ITEM.message
            dadosMateriaJSON.materiaAtualizada = materiaAtualizada

            return dadosMateriaJSON
        }else{
            return message.ERROR_NOT_FOUND
        }
    }
}

//Função que deleta o aluno
const deleteMateria = async function(id){
    if(idMateria == '' || idMateria == undefined || isNaN(idMateria)){
        return message.ERROR_INVALID_ID
    }else{
        dadosMateriaJSON = {}

        materiaDeletada = await materiaDAO.selectMateriaById(id)
        dadosMateria = await materiaDAO.deleteMateria(id)
        
        if(dadosMateria){
            dadosMateriaJSON.status = message.SUCCESS_DELETE_ITEM.status
            dadosMateriaJSON.message= message.SUCCESS_DELETE_ITEM.message
            dadosMateriaJSON.materiaDeletada = materiaDeletada

            return dadosMateriaJSON
        }else{
            return message.ERROR_NOT_FOUND
        }
        
    }
}

module.exports = {
    getMateriaById,
    getMateriaByName,
    getMateriaBySigla,
    getMaterias,
    inserirMatricula,
    updateMateria,
    deleteMateria
}
