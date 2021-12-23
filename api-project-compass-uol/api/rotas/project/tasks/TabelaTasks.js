const Modelo = require('./ModeloTabelaTasks')
const instancia = require('../../../banco-de-dados')
const NaoEncontrado = require('../../../erros/NaoEncontrado')

module.exports = {
    listar (idProject) {
        return Modelo.findAll({
            where: {
                project: idProject
            },
            raw: true
        })
    },
    inserir (dados) {
        return Modelo.create(dados)
    },
    remover (idTasks, idProject) {
        return Modelo.destroy({
            where: {
                id: idTasks,
                project: idProject
            }
        })
    },
    async pegarPorId (idTasks, idProject) {
        const encontrado = await Modelo.findOne({
            where: {
                id: idTasks,
                project: idProject
            },
            raw: true
        })

        if (!encontrado) {
            throw new NaoEncontrado('Tasks')
        }

        return encontrado
    },
    atualizar (dadosDaTasks, dadosParaAtualizar) {
        return Modelo.update(
            dadosParaAtualizar,
            {
                where: dadosDaTasks
            }
        )
    },
    subtrair (idTasks, idProject, campo, quantidade) {
        return instancia.transaction(async transacao => {
            const tasks = await Modelo.findOne({
                where: {
                    id: idTasks,
                    project: idProject
                }
            })

            tasks[campo] = quantidade

            await tasks.save()

            return tasks
        })
    }
}