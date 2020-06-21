exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        {
          name: 'André Lima',
          email: 'andre@bandtec.com.br',
          password: 'andre123',
          picture: '9f6b8c59c232-tecnico1.png',
          professional: true,
          profile_description: 'Trabalho na área desde 2010, tenho experiência com desktops e notebooks.',
          latitude: -23.632076,
          longitude: -46.583004
        },
        {
          name: 'Gilson Silva',
          email: 'gilson@bandtec.com.br',
          password: 'gilson123',
          picture: '66ff7059fd3c-tecnico2.png',
          professional: true,
          profile_description: 'Atuo na área de manutenção de desktops e notebooks desde 2013, com experiêcia em windows e linux.',
          latitude: -23.636912,
          longitude: -46.584428
        }
      ]);
    });
};
