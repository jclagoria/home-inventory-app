const supertest = require('supertest');

const app = require('../../../app');

describe('POST /api/v1/items/item_types', () => {
    it('should respond with an object item type', async () => {
        const response = await supertest(app)
            .post('/api/v1/items/item_types')
            .send({
                name: "Mayonesa"
            })
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.status).toEqual(200);
    });

});

describe('GET /api/v1/items/item_types', () => {
    it('should respond with an array of item types', async () => {
        const response = await supertest(app)
            .get('/api/v1/items/item_types')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.status).toEqual(200);
    });

});





