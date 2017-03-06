'use strict';

describe('Component: movement', function() {
  // load the component's module
  beforeEach(module('nixApp.movement'));

  var movementComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    movementComponent = $componentController('movement', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
