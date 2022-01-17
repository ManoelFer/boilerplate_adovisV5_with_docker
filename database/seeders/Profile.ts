import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Profile from 'App/Models/Profile'

export default class ProfileSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    const uniqueKey = 'name'

    await Profile.updateOrCreateMany(uniqueKey, [
      {
        name: 'super_admin',
        description: 'Faz qualquer solicitação ao banco',
      },
      {
        name: 'admin',
        description: 'Faz qualquer solicitação ao banco, exceto excluir um usuário',
      },
      {
        name: 'employee',
        description: 'Executa somente querys de consulta',
      },
    ])
  }
}
