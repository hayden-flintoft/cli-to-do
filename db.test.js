import { beforeAll, beforeEach, afterAll, expect, describe, it } from 'vitest'
import { insertTodo, deleteTodo, updateTodo, getTodos } from './db.js'
import db from './connection.js'

beforeAll(async () => {
  await db.migrate.latest()
})

beforeEach(async () => {
  await db.seed.run()
})

afterAll(async () => {
  await db.destroy()
})

describe('getTodos', () => {
  it('returns an array of all todos', async () => {
    // ARRANGE
    const exampleObj = {
      id: 1,
      task: 'clean my room',
    }

    // ACT
    const todos = await getTodos()

    // ASSERT
    expect(todos).toHaveLength(4)
    expect(todos[0]).toStrictEqual(exampleObj)
    expect(todos[todos.length - 1].task).toBe('Something')
  })
})

describe('deleteTodo', () => {
  it('deletes a todo record from the database', async () => {
    // ARRANGE
    // ACT
    const todos = await deleteTodo(1)
    // ASSERT
  })

  it('throws an error if no id is passed in', async () => {
    // ARRANGE
    // ACT
    try {
    } catch (error) {}
    // ASSERT
  })
})
//  @vitest/coverage-v8 Coverage <=Install with npm
