'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var mailCtrlStub = {
  index: 'mailCtrl.index'
};

var routerStub = {
  get: sinon.spy()
};

// require the index with our stubbed out modules
var mailIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './mail.controller': mailCtrlStub
});

describe('Mail API Router:', function() {
  it('should return an express router instance', function() {
    mailIndex.should.equal(routerStub);
  });

  describe('GET /api/mails', function() {
    it('should route to mail.controller.index', function() {
      routerStub.get
        .withArgs('/', 'mailCtrl.index')
        .should.have.been.calledOnce;
    });
  });
});
