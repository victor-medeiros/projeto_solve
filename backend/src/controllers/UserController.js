const knex = require('../database');

module.exports = {
    async show(req, res, next) {
        try {
            const result = await knex('user')
                .where({ professional: true })
                .join('service', 'service.professional_id', 'user.id')
                .groupBy('user.id')
                .count('rate', {as: 'count'})
                .select(knex.raw('ROUND(AVG(rate),1) AS avg'))
                .select('user.*');

            const users = result.map(user => {
                return {
                    ...user,
                    picture_url: `http://localhost:3333/uploads/${user.picture}`
                };
            });
            
            return res.json(users);
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
    
            const picture = req.file.filename;
    
            await knex('user').insert({
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
            return next(error);
        }
    },
    async index(req, res, next){
        try {
            const { email, password } = req.body;

            const user = await knex('user')
                .where({
                    email,
                    password
                });
            if (!user) {
                return res.json({error: 'User not found'});
            }

            const serializedUser = user.map(data => {
                return {
                    ...data,
                    picture_url: `http://localhost:3333/uploads/${data.picture}`
                };
            })
            return res.json({user: serializedUser});
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
                profile_description,
                latitude,
                longitude
            } = req.body;

            const picture = req.file.filename;

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