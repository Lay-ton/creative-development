import bcrypt from "bcryptjs";

import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app.js';
import mongoose from 'mongoose'
import assert from 'assert';
import User from '../models/userMongo.model.js';
import Product from "../models/productMongo.model.js";
import Photo from "../models/photoMongo.model.js";
let should = chai.should();
chai.use(chaiHttp);


describe('User', () => {
    // beforeEach((done) => {
    //     // Photo.remove({}, err => {
    //     //     done();
    //     // })
    //     // Product.remove({}, err => {
    //     //     done();
    //     // })
    // })
    // describe('/POST signup', () => {
    //     it('SHOULD NOT create a user without email address', (done) => {
    //         let user = {
    //                 username: 'TEST1',
    //                 // email:'test1@test.mail.com',
    //                 password: bcrypt.hashSync('passwordstrong789', 8),
    //                 roles: ['User', 'Moderator', 'Admin']
    //         }
    //         chai.request(server)
    //             .post('/api/auth/signup')
    //             .send(user)
    //             .end((err, res) => {
    //                 res.should.have.status(500);
    //                 res.body.should.be.a('object');
    //                 res.body.message.should.be.a('string').equal('User validation failed: email: Email is required')
    //                 done();
    //             })
    //     })
    //
    //     it('SHOULD create a user', (done) => {
    //         let user = {
    //             username: 'TEST2',
    //             email:'test2@test.mail.com',
    //             password: bcrypt.hashSync('passwordstrong475', 8),
    //             roles: ['User', 'Moderator', 'Admin']
    //         }
    //         chai.request(server)
    //             .post('/api/auth/signup')
    //             .send(user)
    //             .end((err, res) => {
    //                 res.should.have.status(200);
    //                 res.body.should.be.a('object');
    //                 res.body.should.have.property('message').eql('User was registered successfully');
    //                 done();
    //             });
    //     });
    // });

    describe('/POST create product', () => {
        it('SHOULD create a new product in the database', (done) => {
            let product = {
                title:'New product from Mocha test',
                description:'Description is optional but I will add it anyways',
                image:'test.img',
                published:'true',
                typeTable:'Photo',
                tableObject : {
                    productId: 'test',
                    images: ['test.img']
                }
            }
            chai.request(server)
                .post('/api/products/')
                .send(product)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Product was created successfully');
                    done();
                })
        })

        it('SHOULD find a PHOTO object from PHOTO table based on the current ObjectId', (done) => {
            chai.request(server)
                .get('/api/products/60be5ff6caa83b7f8e44ed12')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                })
        })

        it('SHOULD update a PHOTO object based on id', (done) => {
            chai.request(server)
                .put('/api/products/60be5ff6caa83b7f8e44ed12')
                .send({
                    image: "newImageUpdated.png"
                })
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                })
        })

        it('SHOULD NOT create a new product, missing title', (done) => {
            let product = {
                description:'Description is optional but I will add it anyways',
                image:'Here is the image source',
                published:'true',
                typeTable:'photo'
            }
            chai.request(server)
                .post('/api/products/')
                .send(product)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.message.should.be.a('string').equal('Content can not be empty!')
                    done();
                })
        })

    })
})
