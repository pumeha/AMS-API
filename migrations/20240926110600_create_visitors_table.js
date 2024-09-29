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
        table.string('fullname').notNullable();
        table.string('address').notNullable();
        table.string('phonenumber').notNullable();
        table.string('purpose').notNullable();
        table.string('whotosee').notNullable();
        table.string('1flooruserid',1).defaultTo('0'); //0 = not seen, 1= present, 2 = left 
        table.string('2flooruserid',1).defaultTo('0');
        table.string('3flooruserid',1).defaultTo('0');
        table.string('4flooruserid',1).defaultTo('0');
        table.string('5flooruserid',1).defaultTo('0');
        table.string('floor1',1).defaultTo('0'); 
        table.string('floor2',1).defaultTo('0');
        table.string('floor3',1).defaultTo('0');
        table.string('floor4',1).defaultTo('0');
        table.string('floor5',1).defaultTo('0');
        table.string('floorofinterest').notNullable();
        table.string('tagno').notNullable();
        table.string('day',2).defaultTo(currentDate.getDate());
        table.string('month',2).defaultTo(currentDate.getMonth() + 1);
        table.string('year',4).defaultTo(currentDate.getFullYear());
        table.string('time_in').defaultTo(time);
        table.string('time_out').defaultTo(time);
        table.string('status',1).notNullable().defaultTo('1');//1 = present, 0 = absent
  })};


exports.down = function(knex) {
    return knex.schema.dropTableIfExists('visitors');
};
