import {
  getTodos,
  deleteTodo,
  insertTodo,
  close,
  updateTodo,
  toggleCompleted,
} from './db.js'

export async function list({ filter } = {}) {
  try {
    // console.log(`Actual flags: ${filter}`)
    let filterOptions = {}

    if (filter === 'completed') {
      // console.log(`Filter should read completed: ${filter}`)
      filterOptions = { completed: 1 }
    } else if (filter === 'incomplete') {
      // console.log(`Filter should read incomplete: ${filter}`)
      filterOptions = { completed: 0 }
    }

    const todos = await getTodos(filterOptions)
    // console.log(`Todos retrieved: ${JSON.stringify(todos)}`)

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
    list()
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
    list()
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
    list()
  }
}

export async function toggleCompleteRecord(id) {
  try {
    const updated = await toggleCompleted(id)
    if (updated) {
      console.log(`${id} has been updated.`)
    } else {
      console.log(`${id} couldnt be updated.`)
    }
  } catch (err) {
    logError(err)
  } finally {
    list()
  }
}

export async function printTodos(todos) {
  // console.log(`Printing todos: ${JSON.stringify(todos)}`)

  todos.forEach((todo) => {
    const status = todo.completed ? '[✓]' : '[ ]'
    console.info(`${status}: ${todo.id}: ${todo.task}`)
  })

  displayHelpNag()
}

function logError(err) {
  console.error('Uh oh!', err.message)
}

function displayHelpNag() {
  console.log(
    `\nRemember, you can get a full list of commands using the help command or get specific help by adding a help flag (-h, -help, -?) to any command.\n`,
  )
}

// Help messages for each command
const helpMessages = {
  general: `
Usage: ./todo.js <command> [options]

Commands:
  list:                             List all tasks 
  add <task>:                       Add a new task
  delete <id>:                      Delete a task by ID
  update <id> <task>:               Update a task by ID
  check <id>:                    Toggle the completion status of a task by ID
  help:                             Show this help message 

Options/Flags:
  -h, -help:                        Show help for a specific command
  -completed:                       Show only completed tasks
  -incomplete:                      Show only incomplete tasks

Aliases:
You can use any aliases in place of a command.
 List:                              lst, l
 add:                               create, insert, ins, i
 delete:                            remove, del, d
 update:                            upd, up, u
 check:                             c

Examples:
  ./todo.js list:                   List all tasks
  ./todo.js list -completed:        List all completed tasks
  ./todo.js list -incomplete:       List all incomplete tasks
  ./todo.js add "Do the dishes":    Add a new task called "Do the dishes"
  ./todo.js remove 1:               Remove task with ID 1
  ./todo.js update 1 "Go shopping": Update task with ID 1
  ./todo.js check 1:                Toggle the completion status of task with ID 1
`,
  list: `
Function: List
Command:  list
Aliases:  lst
          l

Description: List all tasks
 
Usage: ./todo.js list [options]

Options:
  -completed    List only completed tasks
  -incomplete   List only incomplete tasks
  -h, -help     Show this help message
`,
  add: `
Function: Add Task
Command:  add <task>
Aliases:  create
          insert
          ins
          i

Description: Add a new task
 
Usage: ./todo.js add <task>

Arguments:
  <task>  The task description

Options:
  -h, -help Show this help message
`,
  remove: `
Function: Remove Task
Command:  remove <id>
Aliases:  remove
          del
          d

Description: Delete a task by ID
 
Usage: ./todo.js remove <id>

Arguments:
  <id>    The ID of the task to remove

Options:
  -h, -help Show this help message
`,
  update: `
Function: Update Task
Command:  update <id> <task>
Aliases:  upd
          up
          u

Description: Update a task by ID
 
Usage: ./todo.js update <id> <task>

Arguments:
  <id>    The ID of the task to update
  <task>  The new task description

Options:
  -h, -help, Show this help message
`,
  check: `
Function: Toggle Completion Status
Command:  check <id>
Aliases:  c

Description: Toggle the completion status of a task by ID
 
Usage: ./todo.js check <id>

Arguments:
  <id>    The ID of the task to toggle completion status

Options:
  -h, -help Show this help message
`,
  input: `
Did you know you can ask for help using help for a complete list or by adding any of the following flags at the end of an incomplete command using any of the following flags: -h, -help
`,
}

export function displayHelp(command) {
  switch (command) {
    case 'list':
    case 'lst':
    case 'l':
      console.log(helpMessages.list)
      break
    case 'add':
    case 'create':
    case 'insert':
    case 'ins':
    case 'i':
      console.log(helpMessages.add)
      break
    case 'remove':
    case 'delete':
    case 'del':
    case 'd':
      console.log(helpMessages.remove)
      break
    case 'update':
    case 'upd':
    case 'up':
    case 'u':
      console.log(helpMessages.update)
      break
    case 'check':
    case 'c':
      console.log(helpMessages.check)
      break
    default:
      console.log(helpMessages.general)
      break
  }
}
