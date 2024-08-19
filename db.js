import knexfile from './knexfile.js'
import knex from 'knex'

const db = knex(knexfile.development)
const connection = db

export function getTodos() {
  return db('todos').select()
}

// Your DB functions go here

export function deleteTodo(id, db = connection) {
  return db('todos').where('id', id).del()
}

export function close() {
  db.destroy()
}
