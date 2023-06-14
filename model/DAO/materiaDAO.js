/***************************************************************************************
* Objetivo: Arquivo de conexão com o banco de dados para a tabela de matéria
* Data: 23/05/2023
* Autor: Vinícius Monteiro  
* Versão: 1.0
***************************************************************************************/

//Importa biblioteca do cliente do prisma
var { PrismaClient } = require('@prisma/client')

//Criando instância do prisma
var prisma = new PrismaClient()

//seleciona todas as materias
const selectAllMaterias = async function () {

    let sql = `select * from tbl_materia`

    let resultadoMateria = await prisma.$queryRawUnsafe(sql)

    if (resultadoMateria.length > 0)
        return resultadoMateria
    else
        return false

}

//seleciona uma materia pelo id
const selectMateriaById = async function (id) {

    let sql = `select tbl_materia.nome,
                        tbl_materia.sigla,
                        tbl_materia.carga_horaria,
                        tbl_materia.descricao
                        
                        from tbl_materia 
                            where id = ${id}`

    let resultadoMateria = await prisma.$queryRawUnsafe(sql)

    if (resultadoMateria.length > 0)
        return resultadoMateria
    else
        return false
}

//Seleciona uma materia pelo nome
const selectMateriaByName = async function (nomeMateria) {

    let sql = `select * from tbl_materia where nome like '%${nomeMateria}%'`

    let resultadoMateria = await prisma.$queryRawUnsafe(sql)


    if (resultadoMateria.length > 0)
        return resultadoMateria
    else
        return false
}

//Seleciona uma materia pela sigla
const selectMateriaBySigla = async function (siglaMateria) {

    let sql = `select tbl_materia.nome,
                    tbl_materia.sigla,
                    tbl_materia.carga_horaria,
                    tbl_materia.descricao
    
                     from tbl_materia 
                    where sigla like '%${siglaMateria}%'`

    let resultadoMateria = await prisma.$queryRawUnsafe(sql)

    if (resultadoMateria.length > 0)
        return resultadoMateria
    else
        return false

}

const selectMateriaByIdAluno = async function (idAluno) {

    let sql = `select tbl_aluno.nome,
                tbl_materia.nome as nome_materia
                
                from tbl_aluno
                    
                inner join tbl_matricula
                on tbl_aluno.id = tbl_matricula.id_aluno
    
                inner join tbl_turma_matricula
                on tbl_matricula.id = tbl_turma_matricula.id_matricula
    
                inner join tbl_turma
                on tbl_turma_matricula.id_turma = tbl_turma.id
    
                inner join tbl_curso
                on tbl_curso.id = tbl_turma.id_curso
    
                inner join tbl_curso_materia
                on tbl_curso.id = tbl_curso_materia.id_curso
    
                inner join tbl_materia
                on tbl_materia.id = tbl_curso_materia.id_materia
                
                where tbl_aluno.id = ${idAluno}`

    let resultadoDadosMateria = await prisma.$queryRawUnsafe(sql)

    if(resultadoDadosMateria.length > 0)
        return resultadoDadosMateria
    else
        return false
        
}

//Inserir nova matéria
const insertMateria = async function (dadosMateria) {

    let sql = `insert into tbl_materia (
        nome,
                                        sigla,
                                        carga_horaria,
                                        descricao
                                        ) values (
                                        '${dadosMateria.nome}',
                                        '${dadosMateria.sigla}',
                                        '${dadosMateria.carga_horaria}',
                                        '${dadosMateria.descricao}'
                                        )`

    let resultadoMateria = await prisma.$executeRawUnsafe(sql)

    if (resultadoMateria)
        return true
    else
        return false

}

//Atualizar Materia
const updateMateria = async function (dadosMateria, idMateria) {

    let sql = `update tbl_materia set
                    nome = '${dadosMateria.nome}',
                    sigla = '${dadosMateria.sigla}',
                    carga_horaria = '${dadosMateria.carga_horaria}',
                    descricao = '${dadosMateria.descricao}'
                    
                        where id = ${idMateria}`

    let resultadoMateria = await prisma.$executeRawUnsafe(sql)

    if (resultadoMateria)
        return true
    else
        return false
}

//deletar materia
const deleteMateria = async function (idMateria) {

    let sql = `delete from tbl_materia where id = ${idMateria}`

    let resultadoMateria = await prisma.$queryRawUnsafe(sql)

    if (resultadoMateria)
        return resultadoMateria
    else
        return false
}

const selectLastId = async function () {
    let sql = `select * from tbl_materia order by id desc limit 1 `

    let resultadoMateria = await prisma.$queryRawUnsafe(sql)

    if (resultadoMateria.length > 0)
        return resultadoMateria
    else
        return false
}


module.exports = {
    selectAllMaterias,
    selectLastId,
    selectMateriaById,
    selectMateriaByIdAluno,
    selectMateriaBySigla,
    insertMateria,
    updateMateria,
    deleteMateria
}

