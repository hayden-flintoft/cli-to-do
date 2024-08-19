export async function up(knex) {
  console.log('Running migration: Creating todos table')
  return knex.schema
    .createTable('todos', function (table) {
      table.increments('id')
      table.string('task').notNullable()
      table.integer('completed').defaultTo(0)
    })
    .then(() => {
      console.log('todos table created successfully')
    })
    .catch((error) => {
      console.error('Error creating todos table:', error)
    })
}

export async function down(knex) {
  console.log('Rolling back migration: Dropping todos table')
  return knex.schema
    .dropTable('todos')
    .then(() => {
      console.log('todos table dropped successfully')
    })
    .catch((error) => {
      console.error('Error dropping todos table:', error)
    })
}
