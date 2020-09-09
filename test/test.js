const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

describe('', () => {

    describe('TASK 1 - GET / (Get simple report)', () => {
        it('Response structure (should have games[] and it should be an array', done => {
            chai.request('http://localhost:3000').get('/').end((err, res) => {
                res.body.should.have.property('games');
                res.body.games.should.be.a('array');
                done();
            })
        });

        it('A basic report can\'t have ranking or deathCauses', done => {
            chai.request('http://localhost:3000').get('/').end((err, res) => {
                res.body.should.not.have.property('ranking');

                for (const game of res.body.games) {
                    game.should.not.have.property('deathCauses')
                }
                done();
            })
        });

        it('A game must have at least 1 kill', done => {
            chai.request('http://localhost:3000').get('/').end((err, res) => {
                for (const game of res.body.games) {
                    game.total_kills.should.be.above(0);
                }
                done();
            })
        });

        it('Status must be 200', done => {
            chai.request('http://localhost:3000').get('/').end((err, res) => {
                res.should.have.status(200);
                done();
            })
        });
    })

    describe('TASK 2 - GET /?ranking=true (Get report with ranking of all games)', () => {

        it('Response structure (should have games[] array and ranking object', done => {
            chai.request('http://localhost:3000')
                .get('/?ranking=true')
                .end((err, res) => {
                    res.body.should.have.property('games');
                    res.body.games.should.be.a('array');

                    res.body.should.have.property('ranking');
                    res.body.ranking.should.be.a('object');
                    done();
                })
        });

        it('This report can\'t have deathCauses', done => {
            chai.request('http://localhost:3000')
                .get('/?ranking=true')
                .end((err, res) => {
                    for (const game of res.body.games) {
                        game.should.not.have.property('deathCauses')
                    }
                    done();
                })
        });

        it('Status must be 200', done => {
            chai.request('http://localhost:3000')
                .get('/?ranking=true')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                })
        });
    })

    describe('TASK 3 - GET /?death_cause=true (Get report with ranking of all games)', () => {

        it('Response structure (should have games[] array and deathCauses object in every game', done => {
            chai.request('http://localhost:3000')
                .get('/?death_cause=true')
                .end((err, res) => {
                    res.body.should.have.property('games');
                    res.body.games.should.be.a('array');

                    for (const game of res.body.games) {
                        game.should.have.property('deathCauses');
                        game.deathCauses.should.be.a('object');
                    }
                    done();
                })
        });

        it('This report can\'t have ranking', done => {
            chai.request('http://localhost:3000')
                .get('/?death_cause=true')
                .end((err, res) => {
                    res.body.should.not.have.property('ranking')
                    done();
                })
        });

        it('Status must be 200', done => {
            chai.request('http://localhost:3000')
                .get('/?death_cause=true')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                })
        });
    })

    describe('PLUS - GET /?death_cause=true&ranking=true (Get report with ranking of all games and deathCauses in every game)', () => {

        it('Response structure (should have games[], deathCauses{} and ranking{}', done => {
            chai.request('http://localhost:3000')
                .get('/?death_cause=true&ranking=true')
                .end((err, res) => {
                    res.body.should.have.property('games');
                    res.body.games.should.be.a('array');

                    res.body.should.have.property('ranking');
                    res.body.ranking.should.be.a('object');

                    for (const game of res.body.games) {
                        game.should.have.property('deathCauses');
                        game.deathCauses.should.be.a('object');
                    }
                    done();
                })
        });

        it('Status must be 200', done => {
            chai.request('http://localhost:3000')
                .get('/?death_cause=true&ranking=true')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                })
        });
    })
});

