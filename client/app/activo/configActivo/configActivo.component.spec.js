'use strict';

describe('Component: configActivo', function() {
  // load the component's module
  beforeEach(module('nixApp.configActivo'));

  var configActivoComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    configActivoComponent = $componentController('configActivo', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
