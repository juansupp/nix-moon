'use strict';

describe('Component: PruebasComponent', function() {
  // load the controller's module
  beforeEach(module('nixMoonApp.pruebas'));

  var PruebasComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    PruebasComponent = $componentController('pruebas', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
