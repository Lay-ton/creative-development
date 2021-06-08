var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

before(function (done) {
    //Connect to MongoDB Here
    mongoose.connect('mongodb+srv://mongo:mongoroot@cluster0.qy5oi.mongodb.net/test');

    mongoose.connection.once('open', function () {
        console.log('Connected to MongoDB!');
        done();
    }).on('error', function () {
        console.log('Connection error : ', error);
    });
});

beforeEach(function (done) {
    mongoose.connection.collections.users.drop(function () {
        done();
    })
});