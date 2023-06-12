/***************************************************************************************
* Objetivo: Arquivo de conexão com o banco de dados para a tabela de criterio_tipo
* Data: 23/05/2023
* Autor: Vinícius Monteiro
* Versão: 1.0
***************************************************************************************/

//Importa a biblioteca do cliente do prisma
var { PrismaClient } = require('@prisma/client')
const { response } = require('express')

//Criando a instancia do prisma 
var prisma = new PrismaClient()

const selectAllResultadoTarefa = async function(){

    let sql = `select * from tbl_resultado_tarefa`

    let resultadoResultadoTarefa = await prisma.$queryRawUnsafe(sql)

    if(resultadoResultadoTarefa.length > 0)
        return resultadoResultadoTarefa
    else
        return false
}

const selectResultadoTarefaById = async function(idResultadoTarefa){

    let sql = `select * from tbl_resultado_tarefa where id = ${idResultadoTarefa}`

    let resultadoResultadoTarefa = await prisma.$queryRawUnsafe(sql)

    if(resultadoResultadoTarefa.length > 0)
        return resultadoResultadoTarefa
    else
        return false

}

const insertResultadoTarefa = async function(dadosResultadoTarefa){

    let sql = `insert into tbl_resultado_tarefa(
                                                obtido,
                                                resposta_aluno,
                                                id_matricula_tarefa_criterio
                                                )values(
                                                '${dadosResultadoTarefa.obtido}',
                                                '${dadosResultadoTarefa.resposta_aluno}',
                                                '${dadosResultadoTarefa.id_matricula_tarefa_criterio}'
                                                )`

    let resultadoResultadoTarefa = await prisma.$executeRawUnsafe(sql)

    if(resultadoResultadoTarefa)
        return true
    else
        return false
}

const updateResultadoTarefa = async function(dadosResultadoTarefa){

    let sql = `update tbl_resultado_tarefa(
                                            obtido = '${dadosResultadoTarefa.obtido}',
                                            resposta_aluno = '${dadosResultadoTarefa.resposta_aluno}'
                                            id_matricula_tarefa_criterio = '${dadosResultadoTarefa.id_matricula_tarefa_criterio}'

                                            where id = ${dadosResultadoTarefa.id}
                                            )`

    let resultadoResultadoTarefa = await prisma.$executeRawUnsafe(sql)

    if(resultadoResultadoTarefa)
        return true
    else
        return false
}

const deleteResultadoTarefa = async function(idResultadoTarefa){

    let sql = `delete from tbl_resultado_tarefa where id = ${idResultadoTarefa}`

    let resultadoResultadoTarefa = await prisma.$executeRawUnsafe(sql)

    if(resultadoResultadoTarefa)
        return true
    else
        return false
}

const selectLastId = async function(){

    let sql = `select * from tbl_resultado_tarefa order by id desc limit 1`

    let resultadoResultadoTarefa = await prisma.$queryRawUnsafe(sql)

    if(resultadoResultadoTarefa.length > 0)
        return resultadoResultadoTarefa
    else
        return false
}

module.exports = {
    selectLastId,
    selectAllResultadoTarefa,
    selectResultadoTarefaById,
    insertResultadoTarefa,
    updateResultadoTarefa,
    deleteResultadoTarefa
}