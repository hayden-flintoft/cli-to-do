/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('todos').del()
  await knex('todos').insert([
    { id: 1, task: 'Gardening' },
    { id: 2, task: 'Dishes' },
    { id: 3, task: 'Buy stuff' },
  ])
}
