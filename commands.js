import { getTodos, deleteTodo, insertTodo, close, updateTodo } from './db.js'

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

export async function createRecord(task) {
  try {
    const created = await insertTodo(task)
    if (created) {
      console.log(`${task} has been created.`)
    } else {
      console.log(`${task} couldnt be created.`)
    }
  } catch (err) {
    logError(err)
  } finally {
    close()
  }
}

export async function updateRecord(id, task) {
  try {
    const updated = await updateTodo(id, task)
    if (updated) {
      console.log(`${id} has been updated.`)
    } else {
      console.log(`${id} couldnt be updated.`)
    }
  } catch (err) {
    logError(err)
  } finally {
    close()
  }
}

async function printTodos(todos) {
  todos.forEach((todo) => {
    console.info(`${todo.id}: ${todo.task}`)
  })
}

function logError(err) {
  console.error('Uh oh!', err.message)
}
