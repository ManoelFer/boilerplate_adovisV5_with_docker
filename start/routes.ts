/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

//TODO Public Routes
Route.group(() => {
  Route.post('/login', 'AuthController.login')

  Route.post('/users', 'UsersController.store')

  Route.post('/userFactories', 'UsersController.storeFake')
}).prefix('/v1')

//TODO Auth Routes
Route.group(() => {
  Route.resource('/users', 'UsersController').except(['store'])
})
  .prefix('/v1')
  .middleware(['auth', 'permission'])
