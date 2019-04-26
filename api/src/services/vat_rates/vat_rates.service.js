// Initializes the `application` service on path `/application`
const createService = require('feathers-sequelize');
const createModel = require('../../models/vat_rates.model');
const hooks = require('./vat_rates.hooks');

module.exports = function (app) {

    const serviceOptions = {
        Model: createModel(app),
        paginate: app.get('paginate')
    };

    // Initialize our service with any options it requires
    app.use('/vat_rates', createService(serviceOptions));

    // Get our initialized service so that we can register hooks
    const service = app.service('vat_rates');

    service.hooks(hooks);
};
