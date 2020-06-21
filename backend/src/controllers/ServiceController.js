const knex = require("../database");
const { where } = require("../database");
const { index } = require("./UserController");

module.exports = {
    async create(req, res, next) {
        try {
            const client_id = req.headers.authorization;
            const { professional_id, request } = req.body;
            const status = 'Solicitado';

            const [ id ] = await knex('service').insert({
                client_id,
                professional_id,
                request,
                status
            });

            res.json({id});
        } catch (error) {
            next(error);
        }
    },
    async index(req, res, next) {
        try {
            const user_id = req.headers.authorization;
            let serializedUser = {};
            
            const client = await knex('service')
                .whereNot({status: 'Finalizado'})
                .andWhere({client_id: user_id});

            if (client[0] !== undefined){
                const [RowDataPacket] = await knex('user')
                    .where({id: client[0].professional_id})
                    .select('name', 'picture');console.log(RowDataPacket)
                    
                serializedUser = client.map(data => {
                    return {
                        ...data,
                        user_name: RowDataPacket.name,
                        picture_url: `http://localhost:3333/uploads/${RowDataPacket.picture}`
                    };
                });
            } else {
                const professional = await knex('service')
                    .whereNot({status: 'Finalizado'})
                    .andWhere({professional_id: user_id});

                if (professional[0] !== undefined){
                    const [RowDataPacket] = await knex('user')
                        .where({id: professional[0].client_id})
                        .select('name', 'picture');
                    
                    serializedUser = professional.map(data => {
                        return {
                            ...data,
                            user_name: RowDataPacket.name,
                            picture_url: `http://localhost:3333/uploads/${RowDataPacket.picture}`
                        };
                    });
                }
            }

            return res.json({service: serializedUser});
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
                .update({
                    price,
                    status: 'Pronto para iniciar'
                });

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
                    status: 'Pronto para iniciar'
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
                    status: 'Concluído',
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
                    status: 'Concluído'
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