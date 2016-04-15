
exports.up = function(knex, Promise) {
  return knex.schema.createTable('orders', function(table){
    table.increments();
    table.integer('user_id').unsigned().references('id').inTable('users').onDelete('cascade').onUpdate('cascade');
    table.string('address').notNull();
    table.string('city').notNull();
    table.string('state').notNull();
    table.string('zip', 5).notNull();
    table.integer('order_status_id').unsigned().references('id').inTable('order_status').onDelete('cascade').onUpdate('cascade');
    table.string('stripe_id').notNull();
    table.timestamps();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('orders');
};
