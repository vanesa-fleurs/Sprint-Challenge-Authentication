const request = require('supertest')
const server = require('./server.js')
const db = require('../database/dbConfig.js')
const bcrypt = require('bcryptjs')




describe('server', () => {

    beforeEach(async () => {
        await db('users').truncate();
    });

    describe('POST /REGISTER', () => {
        it('should return 201 status', () => {
            return request(server).post('/api/auth/register')
                .send({
                    username: "fleurs",
                    password: "slfkefcs"
                })
                .set('Content-Type', 'application/json')
                .then(res => {
                    expect(res.status).toBe(201)
                    expect(res.body.username).toBe('fleurs')
                })
        })

        it('username should be {Name}', () => {
            return request(server).post('/api/auth/register')
                .send({
                    username: "Leonardo",
                    password: "pass"
                })
                .set('Content-Type', 'application/json')
                .then(res => {
                    expect(res.status).toBe(201)
                    expect(res.body.username).toBe('Leonardo')
                })
        })
    })
});

let token;

describe('POST /LOGIN', () => {
    it('Token should exist', async () => {
        // await db.seed.run()
        await db('users').insert([
            { username: "admin", password: bcrypt.hashSync("admin", 16) },
            { username: "user", password: bcrypt.hashSync("test", 16) }
        ])

        const res = await request(server).post('/api/auth/login')
            .send({
                username: "admin",
                password: "admin"
            })
            .set('Content-Type', 'application/json')

        expect(res.status).toBe(200)
        expect(res.body.token).toBeTruthy()

        token = res.body.token;
    });

    it('should return 200 status', () => {
        return request(server).post('/api/auth/login')
            .send({
                username: "admin",
                password: "admin"
            })
            .set('Content-Type', 'application/json')
            .then(res => {
                expect(res.status).toBe(200)
                expect(res.body.message).toBe('Welcome admin!')
            });
    })

    it('username should be `${Name}`', () => {
        return request(server).post('/api/auth/login')
            .send({
                username: "Leonardo",
                password: "pass"
            })
            .set('Content-Type', 'application/json')
            .then(res => {
                expect(res.status).toBe(200)
                expect(res.body.message).toBe('Welcome Leonardo!')
            })
    })
})




describe('GET /api/users', () => {
    it('returns json OK', () => {
        return request(server).get('/api/jokes')
            .expect('Content-Type', /json/)
    });

    it('should return 200 Status', () => {
        return request(server).get('/api/jokes')
            .set('authorization', token)
            .then(res => {
                expect(res.status).toBe(200)
            })
    })

})


