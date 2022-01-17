import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    const uniqueKey = 'email'

    await User.updateOrCreateMany(uniqueKey, [
      {
        name: 'admin',
        email: 'admin@admin.com',
        password: 'admin',
        profileId: 1,
      },
      {
        name: 'Aristóteles',
        email: 'ari@email.com',
        password: 'admin',
        profileId: 2,
      },
      {
        name: 'Manoel',
        email: 'manoel@email.com',
        password: 'admin',
        profileId: 3,
      },
    ])
  }
}
