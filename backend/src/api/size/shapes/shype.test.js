const supertest = require('supertest');

const app = require('../../../app');

describe('POST /api/v1/sizes/shapes', () => {
    it('should respond with an object Shape', async () => {
        const response = await supertest(app)
            .post('/api/v1/sizes/shapes')
            .send({
                name: "Cajas 18x30"
            })
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.status).toEqual(200);
    });

});

describe('GET /api/v1/sizes/shapes', () => {
    it('should respond with an array of Shapes', async () => {
        const response = await supertest(app)
            .get('/api/v1/sizes/shapes')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.status).toEqual(200);
    });

});





