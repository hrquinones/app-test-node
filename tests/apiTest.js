const request = require('supertest');
const app = require('../src/app');

/****
 * Testing get location endpoint
 */

 describe('GET /v1/location', function () {
    it('respond with json containing location current', function (done) {
        request(app)
            .get('/v1/location')
            .set('Accept','application/json')
            .expect('Content-Type',/json/)
            .expect(200, done);
    });
});

/****
 * Testing get current endpoint
 */

 describe('GET /v1/current', function () {
    it('Respond whit json containing weather of the current location', function (done) {
        request(app)
            .get('/v1/current')
            .set('Accept','application/json')
            .expect('Content-Type',/json/)
            .expect(200, done);
    });
});

/****
 * Testing get current endpoint with parameter city 
 */

 describe('GET /v1/current/3835869', function () {
    it('Respond whit json containing weather of city 3835869', function (done) {
        request(app)
            .get('/v1/current/3835869')
            .set('Accept','application/json')
            .expect('Content-Type',/json/)
            .expect(200, done);
    });
});


/****
 * Testing get forecast endpoint
 */

 describe('GET /v1/forecast', function () {
    it('Respond whit json containing forecast next days of the current location', function (done) {
        request(app)
            .get('/v1/forecast')
            .set('Accept','application/json')
            .expect('Content-Type',/json/)
            .expect(200, done);
    });
});



/****
 * Testing get forecast endpoint with parameter city 
 */

 describe('GET /v1/forecast/3835869', function () {
    it('Respond whit json containing forecast next days of city 3835869', function (done) {
        request(app)
            .get('/v1/forecast/3835869')
            .set('Accept','application/json')
            .expect('Content-Type',/json/)
            .expect(200, done);
    });
});

/******
 * Testing get city with id: 3835869 (santiago del estero)
 */
 describe('GET /v1/city/3835869', function () {
    it('respond with json containing a city information', function (done) {
        request(app)
            .get('/v1/city/3835869')
            .set('Accept','application/json')
            .expect('Content-Type',/json/)
            .expect(200, done);
    });
});

/******
 * Testing city not found
 */
 describe('GET /v1/city/66', function () {
    it('Respond with 404 Not found city', function (done) {
        request(app)
            .get('/v1/city/66')
            .set('Accept','application/json')
            .expect('Content-Type',/json/)
            .expect(404, done);
    });
});

/****
 * Testing get files endpoint
 */

 describe('GET /v1/files', function () {
    it('respond with json containing list files uploads', function (done) {
        request(app)
            .get('/v1/files')
            .set('Accept','application/json')
            .expect(200, done);
    });
});
