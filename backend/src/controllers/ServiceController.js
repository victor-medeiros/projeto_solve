const knex = require("../database");

module.exports = {
    async create(req, res, next) {
        try {
            const { client_id } = req.params;
            const { professional_id, request } = req.body;
            const status = 'Solicitado';

            await knex('service').insert({
                client_id,
                professional_id,
                request,
                status
            });

            res.json({
                client_id,
                professional_id,
                request,
                status
            });
        } catch (error) {
            next(error);
        }
    },
    async confirm(req, res, next) {
        try {
            const { id } = req.body;

            await knex('service').
                where({id})
                .update({
                    status: 'Confirmado'
                });

            res.send();
        } catch (error) {
            next(error);
        }
    },
    async start(req, res, next) {
        try {
            const { price, id } = req.body;
            await knex('service')
                .where({id})
                .update({price});

            return res.send();
        } catch (error) {
            next(error);
        }
    },
    async hire(req, res, next) {
        try {
            const { id } = req.body;

            await knex('service')
                .where({id})
                .update({
                    status: 'Em andamento'
                });

            return res.send();
        } catch (error) {
            next(error);
        }
    }
}