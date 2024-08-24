#!/usr/bin/env node
import * as commands from './commands.js'

const userInputs = process.argv.slice(2).map(sanitiseInput)
const cmd = userInputs[0] // This is the first relevant element in a provided command input. In this context it will be list, lst, del or delete.
const arg1 = userInputs[1] // This is the second relevant element which in this case would include an id for operating on.
const arg2 = userInputs[2] // Used for updating task

// Convert arg1 to a number
const taskId = Number(arg1)

const flags = {
  '-completed': userInputs.includes('-completed'),
  '-incomplete': userInputs.includes('-incomplete'),
  '-h': userInputs.includes('-h'),
  '-help': userInputs.includes('-help'),
}

// TODO: Logic to handle multiple words without quotes.
// TODO: Convert case to Pascal
// TODO: Testing

const inputFlags = userInputs.filter((input) => input.startsWith('-'))
const unknownFlags = inputFlags.filter(
  (flag) => !Object.keys(flags).includes(flag),
)

if (unknownFlags.length > 0) {
  console.error(`Unknown flag(s) detected: ${unknownFlags.join(', ')}`)
  console.error(`Use -h, or -help, to display help.`)
  process.exit(1)
}

if (flags['-h'] || flags['-help']) {
  commands.displayHelp(cmd)
} else {
  switch (cmd) {
    case 'list':
    case 'lst':
    case 'l':
      if (flags['-completed']) {
        await commands.list({ filter: 'completed' })
      } else if (flags['-incomplete']) {
        await commands.list({ filter: 'incomplete' })
      } else {
        await commands.list()
      }
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
        await commands.updateRecord(taskId, arg2)
      }

      break

    case 'check':
    case 'c':
      if (!taskId || isNaN(taskId)) {
        console.log('No valid ID has been provided. Please enter a number.')
      } else {
        await commands.toggleCompleteRecord(taskId)
      }

      break
    case 'help':
      commands.displayHelp('general')
      break
    default:
      console.log(`I don't understand that command: ${cmd}`)
      commands.displayHelpNag('general')
  }
}

function sanitiseInput(input) {
  return input
    .replace(/[\r\n]/g, ' ')
    .replace(/["]/g, "'")
    .trim()
}


