const Sequelize = require('sequelize');

module.exports = class Keyword extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            keywordNumber:{
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true,
                autoIncrement: true,
                primaryKey: true,
            },
            keywordName:{
                type: Sequelize.STRING(100),
                allowNull: false,
                unique: true,
            },
            selector:{
                type: Sequelize.STRING(10),
                allowNull: true,
                unique: true,
            },
            partNumber:{
                type: Sequelize.INTEGER,
                allowNull: true,
            },
        }, {
            sequelize,
            timestamp: false,
            createdAt: false,
            updatedAt: false,
            charset: 'utf8',
            modelName: 'Keyword',
            tableName: 'keywords',
            collate: 'utf8_general_ci',
        })
    }
    static associate(db) {
        db.Keyword.belongsTo(db.User, {foreignKey: 'selector', targetKey: 'nickname'});
    }
}