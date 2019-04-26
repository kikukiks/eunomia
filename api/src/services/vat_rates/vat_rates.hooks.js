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
            uri: 'http://ec.europa.eu/taxation_customs/tedb/api/search/11d253e5-cabd-41c5-930b-d1246a84a77e.json',
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
            let RatesModel = context.app.services.vat_rates.Model;

            await RatesModel.destroy({
                truncate: true
            });

            ratesByCountry.forEach(country => {
                country.reducedRates.forEach(item => {
                    RatesModel.create({
                        name: item.category.name,
                        rate: item.reducedRate || 0,
                        description: item.category.description,
                        comments: item.comments,
                        type: item.reducedRateType,
                        country: country.memberState.defaultCountryCode
                    })
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
