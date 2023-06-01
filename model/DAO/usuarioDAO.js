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

//Insere dados professor dentro do banco de dados
const insertUsuario = async function (dadosUsuario) {

    let sql = ` insert into tbl_usuario (
                            email,
                            senha,
                            id_tipo_usuario
                            ) values (
                            '${dadosUsuario.email}',
                            '${dadosUsuario.senha}',
                            '${dadosUsuario.tipo}'
                            );
                            `

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }

}

//Atualiza os dados de um professor do banco de dados
const updateUsuario = async function (dadosUsuario) {

}

//Deleta o professor do banco de dados
const deleteUsuario = async function (id) {

}

//Seleciona todos os professores dentro do banco de dados
const selectAllUsuario = async function () {

}

//Seleciona um professor específico dentro do banco de dados usando o id
const selectUsuarioById = async function (id) {

}

//Seleciona um professor específico dentro do banco de dados usando o nome
const selectUsuarioByName = async function (nomeUsuario) {

}

const selectLastId = async function () {
    //script para pegar o ultimo ID inserido na tabela de alunos
    let sql = `select * from tbl_usuario order by id desc limit 1;`

    //executa o script sql no banco de dados
    let resultStatus = await prisma.$queryRawUnsafe(sql)

    if (resultStatus.length > 0) {
        return true
    } else {
        return false
    }
}

module.exports = {
    insertUsuario,
    selectLastId
}