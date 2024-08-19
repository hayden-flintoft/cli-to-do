import { getTodos, deleteTodo, close } from './db.js'

export async function list() {
  try {
    const todos = await getTodos()
    printTodos(todos)
  } catch (err) {
    logError(err)
  } finally {
    close()
  }
}

export async function deleteRecord(id) {
  try {
    const deleted = await deleteTodo(id)
    if (deleted) {
      console.log(`Record with ID ${id} has been deleted.`)
    } else {
      console.log(`No record found with ID ${id}.`)
    }
  } catch (err) {
    logError(err)
  } finally {
    close()
  }
}

function printTodos(todos) {
  todos.forEach((todo) => {
    console.info(`${todo.id}: ${todo.task}`)
  })
}

function logError(err) {
  console.error('Uh oh!', err.message)
}
