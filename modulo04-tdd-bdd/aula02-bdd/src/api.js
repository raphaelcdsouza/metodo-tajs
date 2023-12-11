import { createServer } from 'node:http'
import { once } from 'node:events'
import { randomUUID } from 'node:crypto'

const usersDb = []

function getUserCategory(birthDay) {
  const birthDate = new Date(birthDay)
  const now = new Date()

  if (birthDate > now) {
    throw new Error('Invalid birth date')
  }

  const age = new Date().getFullYear() - new Date(birthDay).getFullYear()
  if (age < 18) {
    throw new Error('User must be 18yo or older')
  }

  if (age >= 18 && age <= 25) {
    return 'young-adult'
  }

  if (age > 25 && age <= 50) {
    return 'adult'
  }

  return 'senior'
}

const server = createServer(async (request, response) => {
  try {    
    if (request.url === '/users' && request.method === 'POST') {
      const user = JSON.parse(await once(request, 'data'))

      if (!user.name) {
        throw new Error('Should contain valid name')
      }

      const updatedUser = {
        ...user,
        id: randomUUID(),
        category: getUserCategory(user.birthDay)
      }
      usersDb.push(updatedUser)
      response.writeHead(201, {
        'Content-Type': 'application/json'
      })
      response.end(JSON.stringify({
        id: updatedUser.id
      }))
      return
    }
  
    if (request.url.startsWith('/users') && request.method === 'GET') {
      const [,, id] = request.url.split('/')
      const user = usersDb.find(user => user.id === id)
  
      response.end(JSON.stringify(user))
      return
    }
  } catch (error) {
    if (error.message.includes('18yo') || error.message.includes('valid name') || error.message.includes('birth date')) {
      response.writeHead(400, {
        'Content-Type': 'application/json'
      })
      response.end(JSON.stringify({
        message: error.message
      }))
      return
    }

    response.writeHead(500, {
      'Content-Type': 'application/json'
    })
    response.end(JSON.stringify({
      message: 'deu ruim'
    }))
  }
})

export { server }