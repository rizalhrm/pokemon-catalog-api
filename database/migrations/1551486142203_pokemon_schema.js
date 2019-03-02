'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PokemonSchema extends Schema {
  up () {
    this.create('pokemons', (table) => {
      table.increments()
      table.string('name', 80).notNullable()
      table.text('image_url')
      table.integer('type_id')
      .unsigned()
      .references('id')
      .inTable('types')
      .onUpdate('NO ACTION')
      .onDelete('SET NULL');
      table.integer('category_id')
      .unsigned()
      .references('id')
      .inTable('categories')
      .onUpdate('NO ACTION')
      .onDelete('SET NULL');
      table.string('latitude', 150).notNullable()
      table.string('longitude', 150).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('pokemons')
  }
}

module.exports = PokemonSchema
