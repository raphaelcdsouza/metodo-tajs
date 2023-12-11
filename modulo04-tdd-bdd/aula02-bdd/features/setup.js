import { Given, AfterAll } from '@cucumber/cucumber'
import sinon from 'sinon'

import { server } from '../src/api.js'

let _testServer
let _testServerAddress

function waitForServerStatus(server) {
  return new Promise((resolve, reject) => {
    server.once('error', (err) => reject(err))
    server.once('listening', () => resolve())
  })
}

AfterAll(done => {''
  sinon.restore()
  server.closeAllConnections()
  _testServer.close(done)
})

Given('I have a running server', async function () {
  // se o servidor já estiver rodando, usa ele!
  if (_testServer) {
    this.testServerAddress = `http://localhost:${_testServer.address().port}`
    return
  }

  _testServer = server.listen()

  await waitForServerStatus(_testServer)

  this.testServerAddress = `http://localhost:${_testServer.address().port}`
})

Given('The current date is {string}', async function (date) {
  sinon.restore()
  const clock = sinon.useFakeTimers(new Date(date).getTime())
  this.clock = clock
})