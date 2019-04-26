const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
    const sequelizeClient = app.get('sequelizeClient');
    const vat_rates = sequelizeClient.define('vat_rates', {
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
            rate: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            comments: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            type: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            country: {
                type: DataTypes.STRING(2),
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

    vat_rates.associate = function (models) {
        // Define associations here
        // See http://docs.sequelizejs.com/en/latest/docs/associations/
    };
    return vat_rates;
};
