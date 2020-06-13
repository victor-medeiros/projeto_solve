const knex = require('../database');

module.exports = {
    async index(req, res) {
        const result = await knex('user');
            
        res.json(result)
    }
};