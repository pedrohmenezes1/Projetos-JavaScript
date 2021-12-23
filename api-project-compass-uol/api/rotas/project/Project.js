const TabelaProject = require('./TabelaProject')
const CampoInvalido = require('../../erros/CampoInvalido')
const DadosNaoFornecidos = require('../../erros/DadosNaoFornecidos')

class Project {
    constructor ({ id, title, description, createdAt, updatedAt }) {
        this.id = id
        this.title = title
        this.description = description
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }

    async criar () {
        this.validar()
        const resultado = await TabelaProject.inserir({
            title: this.title,
            description: this.description
        })

        this.id = resultado.id
        this.createdAt = resultado.createdAt
        this.updatedAt = resultado.updatedAt
    }

    async carregar () {
        const encontrado = await TabelaProject.pegarPorId(this.id)
        this.title = encontrado.title
        this.description = encontrado.description
        this.createdAt = encontrado.createdAt
        this.updatedAt = encontrado.updatedAt
    }

    async atualizar () {
        await TabelaProject.pegarPorId(this.id)
        const campos = ['title', 'description']
        const dadosParaAtualizar = {}

        campos.forEach((campo) => {
            const valor = this[campo]

            if (typeof valor === 'string' && valor.length > 0) {
                dadosParaAtualizar[campo] = valor
            }
        })

        if (Object.keys(dadosParaAtualizar).length === 0) {
            throw new DadosNaoFornecidos()
        }

        await TabelaProject.atualizar(this.id, dadosParaAtualizar)
    }

    remover () {
        return TabelaProject.remover(this.id)
    }

    validar () {
        const campos = ['title', 'description']

        campos.forEach(campo => {
            const valor = this[campo]

            if (typeof valor !== 'string' || valor.length === 0) {
                throw new CampoInvalido(campo)
            }
        })
    }
}

module.exports = Project