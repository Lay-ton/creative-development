//inside read_test.js
const assert = require('assert');
const User = require('../models/userMongo.model');
let user;
beforeEach(() => {
    user = new User({
        username: 'dimkasychev',
        email: 'dima@dima.com',
        password: 'passwordstrong789',
        roles: ['User', 'Moderator', 'Admin']
    });
    user.save()
        .then(() => done());
});
describe('Reading user details', () => {
    it('finds user with the username of dimkasychev', (done) => {
        User.findOne({ name: 'dimkasychev' })
            .then((usr) => {
                assert(usr.username === 'dimkasychev');
                done();
            });
    })
})