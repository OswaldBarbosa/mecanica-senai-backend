/***************************************************************************************
* Objetivo: Controller para controlar curso
* Data: 23/05/2023
* Autor: Vinícius Monteiro
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
        dadosCursoJSON.cursos = dadosCurso
        
        return dadosCursoJSON
    }else{
        return message.ERROR_NOT_FOUND
    }

}

const getCursosById = async function(id){

    let dadosCursoJSON = {}

    if(id == '' || id == undefined || !isNaN(id)){

    }

}

const getCursosByName = async function(){

}

const inserirCurso = async function(){

}

const updateCurso = async function(){

}

const deletarCurso = async function(){
    
}

