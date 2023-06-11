    /***************************************************************************************
    * Objetivo: Arquivo de conexão com o banco de dados para a tabela de horario
    * Data: 23/05/2023
    * Autor: Vinícius Monteiro
    * Versão: 1.0
    ***************************************************************************************/

//Importa biblioteca do cliente do prisma
var { PrismaClient } = require('@prisma/client')

//Criando instância do prisma
var prisma = new PrismaClient()

const selectAllHorarios = async function(){

    let sql = `select * from tbl_horario`

    let resultadoHorario = await prisma.$queryRawUnsafe(sql)

    if(resultadoHorario.length > 0)
        return resultadoHorario
    else
        return false

}

const selectHorarioById = async function(idHorario){

    let sql = `select * from tbl_horario where id = ${idHorario};`

    let resultadoHorario = await prisma.$queryRawUnsafe(sql)

  
    if(resultadoHorario.length > 0)
        return resultadoHorario
    else
        return false
}

const insertHorario = async function (dadosHorario){

    let sql = `insert into tbl_horario(
                                inicio,
                                termino,
                                liquido,
                                desconto,
                                observacao
                                )values(
                                '${dadosHorario.inicio}',
                                '${dadosHorario.termino}',
                                '${dadosHorario.liquido}',
                                '${dadosHorario.desconto}',
                                '${dadosHorario.observacao}'
                                )`

    let resultadoHorario = await prisma.$executeRawUnsafe(sql)

    

    if(resultadoHorario)
        return true
    else
        return false
} 

const updateHorario = async function (dadosHorario){


    let sql = `update tbl_horario set
                    inicio = '${dadosHorario.inicio}',
                    termino = '${dadosHorario.termino}',
                    liquido = '${dadosHorario.liquido}',
                    desconto = '${dadosHorario.desconto}',
                    observacao = '${dadosHorario.observacao}'
                    
                    where id = ${dadosHorario.id}`
    

    let resultadoHorario = await prisma.$executeRawUnsafe(sql)
    
    


    if(resultadoHorario)
        return true
    else
        return false
}

const deleteHorario = async function(idHoraio){
    let sql = `delete from tbl_horario where id = ${idHoraio}`

    let resultadoHorario = await prisma.$executeRawUnsafe(sql)

    if(resultadoHorario)
        return true
    else
        return false
}

const selectLastId = async function(){

    let sql = `select * from tbl_horario order by id desc limit 1`

    let resultadoHorario = prisma.$queryRawUnsafe(sql)

    if(resultadoHorario)
        return resultadoHorario
    else
        return false
    
}

module.exports = {
    selectAllHorarios,
    selectHorarioById,
    insertHorario,
    updateHorario,
    deleteHorario,
    selectLastId
}