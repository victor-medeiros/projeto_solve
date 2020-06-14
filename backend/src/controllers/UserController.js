const knex = require('../database');
const { update } = require('../database');

module.exports = {
    async index(req, res, next) {
        try {
            const result = await knex('user').where({ professional: true });
            
            return res.json(result);
        } catch (error) {
            next(error);
        }
    },
    async create(req, res, next){
        try {
            const { 
                name,
                email,
                password,
                professional,
                profile_description,
                latitude,
                longitude
            } = req.body;
    
            const picture = 'picture';
    
            const userId = await knex('user').insert({
                name,
                email,
                password,
                picture,
                professional,
                profile_description,
                latitude,
                longitude
            });
            res.status(201);
            return res.json({ ok: true });
        } catch (error) {
            next(error);
        }
    },
    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { 
                name,
                email,
                password,
                professional,
                picture,
                profile_description,
                latitude,
                longitude
            } = req.body;

            await knex('user').where({id}).update({
                name,
                email,
                password,
                professional,
                picture,
                profile_description,
                latitude,
                longitude
            })
            return res.send();
        } catch (error) {
            next(error);
        }
    }
};