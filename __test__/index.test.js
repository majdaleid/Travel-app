
//import request from 'supertest'

/*import app from '../src/server/index'
describe(" get test request", () => {
    describe("given a username and password", () => {
  
      test("should respond with a 200 status code", async () => {
        const res = await request(app).get('/test');
        expect(response.statusCode).toBe('pass!');

      })
    })

})*/
import "babel-polyfill";

const request = require('supertest')
const app = require('../src/client/js/formHandler')

describe("Test the path", () => {
  test("It should response the GET method", done => {
      request(app)
          .get("/test")
          .then(res => {
              expect(res.statusCode).toEqual(200);
              done();
          });
  });
});


/*
describe('get Endpoints', () => {
  it('should make a get request', async () => {
    const res = await request(app)
    .get('/test')
     /* .post('/api/posts')
      .send({
        userId: 1,
        title: 'test is cool',
      })*/
     // expect(res.statusCode).toEqual(200)
   // expect(res.statusCode).toEqual(201)
  //  expect(res.body).toHaveProperty('post')
  /*})
})*/




 