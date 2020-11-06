const supertest = require('supertest');

const app = require('../../app');

describe('GET /api/v1/states', () => {

    describe('POST /api/v1/states', () => {
        it('should respond with insert data', async () => {
            const response = await supertest(app)
                .post('/api/v1/states')
                .send({name: "Catamarca",
                        code: "CAT",
                    country_id: 11})
                .expect('Content-Type', /json/)
                .expect(200);

            expect(response.status).toEqual(200);
        });

    });

    it('should respond with an array of states', async () => {
        const response = await supertest(app)
            .get('/api/v1/states')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body.length).toBeGreaterThan(0);
    });

    it('should respond with an individual state', async () => {
        const response = await supertest(app)
            .get('/api/v1/states/StateParameters')
            .send({code: "CAT",
                country_id: 11})
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body.code).toBe("CAT");
    });

});


