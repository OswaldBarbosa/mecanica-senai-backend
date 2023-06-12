/***************************************************************************************
* Objetivo: Arquivo de conexão com o banco de dados para a tabela de periodo
* Data: 23/05/2023
* Autor: Vinícius Monteiro
* Versão: 1.0
***************************************************************************************/

//Importa a biblioteca do cliente do prisma
var { PrismaClient } = require('@prisma/client')

//Criando a instancia do prisma 
var prisma = new PrismaClient()

const selectAllPeriodos = async function () {

    let sql = `select * from tbl_periodo`

    let resultadoPeriodo = await prisma.$queryRawUnsafe(sql)

    if (resultadoPeriodo.length > 0) {
        return resultadoPeriodo
    } else {
        return false
    }

}

const selectPeriodoById = async function (idPeriodo) {

    let sql = `select * from tbl_periodo where id = ${idPeriodo}`

    let resultadoPeriodo = await prisma.$queryRawUnsafe(sql)

    if (resultadoPeriodo.length > 0) {
        return resultadoPeriodo
    } else {
        return false
    }

}

const selectPeriodoByName = async function (nomePeriodo) {

    let sql = `select * from tbl_periodo where nome like '%${nomePeriodo}%'`

    let resultadoPeriodo = await prisma.$queryRawUnsafe(sql)

    if (resultadoPeriodo.length > 0) {
        return resultadoPeriodo
    } else {
        return false
    }
    
}

const insertPeriodo = async function (dadosPeriodo) {

    let sql = `insert into tbl_periodo (
        nome 
        ) values (
        '${dadosPeriodo.nome}'
        )
        `

    console.log(sql);
    

    let resultadoPeriodo = await prisma.$executeRawUnsafe(sql)

    if (resultadoPeriodo)
        return true
    else
        return false
}

const updatePeriodo = async function (dadosPeriodo) {

    let sql = `update tbl_periodo set 
                        nome = '${dadosPeriodo.dadosPeriodo}'
                        
                        where id = ${dadosPeriodo.id}`

    let resultadoPeriodo = await prisma.$executeRawUnsafe(sql)

    if (resultadoPeriodo)
        return true
    else
        return false
}

const deletePeriodo = async function (idPeriodo) {

    let sql = `delete from tbl_periodo where id = ${idPeriodo}`

    let resultadoPeriodo = await prisma.$executeRawUnsafe(sql)

    if (resultadoPeriodo)
        return true
    else
        return false


}

const selectLastId = async function () {

    let sql = `select * from tbl_periodo order by id desc limit 1`

    let resultadoPeriodo = await prisma.$queryRawUnsafe(sql)

    if (resultadoPeriodo)
        return resultadoPeriodo
    else
        return false
}


module.exports = {
    selectAllPeriodos,
    selectLastId,
    selectPeriodoById,
    selectPeriodoByName,
    insertPeriodo,
    updatePeriodo,
    deletePeriodo
}