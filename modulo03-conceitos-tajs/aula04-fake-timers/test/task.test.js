import { describe, it, expect, beforeEach, jest } from '@jest/globals'
import Task from '../src/task.js'
import { setTimeout } from 'node:timers/promises'

describe('Task Test Suite', () => {
  let _logMock
  let _task

  beforeEach(() => {
    _logMock = jest.spyOn(
      console,
      console.log.name
    ).mockImplementation()

    _task = new Task()
  })

  it.skip('should only run tasks that are due without fake timers (slow)', async () => {
    // AAA = Arrange, Act, Assert

    // Arrange
    const tasks = [
      {
        name: 'Task-Will-Run-In-5-Secs',
        dueAt:  new Date(Date.now() + 5000),
        fn: jest.fn()
      },
      {
        name: 'Task-Will-Run-In-5-Secs',
        dueAt:  new Date(Date.now() + 10000),
        fn: jest.fn()
      }
    ]

    // Act
    _task.save(tasks.at(0))
    _task.save(tasks.at(1))

    _task.run(200)

    await setTimeout(11e3)

    expect(tasks.at(0).fn).toHaveBeenCalled()
    expect(tasks.at(1).fn).toHaveBeenCalled()
  },
  // configurar para o jest aguardar 15 segundos nesse test
  15e3
  )

  it('should only run tasks that are due with fake timers (fast)', async () => {
    jest.useFakeTimers()
    // AAA = Arrange, Act, Assert

    // Arrange
    const tasks = [
      {
        name: 'Task-Will-Run-In-5-Secs',
        dueAt:  new Date(Date.now() + 5000),
        fn: jest.fn()
      },
      {
        name: 'Task-Will-Run-In-5-Secs',
        dueAt:  new Date(Date.now() + 10000),
        fn: jest.fn()
      }
    ]

    // Act
    _task.save(tasks.at(0))
    _task.save(tasks.at(1))

    _task.run(200)

    // ninguém deve ser executado ainda
    jest.advanceTimersByTime(4000)

    expect(tasks.at(0).fn).not.toHaveBeenCalled()
    expect(tasks.at(1).fn).not.toHaveBeenCalled()
    
    // 4 + 2 = 6 só a primeira tarefa deve executar
    jest.advanceTimersByTime(2000)

    expect(tasks.at(0).fn).toHaveBeenCalled()
    expect(tasks.at(1).fn).not.toHaveBeenCalled()
    
    // 4 + 2 + 4 = 10 a segunda tarefa deve executar
    jest.advanceTimersByTime(4000)

    expect(tasks.at(1).fn).toHaveBeenCalled()

    jest.useRealTimers()
  })
})