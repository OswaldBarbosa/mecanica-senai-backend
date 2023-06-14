/***************************************************************************************
* Objetivo: Arquivo de conexão com o banco de dados para a tabela de turma matricula
* Data: 23/05/2023
* Autor: Vinícius Monteiro  
* Versão: 1.0
***************************************************************************************/

//Importa biblioteca do cliente do prisma
var { PrismaClient } = require('@prisma/client')

//criando instância do prisma
var prisma = new PrismaClient()

const selectAllTurmaMatricula = async function () {

    let sql = `select * from tbl_turma_matricula`

    let resultadoTurmaMatricula = await prisma.$queryRawUnsafe(sql)

    if (resultadoTurmaMatricula.length > 0) {
        return resultadoTurmaMatricula
    } else {
        return false
    }

}

const selectTurmaMatriculaById = async function (idTurmaMatricula) {

    let sql = `select * from tbl_turma_matricula where id = ${idTurmaMatricula}`

    let resultadoTurmaMatricula = await prisma.$queryRawUnsafe(sql)

    if (resultadoTurmaMatricula.length > 0) {
        return resultadoTurmaMatricula
    } else {
        return false
    }

}

const insertTurmaMatricula = async function (dadosTurmaMatricula) {

    let sql = `insert into tbl_turma_matricula (
        id_turma,
        id_matricula
        ) values (
        '${dadosTurmaMatricula.id_turma}',
        '${dadosTurmaMatricula.id_matricula}'
        )`

    let resultadoTurmaMatricula = await prisma.$executeRawUnsafee(sql)

    if (resultadoTurmaMatricula) {
        return true
    } else {
        return false
    }

}

const updateTurmaMatricula = async function (dadosTurmaMatricula) {

    let sql = `update tbl_turma_matricula set
               id_turma = '${dadosTurmaMatricula.id_turma}',
               id_matricula = '${dadosTurmaMatricula.id_matricula}'
               where id = '${dadosTurmaMatricula.id}'`

    let resultadoTurmaMatricula = await prisma.$executeRawUnsafee(sql)

    if (resultadoTurmaMatricula) {
        return true
    } else {
        return false
    }

}

const deleteTurmaMatricula = async function (idTurmaMatricula) {

    let sql = `delete tbl_turma_matricula where id = ${idTurmaMatricula}`

    let resultadoTurmaMatricula = await prisma.$queryRawUnsafe(sql)

    if (resultadoTurmaMatricula) {
        return true
    } else {
        return false
    }
}

const selectLastId = async function () {

    let sql = `select * from tbl_turma_matricula order by id desc limit 1`

    let resultadoTurmaMatricula = await prisma.$queryRawUnsafe(sql)

    if (resultadoTurmaMatricula.length > 0) {
        return resultadoTurmaMatricula
    } else {
        return false
    }

}

module.exports = {
    selectAllTurmaMatricula,
    selectTurmaMatriculaById,
    insertTurmaMatricula,
    updateTurmaMatricula,
    deleteTurmaMatricula,
    selectLastId
}