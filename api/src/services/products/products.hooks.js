const errors = require('@feathersjs/errors');
const rp = require('request-promise');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    before: {
        all: [],
        find: [ilike()],
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

function ilike() {
    return async context => {
        if (context.params.query && context.params.query.q) {

            if (context.params.query.q.length > 2) {
                let searchQuery = context.params.query.q;
                context.params.search = context.params.query.q;
                delete context.params.query.q;
    
                const sequelize = context.app.get('sequelizeClient');
                const Product = context.app.services.products.Model;
                let results = await sequelize.query(`
                    SELECT
                        id,
                        ext_id,
                        level,
                        code,
                        parent,
                        sec_code,
                        class,
                        description,
                        rate_name,
                        type,
                        reverse_charge,
                        ts_rank_cd(_search, query, 2) AS rank
                    FROM 
                        public.products as p,
                        plainto_tsquery('english', :query) query
                    WHERE
                        _search @@ query
                    ORDER BY rank DESC;
                `, {
                    model: Product,
                    replacements: {
                        query: searchQuery
                    },
                    raw: true
                });
    
                context.result = {
                    data: results
                };
    
                return context;
            } else {
                context.result = {
                    data: []
                };
            }
        }
    }
}