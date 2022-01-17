import { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }

  public async boot() {
    // IoC container is ready
    const Response = this.app.container.use('Adonis/Core/Response')

    //Intercept erros
    Response.macro('handleError', function (messages) {
      const { message, error } = messages

      switch (messages.status) {
        case 400:
          this.badRequest({
            message,
            typeStatus: 'BAD REQUEST',
            definitionStatus:
              'The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).',
            error,
          })
          break

        case 401:
          this.badRequest({
            message,
            typeStatus: 'UNAUTHORIZED',
            definitionStatus:
              'The request has not been applied because it lacks valid authentication credentials for the target resource.',
            error,
          })
          break

        case 404:
          this.notFound({
            message,
            typeStatus: 'NOT FOUND',
            definitionStatus:
              'The origin server did not find a current representation for the target resource or is not willing to disclose that one exists.',
            error,
          })
          break

        default:
          this.status(messages.status).json(messages)
          break
      }

      return this
    })
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
