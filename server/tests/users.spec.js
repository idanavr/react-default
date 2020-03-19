/* eslint no-undef: 0 */
process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);
const app = require('../server');
const logger = new (require('../logger'))('Users Test');
const agent = chai.request.agent(app);

const usersData = require('./test-data').users;

describe('Users', () => {
    let generalUserId = '';

    before((done) => {
        const data = usersData.generalUser;

        agent
            .post('/api/users')
            .send(data)
            .end((err, res) => {
                if (err) {
                    logger.error(err);
                }
                res.should.have.cookie('jwt');
                generalUserId = res.body.id;
                done();
            });
    });

    after(() => {
        agent.close();
    });

    describe('GET /users', () => {
        const { generalUser } = usersData;
        it('it should fail returning all users since user\'s role is not authorized for that', (done) => {
            agent
                .get('/api/users')
                .end((err, res) => {
                    if (err) {
                        logger.error(err);
                    }
                    res.should.have.status(401);
                    done();
                });
        });

        describe('GET /users/me', () => {
            it('it should return the user in the current session', (done) => {
                agent
                    .get('/api/users/me')
                    .end((err, res) => {
                        if (err) {
                            logger.error(err);
                        }
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('id');
                        res.body.should.have.property('firstName').eql(generalUser.firstName);
                        res.body.should.have.property('lastName').eql(generalUser.lastName);
                        res.body.should.have.property('email').eql(generalUser.email);
                        res.body.should.not.have.property('password');
                        res.body.should.have.property('gender').eql(generalUser.gender);
                        res.body.should.have.property('role');
                        done();
                    });
            });
        });

        describe('GET /users/:id', () => {
            it('it should return the user with the given id', (done) => {
                agent
                    .get(`/api/users/${generalUserId}`)
                    .end((err, res) => {
                        if (err) {
                            logger.error(err);
                        }
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('id');
                        res.body.should.have.property('firstName').eql(generalUser.firstName);
                        res.body.should.have.property('lastName').eql(generalUser.lastName);
                        res.body.should.have.property('email').eql(generalUser.email);
                        res.body.should.not.have.property('password');
                        res.body.should.have.property('gender').eql(generalUser.gender);
                        res.body.should.have.property('role');
                        done();
                    });
            });
        });
    });


    describe('POST /users', () => {
        it('it should fail create user because there are no parameters', (done) => {
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

        it('it should create a new user', (done) => {
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
                    res.body.should.have.property('id');
                    res.body.should.have.property('firstName').eql(data.firstName);
                    res.body.should.have.property('lastName').eql(data.lastName);
                    res.body.should.have.property('email').eql(data.email);
                    res.body.should.not.have.property('password');
                    res.body.should.have.property('gender').eql(data.gender);
                    res.body.should.have.property('role');
                    done();
                });
        });
    });


    describe('UPDATE /users', () => {
        it('it should fail updating a user since request has no user', (done) => {
            const updatedUserData = usersData.updateUser;
            updatedUserData.oldPassword = usersData.generalUser.password;

            chai.request(app)
                .put(`/api/users/${generalUserId}`)
                .send(updatedUserData)
                .end((err, res) => {
                    if (err) {
                        logger.error(err);
                    }
                    res.should.have.status(401);
                    done();
                });
        });

        it('it should update the user in the current session', (done) => {
            const updatedUserData = usersData.updateUser;
            updatedUserData.oldPassword = usersData.generalUser.password;

            agent
                .put(`/api/users/${generalUserId}`)
                .send(updatedUserData)
                .end((err, res) => {
                    if (err) {
                        logger.error(err);
                    }
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('id');
                    res.body.should.have.property('firstName').eql(updatedUserData.firstName);
                    res.body.should.have.property('lastName').eql(updatedUserData.lastName);
                    res.body.should.have.property('email').eql(updatedUserData.email);
                    res.body.should.not.have.property('password');
                    res.body.should.have.property('gender').eql(updatedUserData.gender);
                    res.body.should.have.property('role');
                    done();
                });
        });
    });

    describe('DELETE /users', () => {
        it('it should fail deleting the user since user\'s role is not authorized for that', (done) => {
            agent
                .delete('/api/users')
                .send({ id: generalUserId })
                .end((err, res) => {
                    if (err) {
                        logger.error(err);
                    }
                    res.should.have.status(401);
                    done();
                });
        });
    });

});