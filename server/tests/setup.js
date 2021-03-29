import db from '../models/index'
beforeAll(() => db.connection.sync({force: true}))
afterAll(() => db.connection.close())