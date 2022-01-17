import User from 'App/Models/User'

export default class AuthController {
  public async login({ request, auth, response }) {
    const email = request.input('email')
    const password = request.input('password')
    console.log(`antes do acontecido`)

    // Lookup user manually
    const user = await User.query().where('email', email).whereNull('deleted_at').firstOrFail()

    const token = await auth.use('api').attempt(email, password)

    return response.status(200).json({ token: token.token, user: user.serialize() })
  }
}
