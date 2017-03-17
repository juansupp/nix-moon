'use strict';

describe('Component: LigarActivoComponent', function() {
  // load the controller's module
  beforeEach(module('nixApp.ligarActivo'));

  var LigarActivoComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    LigarActivoComponent = $componentController('ligarActivo', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
