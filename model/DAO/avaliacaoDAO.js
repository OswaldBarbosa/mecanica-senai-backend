/***************************************************************************************
* Objetivo: Arquivo de conexão com o banco de dados para a tabela de avaliação
* Data: 23/05/2023
* Autor: Vinícius Monteiro
* Versão: 1.0
***************************************************************************************/

//Importa biblioteca do cliente do prisma
var { PrismaClient } = require('@prisma/client')

//Criando instância do prisma
var prisma = new PrismaClient()

const selectAllAvaliacoes = async function(){

    let sql = `select * from tbl_avaliacao`

    let resultadoAvaliacao = await prisma.$queryRawUnsafe(sql)

    if(resultadoAvaliacao.length > 0)
        return resultadoAvaliacao
    else
        return false
}

const selectAvaliacaoById = async function(idAvaliacao){

    
    let sql = `select * from tbl_avaliacao where id = ${idAvaliacao}`

    let resultadoAvaliacao = await prisma.$queryRawUnsafe(sql)

    if(resultadoAvaliacao.length > 0)
        return resultadoAvaliacao
    else
        return false
}

const insertAvaliacao = async function(dadosAvaliacao){

    let sql = `insert into tbl_avaliacao
                                    (
                                        resposta_professor,
                                        id_resultado_tarefa
                                    )values(
                                        '${dadosAvaliacao.resposta_professor}',
                                        ${id_resultado_tarefa}
                                    )`

    let resultadoAvaliacao = await prisma.$executeRawUnsafe(sql)

    if(resultadoAvaliacao)
        return true
    else
        return false
}

const updateAvaliacao = async function(dadosAvaliacao){

    let sql = `update tbl_avaliacao set
                    resposta_professor = '${dadosAvaliacao.resposta_professor}',
                    id_resultado_tarefa = ${id_resultado_tarefa}
                    
                    where id = ${dadosAvaliacao.id}`

    let resultadoAvaliacao = await prisma.$executeRawUnsafe(sql)

    if(resultadoAvaliacao)
        return true
    else
        return false

}

const deleteAvaliacao = async function(idAvaliacao){

    let sql = `delete from tbl_avaliacao where id = ${idAvaliacao}`

    let resultadoAvaliacao = await prisma.$executeRawUnsafe(sql)

    if(resultadoAvaliacao)
        return true
    else
        return false
}

const selectLastId = async function(){

    let sql = `select * from tbl_avaliacao ordem by id desc limit 1`

    let resultadoAvaliacao = await prisma.$queryRawUnsafe(sql)

    if(resultadoAvaliacao)
        return resultadoAvaliacao
    else
        return false

}

module.exports = {

    selectAllAvaliacoes,
    selectAvaliacaoById,
    selectLastId,
    insertAvaliacao,
    deleteAvaliacao,
    updateAvaliacao
    
}