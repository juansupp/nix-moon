'use strict';

var app = require('../..');
import request from 'supertest';

describe('Astral API:', function() {
  describe('GET /api/astral', function() {
    var astrals;

    beforeEach(function(done) {
      request(app)
        .get('/api/astral')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          astrals = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      astrals.should.be.instanceOf(Array);
    });
  });
});
