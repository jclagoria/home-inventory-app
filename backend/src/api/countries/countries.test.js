const supertest = require('supertest');

const app = require('../../app');

describe('GET /api/v1/countries', () => {

    it('should respond with an array of states', async () => {
        const response = await supertest(app)
            .get('/api/v1/country')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body.length).toBeGreaterThan(0);
    });
});

describe('POST /api/v1/country', () => {
    it('should respond with insert data', async () => {
        const response = await supertest(app)
            .post('/api/v1/country')
            .send({name: "Pais_Ficticio",
                code: "FP"})
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.status).toEqual(200);
    });

});

describe('POST /api/v1/country', () => {
    it('should respond with an individual state', async () => {
        const response = await supertest(app)
            .get('/api/v1/country/ByParameters')
            .send({id: 11})
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body.code).toBe("AR");
    });
});
