require('dotenv').config();

module.exports = {

  development: {
    debug: true,
    client: 'pg',
    connection: {
      database: process.env.POSTGRES_DB,
      user:     process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD
    },
    migrations:{
      directory: './db/migrations'
    },
    pool: {
      min: 2,
      max: 10
    },
    seeds:{
      directory: './db/seeds'
    }
  },

  test: {
    client: 'pg',
    connection: {
      database: process.env.POSTGRES_TEST_DB,
      user:     process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD
    },
    migrations:{
      directory: './db/migrations'
    },
    pool: {
      min: 2,
      max: 10
    },
    seeds:{
      directory: './db/seeds'
    }
  }


};
