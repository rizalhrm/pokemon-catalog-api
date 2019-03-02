'use strict'

const Category = use('App/Models/Category');

class CategoryController {
    async index ({response}) {
        try {
            let categories = await Category.all()
            return response.json(categories)
        } catch (err) {
            return {
                status: "Something went wrong",
                message: err.message
            }
        }
    }
}

module.exports = CategoryController
