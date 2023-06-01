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
const insertAluno = async function (dadosAluno) { 
}

//Atualiza os dados de um professor do banco de dados
const updateAluno = async function (dadosAluno) {

}

//Deleta o professor do banco de dados
const deleteAluno = async function (id) {

}

//Seleciona todos os professores dentro do banco de dados
const selectAllAlunos = async function () {

}

//Seleciona um professor específico dentro do banco de dados usando o id
const selectAlunoById = async function (id) {

}

//Seleciona um professor específico dentro do banco de dados usando o nome
const selectAlunoByName = async function (nomeALuno) {

}