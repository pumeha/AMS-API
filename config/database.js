const knex = require("knex");

const knexDb = knex(require('../knexfile').development);

module.exports = {knexDb}