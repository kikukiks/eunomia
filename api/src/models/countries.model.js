const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
    const sequelizeClient = app.get('sequelizeClient');
    const countries = sequelizeClient.define('countries', {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                unique: true
            },
            name: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            code: {
                type: DataTypes.STRING(2),
                allowNull: true
            },
            vat_rate: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true
            }
        }, {
            hooks: {
                beforeCount(options) {
                    options.raw = true;
                }
            }
        }
    );

    countries.associate = function (models) {
        // Define associations here
        // See http://docs.sequelizejs.com/en/latest/docs/associations/
    };
    return countries;
};
