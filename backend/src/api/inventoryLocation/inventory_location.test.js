const supertest = require('supertest');

const app = require('../../app');

describe('GET /api/v1/countries', () => {

    describe('POST /api/v1/inventory_location', () => {
        it('should respond with insert data', async () => {
            const response = await supertest(app)
                .post('/api/v1/inventory_location')
                .send({name: "Inventario ficticio",
                        description: "Es un inventario de test"})
                .expect('Content-Type', /json/)
                .expect(200);

            expect(response.status).toEqual(200);
        });

    });

    it('should respond with an array of states', async () => {
        const response = await supertest(app)
            .get('/api/v1/inventory_location')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body.length).toBeGreaterThan(0);
    });

    it('should respond with an individual state', async () => {
        const response = await supertest(app)
            .get('/api/v1/inventory_location/ByParameters')
            .send({id: 1})
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.status).toBe(200);
    });

});


