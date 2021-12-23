const modelos = [
    require('../rotas/project/ModeloTabelaProject'),
    require('../rotas/project/tasks/ModeloTabelaTasks')
]

async function criarTabelas () {
    for (let contador = 0; contador < modelos.length; contador++) {
        const modelo = modelos[contador]
        await modelo.sync()
    }
}

criarTabelas()