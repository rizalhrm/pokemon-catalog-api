'use strict'

const Type = use('App/Models/Type');

class TypeController {
    async index ({response}) {
        try {
            let types = await Type.all()
            return response.json(types)
        } catch (err) {
            return {
                status: "Something went wrong",
                message: err.message
            }
        }
    }
}

module.exports = TypeController
