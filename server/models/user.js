const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            userNumber:{
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true,
                autoIncrement: true,
                primaryKey: true,
            },
            userId:{
                type: Sequelize.STRING(10),
                allowNull: false,
                unique: true,
            },
            name:{
                type: Sequelize.STRING(10),
                allowNull: false,
            },
            nickname:{
                type: Sequelize.TEXT,
                allowNull: true,
                unique: true,
            },
            password:{
                type: Sequelize.TEXT,
                allowNull: true,
            },
            partNumber: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            adminNumber: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
        }, {
            sequelize,
            timestamp: false,
            createdAt: false,
            updatedAt: false,
            charset: 'utf8',
            modelName: 'User',
            tableName: 'users',
            collate: 'utf8_general_ci',
        })
    }
    static associate(db) {
        db.User.hasOne(db.Part, {foreignKey: 'partNumber', sourceKey: 'partNumber'});
        db.User.hasOne(db.Keyword, {foreignKey: 'selector', sourceKey: 'nickname'});
    }
}