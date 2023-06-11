/***************************************************************************************
* Objetivo: Arquivo de conexão com o banco de dados para a tabela de curso
* Data: 23/05/2023
* Autor: Vinícius Monteiro
* Versão: 1.0
***************************************************************************************/

//Import do Prisma
var {PrismaClient} = require('@prisma/client')


//Criação da instancia prisma
var prisma = new PrismaClient()

//DAOS
const selectAllCursos = async function(){

    let sql = `select * from tbl_curso`


    let resultadoCurso = await prisma.$queryRawUnsafe(sql)

    if(resultadoCurso.length > 0)
        return resultadoCurso
    else
        return false

}

const selectCursoById = async function(id){

    let sql = `select * from tbl_curso
                    where id = ${id};`

        let resultadoCurso = await prisma.$queryRawUnsafe(sql)

        if(resultadoCurso.length > 0)
            return resultadoCurso
        else
            return false

}

const selectCursoByName = async function(nomeCurso){

    let sql = `select * from tbl_curso
        where nome like '%${nomeCurso}%'`

    let resultadoCurso = await prisma.$queryRawUnsafe(sql)

    if(resultadoCurso.length > 0)
        return resultadoCurso
    else
        return false
}

const selectLastId = async function(){
    
    let sql = `select * from tbl_curso order by id desc limit 1`

    let resultadoAluno = await prisma.$queryRawUnsafe(sql)

    if(resultadoAluno.length > 0)
        return resultadoAluno
    else
        return false

}

const insertCurso = async function(dadosCurso){

    let sql = `insert into tbl_curso(
                                        nome,
                                        sigla,
                                        carga_horaria,
                                        descricao
                                        ) values (
                                        '${dadosCurso.nome}',
                                        '${dadosCurso.sigla}',
                                        '${dadosCurso.carga_horaria}',
                                        '${dadosCurso.descricao}'
                                        );`

    let resultadoCurso = await prisma.$executeRawUnsafe(sql)

    if(resultadoCurso)
        return true
    else
        return false

}

const updateCurso = async function(dadosCurso){
    let sql = `update tbl_curso set 
                    nome = '${dadosCurso.nome}',
                    sigla = '${dadosCurso.sigla}',
                    carga_horaria = '${dadosCurso.carga_horaria}',
                    descricao = '${dadosCurso.descricao}'
                    where id = ${dadosCurso.id}`
    
    let resultadoCurso = await prisma.$executeRawUnsafe(sql)

    if(resultadoCurso)
        return true
    else
        return false
}

const deleteCurso = async function(id){
    
    let sql = `delete from tbl_aluno where id = '${id}'`

    let resultadoCurso = await prisma.$executeRawUnsafe(sql)

    if(resultadoCurso)
        return true
    else
        return false
}

module.exports = {
    selectAllCursos,
    selectCursoById,
    selectCursoByName,
    insertCurso,
    updateCurso,
    deleteCurso,
    selectLastId
}