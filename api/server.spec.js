const request = require('supertest')
const server = require('./server.js')
const db = require('../database/dbConfig.js')

describe('auth-router', () => {
    beforeEach(async () => {
        await db('users').truncate()
    })

    describe('POST /api/auth/register', () => {
        it('should return status 201', async () => {
            const post = {
                username: 'Ash',
                password: 'pass'
            }

            const response = await request(server).post('/api/auth/register').send(post)
            expect(response.status).toBe(201) 
        })

        it('should return json', async () => {
            const post = {
                username: 'Ash',
                password: 'pass'
            }

            const response = await request(server).post('/api/auth/register').send(post)
            expect(response.type).toBe('application/json') 
        })
    })



    
    describe('POST api/auth/login', () => {
        it('should return status 200 if successful', async () => {
          const post = {
              username: 'Ash',
              password: 'pass'
          }
  
          await request(server).post('/api/auth/register').send(post)
  
          const response = await request(server).post('/api/auth/login').send(post)
          expect(response.status).toBe(200) 
        })
  
        it('should return a token if successful', async () => {
          const post = {
              username: 'Ash',
              password: 'pass'
          }
  
  
          await request(server).post('/api/auth/register').send(post)
  
          const response = await request(server).post('/api/auth/login').send(post)
          expect(response.body.token).toBeDefined() 
         
        })
  
        it('should greet client if successful', async () => {
          const post = {
              username: 'Ash',
              password: 'pass'
          }
  
  
          await request(server).post('/api/auth/register').send(post)
  
          const response = await request(server).post('/api/auth/login').send(post)
          expect(response.body.message).toBe('Welcome Ash!')
        })
      })


})