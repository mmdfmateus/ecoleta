import Knex from "knex";

export async function up(knex: Knex) { 
  return knex.schema.createTable('places_items', table => {
    table.increments('id').primary();

    table.string('place_id')
      .notNullable()
      .references('id')
      .inTable('places');
    
    table.string('item_id')
      .notNullable()
      .references('id')
      .inTable('places');
  })
}

export async function down(knex: Knex) { 
  return knex.schema.dropTable('places_items');
}
