/***************************************************************************************
* Objetivo: Arquivo para fazer o controle dos dados de cursos de nosso sistema
* Data: 23/05/2023
* Autor: Oswaldo Barbosa, Vinicius Monteiro
* Versão: 1.0
***************************************************************************************/

var cursoDAO = require('../model/DAO/cursoDAO.js')

var message = require('./modulo/config.js')

const getCursos = async function(){
    let dadosCursoJSON = {}

    let dadosCurso = await cursoDAO.selectAllCursos()

    if(dadosCurso){

        dadosCursoJSON.status = message.SUCCESS_REQUEST.status
        dadosCursoJSON.message = message.SUCCESS_REQUEST.message
        dadosCursoJSON.quantidade = dadosCurso.length
        dadosCursoJSON.cursos = dadosCurso
        
        return dadosCursoJSON
    }else{
        return message.ERROR_NOT_FOUND
    }

}

const getCursosById = async function(id){

    let dadosCursoJSON = {}

    if(id == '' || id == undefined || !isNaN(id)){

        let dadosCurso = await cursoDAO.selectCursoById()

        if(dadosCurso){
            dadosCursoJSON.status = message.SUCCESS_REQUEST.status
            dadosCursoJSON.message = message.SUCCESS_REQUEST.message
            dadosCursoJSON.aluno = dadosCurso

            return dadosCursoJSON
        }else{
            return message.ERROR_ID_NOT_FOUND
        }


    }

}

const getCursosByName = async function(nomeCurso){
    let dadosCursoJSON = {}

    if(nomeCurso == '' || nomeCurso == undefined || !isNaN(nomeCurso)){

        let dadosCurso = await cursoDAO.selectCursoByName(nomeCurso)

        if(dadosCurso){
            dadosCursoJSON.status = message.SUCCESS_REQUEST.status
            dadosCursoJSON.message = message.SUCCESS_REQUEST.message
            dadosCursoJSON.quantidade = dadosCurso.length
            dadosCursoJSON.aluno = dadosCurso

            return dadosCursoJSON

        }else{
            return false
        }
    }
}

const inserirCurso = async function(dadosCurso){

    let dadosCursoJSON = {}

    if(dadosCurso.nome == ''            || dadosCurso.nome == undefined             ||      dadosCurso.nome.length > 70      || !isNaN(dadosCurso.nome)              ||
       dadosCurso.sigla == ''           || dadosCurso.sigla == undefined            ||      dadosCurso.sigla.length > 20     || !isNaN(dadosCurso.sigla)             ||
       dadosCurso.carga_horaria == ''   || dadosCurso.carga_horaria == undefined    ||      isNaN(dadosCurso.carga_horaria)                                          ||
       dadosCurso.descricao == ''       || dadosCurso.descricao == undefined        ||      !isNaN(dadosCurso.descricao) ){

        return message.ERROR_INVALID_NAME
       }else{
         let resultadoCurso = await cursoDAO.insertCurso(dadosCurso)

        if(resultadoCurso){

            let novoCurso = await cursoDAO.selectLastId()

            dadosCursoJSON.status = message.SUCCESS_CREATE_ITEM.status
            dadosCursoJSON.message = message.SUCCESS_CREATE_ITEM.message
            dadosCurso.cursoInserido = novoCurso

            return dadosCursoJSON
        }else{
            return message.ERROR_INTERNAL_SERVER
        }
       }

}

const updateCurso = async function(dadosCurso, idCurso){

    let dadosCursoJSON = {}

    if(dadosCurso.nome == ''            || dadosCurso.nome == undefined             ||      dadosCurso.nome.length > 70      || !isNaN(dadosCurso.nome)              ||
       dadosCurso.sigla == ''           || dadosCurso.sigla == undefined            ||      dadosCurso.sigla.length > 20     || !isNaN(dadosCurso.sigla)             ||
       dadosCurso.carga_horaria == ''   || dadosCurso.carga_horaria == undefined    ||      isNaN(dadosCurso.carga_horaria)                                          ||
       dadosCurso.descricao == ''       || dadosCurso.descricao == undefined        ||      !isNaN(dadosCurso.descricao) ){

        return message.ERROR_INVALID_NAME
       }else{

            if(id == '' || id == undefined || !isNaN(id)){
                return message.ERROR_INVALID_ID
            }else{
                

                let resultadoCurso = await cursoDAO.updateCurso(dadosCurso)

            if(resultadoCurso){

                let cursoAtualizado = await cursoDAO.selectCursoById(idCurso)

                dadosCursoJSON.status = message.SUCCESS_UPDATE_ITEM.status
                dadosCursoJSON.message = message.SUCCESS_UPDATE_ITEM.message
                dadosCursoJSON.cursoAtualizado = cursoAtualizado

                return dadosCursoJSON
            }else{
                return message.ERROR_INTERNAL_SERVER
            }    
          }
       }
}

const deletarCurso = async function(id){

    let dadosCursoJSON = {}

    if(id == '' || id == undefined || !isNaN(id)){
        return message.ERROR_INVALID_ID
    }else{
        let cursoDeletado = await cursoDAO.selectCursoById(id)
        let resultadoCurso = await cursoDAO.deleteCurso(id)

        if(resultadoCurso){
            dadosCursoJSON.status = message.SUCCESS_DELETE_ITEM.status
            dadosCursoJSON.message = message.SUCCESS_DELETE_ITEM.message
            dadosCursoJSON.cursoDeletado = cursoDeletado

            return dadosCursoJSON
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