import db from '../models/index';

beforeAll(async () => {
    await db.connection.sync({force: true})
}); 
afterAll(async () => {
    await db.connection.close();
    console.log("Connection closed!");
});