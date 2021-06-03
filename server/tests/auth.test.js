import bcrypt from "bcryptjs";

import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app.js';
import mongoose from 'mongoose'
import assert from 'assert';
import User from '../models/userMongo.model.js';

let should = chai.should();
chai.use(chaiHttp);
describe('USER', () => {
    // beforeEach((done) => {
    //     User.remove({}, err => {
    //         done();
    //     })
    // })
    describe('/POST signin', () => {
        it('SHOULD create a user', (done) => {
            let user = {
                username: 'TEST3',
                email:'test3@test.mail.com',
                password: bcrypt.hashSync('n00bies228', 8),
                roles: ['User', 'Moderator', 'Admin']
            }
            chai.request(server)
                .post('/api/auth/signup')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('User was registered successfully');
                    done();
                });
        });

        it('SHOULD singin the user', (done) => {
            let user = {
                username: 'TEST3',
                password: 'n00bies228',
            }
            chai.request(server)
                .post('/api/auth/signin')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    //res.body.should.have.property('roles');
                    done();
                });
        });

        it('SHOULD receive roles', (done) => {
            let user = {
                username: 'TEST3',
                password: 'n00bies228',
            }
            chai.request(server)
                .post('/api/auth/signin')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('roles').to.be.an('array');
                    res.body.roles.should.have.members(['ROLE_USER', 'ROLE_MODERATOR', 'ROLE_ADMIN'])
                    // res.body.should.have
                    done();
                });
        })
    });
})
