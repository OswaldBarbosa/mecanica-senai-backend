/***************************************************************************************
* Objetivo: Arquivo de conexão com o banco de dados para a tabela de usuario_tipo
* Data: 23/05/2023
* Autor: Vinícius Monteiro
* Versão: 1.0
***************************************************************************************/

//Importa a biblioteca do cliente do prisma
var { PrismaClient } = require('@prisma/client')

//Criando a instancia do prisma 
var prisma = new PrismaClient()

const selectAllUsuarioTipo = async function() {

    let sql = `select * from tbl_usuario_tipo`

    let resutadoUsuarioTipo = await prisma.$queryRawUnsafe(sql)

    if(resutadoUsuarioTipo.length > 0)
        return resutadoUsuarioTipo
    else
        return false
}

const selectUsuarioTipoById = async function(idUsuarioTipo){

    let sql = `select * from tbl_usuario_tipo where id = ${idUsuarioTipo}`

    let resutadoUsuarioTipo = await prisma.$queryRawUnsafe(sql)

    if(resutadoUsuarioTipo.length > 0)
        return resutadoUsuarioTipo
    else
        return false
}

const selectUsuarioTipoByName = async function(nomeUsuarioTipo){

    let sql = `select * from tbl_usuario_tipo where id = ${nomeUsuarioTipo}`

    let resutadoUsuarioTipo = await prisma.$queryRawUnsafe(sql)

    if(resutadoUsuarioTipo.length > 0)
        return resutadoUsuarioTipo
    else
        return false
}

const insertUsuarioTipo = async function(dadosUsuarioTipo){

    let sql = `insert into tbl_usuario_tipo(
                                        nome
                                        )values(
                                        '${dadosUsuarioTipo.nome}'
                                        )`;

    let resutadoUsuarioTipo = await prisma.$queryRawUnsafe(sql)

    if(resutadoUsuarioTipo)
        return true
    else
        return false
}

const updateUsuarioTipo = async function(dadosUsuarioTipo){

    let sql = `update tbl_usuario_tipo set
                            nome = '${dadosUsuarioTipo.nome}'
                            
                            where id = ${dadosUsuarioTipo.id}`
    
    let resutadoUsuarioTipo = await prisma.$queryRawUnsafe(sql)

    if(resutadoUsuarioTipo)
        return true
    else
        return false
}

const deleteUsuarioTipo = async function(idUsuarioTipo){

    let sql = `delete from tbl_usuario_tipo where id = ${idUsuarioTipo}`

    let resutadoUsuarioTipo = await prisma.$queryRawUnsafe(sql)

    if(resutadoUsuarioTipo)
        return true
    else
        return false

}

const selectLastId = async function(idUsuarioTipo){

    let sql = `select * from tbl_usuario_tipo order by id desc limit 1`

    let resutadoUsuarioTipo = await prisma.$queryRawUnsafe(sql)

    if(resutadoUsuarioTipo > 0)
        return resutadoUsuarioTipo
    else
        return false
}

module.exports = {

    selectAllUsuarioTipo,
    selectLastId,
    selectUsuarioTipoById,
    selectUsuarioTipoByName,
    updateUsuarioTipo,
    insertUsuarioTipo,
    deleteUsuarioTipo
}