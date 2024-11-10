
exports.up = function(knex) {
  return knex.schema.createTable('users',function(table){
    table.increments('id').primary();
    table.string('userid',28).unique();
    table.string('firstname',50).notNullable();
    table.string('lastname',50).notNullable();
    table.string('phonenumber',11).notNullable().unique();
    table.string('passcode',20).notNullable();
    table.string('role',20).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  }
)};


exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
