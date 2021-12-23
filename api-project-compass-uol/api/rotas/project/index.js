const roteador = require('express').Router()
const TabelaProject = require('./TabelaProject')
const Project = require('./Project')
const SerializadorProject = require('../../Serializador').SerializadorProject

roteador.options('/', (requisicao, resposta) => {
    resposta.set('Access-Control-Allow-Methods', 'GET, POST')
    resposta.set('Access-Control-Allow-Headers', 'Content-Type')
    resposta.status(204)
    resposta.end()
})

roteador.get('/', async (requisicao, resposta) => {
    const resultados = await TabelaProject.listar()
    resposta.status(200)
    const serializador = new SerializadorProject(
        resposta.getHeader('Content-Type'),
        ['title', 'description', 'createdAt', 'updatedAt']
    )
    resposta.send(
        serializador.serializar(resultados)
    )
})

roteador.post('/', async (requisicao, resposta, proximo) => {
    try {
        const dadosRecebidos = requisicao.body
        const project = new Project(dadosRecebidos)
        await project.criar()
        resposta.status(201)
        const serializador = new SerializadorProject(
            resposta.getHeader('Content-Type'),
            ['title']
        )
        resposta.send(
            serializador.serializar(project)
        )
    } catch (erro) {
        proximo(erro)
    }
})

roteador.options('/:idProject', (requisicao, resposta) => {
    resposta.set('Access-Control-Allow-Methods', 'GET, PUT, DELETE')
    resposta.set('Access-Control-Allow-Headers', 'Content-Type')
    resposta.status(204)
    resposta.end()
})

roteador.get('/:idProject', async (requisicao, resposta, proximo) => {
    try {
        const id = requisicao.params.idProject
        const project = new Project({ id: id })
        await project.carregar()
        resposta.status(200)
        const serializador = new SerializadorProject(
            resposta.getHeader('Content-Type'),
            ['title', 'description', 'createdAt', 'updatedAt']
        )
        resposta.send(
            serializador.serializar(project)
        )
    } catch (erro) {
        proximo(erro)
    }
})

roteador.put('/:idProject', async (requisicao, resposta, proximo) => {
    try {
        const id = requisicao.params.idProject
        const dadosRecebidos = requisicao.body
        const dados = Object.assign({}, dadosRecebidos, { id: id })
        const project = new Project(dados)
        await project.atualizar()
        resposta.status(204)
        resposta.end()
    } catch (erro) {
        proximo(erro)
    }
})

roteador.delete('/:idProject', async (requisicao, resposta, proximo) => {
    try {
        const id = requisicao.params.idProject
        const project = new Project({ id: id })
        await project.carregar()
        await project.remover()
        resposta.status(204)
        resposta.end()
    } catch (erro) {
        proximo(erro)
    }
})

const roteadorTasks = require('./tasks')

const verificarProject = async (requisicao, resposta, proximo) => {
    try {
        const id = requisicao.params.idProject
        const project = new Project({ id: id })
        await project.carregar()
        requisicao.project = project
        proximo()
    } catch (erro) {
        proximo(erro)
    }
}

roteador.use('/:idProject/tasks', verificarProject, roteadorTasks)

module.exports = roteador