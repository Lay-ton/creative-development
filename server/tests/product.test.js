
import Product from '../models/productMongo.model.js';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app.js';

let should = chai.should();
let expect = chai.expect;
chai.use(chaiHttp);

describe('Product', () => {
    beforeEach((done) => {
        Product.remove({}, err => {
            done();
        })
        Product.insertMany([
            {
                title: "Test Product #1",
                description: "This is a test product number 1",
                image: "testProduct1.img",
                published: "true",
                typeTable: "Photo"
            },
            {
                title: "Test Product #2",
                description: 'This is a test product number 2',
                image: 'testProduct2.img',
                typeTable: "Photo"
            },
            {
                title: 'Test Product #3',
                description: 'This is a test product number 3',
                image: 'testProduct3.img',
                published: 'true',
                typeTable: "Photo"
            },
            {
                title: 'Test Product #4',
                description: 'This is a test product number 4',
                image: 'testProduct4.img',
                published: 'false',
                typeTable: "Photo"
            }
        ])
            .then(() => {
                console.log('Data has been inserted from product.test.js')
            })
            .catch((err) => {
                console.log('Error has occurred: ' + err);
            })
    })
        describe('/GET findAll', () => {
            it('SHOULD create 3 products and return all of them', (done) => {
                chai.request(server)
                    .get('/api/products/')
                    .send({page: 1, limit: 2})
                    .end((err, res) => {
                        res.should.have.status(200);
                        done();
                    })
            })
        })

        describe('/GET findAllPublished', () => {
            it('SHOULD RETURN and array of 2 elements', (done) => {
                chai.request(server)
                    .get('/api/products/published')
                    .send({type: 'Photo'})
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.should.be.an('object')
                        done();
                    })
            })
        })

})

describe('PRODUCT findOne using relationship', () => {
    beforeEach((done) => {
        Product.remove({}, err => {
            done();
        })
        Product.insertMany([
            {
                title: "Test Product #1",
                description: "This is a test product number 1",
                image: "testProduct1.img",
                published: "true",
                typeTable: "Photo"
            },

        ])
            .then(() => {
                console.log('Data has been inserted from product.test.js')
            })
            .catch((err) => {
                console.log('Error has occurred: ' + err);
            })
    })
})