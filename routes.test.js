process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('./app');
const items = require('./fakeDb');

let pop = {"name": "pop", "price" : "2.50"};

beforeEach(()=>{
  items.push(pop);
})

afterEach(()=>{
  // This will make sure not to redefine the arr
  items.length = 0;
})

// Get All Items Test
describe("GET /items", () => {
  test("get all items", async () => {
    const res = await request(app).get('/items');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([pop]);
  })
})

// Get Item Test
describe("GET /items/:name", () => {
  test("get specific Item", async () => {
    const res = await request(app).get('/items/pop');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(pop);
  })
})

// Add Item Test
describe("POST /items", () => {
  test("add an item to the DB", async () => {
    const res = await request(app).post('/items').send({"name": "soda", "price" : "1.50"});
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({"added" : {"name": "soda", "price" : "1.50"}});
  })
})

// Delete Item Test
describe("DELETE /items", () => {
  test("delete an item from the DB", async () => {
    const res = await request(app).delete('/items/pop');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "Deleted" });
  })
})

// Update Item Test
describe("PATCH /items", () => {
  test("update an item to the DB", async () => {
    const res = await request(app).patch('/items/pop').send({"name": "soda", "price" : "1.50"});
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({"name": "soda", "price" : "1.50"});
  })
})



