'use strict';

describe('Component: AddUsuarioComponent', function() {
  // load the controller's module
  beforeEach(module('nixApp.addUsuario'));

  var AddUsuarioComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    AddUsuarioComponent = $componentController('addUsuario', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
