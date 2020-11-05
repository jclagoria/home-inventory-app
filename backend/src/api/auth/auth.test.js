const supertest = require('supertest');

const app = require('../../app');

describe('Post /api/v1/auth/signup', () => {
    it('should respond with an code 200', async () => {
        const response = await supertest(app)
            .post('/api/v1/auth/signup')
            .send({name: 'kmaluma', email: 'karolo98@gmail.com', password: 'Shenkun#1980'})
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body.user.name).toEqual('kmaluma');
    });
});

describe('Post /api/v1/auth/signup', () => {
    it('should respond with an code 403', async () => {
        const response = await supertest(app)
            .post('/api/v1/auth/signup')
            .send({name: 'jklunma', email: 'karolo98@gmail.com', password: 'Shenkun#1981'})
            .expect('Content-Type', /json/)
            .expect(403);

        expect(response.body.status).toEqual(403);
    });
});

describe('Post /api/v1/auth/login', () => {
    it('should respond with 200 ', async () => {
        const response = await supertest(app)
            .post('/api/v1/auth/login')
            .send({email: 'lagoria79@yahoo.com.ar', password: 'Shenkun#1091'})
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body.user.id).toEqual(1);
    });
});
