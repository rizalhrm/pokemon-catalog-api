'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Profile extends Model {
    static get table() {
        return 'profiles'
    }
    static get primaryKey() {
        return 'id'
    }
    pokemons () {
        return this.hasMany('App/Models/Pokemon')
    }
}

module.exports = Profile
