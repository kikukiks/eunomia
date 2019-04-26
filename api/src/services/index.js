const vat_rates = require('./vat_rates/vat_rates.service.js');
const countries = require('./countries/countries.service.js');
const products = require('./products/products.service.js');

module.exports = function (app) {
    app.configure(vat_rates);
    app.configure(countries);
    app.configure(products);
};
