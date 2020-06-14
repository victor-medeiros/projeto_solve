exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        {
          name: 'Carlos Souza',
          email: 'carlos@bandtec.com.br',
          password: 'carlos123',
          picture: 'picture'
        },
        {
          name: 'André Lima',
          email: 'andre@bandtec.com.br',
          password: 'andre123',
          picture: 'picture',
          professional: true,
          profile_description: 'Trabalho na área desde 2010, tenho experiência com desktops e notebooks.',
          latitude: -23.689835,
          longitude: -46.588463
        }
      ]);
    });
};
