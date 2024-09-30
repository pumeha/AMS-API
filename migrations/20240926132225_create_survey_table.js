
exports.up = function(knex) {
  return knex.schema.createTable('survey',function(table){
    table.increments('id').primary();
    table.string('visitorid').notNullable().unique();
    table.string('satisfied').notNullable();
    table.string('how_satisfied').notNullable();
    table.string('reasons').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  })};


exports.down = function(knex) {
  return knex.schema.dropTableIfExists('survey');
};
