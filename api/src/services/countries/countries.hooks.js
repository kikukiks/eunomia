const errors = require('@feathersjs/errors');
const rp = require('request-promise');

module.exports = {
    before: {
        all: [],
        find: [],
        get: [],
        create: [fetchVAT()],
        update: [forbidden()],
        patch: [forbidden()],
        remove: [forbidden()]
    },

    after: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    },

    error: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    }
};

function fetchVAT() {
    return async context => {

        let options = {
            method: 'GET',
            uri: 'http://ec.europa.eu/taxation_customs/tedb/api/search/7f24c1d2-edfe-4df5-9176-2155694daa2d.json',
            json: true
        }

        let res = await rp(options);

        if (res && res.results && res.results.length) {
            let rates = res.results;
            let states = {};

            rates.forEach(item => {
                if (states[item.memberState.defaultCountryCode]) {
                    if (item.id.versionDate > states[item.memberState.defaultCountryCode].id.versionDate) states[item.memberState.defaultCountryCode] = item;
                } else states[item.memberState.defaultCountryCode] = item;
            });

            let ratesByCountry = Object.values(states);
            let CountryModel = context.app.services.countries.Model;

            await CountryModel.destroy({
                truncate: true
            });

            ratesByCountry.forEach(country => {
                CountryModel.create({
                    name: country.memberState.name,
                    code: country.memberState.defaultCountryCode,
                    vat_rate: country.standardRate
                })
            });

        }

        context.result = {
            status: 'OK'
        }

    }
}

function forbidden() {
    return async context => {
        throw new errors.Forbidden()
    }
}
