const Tabela = require('./TabelaTasks')
const DadosNaoFornecidos = require('../../../erros/DadosNaoFornecidos')
const CampoInvalido = require('../../../erros/CampoInvalido')

class Tasks {
    constructor ({ id, title, taskRelevance, completed = false, project, createdAt, updatedAt }) {
        this.id = id
        this.title = title
        this.taskRelevance = taskRelevance
        this.completed = completed
        this.project = project
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }

    validar () {
        if (typeof this.title !== 'string' || this.title.length === 0) {
            throw new CampoInvalido('title')
        }
    }

    async criar () {
        this.validar()
        const resultado = await Tabela.inserir({
            title: this.title,
            taskRelevance: this.taskRelevance,
            completed: this.completed,
            project: this.project
        })

        this.id = resultado.id
        this.createdAt = resultado.createdAt
        this.updatedAt = resultado.updatedAt
    }

    apagar () {
        return Tabela.remover(this.id, this.project)
    }

    async carregar () {
        const tasks = await Tabela.pegarPorId(this.id, this.project)
        this.title = tasks.title
        this.taskRelevance = tasks.taskRelevance
        this.completed = tasks.completed
        this.createdAt = tasks.createdAt
        this.updatedAt = tasks.updatedAt
    }

    atualizar () {
        const dadosParaAtualizar = {}
        
        if (typeof this.title === 'string' && this.title.length > 0){
            dadosParaAtualizar.title = this.title
        }
        
        if (typeof this.taskRelevance === 'number' && this.taskRelevance > 0){
            dadosParaAtualizar.taskRelevance = this.taskRelevance
        }
        
        if (typeof this.completed === 'string') {
            dadosParaAtualizar.completed = this.completed
        }

        if (Object.keys(dadosParaAtualizar).length === 0) {
            throw new DadosNaoFornecidos()
        }

        return Tabela.atualizar(
            {
                id: this.id,
                project: this.project
            },
            dadosParaAtualizar
        )
    }

    diminuirTask () {
        return Tabela.subtrair(
            this.id,
            this.project,
            'completed',
            this.completed
        )
    }
}

module.exports = Tasks