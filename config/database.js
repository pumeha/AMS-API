const knex = require("knex");

const knexDb = knex(require('../config/knexfile').development);

module.exports = {knexDb}