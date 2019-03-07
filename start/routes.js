'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in POKEMON DUMB' }
})

Route.group(() => {
  Route.get('/', 'CategoryController.index');
  Route.get('/:id', 'CategoryController.show');
}).prefix("api/v1/categories");

Route.group(() => {
  Route.get('/', 'TypeController.index');
  Route.get('/:id', 'TypeController.show');
}).prefix("api/v1/types");

Route.group(() => {
  Route.get('pokemons', 'PokemonController.index');
  Route.get('pokemon/:id', 'PokemonController.show');
  Route.post('pokemon', 'PokemonController.store');
  Route.patch('pokemon/:id', 'PokemonController.update');
  Route.delete('pokemon/:id', 'PokemonController.delete');

  Route.post("register", "AuthController.register").middleware('guest')
  Route.post("login", "AuthController.login").middleware('guest')
  Route.post("logout", "AuthController.logout").middleware("auth")
  Route.post("refresh_token", "AuthController.refreshToken")
  Route.get("profile", "AuthController.profile").middleware("auth")

  Route.get('auth/check', 'AuthController.accountCheck').middleware('auth')
}).prefix("api/v1");

Route.group(() => {
  Route.get("/:uid", "ProfileController.getProfile").middleware("auth");
  Route.post("/", "ProfileController.updateProfile").middleware("auth");
}).prefix("api/v1/profile");