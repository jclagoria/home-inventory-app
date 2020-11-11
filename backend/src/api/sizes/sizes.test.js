const supertest = require('supertest');

const app = require('../../app');

describe('POST /api/v1/sizes', () => {
    it('should respond with insert data', async () => {
        const response = await supertest(app)
            .post('/api/v1/sizes')
            .send({
                name: "Size-1",
                length: 12.3,
                with: 6.00,
                height: 2.00,
                shape_id: 1,
                volume: 34.80
            })
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.status).toEqual(200);
    });

});

/*
describe('GET /api/v1/sizes', () => {

    it('should respond with an array of states', async () => {
        const response = await supertest(app)
            .get('/api/v1/sizes')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body.length).toBeGreaterThan(0);
    });

});

describe('GET /api/v1/sizes', () => {
    it('should respond with an individual state', async () => {
        const response = await supertest(app)
            .get('/api/v1/sizes/ByParameters')
            .send({id: 1})
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.status).toEqual(200);
    });
});
*/

