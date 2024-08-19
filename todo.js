#!/usr/bin/env node
import * as commands from './commands.js'

const userInputs = process.argv
const cmd = userInputs[2] // This is the first relevant element in a provided command input. In this context it will be list, lst, del or delete.
const arg = userInputs[3] // This is the second relevant element which in this case would include an id for operating on.

switch (cmd) {
  case 'list':
  case 'lst':
    await commands.list()
    break

  case 'delete':
  case 'del':
    if (!arg) {
      console.log('No ID has been provided.')
    } else {
      await commands.deleteRecord(arg)
    }
    break

  default:
    console.log(`I don't understand that command: ${cmd}`)
}
