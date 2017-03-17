'use strict';

describe('Component: AlistarActivoComponent', function() {
  // load the controller's module
  beforeEach(module('nixApp.alistarActivo'));

  var AlistarActivoComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    AlistarActivoComponent = $componentController('alistarActivo', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
