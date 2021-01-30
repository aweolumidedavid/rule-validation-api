/* eslint-disable linebreak-style */
const assert = require('assert');
const chai = require('chai');
const server = require('../app');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();

const data = {
    "rule": {
        "field": "missions",
        "condition": "gte",
        "condition_value": 30
    },
    "data": {
        "name": "James Holden",
        "crew": "Rocinante",
        "age": 34,
        "position": "Captain",
        "missions": 45
    }
};

const data1 = {
    "rule": {
        "field": "missions",
        "condition": "gte",
        "condition_value": 30,
    },
    "data": 20,
};

const data2 = {
    "data": {
        "name": "James Holden",
        "crew": "Rocinante",
        "age": 34,
        "position": "Captain",
        "missions": 45
    }
};

const data3 = {
    "rule": 30,
    "data": {
        "name": "James Holden",
        "crew": "Rocinante",
        "age": 34,
        "position": "Captain",
        "missions": 45
    }
};

const data4 = {
    "rule": {
        "field": "missions",
        "condition": "gte",
        "condition_value": 50,
    },
    "data": {
        "name": "James Holden",
        "crew": "Rocinante",
        "age": 34,
        "position": "Captain",
        "missions": 25
    },
};

const data5 = {
    "rule": {
        "field": "missions",
        "condition": "gte",
        "condition_value": 45
    },
    "data": {
        "name": "James Holden",
        "crew": "Rocinante",
        "age": 34,
        "position": "Captain",
        "missions": 45
    },
};

const eq = {
    "rule": {
        "field": "missions",
        "condition": "eq",
        "condition_value": 30,
    },
    "data": {
        "name": "John Doe",
        "crew": "foo",
        "age": 33,
        "position": "captain",
        "missions": 30
    },
};


const neq = {
    "rule": {
        "field": "missions",
        "condition": "neq",
        "condition_value": 30,
    },
    "data": {
        "name": "John Doe",
        "crew": "foo",
        "age": 33,
        "position": "captain",
        "missions": 30
    },
};


describe('user tests', () => {

    it('should pass - rule present', (done) => {
        chai.request(server).post('/validate-rule')
.send(data)
        .end((err, res) => {
            console.log(err);
            res.should.have.status(200);
            done();
        });
    });

    it('should fail - no rule', (done) => {
        chai.request(server).post('/validate-rule')
.send(data2)
        .end((err, res) => {
            console.log(res.body.message);
            res.should.have.status(400);
            assert.strictEqual(res.body.status, 'error');
            done();
        });
    });

    it('should fail - invalid data field type', (done) => {
        chai.request(server).post('/validate-rule')
.send(data1)
        .end((err, res) => {
            console.log(res.body.message);
            res.should.have.status(400);
            done();
        });
    });

    it('should fail - invalid rule field type', (done) => {
        chai.request(server).post('/validate-rule')
.send(data3)
        .end((err, res) => {
            console.log(res.body.message);
            res.should.have.status(400);
            done();
        });
    });

    it('should fail - mission value less than 30', (done) => {
        chai.request(server).post('/validate-rule')
.send(data4)
        .end((err, res) => {
            console.log(res.body.message);
            res.should.have.status(400);
            done();
        });
    });

    it('should pass - mission value equals 30', (done) => {
        chai.request(server).post('/validate-rule')
.send(data5)
        .end((err, res) => {
            console.log(res.body.message);
            res.should.have.status(200);
            done();
        });
    });

    it('should pass - mission value equals 30', (done) => {
        chai.request(server).post('/validate-rule')
.send(eq)
        .end((err, res) => {
            console.log(res.body.message);
            res.should.have.status(200);
            done();
        });
    });

    it('should fail - value is equal to rule value', (done) => {
        chai.request(server).post('/validate-rule')
.send(neq)
        .end((err, res) => {
            console.log(res.body.message);
            res.should.have.status(400);
            done();
        });
    });
});