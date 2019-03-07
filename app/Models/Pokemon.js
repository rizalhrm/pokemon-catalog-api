'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Pokemon extends Model {
    static get table() {
        return 'pokemons'
    }
    static get primaryKey() {
        return 'id'
    }
    types() {
        return this.belongsTo("App/Models/Type");
    }
    categories() {
        return this.belongsTo("App/Models/Category");
    }
    profiles () {
        return this.belongsTo('App/Models/Profile')
    }
}

module.exports = Pokemon
