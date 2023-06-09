/***************************************************************************************
* Objetivo: Arquivo para fazer o controle dos dados de usuarios de nosso sistema
* Data: 23/05/2023
* Autor: Oswaldo Barbosa, Vinicius Monteiro
* Versão: 1.0
***************************************************************************************/

var usuarioDAO = require('../model/DAO/usuarioDAO.js')

var message = require('./modulo/config.js')

//Função que retorna a lista de todos os usuarios existentes dentro do banco de dados
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

//Função que retorna um usuario específico pelo id
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

//Função que insere um novo usuario no banco de dados
const inserirUsuario = async function (dadosUsuario) {

    if (dadosUsuario.email == ''                || dadosUsuario.email == undefined              || dadosUsuario.email.length > 255 ||
        dadosUsuario.senha == ''                || dadosUsuario.senha == undefined              || dadosUsuario.senha.length > 255 ||
        dadosUsuario.id_usuario_tipo == ''      || dadosUsuario.id_usuario_tipo == undefined    || isNaN(dadosUsuario.id_usuario_tipo)
    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else {

        //envia os dados para a model inserir no banco de dados
        let resultadoDadosUsuario = await usuarioDAO.insertUsuario(dadosUsuario)

        //valida se o banco de dados inseriu corretamente os dados
        if (resultadoDadosUsuario) {

            //chama a função que vai encontar o ID gerado após o insert
            let novoUsuario = await usuarioDAO.selectLastId()

            let dadosAlunoJSON = {}

            dadosAlunoJSON.status = message.SUCCESS_CREATE_ITEM.status
            dadosAlunoJSON.message = message.SUCCESS_CREATE_ITEM.message
            dadosAlunoJSON.aluno = novoUsuario

            return dadosAlunoJSON

        } else {
            return message.ERROR_INTERNAL_SERVER
        }

    }
    
}

//função que atualiza um usuario existente
const atualizarUsuario = async function (dadosUsuario, idUsuario) {

    //Validação para tratar campos obrigatórios e quantidade de caracteres
    if (dadosUsuario.email == ''                || dadosUsuario.email == undefined              || dadosUsuario.email.length > 255 ||
    dadosUsuario.senha == ''                || dadosUsuario.senha == undefined              || dadosUsuario.senha.length > 255 ||
    dadosUsuario.id_usuario_tipo == ''      || dadosUsuario.id_usuario_tipo == undefined    || isNaN(dadosUsuario.id_usuario_tipo)
    ) {

        return message.ERROR_REQUIRED_FIELDS //status code 400

    } else if (idUsuario == '' || idUsuario ==  undefined || isNaN(idUsuario)) {

        return message.ERROR_ID_NOT_FOUND //status code 400

    } else {

        //adiciona o idUsuario no json dos dadosUsuario
        dadosUsuario.id = idUsuario

        let statusId = await usuarioDAO.selectLastId(idUsuario)

        if (statusId) {

            //chama a função que vai atualizar o professor
            let resultadoDadosUsuario = await usuarioDAO.updateUsuario(dadosUsuario)

            if (resultadoDadosUsuario) {

                let dadosUsuarioJSON = {}

                dadosUsuarioJSON.status = message.SUCCESS_UPDATE_ITEM.status //200
                dadosUsuarioJSON.message = message.SUCCESS_UPDATE_ITEM.message
                dadosUsuarioJSON.usuario = dadosUsuario

                return dadosUsuarioJSON

            } else {
                message.ERROR_INTERNAL_SERVER //500
            }

        } else {
            message.ERROR_INTERNAL_SERVER //404
        }

    }

}

//função que deleta um usuario existente
const deletarUsuario = async function (idUsuario) {

    if (idUsuario == '' || idUsuario == undefined || isNaN(idUsuario)) {
        return message.ERROR_INVALID_ID
    } else {

        let statusId = await usuarioDAO.selectLastId(idUsuario)

        if (statusId) {

            let dadosUsuario = await usuarioDAO.deleteUsuario(idUsuario)

            if (dadosUsuario) {
                return message.SUCCESS_DELETE_ITEM
            } else {
                return message.ERROR_INTERNAL_SERVER
            }

        } else {
            return message.ERROR_ID_NOT_FOUND 
        }

    }

}

module.exports = {
    getUsuario,
    getUsuarioById,
    inserirUsuario,
    atualizarUsuario,
    deletarUsuario
}