/***************************************************************************************
* Objetivo: Arquivo de conexão com o banco de dados para a tabela de aluno
* Data: 23/05/2023
* Autor: Vinícius Monteiro  
* Versão: 1.0
***************************************************************************************/

//Importa biblioteca do cliente do prisma
var { PrismaClient } = require('@prisma/client')

//Criando instância do prisma
var prisma = new PrismaClient()

//seleciona todos os alunos dentro do banco de dados
const selectAllAlunos = async function () {

    let sql = `select * from tbl_aluno`

    let resultadoAluno = await prisma.$queryRawUnsafe(sql)

    if (resultadoAluno.length > 0) {
        return resultadoAluno
    } else {
        return false
    }

}

//Seleciona um professor específico dentro do banco de dados usando o id
const selectAlunoById = async function (idAluno) {

    let sql = `select * from tbl_aluno where id = ${idAluno}`

    let resultadoAluno = await prisma.$queryRawUnsafe(sql)

    if (resultadoAluno.length > 0) {
        return resultadoAluno
    } else {
        return false
    }
}

//Seleciona um professor específico dentro do banco de dados usando o nome
const selectAlunoByName = async function (nomeAluno) {

    const sql = `select * from tbl_aluno where nome like '%${nomeAluno}%'`

    const resultadoAluno = await prisma.$queryRawUnsafe(sql)

    if (resultadoAluno.length > 0) {
        return resultadoAluno
    } else {
        return false
    }

}

//Insere dados professor dentro do banco de dados
const insertAluno = async function (dadosAluno) {

    let sql = `insert into tbl_aluno (
        nome,
        rg,
        cpf,
        data_nascimento
        ) values (
        '${dadosAluno.nome}',
        '${dadosAluno.rg}',
        '${dadosAluno.cpf}',
        '${dadosAluno.data_nascimento}'
        );`

    

    let resultadoAluno = await prisma.$executeRawUnsafe(sql)

    if (resultadoAluno) {
        return true
    } else {
        return false
    }

}

//Atualiza os dados de um professor do banco de dados
const updateAluno = async function (dadosAluno) {

    let sql = ` update tbl_aluno set 
                nome = '${dadosAluno.nome}',
                rg = '${dadosAluno.rg}',
                cpf = '${dadosAluno.cpf}',
                data_nascimento = '${dadosAluno.data_nascimento}'
                where id = '${dadosAluno.id}'`

    let resultadoAluno = await prisma.$executeRawUnsafe(sql)

    

    if (resultadoAluno) {
        return true
    } else {
        return false
    }

}

//Deleta o professor do banco de dados
const deleteAluno = async function (idAluno) {

    let sql = `delete from tbl_aluno where id = ${idAluno}`

    let resultadoAluno = await prisma.$queryRawUnsafe(sql)

    if (resultadoAluno) {
        return true
    } else {
        return false
    }

}

const selectLastId = async function () {

    let sql = `select * from tbl_aluno order by id desc limit 1;`

    let resultadoAluno = await prisma.$queryRawUnsafe(sql)

    if (resultadoAluno.length > 0) {
        return resultadoAluno
    } else {
        return false
    }
}

module.exports = {
    selectAllAlunos,
    selectAlunoById,
    selectAlunoByName,
    insertAluno,
    updateAluno,
    deleteAluno,
    selectLastId
}