/***************************************************************************************
* Objetivo: Arquivo de conexão com o banco de dados para a tabela de professor
* Data: 23/05/2023
* Autor: Vinícius Monteiro  
* Versão: 1.0
***************************************************************************************/

//Importa biblioteca do cliente do prisma
var { PrismaClient } = require('@prisma/client')

//Criando instância do prisma
var prisma = new PrismaClient()

//Insere dados professor dentro do banco de dados
const insertAluno = async function (dadosAluno) {

    let sql = `insert into tbl_aluno (
        nome,
        data_nascimento,
        ) values (
        '${dadosAluno.nome}',
        '${dadosAluno.data_nascimento}'
        );`

    let resultadoAluno = await prisma.$executeRawUnsafe(sql)

    if (resultadoAluno)
        return resultadoAluno
    else
        return false
}

//Atualiza os dados de um professor do banco de dados
const updateAluno = async function (dadosAluno) {
    let sql = `update tbl_aluno set 
                nome = '${dadosAluno.nome}',
                data_nascimento = '${dadosAluno.data_nascimento}'
                where id = '${dadosAluno.id};'`

    let resultadoAluno = await prisma.$executeRawUnsafe(sql)

    if (resultadoAluno)
        return resultadoAluno
    else
        return false
}

//Deleta o professor do banco de dados
const deleteAluno = async function (id) {

    let sql = `delete from tbl_aluno where id = '${id}'`

    let resultadoAluno = prisma.$executeRawUnsafe(sql)

    if(resultadoAluno)
        resultadoAluno
    else
        false
}

//Seleciona todos os professores dentro do banco de dados
const selectAllAlunos = async function () {

    let sql = `select tbl_aluno.nome, tbl_aluno.data_nascimento,
                                tbl_usuario.email, tbl_usuario.email
                                
                                from tbl_aluno`

    let resultadoAluno = prisma.$executeRawUnsafe(sql)

    if (resultadoAluno.length > 0)
        return resultadoAluno
    else
        return false



}

//Seleciona um professor específico dentro do banco de dados usando o id
const selectAlunoById = async function (id) {

    let sql = `select tbl_aluno.nome, tbl_aluno.data_nascimento,
                            tbl_usuario.email, tbl_usuario.senha

                            from tbl_aluno
                             where id = '${id}'`

    let resultadoAluno = prisma.$executeRawUnsafe(sql)

    if (resultadoAluno.length > 0)
        return resultadoAluno
    else
        return false
}

//Seleciona um professor específico dentro do banco de dados usando o nome
const selectAlunoByName = async function (nomeALuno) {

    const sql = `select tbl_aluno.nome, tbl_aluno.data_nascimento
                where tbl_aluno.nome like '%${nomeALuno}%' `

    const resultadoAluno = prisma.$executeRawUnsafe(sql)

    if(resultadoAluno)
        return resultadoAluno
    else
        return false
}

const selectLastId = async function () {
    let sql = `select * from tbl_aluno order by id desc limit 1;`

    let resultAluno = prisma.$executeRawUnsafe(sql)

    if (resultAluno.length > 0) {
        return resultAluno
    } else {
        return false
    }
}

const selectAlunoByMatricula = async function (matriculaAluno) {

    const sql = `select tbl_matricula.numero,
                        tbl_aluno.nome, tbl_aluno.data_nascimento
                        
                 from tbl_matricula
                    inner join tbl_aluno
                    on tbl_aluno.id = tbl_matricula.id_aluno where tbl_matricula.numero = ${matriculaAluno}`

    const resultadoAluno = prisma.$executeRawUnsafe(sql)

    if (resultadoAluno.length > 0) {
        return resultadoAluno
    } else {
        return false
    }

}

module.exports = {
    insertAluno,
    updateAluno,
    selectLastId,
    selectAlunoById,
    selectAllAlunos,
    selectAlunoByMatricula,
    selectAlunoByName,
    deleteAluno
}