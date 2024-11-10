const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') }); // Adjust path as needed

module.exports = {

  development: {
    client: 'mysql2',
    connection: {
     database:process.env.DB,
     user: process.env.USER,
     password: process.env.PWORD
    },
    pool: {min:0,max:7},
    migrations:{
      tableName: 'knex_migrations',
      directory: '../migrations'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
