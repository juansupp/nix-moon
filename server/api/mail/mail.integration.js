'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

describe('Mail API:', function() {
  describe('GET /api/mails', function() {
    var mails;

    beforeEach(function(done) {
      request(app)
        .get('/api/mails')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          mails = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      mails.should.be.instanceOf(Array);
    });
  });
});
