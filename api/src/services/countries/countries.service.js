// Initializes the `application` service on path `/application`
const createService = require('feathers-sequelize');
const createModel = require('../../models/countries.model');
const hooks = require('./countries.hooks');

module.exports = function (app) {

    const serviceOptions = {
        Model: createModel(app),
        paginate: app.get('paginate')
    };

    // Initialize our service with any options it requires
    app.use('/countries', createService(serviceOptions));

    // Get our initialized service so that we can register hooks
    const service = app.service('countries');

    service.hooks(hooks);
};
