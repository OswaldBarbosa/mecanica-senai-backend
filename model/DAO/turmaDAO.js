/***************************************************************************************
* Objetivo: Arquivo de conexão com o banco de dados para a tabela de matéria
* Data: 23/05/2023
* Autor: Vinícius Monteiro  
* Versão: 1.0
***************************************************************************************/

//Importa biblioteca do cliente do prisma
var { PrismaClient } = require('@prisma/client')

//criando instância do prisma
var prisma = new PrismaClient()

const selectAllTurmas = async function () {

    let sql = `select * from tbl_turma`

    let resultadoTurma = await prisma.$queryRawUnsafe(sql)

    if (resultadoTurma.length > 0) {
        return resultadoTurma
    } else {
        return false
    }

}

const selectTurmasById = async function (idTurma) {

    let sql = `select * from tbl_turma where id = ${idTurma}`

    let resultadoTurma = await prisma.$queryRawUnsafe(sql)

    if (resultadoTurma.length > 0) {
        return resultadoTurma
    } else {
        return false
    }

}

const selectTurmasBySigla = async function (siglaTurma) {

    let sql = `select * from tbl_turma sigla = ${siglaTurma}`

    let resultadoTurma = await  prisma.$queryRawUnsafe(sql)

    if (resultadoTurma.length > 0) {
        return resultadoTurma
    } else {
        return false
    }

}

const selectMatriculaByNome = async function (nomeTurma) {

    let sql = `select * from tbl_turma where ${nomeTurma}`

    let resultadoTurma = await prisma.$queryRawUnsafe(sql)

    if (resultadoTurma.length > 0) {
        return resultadoTurma
    } else {
        return false
    }

}

const insertTurma = async function (dadosTurma) {
    
    let sql = `insert into tbl_turma (
		nome,
        sigla,
        id_periodo,
        id_curso,
        id_professor_materia
        ) values (
        '${dadosTurma.nome}',
        '${dadosTurma.sigla}',
        '${dadosTurma.id_periodo}',
        '${dadosTurma.id_curso}',
        '${dadosTurma.id_professor_materia}'
        );`

    let resultadoTurma = await prisma.$executeRawUnsafe(sql)

    if (resultadoTurma) {
        return true
    } else {
        return false
    }

}

const updateTurma = async function (dadosTurma) {

    let sql = `update tbl_turma set
               nome = '${dadosTurma.nome}',
               sigla = '${dadosTurma.sigla}',
               id_periodo = '${dadosTurma.id_periodo}',
               id_curso = '${dadosTurma.id_curso}',
               id_professor_materia = ${dadosTurma.id_professor_materia}
               where id = '${dadosTurma.id}`
 
    let resultadoTurma = await prisma.$executeRawUnsafe(sql)

    if (resultadoTurma) {
        return true
    } else {
        return false
    }

}

const deleteTurma = async function (idTurma) {

    let sql = `delete tbl_turma where id = ${idTurma}`

    let resultadoTurma = await prisma.$queryRawUnsafe(sql)

    if (resultadoTurma) {
        return true
    } else {
        return false
    }

}

const selectLastId = async function () {

    let sql = `select * tbl_turma order by id desc limit 1`

    let resultadoTurma = await prisma.$queryRawUnsafe(sql)

    if (resultadoTurma.length > 0) {
        return resultadoTurma
    } else {
        return false
    }

}

module.exports = {
    selectAllTurmas,
    selectTurmasById,
    selectTurmasBySigla,
    selectMatriculaByNome,
    insertTurma,
    updateTurma,
    deleteTurma,
    selectLastId
}