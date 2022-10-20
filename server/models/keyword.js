const Sequelize = require('sequelize');

module.exports = class Keyword extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            title:{
                type: Sequelize.TEXT,
                allowNull: false,
                unique: true,
            },
            selector:{
                type: Sequelize.TEXT,
                allowNull: true,
                unique: true,
            },
            password:{
                type: Sequelize.TEXT,
                allowNull: true,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            charset: 'utf8',
            modelName: 'Keyword',
            tableName: 'keywords',
            collate: 'utf8_general_ci',
        })
    }
}