'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Category extends Model {
    static get table() {
        return 'categories'
    }
    static get primaryKey() {
        return 'id'
    }
    pokemons() {
        return this.hasOne('App/Models/Pokemon')
    }
}

module.exports = Category
