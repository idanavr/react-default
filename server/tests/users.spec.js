/* eslint-disable */
process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const logger = new (require('../logger'))('Users Test');
chai.should();
chai.use(chaiHttp);
const userModel = require('../models/db/user');

const usersData = require('./test-data').users;

describe('Users', () => {

    let generalUserId = '';

    before((done) => {
        const data = usersData.generalUser;

        chai.request(app)
            .post('/api/users')
            .send(data)
            .end((err, res) => {
                if (err) {
                    logger.error(err);
                }
                generalUserId = res.body.id;
                done();
            });
    });

    after((done) => {
        const usersEmailList = Object.keys(usersData).map((user) => usersData[user].email);
        userModel.deleteMany({ email: { $in: usersEmailList } }, (err) => {
            if (err) {
                logger.error(err);
            }
            done();
        });
    });

    describe('/GET user', () => {
        it('it should GET all users in query', (done) => {
            chai.request(app)
                .get('/api/users')
                .end((err, res) => {
                    if (err) {
                        logger.error(err);
                    }
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });

        it('it should GET user by id', (done) => {
            chai.request(app)
                .get('/api/users/' + generalUserId)
                .end((err, res) => {
                    if (err) {
                        logger.error(err);
                    }
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('firstName').eql(usersData.generalUser.firstName);
                    res.body.should.have.property('lastName').eql(usersData.generalUser.lastName);
                    res.body.should.have.property('email').eql(usersData.generalUser.email);
                    res.body.should.not.have.property('password');
                    res.body.should.have.property('gender').eql(usersData.generalUser.gender);
                    done();
                });
        });
    });


    describe('/POST users', () => {
        it('it should fail POST users because there are no parameters', (done) => {
            chai.request(app)
                .post('/api/users')
                .end((err, res) => {
                    if (err) {
                        logger.error(err);
                    }
                    res.should.have.status(400);
                    done();
                });
        });

        it('it should POST a new user', (done) => {
            const data = usersData.newUser;

            chai.request(app)
                .post('/api/users')
                .send(data)
                .end((err, res) => {
                    if (err) {
                        logger.error(err);
                    }
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('firstName').eql(data.firstName);
                    res.body.should.have.property('lastName').eql(data.lastName);
                    res.body.should.have.property('email').eql(data.email);
                    res.body.should.not.have.property('password');
                    res.body.should.have.property('gender').eql(data.gender);
                    done();
                });
        });
    });

    describe('/UPDATE users', () => {
        it('it should UPDATE a user', (done) => {
            const userToSave = new userModel(usersData.beforeUpdateUser);
            const updatedUserData = usersData.updateUser;

            userToSave.save((err, user) => {
                chai.request(app)
                    .put('/api/users/' + user._id)
                    .send(updatedUserData)
                    .end((err, res) => {
                        if (err) {
                            logger.error(err);
                        }
                        res.should.have.status(200);
                        res.body.should.have.property('firstName').eql(updatedUserData.firstName);
                        res.body.should.have.property('lastName').eql(updatedUserData.lastName);
                        res.body.should.have.property('email').eql(updatedUserData.email);
                        res.body.should.not.have.property('password');
                        res.body.should.have.property('gender').eql(updatedUserData.gender);
                        done();
                    });
            })
        });
    });

    describe('/DELETE user', () => {
        it('it should fail DELETE user because there is no id', (done) => {
            chai.request(app)
                .delete('/api/users')
                .end((err, res) => {
                    if (err) {
                        logger.error(err);
                    }
                    res.should.have.status(400);
                    done();
                });
        });

        it('it should DELETE the user added before', (done) => {
            chai.request(app)
                .delete('/api/users')
                .send({ id: generalUserId })
                .end((err, res) => {
                    if (err) {
                        logger.error(err);
                    }
                    res.should.have.status(200);
                    done();
                });
        });
    })

});