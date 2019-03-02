'use strict'

const Pokemon = use('App/Models/Pokemon');

class PokemonController {
    async index ({response}) {
        try {
            let pokemons = await Pokemon.all()
            return response.json(pokemons)
        } catch (err) {
            return {
                status: "Something went wrong",
                message: err.message
            }
        }
    }

    async show ({params, response}) {
        try {
            const pokemon = await Pokemon.find(params.id)
            return response.json(pokemon)
        } catch (err) {
            return {
                status: "Something went wrong",
                message: err.message
            }
        }   
    }

    async store ({request, response}) {

        try {
            const pokemonData = request.only(['name', 'image_url', 'type_id', 'category_id', 'latitude', 'longitude'])
            const pokemon = await Pokemon.create(pokemonData)

            return response.status(201).json(pokemon)
        } catch (err) {
            return {
                status: "Failed...",
                message: err.message
            }
        }
    }

    async update ({params, request, response}) {
        try {
            const pokemonData = request.only(['name', 'image_url', 'type_id', 'category_id', 'latitude', 'longitude'])
            const pokemon = await Pokemon.find(params.id)

            if (!pokemon) {
                return response.status(404).json({data: 'Resource not found'})
            }

            pokemon.name = pokemonData.name
            pokemon.image_url = pokemonData.image_url
            pokemon.type_id = pokemonData.type_id
            pokemon.category_id = pokemonData.category_id
            pokemon.latitude = pokemonData.latitude
            pokemon.longitude = pokemonData.longitude

            await pokemon.save()
            return response.status(200).json(pokemon)
        } catch (err) {
            return {
                status: "Failed...",
                message: err.message
            }
        }
    }

    async delete ({params, response}) {

        try {
            const pokemon = await Pokemon.find(params.id)
            await pokemon.delete()
            return response.status(200).json({message: "Successfully deleted the pokemon"})
        } catch (err) {
            return {
                status: "Failed...",
                message: err.message
            }
        }

    }
}

module.exports = PokemonController
