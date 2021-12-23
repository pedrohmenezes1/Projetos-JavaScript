const Sequelize = require('sequelize')
const instancia = require('../../../banco-de-dados')

const colunas = {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    taskRelevance: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    completed: {
        type: Sequelize.ENUM('true', 'false'),//1=true , 2=false.
        allowNull: false
    },
    project: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: require('../ModeloTabelaProject'),
            key: 'id'
        }
    }
}

const opcoes = {
    freezeTableName: true,
    tableName: 'tasks',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
}

module.exports = instancia.define('tasks', colunas, opcoes)