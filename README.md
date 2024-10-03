# CLI-To-Do

A command-line todo application built using Node.js, Knex, and SQLite3.

This tool allows you to manage your tasks via simple CLI commands, supporting task creation, deletion, updates, and marking tasks as completed without removing them from the database. The app stores data using SQLite3 and provides a lightweight, portable todo manager for developers who prefer the command line.

## Stack

- **Node.js**: JavaScript runtime for building the CLI.
- **Knex**: SQL query builder for interacting with the SQLite database.
- **SQLite3**: The relational database to store tasks.
- **ESM**: Ecmascript modules for modern JavaScript syntax.

## Features

- Add tasks
- List tasks (all, completed, or incomplete)
- Update tasks
- Delete tasks
- Mark tasks as complete or incomplete

## Setup

### Prerequisites

Ensure you have Node.js and NPM installed on your system.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/CLI-To-Do.git
   cd CLI-To-Do
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Set file permissions for the CLI script:
   ```bash
   chmod +x todo.js
   ```
4. Set up the SQLite3 database:

   - Create the initial database migration:

     ```bash
     npm run knex migrate:make todos
     ```

   - Run the migration to create the `todos` table:
     ```bash
     npm run knex migrate:latest
     ```

5. Seed the database with example data (optional):
   ```bash
   npm run knex seed:make test-tasks
   npm run knex seed:run
   ```

## Usage

The CLI can be run using the following commands:

### List tasks

```bash
./todo.js list
```

#### Outputs:

```bash
1: [ ] Vacuum the house
2: [✓] Buy groceries
```

#### List only completed tasks:

```bash
./todo.js list -completed
```

#### List only incomplete tasks:

```bash
./todo.js list -incomplete
```

### Add a new task

```bash
./todo.js add "Feed the cat"
```

#### Outputs:

```bash
Feed the cat has been created.
```

### Update a task

```bash
./todo.js update 1 "Vacuum the entire house"
```

#### Outputs:

```bash
Record with ID 1 has been updated.
```

### Delete a task

```bash
./todo.js delete 1
```

#### Outputs:

```bash
Record with ID 1 has been deleted.
```

### Mark a task as complete

```bash
./todo.js check 2
```

#### Outputs:

```bash
2 has been updated.
```

## Aliases

These are shorthand commands you can use in place of the main command:

- **List:**

  - `list`
  - `lst`
  - `l`

- **Add:**

  - `add`
  - `create`
  - `insert`
  - `ins`
  - `i`

- **Delete:**

  - `delete`
  - `remove`
  - `del`
  - `d`

- **Update:**

  - `update`
  - `upd`
  - `up`
  - `u`

- **Toggle Completion Status:**
  - `check`
  - `c`

## Flags

Flags are used to modify the behaviour of a command:

- **Help Flags:**

  - `-h`
  - `-help`
  - `-?`

- **Filter Flags for Listing:**
  - `-completed`: Lists only the completed tasks.
  - `-incomplete`: Lists only the incomplete tasks.

## Accessing Help

There are several ways to access help for the `CLI-To-Do` application:

### 1. **General Help:**

Use the `help` command to display the general help message with all available commands and options.

```bash
./todo.js help
```

#### Output:

```bash
Usage: ./todo.js <command> [options]

  Commands:
    list:        List all tasks
    add:         Add a new task
    delete:      Delete a task by ID
    update:      Update a task by ID
    check:       Toggle the completion status of a task by ID
    help:        Show this help message

  Options/Flags:
    -h, -help:   Show help for a specific command
    -completed:  Show only completed tasks
    -incomplete: Show only incomplete tasks
```

### 2. **Help for a Specific Command:**

You can get help for a specific command by typing the command followed by the `-h` or `-help` flag.

```bash
./todo.js list -h
```

#### Output:

```bash
Function: List
Command:  list
Aliases:  lst, l

Description: List all tasks

Usage: ./todo.js list [options]

Options:
-completed    List only completed tasks
-incomplete   List only incomplete tasks
-h, -help     Show this help message

```

### 3. **Shorthand Help Flags:**

Use any of the following flags to access help at any time:

- `-h`
- `-help`
- `-?`

#### Example:

```bash
./todo.js -help
```

This will show the general help message.
