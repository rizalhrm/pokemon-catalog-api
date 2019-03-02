'use strict'

const Pokemon = use('App/Models/Pokemon');

class PokemonController {
    async index ({request, response}) {
        let { name_like, category, type_in } = request._qs;

        if (name_like) {
            if (category) {
                if (type_in) {
                    try {
                        let pokemons = await Pokemon.query()
                          .with("types")
                          .with("categories")
                          .where("name", "LIKE", "%" + name_like + "%")
                          .where("category_id", category)
                          .where("type_id", type_in)
                          .orderBy("id", "desc")
                          .limit(10).fetch();
                        return response.json(pokemons)
                      } catch (err) {
                        return {
                            status: "Something went wrong",
                            message: err.message
                        }
                      }
                } else {
                    try {
                        let pokemons = await Pokemon.query()
                          .with("types")
                          .with("categories")
                          .where("name", "LIKE", "%" + name_like + "%")
                          .where("category_id", category)
                          .orderBy("id", "desc")
                          .limit(10).fetch();
                        return response.json(pokemons)
                      } catch (err) {
                        return {
                            status: "Something went wrong",
                            message: err.message
                        }
                      }
                }
            } else {
                try {
                    let pokemons = await Pokemon.query()
                      .with("types")
                      .with("categories")
                      .where("name", "LIKE", "%" + name_like + "%")
                      .orderBy("id", "desc")
                      .limit(10).fetch();
                    return response.json(pokemons)
                  } catch (err) {
                    return {
                        status: "Something went wrong",
                        message: err.message
                    }
                  }
            }
            
        } 
        
        else if (category) {
            if (type_in) {
                try {
                    let pokemons = await Pokemon.query()
                      .with("types")
                      .with("categories")
                      .where("category_id", category)
                      .where("type_id", type_in)
                      .orderBy("id", "desc")
                      .limit(10).fetch();
                    return response.json(pokemons)
                  } catch (err) {
                    return {
                        status: "Something went wrong",
                        message: err.message
                    }
                  }
            } else {
                try {
                    let pokemons = await Pokemon.query()
                      .with("types")
                      .with("categories")
                      .where("category_id", category)
                      .orderBy("id", "desc")
                      .limit(10).fetch();
                    return response.json(pokemons)
                  } catch (err) {
                    return {
                        status: "Something went wrong",
                        message: err.message
                    }
                  }
            }
        }

        else if (type_in) {
            if (name_like) {
                try {
                    let pokemons = await Pokemon.query()
                      .with("types")
                      .with("categories")
                      .where("name", "LIKE", "%" + name_like + "%")
                      .where("type_id", type_in)
                      .orderBy("id", "desc")
                      .limit(10).fetch();
                    return response.json(pokemons)
                  } catch (err) {
                    return {
                        status: "Something went wrong",
                        message: err.message
                    }
                  }
            } else {
                try {
                    let pokemons = await Pokemon.query()
                      .with("types")
                      .with("categories")
                      .where("type_id", type_in)
                      .orderBy("id", "desc")
                      .limit(10).fetch();
                    return response.json(pokemons)
                  } catch (err) {
                    return {
                        status: "Something went wrong",
                        message: err.message
                    }
                  }
            }
        }

        else {
            try {
                let pokemons = await Pokemon.query()
                .with("types")
                .with("categories").fetch()
                return response.json(pokemons)
            } catch (err) {
                return {
                    status: "Something went wrong",
                    message: err.message
                }
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
