import knexfile from './knexfile.js'
import knex from 'knex'

const db = knex(knexfile.development)
const connection = db

export async function getTodos() {
  return db('todos').select()
}

// Your DB functions go here

export async function deleteTodo(id, db = connection) {
  return db('todos').where('id', id).del()
}

export async function insertTodo(task, db = connection) {
  const [newTaskId] = await db('todos').insert({ task }).returning('id')
  console.log(newTaskId)
  return newTaskId
}

export async function updateTodo(id, task, db = connection) {
  const [updatedTask] = await db('todos').where({ id: id }).update(
    {
      task: task,
    },
    ['id', 'task'],
  )

  return updatedTask
}

export async function toggleCompleted(id, db = connection) {
  const [task] = await db('todos').where({ id: id }).select('completed')
  const completed = task.completed ? 0 : 1

  const [updatedTask] = await db('todos').where({ id: id }).update(
    {
      completed: completed,
    },
    ['id', 'completed'],
  )

  return updatedTask
}

export async function close() {
  db.destroy()
}
