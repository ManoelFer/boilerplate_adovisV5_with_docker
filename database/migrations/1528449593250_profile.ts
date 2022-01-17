import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Roles extends BaseSchema {
  protected tableName = 'profiles'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').unique().unsigned()
      table.string('name').unique().notNullable()
      table.string('description').notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
