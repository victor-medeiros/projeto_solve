const knex = require("../database");
const { where } = require("../database");

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
            const { id } = req.params;

            await knex('service').
                where({
                    id,
                    status: 'Solicitado'
                })
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
            const { price } = req.body;
            const { id } = req.params;

            await knex('service')
                .where({
                    id,
                    status: 'Confirmado'
                })
                .update({price});

            return res.send();
        } catch (error) {
            next(error);
        }
    },
    async hire(req, res, next) {
        try {
            const { id } = req.params;

            await knex('service')
                .where({
                    id,
                    status: 'Confirmado'
                })
                .update({
                    status: 'Em andamento'
                });

            return res.send();
        } catch (error) {
            next(error);
        }
    },
    async finish(req, res, next) {
        try {
            const { solution } = req.body;
            const { id } = req.params;
            const dateTime = new Date;

            await knex('service')
                .where({
                    id,
                    status: 'Em andamento',
                })
                .update({
                    solution,
                    status: 'Concluído, retire seu equipamento',
                    dateTime
                });

            return res.send();
        } catch (error) {
            next(error);
        }
    },
    async pickUpDevice(req, res, next) {
        try {
            const { id } = req.params;

            await knex('service')
                .where({
                    id,
                    status: 'Concluído, retire seu equipamento'
                })
                .update({
                    status: 'Finalizado'
                });
            
            return res.send();
        } catch (error) {
            next(error);
        }
    },
    async delete(req, res, next) {
        try {
            const { id } = req.params;

            const invalidColumns = ['Solicitado', 'Confirmado'];

            await knex('service')
                .whereIn('status', invalidColumns)
                .andWhere({id})
                .del()
                

            return res.send();
        } catch (error) {
            next(error);
        }
    }
}