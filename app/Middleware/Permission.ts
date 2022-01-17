import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Permission {
  public async handle({ bouncer, auth }: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL

    let user = auth.user ? await auth.user.related('profile').query() : false

    if (user) {
      const isSuperAdmin = user
        ? user[0].serialize().name === 'super_admin'
          ? true
          : false
        : false

      if (isSuperAdmin) return next()

      await bouncer.authorize('deleteUser')

      await next()
    }
  }
}
