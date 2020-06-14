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

            res.json({ client_id, professional_id, request, status });
        } catch (error) {
            next(error);
        }
    }
}