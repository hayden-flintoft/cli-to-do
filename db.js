import knexfile from './knexfile.js'
import knex from 'knex'

const db = knex(knexfile.development)
const connection = db

export function getTodos(filter = {}) {
  const query = db('todos').select()
  // console.log('Initial query:', query.toString())
  if (filter.completed !== undefined) {
    query.where('completed', filter.completed)
    // console.log('Modified query:', query.toString())
  }

  return query
}

// Your DB functions go here

export async function deleteTodo(id, db = connection) {
  return db('todos').where('id', id).del()
}

export async function insertTodo(task, db = connection) {
  const [newTaskId] = await db('todos').insert({ task }).returning('id')
  // console.log(newTaskId)
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
  await db.destroy()
}
