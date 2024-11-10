exports.up = function(knex) {
const  currentDate = new Date();
let hours = currentDate.getHours();
const AmPm = hours >= 12 ? 'PM' : 'AM';
//convert hours to 12-hour format
hours = hours % 12 || 12;
const time = hours + ':'+ currentDate.getMinutes() + ' ' + AmPm;
  return knex.schema.createTable('visitors',function(table){
        table.increments('id').primary();
        table.string('userid').notNullable();
        table.string('visitorid').notNullable().unique();
        table.string('fullname').notNullable();
        table.string('address').notNullable();
        table.string('phonenumber').notNullable();
        table.string('purpose').notNullable();
        table.string('whotosee').notNullable();  
        table.string('floorofinterest').notNullable();
        table.string('tagno').notNullable();
        table.date('date').notNullable();
        table.string('time_in').defaultTo(time);
        table.string('time_out').defaultTo(time);
        table.string('status',1).notNullable().defaultTo('1');//1 = present, 0 = absent
        table.timestamp('created_at').defaultTo(knex.fn.now());
  })};


exports.down = function(knex) {
    return knex.schema.dropTableIfExists('visitors');
};
