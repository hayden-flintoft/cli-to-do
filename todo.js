#!/usr/bin/env node
import * as commands from './commands.js'

const userInputs = process.argv
const cmd = userInputs[2] // This is the first relevant element in a provided command input. In this context it will be list, lst, del or delete.
const arg1 = userInputs[3] // This is the second relevant element which in this case would include an id for operating on.
const arg2 = userInputs[4] // Used for updating task

// Convert arg1 to a number
const taskId = Number(arg1)

switch (cmd) {
  case 'list':
  case 'lst':
  case 'l':
    await commands.list()
    break

  case 'remove':
  case 'delete':
  case 'del':
  case 'd':
    if (!taskId || isNaN(taskId)) {
      console.log('No valid ID has been provided. Please enter a number.')
    } else {
      await commands.deleteRecord(arg1)
    }
    break

  case 'add':
  case 'create':
  case 'insert':
  case 'ins':
  case 'i':
    if (!arg1) {
      console.log('No task has been provided.')
    } else {
      await commands.createRecord(arg1)
    }
    break

  case 'update':
  case 'upd':
  case 'up':
  case 'u':
    if (!taskId || isNaN(taskId)) {
      console.log('No valid ID has been provided. Please enter a number.')
    } else if (!arg2) {
      console.log('No valid task has been provided in argument 2.')
    } else {
      await commands.updateRecord(arg1, arg2)
    }
    break

  default:
    console.log(`I don't understand that command: ${cmd}`)
}
