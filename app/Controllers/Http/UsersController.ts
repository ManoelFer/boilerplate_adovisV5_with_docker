import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { DateTime } from 'luxon'
import CreateUser from 'App/Validators/User/CreateUserValidator'
import UpdateUser from 'App/Validators/User/UpdateUserValidator'

import User from 'App/Models/User'
import { UserFactory } from 'Database/factories'

export default class UsersController {
  public async index({ response }: HttpContextContract) {
    const users = await User.all()

    return response.ok(users)
  }

  public async store({ request, response }: HttpContextContract) {
    const data = request.all()

    await request.validate(CreateUser)

    try {
      const user = await User.create(data)

      return response.ok(user)
    } catch (error) {
      response.handleError({
        status: error.status || 400,
        message: 'Falha na criação do usuário',
        error: error.message,
      })
    }
  }

  public async show({ response }: HttpContextContract) {
    try {
      const users = await User.findOrFail(1)

      return response.ok(users)
    } catch (error) {
      response.handleError({
        status: error.status || 400,
        message: 'Usuário não encontrado',
        error: error.message,
      })
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    const data = request.all()

    await request.validate(UpdateUser)

    try {
      const user = await User.findByOrFail('secure_id', params.id)

      await user.merge(data).save()

      return response.ok(user)
    } catch (error) {
      response.handleError({
        status: error.status || 400,
        message: 'Falha na atualização do usuário',
        error: error.message,
      })
    }
  }

  //TODO UsersController: Activates and deactivates a user
  public async destroy({ params, response }: HttpContextContract) {
    try {
      const user = await User.findByOrFail('secure_id', params.id)

      user.deletedAt = user.deletedAt ? null : DateTime.now()

      await user.save()

      return response.ok(user)
    } catch (error) {
      response.handleError({
        status: error.status || 400,
        message: 'Falha na exclusão do usuário',
        error: error.message,
      })
    }
  }

  public async storeFake({ response }: HttpContextContract) {
    const users = await UserFactory.createMany(1000)

    return response.status(200).json(users)
  }
}
