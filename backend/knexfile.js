module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'victor',
      password: 'victor123',
      database: 'solve'
    },
    migrations: {
      directory: `${__dirname}/src/database/migrations`
    },
    seeds: {
      directory: `${__dirname}/src/database/seeds`
    }
  }
};
