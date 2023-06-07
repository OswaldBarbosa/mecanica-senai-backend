/***************************************************************************************
* Objetivo: Arquivo para fazer o controle dos dados de usuarios de nosso sistema
* Data: 23/05/2023
* Autor: André Luiz e Oswaldão zika
* Versão: 1.0
***************************************************************************************/

var usuarioDAO = require('../model/DAO/usuarioDAO.js')

var message = require('./modulo/config.js')

//Função que retorna a lista de todos os professores existentes dentro de nosso banco de dados
const getUsuario = async function () {

    let dadosUsuarioJSON = {}

    let dadosUsuario = await usuarioDAO.selectAllUsuario()

    if (dadosUsuario) {

        dadosUsuarioJSON.status = message.SUCCESS_REQUEST.status
        dadosUsuarioJSON.message = message.SUCCESS_REQUEST.message
        dadosUsuarioJSON.quantidade = dadosUsuario.length
        dadosUsuarioJSON.usuarios = dadosUsuario

        return dadosUsuarioJSON

    } else {
        return message.ERROR_NOT_FOUND
    }

}

//Função que retorna um professor específico pelo id
const getUsuarioById = async function (idUsuario) {

    let dadosUsuarioJSON = {}

    if (idUsuario == '' || idUsuario == undefined || isNaN(idUsuario)) {
        return message.SUCCESS_REQUEST
    } else {

        let dadosUsuario = await usuarioDAO.selectUsuarioById(idUsuario)
        
        if (dadosUsuario) {

            dadosUsuarioJSON.status = message.SUCCESS_REQUEST.status
            dadosUsuarioJSON.message = message.SUCCESS_REQUEST.message
            dadosUsuarioJSON.usuario = dadosUsuario
            
            return dadosUsuarioJSON

        } else {
            return message.ERROR_NOT_FOUND
        }

    }
    
}

//Função que retorna um professor específico pelo nome
const getUsuarioByName = async function (nomeProfessor) {

}

//Função que insere um novo professor
const inserirUsuario = async function (dadosUsuario) {

    console.log(dadosUsuario)

    if (dadosUsuario.email == '' || dadosUsuario.email == undefined || dadosUsuario.email.length > 45 ||
        dadosUsuario.senha == '' || dadosUsuario.senha == undefined || dadosUsuario.senha.length > 45 ||
        dadosUsuario.tipo == '' || dadosUsuario.tipo == undefined || dadosUsuario.length < 0
    ) {
        return messages.ERROR_REQUIRED_FIELDS
    } else {
        let resultDadosUsuario = await usuarioDAO.insertUsuario(dadosUsuario)

        if (resultDadosUsuario) {

            let novoUsuario = await usuarioDAO.selectLastID()

            let dadosAlunoJSON = {}
            dadosAlunoJSON.message = messages.SUCCESS_CREATE_ITEM.message
            dadosAlunoJSON.status = messages.SUCCESS_CREATE_ITEM.status
            dadosAlunoJSON.aluno = novoUsuario

            return dadosAlunoJSON
        } else {
            return messages.ERROR_INTERNAL_SERVER
        }
    }
}

//Função que atualiza um professor existente
const atualizarUsuario = async function (dadosProfessor, idProfessor) {

}

//Função que deleta um professor existente
const deletarUsuario = async function (idProfessor) {

}

module.exports = {
    getUsuario,
    getUsuarioById
}