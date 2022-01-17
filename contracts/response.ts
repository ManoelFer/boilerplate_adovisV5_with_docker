declare module '@ioc:Adonis/Core/Response' {
  interface ResponseContract {
    handleError(messages: { status: number; message: string; error: string }): this
  }
}
