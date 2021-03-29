import db from '../models/index'
beforeAll(() => db.connection.sync())
afterAll(() => db.connection.close())