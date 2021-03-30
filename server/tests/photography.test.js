import express from 'express';
import request from 'supertest';
import photography from '../routes/photography.routes.js';
import db from '../models/index.js';
import 'regenerator-runtime/runtime';
import iconv from 'iconv-lite';
iconv.encodingExists('cesu8');

const app = express();
photography(app);

describe("testing-photography-routes", () => {
  test("GET /api/photography - success", async () => {
    const res = await request(app).get("/api/photography"); //uses the request function that calls on express app instance
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty("totalItems")
    expect(res.body).toHaveProperty("data")
    expect(res.body).toHaveProperty("totalPages")
    expect(res.body).toHaveProperty("currentPage")
  })
});
