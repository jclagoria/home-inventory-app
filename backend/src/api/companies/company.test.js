const supertest = require('supertest');

const app = require('../../app');

describe('POST /api/v1/company', () => {
    it('should respond with an array of address', async () => {
        const response = await supertest(app)
            .post('/api/v1/company')
            .send({name: "Hellmans",
                logo_url: "https://upload.wikimedia.org/wikipedia/en/6/69/Best_Foods_New_Logo.png",
                description: "Compania de aderezos",
                website_url: "https://www.hellmanns.com/ar/productos/mayonesa.html?gclid=Cj0KCQiAy579BRCPARIsAB6QoIb0nSl9JelrgxOJWhgz3FOWWd0AOQ_jT7P5XUjBVq3vtelMxCsrYIQaAjO0EALw_wcB&gclsrc=aw.ds",
                email: "hellmans_company@hellmans.com",
                address_id: 1
            })
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.status).toEqual(200);
    });

});

describe('GET /api/v1/company', () => {
    it('should respond with an array of address', async () => {
        const response = await supertest(app)
            .get('/api/v1/company')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.status).toEqual(200);
    });

});





