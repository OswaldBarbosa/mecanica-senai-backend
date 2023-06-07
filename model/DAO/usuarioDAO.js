/***************************************************************************************
* Objetivo: Arquivo de conexão com o banco de dados para a tabela de professor
* Data: 23/05/2023
* Autor: André Luiz e Oswaldo Barbosa
* Versão: 1.0
***************************************************************************************/

//Importa biblioteca do cliente do prisma
var { PrismaClient } = require('@prisma/client')

//Criando instância do prisma
var prisma = new PrismaClient()

//Seleciona todos os professores dentro do banco de dados
const selectAllUsuario = async function () {

    let sql = `select tbl_usuario.id, tbl_usuario.email, tbl_usuario.senha,
                      tbl_usuario_tipo.tipo
            
                      from tbl_usuario
                           inner join tbl_usuario_tipo
                                 on tbl_usuario_tipo.id = tbl_usuario.id_usuario_tipo;`

    let resultadoUsuario = await prisma.$queryRawUnsafe(sql)

    if (resultadoUsuario.length > 0) {
        return resultadoUsuario
    } else {
        return false
    }

}

//Seleciona um professor específico dentro do banco de dados usando o id
const selectUsuarioById = async function (idUsuario) {

    let sql = `select tbl_usuario.email, tbl_usuario.senha,
                      tbl_usuario_tipo.tipo

                      from tbl_usuario
                           inner join tbl_usuario_tipo
                                 on tbl_usuario_tipo.id = tbl_usuario.id_usuario_tipo where tbl_usuario.id = ${idUsuario}`

    let resultadoUsuario = await prisma.$queryRawUnsafe(sql)

    if (resultadoUsuario.length > 0) {
        return resultadoUsuario
    } else {
        return false
    }

}

//Insere dados professor dentro do banco de dados
const insertUsuario = async function (dadosUsuario) {

    //script para inserir un novo usuario
    let sql = ` insert into tbl_usuario (
        email,
        senha,
        id_usuario_tipo
        ) values (
        '${dadosUsuario.email}',
        '${dadosUsuario.senha}',
        '${dadosUsuario.id_usuario_tipo}'
        );
        `

    //executa o script sql no banco de dados
    let resultadoUsuario = await prisma.$executeRawUnsafe(sql)

    if (resultadoUsuario) {
        return true
    } else {
        return false
    }

}

//Atualiza os dados de um professor do banco de dados
const updateUsuario = async function (dadosUsuario) {

    //script para atualizar usuario
    let sql = `update tbl_usuario set
               email = '${dadosUsuario.email}',
               senha = '${dadosUsuario.senha}',
               id_usuario_tipo = '${dadosUsuario.id_usuario_tipo}'
               where id = '${dadosUsuario.id}'`

    //executa o script sql no banco de dados
    let resultadoUsuario = await prisma.$executeRawUnsafe(sql)

    if (resultadoUsuario) {
        return true
    } else {
        return false
    }

}

//Deleta o professor do banco de dados
const deleteUsuario = async function (idUsuario) {

    let sql = `delete from tbl_usuario where id = ${idUsuario}`

    let resultadoUsuario = await prisma.$executeRawUnsafe(sql)

    if (resultadoUsuario) {
        return true
    } else {
        return false
    }

}

const selectLastId = async function () {

    //script para pegar o ultimo ID inserido na tabela de alunos
    let sql = `select * from tbl_usuario order by id desc limit 1;`

    //executa o script sql no banco de dados
    let resultStatus = await prisma.$queryRawUnsafe(sql)

    if (resultStatus.length > 0) {
        return resultStatus
    } else {
        return false
    }
}

module.exports = {
    selectAllUsuario,
    selectUsuarioById,
    insertUsuario,
    updateUsuario,
    deleteUsuario,
    selectLastId
}