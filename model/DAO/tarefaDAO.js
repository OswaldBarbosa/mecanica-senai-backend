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

const selectAllTarefas = async function () {

    let sql = `select * from tbl_tarefa`

    let resultadoTarefa = await prisma.$queryRawUnsafe(sql)

    if (resultadoTarefa.length > 0) {
        return resultadoTarefa
    } else {
        return false
    }

}

const selectTarefaById = async function (idTarefa) {

    let sql = `select * from tbl_tarefa where id = ${idTarefa}`

    let resultadoTarefa = await prisma.$queryRawUnsafe(sql)

    if (resultadoTarefa.length > 0) {
        return resultadoTarefa
    } else {
        return false
    }

}

const selectTarefaByNumero = async function (numeroTarefa) {

    let sql = `select * from tbl_tarefa where numero = ${numeroTarefa}`

    let resultadoTarefa = await prisma.$queryRawUnsafe(sql)

    if (resultadoTarefa.length > 0) {
        return resultadoTarefa
    } else {
        return false
    }

}
 
const selectTarefaByNome = async function (nomeTarefa) {

    let sql = `select * from tbl_tarefa where nome like '%${nomeTarefa}%'`

    let resultadoTarefa = await prisma.$queryRawUnsafe(sql)

    if (resultadoTarefa.length > 0) {
        return resultadoTarefa
    } else {    
        return false
    }

}

const insertTarefa = async function (dadosTarefa) {
    
    let sql = `insert into tbl_tarefa (
		nome,
        numero,
        tempo_previsto,
        id_horario
        ) values (
        '${dadosTarefa.nome}',
        '${dadosTarefa.numero}',
        '${dadosTarefa.tempo_previsto}',
        '${dadosTarefa.id_horario}'
        )`
7
    let resultadoTarefa = await prisma.$executeRawUnsafe(sql)

    if (resultadoTarefa) {
        return true
    } else {
        return false
    }

}

const updateTarefa = async function (dadosTarefa) {

    let sql = `update tbl_tarefa set
               nome = '${dadosTarefa.nome}',
               numero = '${dadosTarefa.numero}',
               tempo_previsto = '${dadosTarefa.tempo_previsto}',
               id_horario = '${dadosTarefa.id_horario}'
               where id = '${dadosTarefa.id}'`

    console.log(sql);
 
    let resultadoTarefa = await prisma.$executeRawUnsafe(sql)

    if (resultadoTarefa) {
        return true
    } else {
        return false
    }

}

const deleteTarefa = async function (idTarefa) {

    let sql = `delete from tbl_tarefa where id = ${idTarefa}`

    let resultadoTarefa = await prisma.$queryRawUnsafe(sql)

    if (resultadoTarefa) {
        return true
    } else {
        return false
    }

}

const selectLastId = async function () {

    let sql = `select * from tbl_tarefa order by id desc limit 1 ;`

    let resultadoTarefa = await prisma.$queryRawUnsafe(sql)

    if (resultadoTarefa.length > 0) {
        return resultadoTarefa
    } else {
        return false
    }

}

module.exports = {
    selectAllTarefas,
    selectTarefaById,
    selectTarefaByNumero,
    selectTarefaByNome,
    insertTarefa,
    updateTarefa,
    deleteTarefa,
    selectLastId
}