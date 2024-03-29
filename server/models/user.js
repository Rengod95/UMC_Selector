const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            id:{
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
            nickName:{
                type: Sequelize.TEXT,
                allowNull: true,
                unique: true,
            },
            password:{
                type: Sequelize.TEXT,
                allowNull: true,
            },
            partNumber: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            adminNumber: {
                type: Sequelize.DATE,
                allowNull: true,
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
        db.User.hasOne(db.Part, {foreignKey: 'partNumber', sourceKey: 'partNumber'})
        db.Part.belongsTo(db.User, {foreignKey: 'partNumber', targetKey: 'partNumber'})
    }
}