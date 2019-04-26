const errors = require('@feathersjs/errors');
const rp = require('request-promise');

module.exports = {
    before: {
        all: [],
        find: [],
        get: [],
        create: [forbidden()],
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

function forbidden() {
    return async context => {
        throw new errors.Forbidden()
    }
}
