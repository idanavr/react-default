process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);
const app = require('../server');
const logger = new (require('../logger'))('Login Test');
const agent = chai.request.agent(app);

const loginData = require('./test-data').login;

describe('Login', function () {

    before(function (done) {
        const data = loginData.user;

        agent
            .post('/api/users')
            .send(data)
            .end((err, res) => {
                if (err) {
                    logger.error(err);
                }
                res.should.have.cookie('jwt');
                done();
            });
    });

    after(function () {
        agent.close();
    });

    describe('POST /login', function () {
        const { user } = loginData;
        it('it should fail login since email does not exist', function (done) {
            const wrongEmail = `wrong${user.email}`;

            agent
                .post('/api/login')
                .send({ email: wrongEmail, password: user.password })
                .end((err, res) => {
                    if (err) {
                        logger.error(err);
                    }
                    res.should.have.status(404);
                    done();
                });
        });

        it('it should fail login since password is wrong', function (done) {
            const wrongPassword = `${user.password}wrong`;

            agent
                .post('/api/login')
                .send({ email: user.email, password: wrongPassword })
                .end((err, res) => {
                    if (err) {
                        logger.error(err);
                    }
                    res.should.have.status(404);
                    done();
                });
        });

        it('it should success login and return the user', function (done) {
            agent
                .post('/api/login')
                .send({ email: user.email, password: user.password })
                .end((err, res) => {
                    if (err) {
                        logger.error(err);
                    }
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('id');
                    res.body.should.have.property('firstName').eql(user.firstName);
                    res.body.should.have.property('lastName').eql(user.lastName);
                    res.body.should.have.property('email').eql(user.email);
                    res.body.should.not.have.property('password');
                    res.body.should.have.property('gender').eql(user.gender);
                    res.body.should.have.property('role');
                    done();
                });
        });

        describe('GET /users/me - after login', function () {
            it('it should validate there is a user in the current session', function (done) {
                agent
                    .get('/api/users/me')
                    .end((err, res) => {
                        if (err) {
                            logger.error(err);
                        }
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('id');
                        res.body.should.have.property('firstName').eql(user.firstName);
                        res.body.should.have.property('lastName').eql(user.lastName);
                        res.body.should.have.property('email').eql(user.email);
                        res.body.should.not.have.property('password');
                        res.body.should.have.property('gender').eql(user.gender);
                        res.body.should.have.property('role');
                        done();
                    });
            });
        });

        describe('POST /login/logout', function () {
            it('it should end user session', function (done) {
                agent
                    .post('/api/login/logout')
                    .end((err, res) => {
                        if (err) {
                            logger.error(err);
                        }
                        res.should.have.status(204);
                        done();
                    });
            });
        });

        describe('GET /users/me - after logout', function () {
            it('it should return unauthorized since user session ended', function (done) {
                agent
                    .get('/api/users/me')
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
});