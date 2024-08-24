#!/usr/bin/env node
import * as commands from './commands.js'

function main() {
  const userInputs = process.argv.slice(2).map(sanitiseInput)
  const cmd = parseCommand(userInputs)
  const flags = parseFlags(userInputs)
  const taskId = parseTaskId(userInputs)
  const task = parseTask(userInputs)

  handleUnknownFlags(flags.unknownFlags)

  if (flags.help) {
    commands.displayHelp(cmd)
  } else {
    executeCommand(cmd, flags, taskId, task)
  }
}

// Sanitize input
function sanitiseInput(input) {
  return input
    .replace(/[\r\n]/g, ' ')
    .replace(/["]/g, "'")
    .trim()
}

// Extract and validate command
function parseCommand(inputs) {
  return inputs[0]
}

function parseFlags(inputs) {
  const knownFlags = ['-completed', '-incomplete', '-h', '-help']
  const inputFlags = inputs.filter((input) => input.startsWith('-'))
  const flags = {
    '-completed': inputFlags.includes('-completed'),
    '-incomplete': inputFlags.includes('-incomplete'),
    help: inputFlags.includes('-h') || inputFlags.includes('-help'),
    unknownFlags: inputFlags.filter((flag) => !knownFlags.includes(flag)),
  }
  return flags
}

// Handle multi-word tasks without requiring quotes
function parseTask(inputs) {
  const commandAndFlagsCount = 1 + parseFlags(inputs).unknownFlags.length
  const taskArray = inputs.slice(commandAndFlagsCount).join(' ')
  return convertToSentenceCase(taskArray)
}

// Convert task case to sentence case
function convertToSentenceCase(task) {
  return task.charAt(0).toUpperCase() + task.slice(1).toLowerCase()
}

// Parse and validate task ID (if applicable)
function parseTaskId(inputs) {
  const taskId = Number(inputs[1])
  return isNaN(taskId) ? null : taskId
}

// Handle unknown flags
function handleUnknownFlags(unknownFlags) {
  if (unknownFlags.length > 0) {
    console.error(`Unknown flag(s) detected: ${unknownFlags.join(', ')}`)
    console.error('Use -h or -help to display help.')
    process.exit(1)
  }
}

// executeCommand will go here
async function executeCommand(cmd, flags, taskId, task) {
  try {
    switch (cmd) {
      case 'list':
      case 'lst':
      case 'l':
        await handleListCommand(flags)
        break

      case 'remove':
      case 'delete':
      case 'del':
      case 'd':
        await handleDeleteCommand(taskId)
        break

      case 'add':
      case 'create':
      case 'insert':
      case 'ins':
      case 'i':
        await handleAddCommand(task)
        break

      case 'update':
      case 'upd':
      case 'up':
      case 'u':
        handleUpdateCommand(taskId, task)
        break

      case 'check':
      case 'c':
        handleCheckCommand(taskId)
        break

      case 'help':
        commands.displayHelp('general')
        break

      default:
        console.log(`I don't understand that command: ${cmd}`)
        commands.displayHelpNag('general')
    }
  } catch (error) {
    console.error(`An error occurred: ${error.message}`)
    commands.displayHelp(cmd)
    process.exit(1)
  }
}

// Command handlers
async function handleListCommand(flags) {
  if (flags['-completed']) {
    await commands.list({ filter: 'completed' })
  } else if (flags['-incomplete']) {
    await commands.list({ filter: 'incomplete' })
  } else {
    await commands.list()
  }
}

async function handleDeleteCommand(taskId) {
  if (!taskId) {
    throw new Error('No valid ID has been provided. Please enter a number.')
  } else {
    await commands.deleteRecord(taskId)
  }
}

async function handleAddCommand(task) {
  if (!task) {
    throw new Error('No task has been provided.')
  } else {
    await commands.createRecord(task)
  }
}

async function handleUpdateCommand(taskId, task) {
  if (!taskId) {
    throw new Error('No valid ID has been provided. Please enter a number.')
  } else if (!task) {
    throw new Error('No valid task has been provided.')
  } else {
    await commands.updateRecord(taskId, task)
  }
}

async function handleCheckCommand(taskId) {
  if (!taskId) {
    throw new Error('No valid ID has been provided. Please enter a number.')
  } else {
    await commands.toggleCompleteRecord(taskId)
  }
}

main()
