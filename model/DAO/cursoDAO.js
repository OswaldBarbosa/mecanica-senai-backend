/***************************************************************************************
* Objetivo: Arquivo de conexão com o banco de dados para a tabela de curso
* Data: 23/05/2023
* Autor: Vinícius Monteiro
* Versão: 1.0
***************************************************************************************/

//Import do Prisma
var {PrismaClient} = require('@prisma/client')


//Criação da instancia prisma
var prisma = new PrismaClient()

//DAOS
const selectAllCursos = async function(){

}

const selectCursoById = async function(id){

}

const selectCursoByName = async function(nomeCurso){

}

const selectLastId = async function(){
    
}

const insertCurso = async function(dadosCurso){

}

const updateCurso = async function(dadosCurso){

}

const deleteCurso = async function(id){

}

module.exports = {
    selectAllCursos,
    selectCursoById,
    selectCursoByName,
    insertCurso,
    updateCurso,
    deleteCurso
}