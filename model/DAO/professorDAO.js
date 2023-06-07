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
const selectAllProfessores = async function () {

    let sql = `select tbl_professor.id, tbl_professor.nome, tbl_professor.data_nascimento,
                      tbl_usuario.email, tbl_usuario.senha
    
                      from tbl_professor
                           inner join tbl_usuario
                                 on tbl_usuario.id = tbl_professor.id_usuario;`

    let resultadoProfessor = await prisma.$queryRawUnsafe(sql)

    if (resultadoProfessor.length > 0) {
        return resultadoProfessor
    } else {
        return false
    }

}

//Seleciona um professor específico dentro do banco de dados usando o id
const selectProfessoreById = async function (idProfessor) {

    let sql = `select tbl_professor.id, tbl_professor.nome, tbl_professor.data_nascimento,
	                  tbl_usuario.email, tbl_usuario.senha
    
                      from tbl_professor
                           inner join tbl_usuario
                                 on tbl_usuario.id = tbl_professor.id_usuario where tbl_professor.id = ${idProfessor};`
    
    let resultadoProfessor = await prisma.$queryRawUnsafe(sql)    

    if (resultadoProfessor.length > 0) {
        return resultadoProfessor
    } else {
        return false
    }

}

//Seleciona um professor específico dentro do banco de dados usando o nome
const selectProfessoreByName = async function (nomeProfessor) {

    let sql = `select tbl_professor.id, tbl_professor.nome, tbl_professor.data_nascimento,
                      tbl_usuario.email, tbl_usuario.senha

                      from tbl_professor
                           inner join tbl_usuario
                                 on tbl_usuario.id = tbl_professor.id_usuario where tbl_professor.nome like '%${nomeProfessor}%';`
    
    let resultadoProfessor = await prisma.$queryRawUnsafe(sql)    

    if (resultadoProfessor.length > 0) {
        return resultadoProfessor
    } else {
        return false
    }

}

//Insere dados professor dentro do banco de dados
const insertProfessor = async function (dadosProfessor) {

    //script para inserir un novo professor
    let sql = `insert into tbl_professor (
        nome,
        data_nascimento,
        nif,
        id_usuario
        ) values (
        '${dadosProfessor.nome}',
        '${dadosProfessor.data_nascimento}',
        '${dadosProfessor.nif}',
        '${dadosProfessor.id_usuario}'
        )`

    //executa o script sql no banco de dados
    let resultadoProfessor = await prisma.$executeRawUnsafe(sql)

    if (resultadoProfessor) {
        return true
    } else {
        return false
    }

}

//Atualiza os dados de um professor do banco de dados
const updateProfessor = async function (dadosProfessor) {

    //script para atualizar professor
    let sql = `update tbl_professor set
               nome = '${dadosProfessor.nome}',
               data_nascimento = '${dadosProfessor.data_nascimento}',
               nif = '${dadosProfessor.nif}',
               id_usuario = '${dadosProfessor.id_usuario}'
               where id = '${dadosProfessor.id}'
               `
    //executa o script sql no banco de dados
    let resultadoProfessor = await prisma.$executeRawUnsafe(sql)

    if (resultadoProfessor) {
        return true
    } else {
        return false
    }

}

//Deleta o professor do banco de dados
const deleteProfessor = async function (idProfessor) {

    let sql = `delete from tbl_professor where id = ${idProfessor}`

    let resultadoProfessor = await prisma.$queryRawUnsafe(sql)

    if (resultadoProfessor) {
        return true
    } else {
        return false
    }

}

const selectLastId = async () => {

    //script para pegar o ultimo ID inserido na tabela de alunos
    let sql = `select * from tbl_professor order by id desc limit 1 ;`

    //executa o script sql no banco de dados
    let resultStatus = await prisma.$queryRawUnsafe(sql)

    if (resultStatus.length > 0) {
        return resultStatus
    } else {
        return false
    }

}

module.exports = {
    selectAllProfessores,
    selectProfessoreById,
    selectProfessoreByName,
    insertProfessor,
    updateProfessor,
    deleteProfessor,
    selectLastId
}