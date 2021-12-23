const roteador = require('express').Router({ mergeParams: true })
const Tabela = require('./TabelaTasks')
const Tasks = require('./Tasks')
const Serializador = require('../../../Serializador').SerializadorTasks

roteador.options('/', (requisicao, resposta) => {
    resposta.set('Access-Control-Allow-Methods', 'GET, POST')
    resposta.set('Access-Control-Allow-Headers', 'Content-Type')
    resposta.status(204)
    resposta.end()
})

roteador.get('/', async (requisicao, resposta) => {
    const tasks = await Tabela.listar(requisicao.project.id)
    const serializador = new Serializador(
        resposta.getHeader('Content-Type')
    )
    resposta.send(
        serializador.serializar(tasks)
    )
})

roteador.post('/', async (requisicao, resposta, proximo) => {
    try {
        const idProject = requisicao.project.id
        const corpo = requisicao.body
        const dados = Object.assign({}, corpo, { project: idProject })
        const tasks = new Tasks(dados)
        await tasks.criar()
        const serializador = new Serializador(
            resposta.getHeader('Content-Type')
        )
        const timestamp = (new Date(tasks.updatdAt)).getTime()
        resposta.set('Last-Modified', timestamp)
        resposta.set('Location', `/api/project/${tasks.project}/tasks/${tasks.id}`)
        resposta.status(201)
        resposta.send(
            serializador.serializar(tasks)
        )
    } catch (erro) {
        proximo(erro)
    }
})

roteador.options('/:id', (requisicao, resposta) => {
    resposta.set('Access-Control-Allow-Methods', 'DELETE, GET, HEAD, PUT')
    resposta.set('Access-Control-Allow-Headers', 'Content-Type')
    resposta.status(204)
    resposta.end()
})

roteador.delete('/:id', async (requisicao, resposta) => {
    const dados = {
        id: requisicao.params.id,
        project: requisicao.project.id
    }
    const tasks = new Tasks(dados)
    await tasks.apagar()
    resposta.status(204)
    resposta.end()
})

roteador.get('/:id', async (requisicao, resposta, proximo) => {
    try {
        const dados = {
            id: requisicao.params.id,
            project: requisicao.project.id
        }
    
        const tasks = new Tasks(dados)
        await tasks.carregar()
        const serializador = new Serializador(
            resposta.getHeader('Content-Type'),
            ['id','title', 'taskRelevance','completed', 'createdAt', 'updatedAt']
        )
        const timestamp = (new Date(tasks.updatedAt)).getTime()
        resposta.set('Last-Modified', timestamp)
        resposta.send(
            serializador.serializar(tasks)
        )
    } catch (erro) {
        proximo(erro)
    }
})

roteador.head('/:id', async (requisicao, resposta, proximo) => {
    try {
        const dados = {
            id: requisicao.params.id,
            project: requisicao.project.id
        }
    
        const tasks = new Tasks(dados)
        await tasks.carregar()
        const timestamp = (new Date(tasks.updatedAt)).getTime()
        resposta.set('Last-Modified', timestamp)
        resposta.status(200)
        resposta.end()
    } catch (erro) {
        proximo(erro)
    }
})

roteador.put('/:id', async (requisicao, resposta, proximo) => {
    try {
        const dados = Object.assign(
            {},
            requisicao.body,
            {
                id: requisicao.params.id,
                project: requisicao.project.id
            }
        )
    
        const tasks = new Tasks(dados)
        await tasks.atualizar()
        await tasks.carregar()
        const timestamp = (new Date(tasks.updatedAt)).getTime()
        resposta.set('Last-Modified', timestamp)
        resposta.status(204)
        resposta.end()
    } catch (erro) {
        proximo(erro)
    }
})

roteador.options('/:id/diminuir-task', (requisicao, resposta) => {
    resposta.set('Access-Control-Allow-Methods', 'POST')
    resposta.set('Access-Control-Allow-Headers', 'Content-Type')
    resposta.status(204)
    resposta.end()
})

roteador.post('/:id/diminuir-task', async (requisicao, resposta, proximo) => {
    try {
        const tasks = new Tasks({
            id: requisicao.params.id,
            project: requisicao.project.id
        })
    
        await tasks.carregar()
        tasks.task = tasks.task - requisicao.body.quantidade
        await tasks.diminuirTask()
        await tasks.carregar()
        const timestamp = (new Date(tasks.updatedAt)).getTime()
        resposta.set('Last-Modified', timestamp)
        resposta.status(204)
        resposta.end()
    } catch (erro) {
        proximo(erro)
    }
})

module.exports = roteador