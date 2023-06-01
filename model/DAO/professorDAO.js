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
const insertProfessor = async function (dadosProfessor) {

    //script para inserir un novo professor
    let sql = `insert into tbl_professor (
        nome,
        data_nascimento,
        id_usuario
        ) values (
        '${dadosProfessor.nome}',
        '${dadosProfessor.data_nascimento}',
        '${dadosProfessor.id_usuario}'
        )`

    //executa o script sql no banco de dados
    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }

}

//Atualiza os dados de um professor do banco de dados
const updateProfessor = async function (dadosProfessor) {

}

//Deleta o professor do banco de dados
const deleteProfessor = async function (id) {

}

//Seleciona todos os professores dentro do banco de dados
const selectAllProfessores = async function () {

}

//Seleciona um professor específico dentro do banco de dados usando o id
const selectProfessoreById = async function (id) {

}

//Seleciona um professor específico dentro do banco de dados usando o nome
const selectProfessoreByName = async function (nomeProfessor) {

}

const selectLastId = async () => {

    //script para pegar o ultimo ID inserido na tabela de alunos
    let sql = `select * from tbl_professor order by id desc limit 1;`

    //executa o script sql no banco de dados
    let resultStatus = await prisma.$queryRawUnsafe(sql)

    if (resultStatus.length > 0) {
        return true
    } else {
        return false
    }

}

module.exports = {
    insertProfessor,
    selectLastId
}