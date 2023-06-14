/***************************************************************************************
* Objetivo: Arquivo de conexão com o banco de dados para a tabela de matéria
* Data: 23/05/2023
* Autor: Vinícius Monteiro  
* Versão: 1.0
***************************************************************************************/

//Importa biblioteca do cliente do prisma
var { PrismaClient } = require('@prisma/client')

//criando instância do prisma
var prisma = new PrismaClient()

const selectAllMatriculas = async function () {

    let sql = `select   tbl_matricula.id, tbl_matricula.numero as numero_matricula,
                        tbl_aluno.nome as nome_aluno,
                        tbl_usuario.email, tbl_usuario.senha

                        from tbl_matricula
                            inner join tbl_aluno
                                on tbl_aluno.id = tbl_matricula.id_aluno
                            inner join tbl_usuario
                                on tbl_usuario.id = tbl_matricula.id_usuario`

    let resultadoMatricula = await prisma.$queryRawUnsafe(sql)

    if (resultadoMatricula.length > 0) {
        return resultadoMatricula
    } else {
        return false
    }

}

const selectMatriculaById = async function (idMatricula) {

    let sql = `select   tbl_matricula.id, tbl_matricula.numero as numero_matricula,
                        tbl_aluno.nome as nome_aluno,
                        tbl_usuario.email, tbl_usuario.senha

                        from tbl_matricula
                            inner join tbl_aluno
                                on tbl_aluno.id = tbl_matricula.id_aluno
                            inner join tbl_usuario
                                on tbl_usuario.id = tbl_matricula.id_usuario where tbl_matricula.id = ${idMatricula}`

    let resultadoMatricula = await prisma.$queryRawUnsafe(sql)

    if (resultadoMatricula.length > 0) {
        return resultadoMatricula
    } else {
        return false
    }

}

const selectMatriculaByNumero = async function (numeroMatricula) {

    let sql = `select * from tbl_matricula where numero = ${numeroMatricula}`

    let resultadoMatricula = await prisma.$queryRawUnsafe(sql)

    if (resultadoMatricula.length > 0) {
        return resultadoMatricula
    } else {
        return false
    }

}

const insertMatricula = async function (dadosMatricula) {

    let sql = `insert into tbl_matricula (
        numero,
        id_aluno,
        id_usuario
        ) values (
        '${dadosMatricula.numero}',
        '${dadosMatricula.id_aluno}',
        '${dadosMatricula.id_usuario}'
        )`

    let resultadoMatricula = await prisma.$executeRawUnsafe(sql)

    if (resultadoMatricula) {
        return true
    } else {
        return false
    }

}

const updateMatricula = async function (dadosMatricula) {

    let sql = `update tbl_matricula set
        numero = '${dadosMatricula.numero}',
        id_aluno = '${dadosMatricula.id_aluno}',
        id_usuario = '${dadosMatricula.id_usuario}'
        where id = '${dadosMatricula.id}'`

    let resultadoMatricula = await prisma.$executeRawUnsafe(sql)

    if (resultadoMatricula) {
        return true
    } else {
        return false
    }

}

const deleteMatricula = async function (idMatricula) {

    let sql = `delete from tbl_matricula where id = ${idMatricula}`

    let resultadoMatricula = await prisma.$queryRawUnsafe(sql)

    if (resultadoMatricula) {
        return true
    } else {
        return false
    }

}

const selectLastId = async function () {

    let sql = `select * from tbl_matricula order by id desc limit 1`

    let resultadoMatricula = await prisma.$queryRawUnsafe(sql)

    if (resultadoMatricula.length > 0) {
        return resultadoMatricula
    } else {
        return false
    }

}

module.exports = {
    selectAllMatriculas,
    selectMatriculaById,
    selectMatriculaByNumero,
    insertMatricula,
    updateMatricula,
    deleteMatricula,
    selectLastId
}