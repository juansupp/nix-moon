'use strict';

describe('Component: ConfigActivoComponent', function() {
  // load the controller's module
  beforeEach(module('nixApp.configActivo'));

  var ConfigActivoComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    ConfigActivoComponent = $componentController('configActivo', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
