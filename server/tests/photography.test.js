import express from 'express';
import request from 'supertest';
import 'regenerator-runtime/runtime';
import db from '../models/index.js';
import photography from '../routes/photography.routes.js';
import iconv from 'iconv-lite';
iconv.encodingExists('cesu8');

const app = express();
photography(app);

describe("testing-photography-routes", () => {
  beforeAll(async () => {
    await db.connection.sync({ force: true });
  });

  it("GET /api/photography - success", async () => {
    const { body } = await request(app).get("/api/photography"); //uses the request function that calls on express app instance
    //console.log(body)
    expect(body).toEqual({
      "totalItems": 4,
      "data": [
          {
              "id": 1,
              "title": "Blackfoot Mountain",
              "description": "A about 7 miles into our hike towards Gunsight Pass in Glacier National Park, Montana. This shot is directed towards the mountains east of Gunsight Lake.",
              "image": "0000809_0000809-R1-006-1A",
              "published": true,
              "createdAt": "2021-03-17T15:42:17.000Z",
              "updatedAt": "2021-03-17T15:42:17.000Z"
          },
          {
              "id": 2,
              "title": "Hungry Horse Dam",
              "description": "15 miles from the west entrance of Glacier National Park, Montana.",
              "image": "0000809_0000809-R1-018-7A",
              "published": true,
              "createdAt": "2021-03-17T15:43:29.000Z",
              "updatedAt": "2021-03-17T15:43:29.000Z"
          },
          {
              "id": 3,
              "title": "Waves at Jenny Lake",
              "description": "Waves left over from the ferry that crosses Jenny Lake.",
              "image": "0000811_0000811-R1-014-5A",
              "published": true,
              "createdAt": "2021-03-17T15:44:06.000Z",
              "updatedAt": "2021-03-17T15:44:06.000Z"
          },
          {
              "id": 4,
              "title": "Mount Jackson and Gunsight Pass",
              "description": "Miles away from Gunsight Pass. Taking in the serene valley and looking forward to what we would be hiking through.",
              "image": "0000809_0000809-R1-008-2A",
              "published": true,
              "createdAt": "2021-03-17T15:44:42.000Z",
              "updatedAt": "2021-03-17T15:44:42.000Z"
          }
      ],
      "totalPages": 1,
      "currentPage": 0
    });
  })

  afterAll(async () => {
    await db.connection.close();
  });
});
