const Sequelize = require('sequelize');

module.exports = class Part extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            id:{
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true,
                autoIncrement: true,
                primaryKey: true,
            },
            partNumber:{
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true,
            },
            part_name:{
                type: Sequelize.TEXT,
                allowNull: true,
                unique: true,
            },
        }, {
            sequelize,
            timestamp: false,
            createdAt: false,
            updatedAt: false,
            charset: 'utf8',
            modelName: 'Part',
            tableName: 'parts',
            collate: 'utf8_general_ci',
        })
    }
}