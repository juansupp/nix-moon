'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var astralCtrlStub = {
  index: 'astralCtrl.index'
};

var routerStub = {
  get: sinon.spy()
};

// require the index with our stubbed out modules
var astralIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './astral.controller': astralCtrlStub
});

describe('Astral API Router:', function() {
  it('should return an express router instance', function() {
    astralIndex.should.equal(routerStub);
  });

  describe('GET /api/astral', function() {
    it('should route to astral.controller.index', function() {
      routerStub.get
        .withArgs('/', 'astralCtrl.index')
        .should.have.been.calledOnce;
    });
  });
});
