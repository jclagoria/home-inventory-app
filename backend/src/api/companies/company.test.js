const supertest = require('supertest');

const app = require('../../app');

describe('POST /api/v1/company', () => {
    it('should respond with a company inserted', async () => {
        const response = await supertest(app)
            .post('/api/v1/company')
            .send({name: "Hellmans",
                logo_url: "https://upload.wikimedia.org/wikipedia/en/6/69/Best_Foods_New_Logo.png",
                description: "Compania de aderezos",
                website_url: "https://www.hellmanns.com/",
                email: "hellmans_company@hellmans.com",
                address_id: 1
            })
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.status).toEqual(200);
    });

});

describe('GET /api/v1/company', () => {
    it('should respond with an array of companies', async () => {
        const response = await supertest(app)
            .get('/api/v1/company')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.status).toEqual(200);
    });

});





