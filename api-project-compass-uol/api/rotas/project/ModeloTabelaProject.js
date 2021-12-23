const Sequelize = require('sequelize')
const instancia = require('../../banco-de-dados')

const colunas = {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    }
}

const opcoes = {
    freezeTableName: true,
    tableName: 'project',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
}

module.exports = instancia.define('project', colunas, opcoes)