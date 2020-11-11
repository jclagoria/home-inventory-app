const supertest = require('supertest');

const app = require('../../app');

describe('POST /api/v1/items', () => {
    it('should respond with insert data', async () => {
        const response = await supertest(app)
            .post('/api/v1/items')
            .send({
                user_id: 1,
                name: "mayonesa comun",
                item_type_id: 1,
                company_id: 1,
                size_id: 1
            })
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.status).toEqual(200);
    });

});

describe('GET /api/v1/items', () => {

    it('should respond with an array of states', async () => {
        const response = await supertest(app)
            .get('/api/v1/items')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body.length).toBeGreaterThan(0);
    });

});

/*

   it('should respond with an individual state', async () => {
       const response = await supertest(app)
           .get('/api/v1/items/')
           .send({id: 11})
           .expect('Content-Type', /json/)
           .expect(200);

       expect(response.body.code).toBe("AR");
   });*/




