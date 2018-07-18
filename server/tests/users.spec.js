/* eslint-disable */
process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const userModel = require('../models/user');
const usersTestData = require('./test-data').users;

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../distServer');

chai.should();
chai.use(chaiHttp);

describe('Users', () => {

    let generalUserId = '';

    before((done) => {
        const userToSave = new userModel(usersTestData.generalUser);

        userToSave.save((err, user) => {
            if (err) {
                console.log('user save err ', err)
                throw err;
            }
            generalUserId = user._id;
            done();
        })
        .catch((err) => {
            done();
        });
    });

    after((done) => {
        const usersEmailList = Object.keys(usersTestData).map((user) => usersTestData[user].email);
        // const usersEmailList = [usersTestData.generalUser.email, usersTestData.newUser.email, usersTestData.beforeUpdateUser.email, usersTestData.updateUser.email];
        userModel.remove({ email: { $in: usersEmailList } }, (err) => { 
           done();
        });
    });

    describe('/GET user', () => {
        it('it should GET all users in query', (done) => {
            chai.request(server)
                .get('/api/users')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });

        it('it should GET user by id', (done) => {
            chai.request(server)
                .get('/api/users/' + generalUserId)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('firstName').eql(usersTestData.generalUser.firstName);
                    res.body.should.have.property('lastName').eql(usersTestData.generalUser.lastName);
                    res.body.should.have.property('email').eql(usersTestData.generalUser.email);
                    res.body.should.have.property('gender').eql(usersTestData.generalUser.gender);
                    done();
                });
        });
    });


    describe('/POST users', () => {
        it('it should fail POST users because there are no parameters', (done) => {
            chai.request(server)
                .post('/api/users')
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it('it should POST a new user', (done) => {
            const data = usersTestData.newUser;

            chai.request(server)
                .post('/api/users')
                .send(data)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('firstName').eql(data.firstName);
                    res.body.should.have.property('lastName').eql(data.lastName);
                    res.body.should.have.property('email').eql(data.email);
                    res.body.should.have.property('password').eql(data.password);
                    res.body.should.have.property('gender').eql(data.gender);
                    done();
                });
        });
    });

    describe('/UPDATE users', () => {
        it('it should UPDATE a user', (done) => {
            const userToSave = new userModel(usersTestData.beforeUpdateUser);
            const updatedUserData = usersTestData.updateUser;

            userToSave.save((err, user) => {
                chai.request(server)
                    .put('/api/users/' + user._id)
                    .send(updatedUserData)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.have.property('firstName').eql(updatedUserData.firstName);
                        res.body.should.have.property('lastName').eql(updatedUserData.lastName);
                        res.body.should.have.property('email').eql(updatedUserData.email);
                        res.body.should.have.property('password').eql(updatedUserData.password);
                        res.body.should.have.property('gender').eql(updatedUserData.gender);
                        done();
                    });
            })
        });
    });

    describe('/DELETE user', () => {
        it('it should fail DELETE user because there is no id', (done) => {
            chai.request(server)
                .delete('/api/users')
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it('it should DELETE the user added before', (done) => {
            const emailToRemove = usersTestData.updateUser.email;
            userModel.findOne({ email: emailToRemove }, (err, user) => {
                chai.request(server)
                .delete('/api/users')
                .send({id: user._id})
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
            })
        });
    })

});