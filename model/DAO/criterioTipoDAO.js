/***************************************************************************************
* Objetivo: Arquivo de conexão com o banco de dados para a tabela de criterio_tipo
* Data: 23/05/2023
* Autor: Vinícius Monteiro
* Versão: 1.0
***************************************************************************************/

//Importa a biblioteca do cliente do prisma
var { PrismaClient } = require('@prisma/client')

//Criando a instancia do prisma 
var prisma = new PrismaClient()

const selectAllCriterioTipo = async function(){

    let sql = `select* from tbl_criterio_tipo`

    let resultadoCriterioTipo = await prisma.$queryRawUnsafe(sql)

    if(resultadoCriterioTipo.length > 0)
        return resultadoCriterioTipo
    else
        return false
}

const selectCriterioTipoById = async function(idCriterioTipo){
     
    let sql = `select * from tbl_criteiro where id = ${idCriterioTipo}` 

    let resultadoCriterioTipo = await prisma.$queryRawUnsafe(sql)

    if(resultadoCriterioTipo.length > 0)
        return resultadoCriterioTipo
    else
        return false
}

const selectCriterioTipoByName = async function(nomeCriterioTipo){

    let sql = `select * from tbl_criterio where nome like '%${nomeCriterioTipo}%'`

    let resultadoCriterioTipo = await prisma.$executeRawUnsafe(sql)

    if(resultadoCriterioTipo.length > 0)
        return resultadoCriterioTipo
    else
        return false
}

const insertCriterioTipo = async function(dadosCriterioTipo){

    let sql = `insert into tbl_criterio_tipo(
                                            nome
                                            )values(
                                            '${dadosCriterioTipo.nome}'
                                            )`

    let resultadoCriterioTipo = await prisma.$queryRawUnsafe(sql)

    if(resultadoCriterioTipo)
        return true
    else
        return false
}

const updateCriterioTipo = async function(dadosCriterioTipo){
    let sql = `update tbl_criterio_tipo set
                        nome = '${dadosCriterioTipo.nome}'`

    let resultadoCriterioTipo = await prisma.$executeRawUnsafe(sql)

    if(resultadoCriterioTipo)
        return true
    else
        return false
}

const deleteCriterioTipo = async function(idCriterioTipo){

    let sql = `delete from tbl_criterio_tipo where id = ${idCriterioTipo}`

    let resultadoCriterioTipo = await prisma.$executeRawUnsafe(sql)

    if(resultadoCriterioTipo)
        return true
    else
        return false
}

const selectLastId = async function(){

    let sql = `select * from tbl_criterio_tipo order by id desc limit 1`

    let resultadoCriterioTipo = await prisma.$queryRawUnsafe(sql)

    if(resultadoCriterioTipo > 0)
        return resultadoCriterioTipo
    else
        return false
}

module.exports = {

    selectAllCriterioTipo,
    selectCriterioTipoById,
    selectCriterioTipoByName,
    selectLastId,
    insertCriterioTipo,
    updateCriterioTipo,
    deleteCriterioTipo
    
}