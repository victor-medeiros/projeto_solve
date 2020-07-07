const knex = require("../database");
const { where } = require("../database");
const { index, show } = require("./UserController");
const { response } = require("express");

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
                    .select('name', 'picture');
                    
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
    async show(req, res, next){
        try {
            const id = Number(req.params.id);
            const { professional } = req.body;

            if (professional == 1) {
                const result = await knex('service')
                    .where({
                        professional_id: id,
                        status: 'Finalizado'
                    })
                    .join('user', 'user.id', 'service.client_id')
                    .orderBy('service.id', 'desc')
                    .select('service.*', 'user.name', 'user.picture');

                const services = result.map(service => {
                    return {
                        ...service,
                        picture_url: `http://localhost:3333/uploads/${service.picture}`
                    };
                });

                return res.json(services);
            } else {
                const result = await knex('service').where({
                    client_id: id,
                    status: 'Finalizado'
                })
                .join('user', 'user.id', 'service.professional_id')
                .orderBy('service.id', 'desc')
                .select('service.*', 'user.name', 'user.picture');

                const services = result.map(service => {
                    return {
                        ...service,
                        picture_url: `http://localhost:3333/uploads/${service.picture}`
                    };
                });

                console.log(id);
                console.log(professional);
                console.log(services);
                return res.json(services);
            }

        } catch (error) {
            next(error);
        }

    },
    async update(req, res, next) {
        try {
            const { 
                dateTime,
                price,
                request,
                solution,
                rate,
                status
            } = req.body;

            const { id } = req.params;

            const requestFields = [
                {
                    value: dateTime,
                    name: 'dateTime'
                },
                {
                    value: price,
                    name: 'price'
                },
                {
                    value: request,
                    name: 'request'
                },
                {
                    value: solution,
                    name: 'solution'
                },
                {
                    value: rate,
                    name: 'rate'
                },
                {
                    value: status,
                    name: 'status'
                }
            ];

            let data = {};

            requestFields.map(field => {
                if(field.value != undefined){
                    data = {...data, [field.name]: field.value};
                }
            });

            const serviceStatus = [
                'Solicitado',
                'Confirmado',
                'Pronto para iniciar',
                'Em andamento',
                'Concluído',
                'Finalizado'
            ];

            const serviceNewStatus = serviceStatus.indexOf(status) + 1;
            data.status = serviceNewStatus === serviceStatus.length
                ? data.status
                : serviceStatus[serviceNewStatus];

            if (status === 'Cancelado') {
                const validColumns = [
                    'Solicitado',
                    'Confirmado',
                    'Pronto para iniciar'
                ];
                console.log('O serviço deve ser cancelado')
                await knex('service')
                    .whereIn('status', validColumns)
                    .andWhere({ id })
                    .update({
                        status: 'Cancelado'
                    });
            } else {
                await knex('service').
                    where({
                        id,
                        status
                    })
                    .update(data);
            }

            res.send();
        } catch (error) {
            next(error);
        }
    },
    async delete(req, res, next) {
        try {
            const { id } = req.params;

            await knex('service')
                .andWhere({
                    id,
                    status: 'Cancelado'
                })
                .del()
                
            return res.send();
        } catch (error) {
            next(error);
        }
    }
}