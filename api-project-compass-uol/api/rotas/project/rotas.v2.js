const roteador = require('express').Router()
const TabelaProject = require('./TabelaProject')
const SerializadorProject = require('../../Serializador').SerializadorProject

roteador.options('/', (requisicao, resposta) => {
    resposta.set('Access-Control-Allow-Methods', 'GET')
    resposta.set('Access-Control-Allow-Headers', 'Content-Type')
    resposta.status(204)
    resposta.end()
})

roteador.get('/', async (requisicao, resposta) => {
    const resultados = await TabelaProject.listar()
    resposta.status(200)
    const serializador = new SerializadorProject(
        resposta.getHeader('Content-Type')
    )
    resposta.send(
        serializador.serializar(resultados)
    )
})

module.exports = roteador