const request = require('supertest')
const server = require('./server.js')
const db = require('../database/dbConfig.js')

describe('auth-router', () => {
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
})