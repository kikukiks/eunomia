const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
    const sequelizeClient = app.get('sequelizeClient');
    const products = sequelizeClient.define('products', {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                unique: true
            },
            ext_id: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            level: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            code: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            parent: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            sec_code: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            class: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            rate_name: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            type: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            reverse_charge: {
                type: DataTypes.BOOLEAN,
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

    products.associate = function (models) {
        // Define associations here
        // See http://docs.sequelizejs.com/en/latest/docs/associations/
    };
    return products;
};
