const supertest = require('supertest');

const app = require('../../app');

describe('POST /api/v1/address', () => {
    it('should respond with an array of address', async () => {
        const response = await supertest(app)
            .post('/api/v1/address')
            .send({street_address_1: "yatay 911",
                street_address_2: "patay 911",
                city: "capital federal",
                state_id: 2,
                zipcode: "ii890",
                latitude: -34.3801,
                longitude: -58.7899})
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.status).toEqual(200);
    });

});

describe('GET /api/v1/address', () => {
    it('should respond with an array of address', async () => {
        const response = await supertest(app)
            .get('/api/v1/address')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.status).toEqual(200);
    });

});





